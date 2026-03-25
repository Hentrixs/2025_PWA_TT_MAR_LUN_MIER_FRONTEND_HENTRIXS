import { Link } from 'react-router';
import './RegisterScreen.css';
// Importamos nuestros ayudantes
import useForm from '../../hooks/useForm/useForm';
import useRequest from '../../hooks/useRequest/useRequest';
import { register } from '../../services/authService';

const RegisterScreen = () => {

    // 1. Invocamos nuestro hook useRequest para manejar los estados automáticamente
    const { sendRequest, error, response, loading } = useRequest();

    const REGISTER_FORM_FIELDS = { // Diccionario para evitar errores de tipeo en los nombres
        EMAIL: 'email',
        PASSWORD: 'password',
        NAME: 'name'
    };

    const initialFormState = {
        [REGISTER_FORM_FIELDS.NAME]: '',
        [REGISTER_FORM_FIELDS.EMAIL]: '',
        [REGISTER_FORM_FIELDS.PASSWORD]: ''
    };

    // 2. Aquí es donde ocurre la conexión real
    const onRegister = async (formState: any) => {
        // Envolvemos el envío dentro del sendRequest del Hook
        await sendRequest({
            requestCb: async () => {
                // Ejecutamos la función register que hicimos en authService.ts mandándole los 3 campos exactos
                return await register({
                    name: formState[REGISTER_FORM_FIELDS.NAME],
                    email: formState[REGISTER_FORM_FIELDS.EMAIL],
                    password: formState[REGISTER_FORM_FIELDS.PASSWORD]
                });
            }
        });
    };

    const { handleChangeInput, onSubmit, formState } = useForm({
        initialFormState,
        submitFn: onRegister
    })

    // 3. Pequeño espía en consola para que veas qué hace React tras bastidores
    console.log(`ESPIA DE ESTADOS (REGISTER): Response: ${response}, Error: ${error}, Loading: ${loading}`);

    return (
        <div>
            {/* 4. Corrijo los textos porque habías dejado "Iniciar Sesion" copiado por accidente :) */}
            <h1>Crear una Cuenta Nueva</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    {/* Corregimos type="name" (que no existe en HTML válido) a type="text" */}
                    <input type="text" id='name' name={REGISTER_FORM_FIELDS.NAME} value={formState[REGISTER_FORM_FIELDS.NAME]} onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name={REGISTER_FORM_FIELDS.EMAIL} value={formState[REGISTER_FORM_FIELDS.EMAIL]} onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name={REGISTER_FORM_FIELDS.PASSWORD} value={formState[REGISTER_FORM_FIELDS.PASSWORD]} onChange={handleChangeInput} />
                </div>
                <button type='submit'>Registrarse</button>
                <span>¿Ya tienes una cuenta? <Link to={'/login'}>Iniciar Sesion</Link></span>
            </form>
        </div>
    );
};

export default RegisterScreen;