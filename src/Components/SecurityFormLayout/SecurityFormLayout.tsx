import React from 'react';
import './SecurityFormLayout.css';

interface SecurityFormLayoutProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
    loading: boolean;
    error?: { message: string } | null;
    success?: { message: string } | null;
    submitText: string;
    children: React.ReactNode;
    isDanger?: boolean;
    useSuccessView?: boolean;
}

const SecurityFormLayout: React.FC<SecurityFormLayoutProps> = ({
    onSubmit, onClose, loading, error, success, submitText, children, isDanger = false, useSuccessView = false
}) => {
    return (
        <div className={`security-form-container ${isDanger ? 'danger-container' : ''} fade-in`}>
            {useSuccessView && success ? (
                <div className="security-success-view">
                    <div className="success-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor" />
                        </svg>
                    </div>
                    <h3>¡Hecho!</h3>
                    <p className="success-message">{success.message}</p>
                    <button className="btn-primary" type="button" onClick={onClose}>
                        Entendido
                    </button>
                </div>
            ) : (
                <form className="security-form-content" onSubmit={onSubmit}>
                    {children}
                    
                    {success && <p className="success-message">{success.message}</p>}
                    {error && <p className="error-message">{error.message}</p>}

                    <div className="form-actions">
                        <button
                            className={`btn-apply ${isDanger ? 'btn-danger' : 'btn-primary'}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Cargando...' : submitText}
                        </button>
                        <button className="btn-cancel" type="button" onClick={onClose} disabled={loading}>
                            Cancelar
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default SecurityFormLayout;
