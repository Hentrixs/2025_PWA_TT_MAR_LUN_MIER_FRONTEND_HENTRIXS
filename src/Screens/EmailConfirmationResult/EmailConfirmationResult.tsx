import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './EmailConfirmationResult.css';

const EmailConfirmationResult: React.FC = () => {
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
                    {success ? '¡Email Actualizado!' : 'Hubo un problema'}
                </h1>

                <p className="result-message">
                    {success
                        ? 'Tu dirección de correo electrónico ha sido confirmada y actualizada con éxito. Ya puedes seguir usando la plataforma con tu nuevo email.'
                        : (message || 'No pudimos confirmar el cambio de email. Es posible que el enlace haya expirado o sea inválido.')
                    }
                </p>

                <button
                    className="btn-back-to-settings"
                    onClick={() => navigate('/settings')}
                >
                    Volver a Configuración
                </button>
            </div>
        </div>
    );
};

export default EmailConfirmationResult;
