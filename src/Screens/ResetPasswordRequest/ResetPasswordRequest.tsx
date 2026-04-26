import '../Login/Login.css';
import useRequest from '../../hooks/useRequest/useRequest';
import useForm from '../../hooks/useForm/useForm';
import { Link } from 'react-router';
import { resetPassword } from '../../services/authService';
import Logo from '../../Components/Logo/Logo';
import InfoComponent from '../../Components/InfoComponent/InfoComponent';

export default function ResetPasswordRequest() {

    const {
        sendRequest,
        response,
        error,
        loading
    } = useRequest();

    const REQUEST_FORM_FIELDS = {
        EMAIL: 'email',
    };

    const initialFormState = {
        [REQUEST_FORM_FIELDS.EMAIL]: ''
    };

    const submitRequest = async (formStateVieneDelHook: Record<string, string>) => {
        await sendRequest({
            requestCb: () => {
                return resetPassword({
                    email: formStateVieneDelHook[REQUEST_FORM_FIELDS.EMAIL]
                })
            }
        })
    };

    const {
        handleChangeInput,
        onSubmit,
        formState,
        errors
    } = useForm({
        initialFormState: initialFormState,
        validationRules: {
            [REQUEST_FORM_FIELDS.EMAIL]: ['required', 'email']
        },
        submitFn: submitRequest
    });

    return (
        <div className='login-container'>
            <div className='split-left'>
                <Logo className='logo-responsive' />
            </div>
            <div className='split-right'>
                <h1>Restablecer Contraseña</h1>
                <p style={{ marginTop: '-15px', color: 'var(--text-on-light)', fontSize: '15px' }}>Ingresa tu correo para recibir las instrucciones de recuperación.</p>
                <form onSubmit={onSubmit} className='login-form'>
                    <div>
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name={REQUEST_FORM_FIELDS.EMAIL}
                            value={formState[REQUEST_FORM_FIELDS.EMAIL]}
                            onChange={handleChangeInput}
                            placeholder="tu@correo.com"
                        />
                        {errors[REQUEST_FORM_FIELDS.EMAIL] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px' }}>{errors[REQUEST_FORM_FIELDS.EMAIL]}</span>}
                    </div>
                    {Object.keys(errors).length > 0 && <span style={{ color: 'var(--error-primary)', fontSize: '13px', textAlign: 'center' }}>Por favor, revisa los errores arriba.</span>}
                    <button type='submit' disabled={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {loading ? 'Enviando Solicitud...' : 'Enviar Solicitud'}
                    </button>
                    <span>¿Recuerdas tu contraseña? <Link to={'/login'}>Iniciar Sesión</Link></span>
                </form>
                {response && !loading && !error && <InfoComponent response={response} />}
            </div>
        </div>
    );
};
