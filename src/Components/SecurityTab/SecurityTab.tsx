import React, { useState } from 'react';
import EmailChangeForm from '../EmailChangeForm/EmailChangeForm';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';
import DeleteAccountForm from '../DeleteAccountForm/DeleteAccountForm';
import './SecurityTab.css';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

const SecurityTab: React.FC = () => {
    const { t } = useTranslation();
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
                <h3>{t.settings.security_access_title}</h3>
                <p className="security-description">{t.settings.security_access_desc}</p>
                <div className='security-actions-group'>
                    {openedChangeEmailForm ? (
                        <EmailChangeForm onCancel={handleEmailForm} />
                    ) : (
                        <button className='btn-change-password' onClick={handleEmailForm}>
                            {t.settings.security_change_email}
                        </button>
                    )}

                    {openedChangePasswordForm ? <PasswordChangeForm onClose={handlePasswordForm} /> : <button className='btn-change-password' onClick={handlePasswordForm}>
                        {t.settings.security_change_password}
                    </button>}

                </div>
            </div>

            <div className='settings-actions danger-zone-container'>
                <div className="danger-zone">
                    <h3>{t.settings.security_danger_title}</h3>
                    <p>{t.settings.security_danger_desc}</p>
                    {openedDeleteAccountForm ? (
                        <DeleteAccountForm onClose={handleDeleteAccountForm} />
                    ) : (
                        <button className='btn-delete-account' onClick={handleDeleteAccountForm}>
                            {t.settings.security_delete_account}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecurityTab;
