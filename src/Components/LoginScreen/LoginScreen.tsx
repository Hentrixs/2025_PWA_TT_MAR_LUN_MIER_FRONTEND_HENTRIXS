import { Link } from 'react-router';
import useForm from '../../hooks/useForm/useForm';
import './LoginScreen.css'
import useRequest from '../../hooks/useRequest/useRequest';
import { login } from '../../services/authService';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const LoginScreen = () => {

    const { sendRequest, error, response, loading } = useRequest(); // se le pide al useRequest() todos los estados.

    const LOGIN_FORM_FIELDS = { // Esto es lo que se conoce como un diccionario
        EMAIL: 'email', // sirve para que en caso de que querer modificar el nombre solamente cambiemos 'email' por otra cosa una sola vez y facil
        PASSWORD: 'password'
    };

    const initialFormState = {
        [LOGIN_FORM_FIELDS.EMAIL]: '', // se asigna un valor default a ambos campos
        [LOGIN_FORM_FIELDS.PASSWORD]: ''
    };

    const { saveToken, isLogged } = useContext(AuthContext);

    const onLogin = (formState: any) => { // esta es la funcion del login. ok.
        sendRequest({
            requestCb: async () => {
                return await login({
                    email: formState[LOGIN_FORM_FIELDS.EMAIL], // y aca porque si se usa formato email: email , password: password
                    password: formState[LOGIN_FORM_FIELDS.PASSWORD]
                });
            }
        });
    };

    const { handleChangeInput, onSubmit } = useForm({ // aca se desetructura 3 funciones del useForm y ademas se le pasa el initialFormState y el submitFn.
        initialFormState: initialFormState,
        submitFn: onLogin // aca es donde le pasamos como callback la funcion onLogin al submitFn
    });

    console.log(`ESPIA DE ESTADOS: Response: ${response}, Error: ${error}, Loading: ${loading

        }`);

    // la funcion se carga cada vez que carga response, si response.ok es true, se guarda el token en el contexto.
    useEffect(() => {
        if (response && response.ok && saveToken) {
            saveToken(response.data.auth_token);
        }
    }, [response, saveToken]);

    return (
        <div>
            <h1>Iniciar Sesion</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name={LOGIN_FORM_FIELDS.EMAIL} onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" id='password' name={LOGIN_FORM_FIELDS.PASSWORD} onChange={handleChangeInput} />
                </div>
                <button type='submit'>Iniciar Sesion</button>
                <span>No tienes una cuenta? <Link to={'/register'}>Registrarse</Link></span>
                <span>Olvidaste tu contraseña? <Link to={'/reset-password-request'}>Restablecer Contrasena</Link></span>
            </form>
        </div>
    );
};

export default LoginScreen;