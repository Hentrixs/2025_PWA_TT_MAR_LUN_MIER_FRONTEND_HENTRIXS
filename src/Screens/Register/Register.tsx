import { Link, useNavigate } from 'react-router';
import './Register.css';
import useForm from '../../hooks/useForm/useForm';
import useRegister from '../../hooks/useRegister/useRegister';
import { useEffect, useState } from 'react';
import Logo from '../../Components/Logo/Logo';
import InfoComponent from '../../Components/InfoComponent/InfoComponent';
import BackButton from '../../Components/BackButton/BackButton';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

const REGISTER_FORM_FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password',
    NAME: 'name'
};

const Register = () => {
    const { t } = useTranslation();
    const { registerSubmit, response, loading } = useRegister();

    const initialFormState = {
        [REGISTER_FORM_FIELDS.NAME]: '',
        [REGISTER_FORM_FIELDS.EMAIL]: '',
        [REGISTER_FORM_FIELDS.PASSWORD]: ''
    };

    const { handleChangeInput, onSubmit, formState, errors } = useForm({
        initialFormState,
        validationRules: {
            [REGISTER_FORM_FIELDS.NAME]: ['required', 'min:3'],
            [REGISTER_FORM_FIELDS.EMAIL]: ['required', 'email'],
            [REGISTER_FORM_FIELDS.PASSWORD]: ['required', 'min:6']
        },
        submitFn: registerSubmit
    });

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (response && response.ok) {
            setIsRegistered(true);
        }
    }, [response]);

    return (
        <div className='register-container'>
            <div className='split-right'>
                <BackButton to='/login' />
                {isRegistered ? (
                    <div className="registration-success-view">
                        <div className="success-icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="var(--brand-primary)" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                        </div>
                        <h1>{t.register.success_title}</h1>
                        <p className="success-message">
                            {response.message || t.register.success_message}
                        </p>
                        <div className="success-instructions">
                            <p>{t.register.success_instructions}</p>
                        </div>
                        <button onClick={() => navigate('/login')} className="primary-btn login-btn">
                            {t.register.success_btn}
                        </button>
                    </div>
                ) : (
                    <>
                        <h1>{t.register.title}</h1>
                        <form onSubmit={onSubmit} className='register-form'>
                            <div>
                                <label htmlFor="name">{t.register.name_label}</label>
                                <input type="text" id='name' autoComplete='name' name={REGISTER_FORM_FIELDS.NAME} value={formState[REGISTER_FORM_FIELDS.NAME]} onChange={handleChangeInput} />
                                {errors[REGISTER_FORM_FIELDS.NAME] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px' }}>{errors[REGISTER_FORM_FIELDS.NAME]}</span>}
                            </div>
                            <div>
                                <label htmlFor="email">{t.register.email_label}</label>
                                <input type="email" id='email' autoComplete='email' name={REGISTER_FORM_FIELDS.EMAIL} value={formState[REGISTER_FORM_FIELDS.EMAIL]} onChange={handleChangeInput} />
                                {errors[REGISTER_FORM_FIELDS.EMAIL] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px' }}>{errors[REGISTER_FORM_FIELDS.EMAIL]}</span>}
                            </div>
                            <div>
                                <label htmlFor="password">{t.register.password_label}</label>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id='password'
                                        autoComplete='new-password'
                                        name={REGISTER_FORM_FIELDS.PASSWORD}
                                        value={formState[REGISTER_FORM_FIELDS.PASSWORD]}
                                        onChange={handleChangeInput}
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password-btn"
                                        onClick={() => setShowPassword(p => !p)}
                                        aria-label={showPassword ? t.login.hide_password : t.login.show_password}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors[REGISTER_FORM_FIELDS.PASSWORD] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px' }}>{errors[REGISTER_FORM_FIELDS.PASSWORD]}</span>}
                            </div>
                            {Object.keys(errors).length > 0 && <span style={{ color: 'var(--error-primary)', fontSize: '13px', textAlign: 'center' }}>{t.common.form_errors}</span>}
                            <button type='submit' disabled={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                {loading ? t.register.submitting : t.register.submit_btn}
                            </button>
                            <span>{t.register.have_account} <Link to={'/login'}>{t.register.login_link}</Link></span>
                            {response && !loading && <InfoComponent response={response} />}
                        </form>
                    </>
                )}
            </div>

            <div className='split-left'>
                <video src="/loop_grass.mp4" autoPlay loop muted playsInline className='auth-video-bg'></video>
                <Logo className={'logo-responsive'} />
            </div>
        </div>
    );
};

export default Register;