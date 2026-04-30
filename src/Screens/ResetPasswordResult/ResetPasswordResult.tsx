import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';
import '../EmailConfirmationResult/EmailConfirmationResult.css';

const ResetPasswordResult: React.FC = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const success = searchParams.get('success') === 'true';
    const message = searchParams.get('message');

    return (
        <div className="confirmation-result-container fade-in">
            <div className="confirmation-result-card">
                <div className={`status-icon ${success ? 'success' : 'error'}`}>
                    {success ? '✓' : '✕'}
                </div>

                <h1 className="result-title">
                    {success ? t.reset_password.result_success_title : t.reset_password.result_error_title}
                </h1>

                <p className="result-message">
                    {success
                        ? t.reset_password.result_success_desc
                        : (message || t.reset_password.result_error_desc)
                    }
                </p>

                <button
                    className="btn-back-to-settings"
                    onClick={() => navigate('/login')}
                >
                    {t.reset_password.result_btn}
                </button>
            </div>
        </div>
    );
};

export default ResetPasswordResult;
