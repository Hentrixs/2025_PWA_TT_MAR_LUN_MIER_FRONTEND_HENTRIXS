import { Link, useNavigate } from 'react-router';
import './Register.css';
import useForm from '../../hooks/useForm/useForm';
import useRegister from '../../hooks/useRegister/useRegister';
import { useEffect } from 'react';
import Logo from '../../Components/Logo/Logo';
import InfoComponent from '../../Components/InfoComponent/InfoComponent';
import BackButton from '../../Components/BackButton/BackButton';

const REGISTER_FORM_FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password',
    NAME: 'name'
};

const Register = () => {

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

    useEffect(() => {
        () => {
            if (response && response.ok) {
                navigate('/login');
            };
        };
    }, [response]);

    return (
        <div className='register-container'>
            <div className='split-left'>
                <Logo className={'logo-responsive'} />
            </div>
            <div className='split-right'>
                <BackButton to='/login' />
                <h1>Registrarse</h1>
                <form onSubmit={onSubmit} className='register-form'>
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id='name' autoComplete='name' name={REGISTER_FORM_FIELDS.NAME} value={formState[REGISTER_FORM_FIELDS.NAME]} onChange={handleChangeInput} />
                        {errors[REGISTER_FORM_FIELDS.NAME] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px' }}>{errors[REGISTER_FORM_FIELDS.NAME]}</span>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' autoComplete='email' name={REGISTER_FORM_FIELDS.EMAIL} value={formState[REGISTER_FORM_FIELDS.EMAIL]} onChange={handleChangeInput} />
                        {errors[REGISTER_FORM_FIELDS.EMAIL] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px' }}>{errors[REGISTER_FORM_FIELDS.EMAIL]}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id='password' autoComplete='password' name={REGISTER_FORM_FIELDS.PASSWORD} value={formState[REGISTER_FORM_FIELDS.PASSWORD]} onChange={handleChangeInput} />
                        {errors[REGISTER_FORM_FIELDS.PASSWORD] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px' }}>{errors[REGISTER_FORM_FIELDS.PASSWORD]}</span>}
                    </div>
                    {Object.keys(errors).length > 0 && <span style={{ color: 'var(--error-primary)', fontSize: '13px', textAlign: 'center' }}>Por favor, revisa los errores arriba.</span>}
                    <button type='submit' disabled={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                    <span>¿Ya tienes una cuenta? <Link to={'/login'}>Iniciar Sesión</Link></span>
                    {response && !loading && <InfoComponent response={response} />}
                </form>
            </div>
        </div>
    );
};

export default Register;