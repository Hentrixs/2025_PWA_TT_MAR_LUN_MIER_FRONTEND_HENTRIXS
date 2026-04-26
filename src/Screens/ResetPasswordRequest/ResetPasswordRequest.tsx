import useRequest from '../../hooks/useRequest/useRequest';
import useForm from '../../hooks/useForm/useForm';
import { Link } from 'react-router';
import { resetPassword } from '../../services/authService';

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
    })

    return (
        <>
            <h1>
                ResetPasswordRequestScreen
            </h1>
            <p>Se enviara un mail con instrucciones para que puedes reestablecer tu contraseña</p>
            {
                response && !loading && !error ?
                    <p>{response.message}</p> :
                    <>
                        <form onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="email">email</label>
                                <input
                                    type="email"
                                    name={REQUEST_FORM_FIELDS.EMAIL}
                                    value={formState[REQUEST_FORM_FIELDS.EMAIL]}
                                    onChange={handleChangeInput}
                                />
                                {errors[REQUEST_FORM_FIELDS.EMAIL] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors[REQUEST_FORM_FIELDS.EMAIL]}</span>}
                            </div>
                            <button type='submit' disabled={loading}>{loading && 'Enviando Solicitud...' || 'Enviar Solicitud'}</button>
                        </form>
                        <span>Recuerdas tu contraseña? <Link to={'/login'}>Iniciar Sesion</Link></span>
                    </>
            }
        </>
    );
};
