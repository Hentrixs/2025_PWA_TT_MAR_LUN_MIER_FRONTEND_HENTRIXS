import React, { useState } from 'react';
import EmailChangeForm from '../EmailChangeForm/EmailChangeForm';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';
import DeleteAccountForm from '../DeleteAccountForm/DeleteAccountForm';
import './SecurityTab.css';

const SecurityTab: React.FC = () => {
    const [openedChangePasswordForm, setOpenedChangePasswordForm] = useState(false);
    const [openedDeleteAccountForm, setOpenedDeleteAccountForm] = useState(false);
    const [openedChangeEmailForm, setOpenedChangeEmailForm] = useState(false);

    const handleEmailForm = () => {
        setOpenedChangeEmailForm(!openedChangeEmailForm);
        setOpenedChangePasswordForm(false);
        setOpenedDeleteAccountForm(false);
    };

    const handlePasswordForm = () => {
        setOpenedChangePasswordForm(!openedChangePasswordForm);
        setOpenedChangeEmailForm(false);
        setOpenedDeleteAccountForm(false);
    };

    const handleDeleteAccountForm = () => {
        setOpenedDeleteAccountForm(!openedDeleteAccountForm);
        setOpenedChangeEmailForm(false);
        setOpenedChangePasswordForm(false);
    };

    return (
        <div className='tab-content fade-in'>
            <div className='settings-form security-form'>
                <h3>Opciones de Acceso</h3>
                <p className="security-description">Maneja tu correo y contraseña actuales para mantener la cuenta segura.</p>
                <div className='security-actions-group'>
                    {openedChangeEmailForm ? (
                        <EmailChangeForm onCancel={handleEmailForm} />
                    ) : (
                        <button className='btn-change-password' onClick={handleEmailForm}>
                            Cambiar Email
                        </button>
                    )}

                    {openedChangePasswordForm ? <PasswordChangeForm onClose={handlePasswordForm} /> : <button className='btn-change-password' onClick={handlePasswordForm}>
                        Cambiar Contrasenia
                    </button>}

                </div>
            </div>

            <div className='settings-actions danger-zone-container'>
                <div className="danger-zone">
                    <h3>Zona de Peligro</h3>
                    <p>Una vez que borres tu cuenta, no hay vuelta atrás.</p>
                    {openedDeleteAccountForm ? (
                        <DeleteAccountForm onClose={handleDeleteAccountForm} />
                    ) : (
                        <button className='btn-delete-account' onClick={handleDeleteAccountForm}>
                            Borrar Cuenta
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecurityTab;
