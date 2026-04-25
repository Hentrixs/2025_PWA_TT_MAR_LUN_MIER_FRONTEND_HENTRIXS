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

    const initialFormState = { // hacer esto del REQUEST_FORM_FIELDS y ponerlo aca entre corchetes sirve para asegurarse de que coincidan los strings
        [REQUEST_FORM_FIELDS.EMAIL]: ''
    };

    // Ojo aquí: Le quitamos las llaves de desestructuración que tenías ({initialFormState})
    const submitRequest = async (formStateVieneDelHook: Record<string, string>) => {
        await sendRequest({
            requestCb: () => {
                return resetPassword({
                    // Sacamos el valor específicamente del formState que nos llega como parámetro
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
                                <label htmlFor="email">email</label>        {/* EL formState[nombre_de_valor], el estado representa el form y el form representa lo que vale el estado*/}
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
