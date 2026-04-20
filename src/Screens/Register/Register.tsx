import { Link, useNavigate } from 'react-router';
import './Register.css';
import useForm from '../../hooks/useForm/useForm';
import useRegister from '../../hooks/useRegister/useRegister';
import { useEffect } from 'react';
import Logo from '../../Components/Logo/Logo';
import InfoComponent from '../../Components/InfoComponent/InfoComponent';

const REGISTER_FORM_FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password',
    NAME: 'name'
};

const Register = () => {

    const { registerSubmit, response, error, loading } = useRegister();

    const initialFormState = {
        [REGISTER_FORM_FIELDS.NAME]: '',
        [REGISTER_FORM_FIELDS.EMAIL]: '',
        [REGISTER_FORM_FIELDS.PASSWORD]: ''
    };

    const { handleChangeInput, onSubmit, formState } = useForm({
        initialFormState,
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
                <h1>Registrarse</h1>
                <form onSubmit={onSubmit} className='register-form'>
                    <div>
                        <label htmlFor="name">Name</label>
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
                    <button type='submit' disabled={loading}>{loading && 'Registrando...' || 'Registrarse'}</button>
                    <span>¿Ya tienes una cuenta? <Link to={'/login'}>Iniciar Sesion</Link></span>
                    {response && !loading && <InfoComponent response={response} />}
                </form>
            </div>
        </div>
    );
};

export default Register;