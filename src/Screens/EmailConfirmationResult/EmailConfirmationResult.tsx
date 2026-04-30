import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';
import './EmailConfirmationResult.css';

const EmailConfirmationResult: React.FC = () => {
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
                    {success ? t.email_confirmation_result.success_title : t.email_confirmation_result.error_title}
                </h1>

                <p className="result-message">
                    {success
                        ? t.email_confirmation_result.success_desc
                        : (message || t.email_confirmation_result.error_desc)
                    }
                </p>

                <button
                    className="btn-back-to-settings"
                    onClick={() => navigate('/settings')}
                >
                    {t.email_confirmation_result.back_btn}
                </button>
            </div>
        </div>
    );
};

export default EmailConfirmationResult;
