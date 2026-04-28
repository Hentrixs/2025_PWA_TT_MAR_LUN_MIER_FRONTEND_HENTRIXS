import './Login.css';
import { Link } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useForm from '../../hooks/useForm/useForm';
import useLogin from '../../hooks/useLogin/useLogin';
import Logo from '../../Components/Logo/Logo';
import InfoComponent from '../../Components/InfoComponent/InfoComponent';

const LOGIN_FORM_FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password'
};

const Login = () => {

    const initialFormState = {
        [LOGIN_FORM_FIELDS.EMAIL]: '',
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

    const [showPassword, setShowPassword] = useState(false);

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
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                autoComplete='current-password'
                                name={LOGIN_FORM_FIELDS.PASSWORD}
                                onChange={handleChangeInput}
                            />
                            <button
                                type="button"
                                className="toggle-password-btn"
                                onClick={() => setShowPassword(p => !p)}
                            >
                                {showPassword ? 'Ocultar' : 'Mostrar'}
                            </button>
                        </div>
                        {errors[LOGIN_FORM_FIELDS.PASSWORD] && 
                            <span style={{ 
                                color: 'var(--error-primary)', 
                                fontSize: '13px', 
                                marginTop: '4px' }}>
                                    {errors[LOGIN_FORM_FIELDS.PASSWORD]}
                            </span>
                        }
                    </div>



                    {Object.keys(errors).length > 0 && <span style={{ color: 'var(--error-primary)', fontSize: '13px', textAlign: 'center' }}>Por favor, revisa los errores arriba.</span>}
                    <button type='submit' disabled={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {loading ? 'Iniciando Sesion...' : 'Iniciar Sesion'}
                    </button>
                    <span>No tienes una cuenta? <Link to={'/register'}>Registrarse</Link></span>
                    <span>Olvidaste tu contraseña? <Link to={'/reset-password-request'}>Restablecer Contraseña</Link></span>
                </form>
                {response && !loading && <InfoComponent response={response} />}
            </div>
        </div>
    );
};

export default Login;