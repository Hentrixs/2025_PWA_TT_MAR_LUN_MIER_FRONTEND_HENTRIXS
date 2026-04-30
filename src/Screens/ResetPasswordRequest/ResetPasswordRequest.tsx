import '../Login/Login.css';
import useRequest from '../../hooks/useRequest/useRequest';
import useForm from '../../hooks/useForm/useForm';
import Logo from '../../Components/Logo/Logo';
import InfoComponent from '../../Components/InfoComponent/InfoComponent';
import { Link } from 'react-router';
import BackButton from '../../Components/BackButton/BackButton';
import { resetPassword } from '../../services/authService';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

export default function ResetPasswordRequest() {
    const { t } = useTranslation();

    const {
        sendRequest,
        response,
        error,
        loading
    } = useRequest();

    const REQUEST_FORM_FIELDS = {
        EMAIL: 'email',
        NEW_PASSWORD: 'new_password',
    };

    const initialFormState = {
        [REQUEST_FORM_FIELDS.EMAIL]: '',
        [REQUEST_FORM_FIELDS.NEW_PASSWORD]: '',
    };

    const submitRequest = async (formStateVieneDelHook: Record<string, string>) => {
        await sendRequest({
            requestCb: () => {
                return resetPassword({
                    email: formStateVieneDelHook[REQUEST_FORM_FIELDS.EMAIL],
                    new_password: formStateVieneDelHook[REQUEST_FORM_FIELDS.NEW_PASSWORD],
                })
            }
        });
    };

    const {
        handleChangeInput,
        onSubmit,
        formState,
        errors
    } = useForm({
        initialFormState: initialFormState,
        validationRules: {
            [REQUEST_FORM_FIELDS.EMAIL]: ['required', 'email'],
            [REQUEST_FORM_FIELDS.NEW_PASSWORD]: ['required', 'min:6'],
        },
        submitFn: submitRequest
    });

    return (
        <div className='login-container'>
            <div className='split-right'>
                <BackButton to='/login' />
                <h1>{t.reset_password.request_title}</h1>
                <p style={{ marginTop: '-15px', color: 'var(--text-on-light)', fontSize: '15px' }}>{t.reset_password.request_subtitle}</p>
                <form onSubmit={onSubmit} className='login-form'>
                    <div>
                        <label htmlFor="email">{t.reset_password.email_label}</label>
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
                    <div>
                        <label htmlFor="new_password">{t.reset_password.new_password_label}</label>
                        <input
                            type="password"
                            id="new_password"
                            name={REQUEST_FORM_FIELDS.NEW_PASSWORD}
                            value={formState[REQUEST_FORM_FIELDS.NEW_PASSWORD]}
                            onChange={handleChangeInput}
                        />
                        {errors[REQUEST_FORM_FIELDS.NEW_PASSWORD] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px' }}>{errors[REQUEST_FORM_FIELDS.NEW_PASSWORD]}</span>}
                    </div>
                    {Object.keys(errors).length > 0 && <span style={{ color: 'var(--error-primary)', fontSize: '13px', textAlign: 'center' }}>{t.common.form_errors}</span>}
                    <button type='submit' disabled={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {loading ? t.reset_password.submitting : t.reset_password.submit_btn}
                    </button>
                    <span>{t.reset_password.back_to_login} <Link to={'/login'}>{t.reset_password.login_link}</Link></span>
                </form>
                {response && !loading && !error && <InfoComponent response={response} />}
            </div>
            <div className='split-left'>
                <video src="/loop_grass.mp4" autoPlay loop muted playsInline className='auth-video-bg'></video>
                <Logo className='logo-responsive' />
            </div>
        </div>
    );
};
