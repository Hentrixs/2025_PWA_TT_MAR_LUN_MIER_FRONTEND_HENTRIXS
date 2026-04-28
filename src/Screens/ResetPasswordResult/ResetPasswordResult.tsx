import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../EmailConfirmationResult/EmailConfirmationResult.css';
import BackButton from '../../Components/BackButton/BackButton';

const ResetPasswordResult: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const success = searchParams.get('success') === 'true';
    const message = searchParams.get('message');

    return (
        <div className="confirmation-result-container fade-in">
            <BackButton to='/login' />
            <div className="confirmation-result-card">
                <div className={`status-icon ${success ? 'success' : 'error'}`}>
                    {success ? '✓' : '✕'}
                </div>

                <h1 className="result-title">
                    {success ? '¡Contraseña actualizada!' : 'Hubo un problema'}
                </h1>

                <p className="result-message">
                    {success
                        ? 'Tu contraseña ha sido restablecida con éxito. Ya podés iniciar sesión con tu nueva contraseña.'
                        : (message || 'No pudimos restablecer tu contraseña. Es posible que el enlace haya expirado o sea inválido.')
                    }
                </p>

                <button
                    className="btn-back-to-settings"
                    onClick={() => navigate('/login')}
                >
                    Ir al inicio de sesión
                </button>
            </div>
        </div>
    );
};

export default ResetPasswordResult;
