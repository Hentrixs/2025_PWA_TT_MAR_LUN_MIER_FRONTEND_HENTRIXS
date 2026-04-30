import './VerifyEmail.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useVerifyEmail from '../../hooks/useEmailRegister/useVerifyEmail';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';
import '../EmailConfirmationResult/EmailConfirmationResult.css';

function VerifyEmail() {
    const { t } = useTranslation();
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
                        <p className="loading-text">{t.verify_email.verifying}</p>
                    </div>
                ) : (
                    <>
                        <div className={`status-icon ${success ? 'success' : 'error'}`}>
                            {success ? '✓' : '✕'}
                        </div>

                        <h1 className="result-title">
                            {success ? t.verify_email.success_title : t.verify_email.error_title}
                        </h1>

                        <p className="result-message">
                            {success
                                ? (response?.message || t.verify_email.success_desc)
                                : (response?.message || t.verify_email.error_desc)
                            }
                        </p>

                        <button
                            className="btn-back-to-settings"
                            onClick={() => navigate('/login')}
                        >
                            {t.verify_email.back_to_login}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;