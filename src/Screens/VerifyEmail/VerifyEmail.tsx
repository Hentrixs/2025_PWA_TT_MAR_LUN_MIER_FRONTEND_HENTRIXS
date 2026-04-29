import './VerifyEmail.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useVerifyEmail from '../../hooks/useEmailRegister/useVerifyEmail';
import '../EmailConfirmationResult/EmailConfirmationResult.css';

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const verify_email_token = searchParams.get('verify_email_token');
    const { response, loading } = useVerifyEmail(verify_email_token);

    const success = response?.ok;

    return (
        <div className='confirmation-result-container fade-in'>
            <div className='confirmation-result-card'>
                {loading ? (
                    <div className="loading-spinner-container">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                        <p className="loading-text">Verificando tu correo electrónico...</p>
                    </div>
                ) : (
                    <>
                        <div className={`status-icon ${success ? 'success' : 'error'}`}>
                            {success ? '✓' : '✕'}
                        </div>

                        <h1 className="result-title">
                            {success ? '¡Email verificado!' : 'Problema de verificación'}
                        </h1>

                        <p className="result-message">
                            {success
                                ? (response?.message || 'Tu correo electrónico ha sido verificado con éxito. Ya podés disfrutar de todas las funcionalidades de GreenSlack.')
                                : (response?.message || 'No pudimos verificar tu correo. Es posible que el enlace haya expirado o ya haya sido utilizado.')
                            }
                        </p>

                        <button
                            className="btn-back-to-settings"
                            onClick={() => navigate('/login')}
                        >
                            Ir al inicio de sesión
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;