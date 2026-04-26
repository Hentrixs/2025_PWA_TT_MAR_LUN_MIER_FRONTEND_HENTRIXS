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

    const { hacerLogin, response, loading } = useLogin();

    const { manageLogin } = useContext(AuthContext);


    const { handleChangeInput, onSubmit, errors } = useForm({
        initialFormState: initialFormState,
        validationRules: {
            [LOGIN_FORM_FIELDS.EMAIL]: ['required', 'email'],
            [LOGIN_FORM_FIELDS.PASSWORD]: ['required']
        },
        submitFn: hacerLogin
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
                        <input type="email" id='email' autoComplete='email' name={LOGIN_FORM_FIELDS.EMAIL} onChange={handleChangeInput} />
                        {errors[LOGIN_FORM_FIELDS.EMAIL] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px' }}>{errors[LOGIN_FORM_FIELDS.EMAIL]}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' autoComplete='current-password' name={LOGIN_FORM_FIELDS.PASSWORD} onChange={handleChangeInput} />
                        {errors[LOGIN_FORM_FIELDS.PASSWORD] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px' }}>{errors[LOGIN_FORM_FIELDS.PASSWORD]}</span>}
                    </div>
                    {Object.keys(errors).length > 0 && <span style={{ color: 'var(--error-primary)', fontSize: '13px', textAlign: 'center' }}>Por favor, revisa los errores arriba.</span>}
                    <button type='submit' disabled={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {loading ? 'Iniciando Sesion...' : 'Iniciar Sesion'}
                    </button>
                    <span>No tienes una cuenta? <Link to={'/register'}>Registrarse</Link></span>
                    <span>Olvidaste tu contraseña? <Link to={'/reset-password-request'}>Restablecer Contrasena</Link></span>
                </form>
                {response && !loading && <InfoComponent response={response} />}
            </div>
        </div>
    );
};

export default Login;