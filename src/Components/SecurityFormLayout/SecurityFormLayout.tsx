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
}

const SecurityFormLayout: React.FC<SecurityFormLayoutProps> = ({
    onSubmit, onClose, loading, error, success, submitText, children, isDanger = false
}) => {
    return (
        <div className={`security-form-container ${isDanger ? 'danger-container' : ''} fade-in`}>
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
        </div>
    );
};

export default SecurityFormLayout;
