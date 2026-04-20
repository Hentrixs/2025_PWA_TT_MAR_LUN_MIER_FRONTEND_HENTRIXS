import './Login.css';
import { Link } from 'react-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useForm from '../../hooks/useForm/useForm';
import useLogin from '../../hooks/useLogin/useLogin';
import Logo from '../../Components/Logo/Logo';
import InfoComponent from '../../Components/InfoComponent/InfoComponent';

const Login = () => {

    // es decir, hacer redirecciones a otra pagina

    const LOGIN_FORM_FIELDS = { // Esto es lo que se conoce como un diccionario
        EMAIL: 'email', // sirve para que en caso de que querer modificar el nombre solamente cambiemos 'email' por otra cosa una sola vez y facil
        PASSWORD: 'password'
    };

    const initialFormState = {
        [LOGIN_FORM_FIELDS.EMAIL]: '', // se asigna un valor default a ambos campos
        [LOGIN_FORM_FIELDS.PASSWORD]: ''
    };

    const { hacerLogin, error, response, loading } = useLogin();

    const { manageLogin } = useContext(AuthContext);


    const { handleChangeInput, onSubmit } = useForm({ // aca se desetructura 3 funciones del useForm y ademas se le pasa el initialFormState y el submitFn.
        initialFormState: initialFormState,
        submitFn: hacerLogin // aca es donde le pasamos como callback la funcion onLogin al submitFn
    });

    // la funcion se carga cada vez que carga response, si response.ok es true, se guarda el token en el contexto.
    useEffect(() => {
        if (response && response.ok && manageLogin) {
            manageLogin(response.data.auth_token);
        }
    }, [response, manageLogin]);

    return (
        <div className='login-container'>
            <div className='split-left'>
                <Logo className='logo-responsive' />
            </div>
            <div className='split-right'>
                <h1>Iniciar Sesion</h1>
                <form onSubmit={onSubmit} className='login-form'>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id='email' name={LOGIN_FORM_FIELDS.EMAIL} onChange={handleChangeInput} />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input type="password" id='password' name={LOGIN_FORM_FIELDS.PASSWORD} onChange={handleChangeInput} />
                    </div>
                    <button type='submit' disabled={loading} >{loading && 'Iniciando Sesion...' || 'Iniciar Sesion'}</button>
                    <span>No tienes una cuenta? <Link to={'/register'}>Registrarse</Link></span>
                    <span>Olvidaste tu contraseña? <Link to={'/reset-password-request'}>Restablecer Contrasena</Link></span>
                </form>
                {response && !loading && <InfoComponent response={response} />}
            </div>
        </div>
    );
};

export default Login;