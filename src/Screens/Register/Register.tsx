import { Link, useNavigate } from 'react-router';
import './Register.css';
import useForm from '../../hooks/useForm/useForm';
import useRegister from '../../hooks/useRegister/useRegister';
import { useEffect } from 'react'; 
import Logo from '../../Components/Logo/Logo';

const REGISTER_FORM_FIELDS = { // Diccionario para evitar errores de tipeo en los nombres
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

    // 3. Pequeño espía en consola para que veas qué hace React tras bastidores
    console.log(`ESPIA DE ESTADOS (REGISTER): Response: ${response}, Error: ${error}, Loading: ${loading}`);

    return (
        <div className='register-container'>
            {/* 4. Corrijo los textos porque habías dejado "Iniciar Sesion" copiado por accidente :) */}
            <div className='split-left'>
                <Logo width={200} height={200} />
            </div>
            <div className='split-right'>
                <h1>Crear una Cuenta Nueva</h1>
                <form onSubmit={onSubmit} className='register-form'>
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
        </div>
    );
};

export default Register;