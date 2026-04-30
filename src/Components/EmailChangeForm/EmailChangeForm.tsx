import React from 'react';
import useForm from '../../hooks/useForm/useForm';
import useRequestEmailChange from '../../hooks/useRequestEmailChange/useRequestEmailChange';
import SecurityFormLayout from '../SecurityFormLayout/SecurityFormLayout';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

const EMAIL_CHANGE_FIELDS = {
    PASSWORD: 'password',
    NEW_EMAIL: 'new_email'
};

interface EmailChangeFormProps {
    onCancel: () => void;
}

const EmailChangeForm: React.FC<EmailChangeFormProps> = ({ onCancel }) => {
    const { t } = useTranslation();
    const { handleRequestEmailChange, loading, response, error } = useRequestEmailChange();

    const { onSubmit, handleChangeInput, formState, errors } = useForm({
        initialFormState: {
            [EMAIL_CHANGE_FIELDS.PASSWORD]: '',
            [EMAIL_CHANGE_FIELDS.NEW_EMAIL]: ''
        },
        validationRules: {
            [EMAIL_CHANGE_FIELDS.PASSWORD]: ['required'],
            [EMAIL_CHANGE_FIELDS.NEW_EMAIL]: ['required', 'email']
        },
        submitFn: handleRequestEmailChange
    });

    return (
        <SecurityFormLayout
            onSubmit={onSubmit}
            onClose={onCancel}
            loading={loading}
            error={error}
            success={response?.ok ? response : undefined}
            submitText={t.settings.email_change_submit}
            useSuccessView={true}
        >
            <div className='form-group'>
                <label>{t.settings.email_change_new_label}</label>
                <input
                    className='form-input'
                    name={EMAIL_CHANGE_FIELDS.NEW_EMAIL}
                    value={formState[EMAIL_CHANGE_FIELDS.NEW_EMAIL]}
                    type='email'
                    onChange={handleChangeInput}
                    placeholder={t.settings.email_change_new_placeholder}
                />
                {errors[EMAIL_CHANGE_FIELDS.NEW_EMAIL] && <span className="field-error">{errors[EMAIL_CHANGE_FIELDS.NEW_EMAIL]}</span>}
            </div>
            <div className='form-group'>
                <label>{t.settings.email_change_password_label}</label>
                <input
                    className='form-input'
                    name={EMAIL_CHANGE_FIELDS.PASSWORD}
                    value={formState[EMAIL_CHANGE_FIELDS.PASSWORD]}
                    type='password'
                    onChange={handleChangeInput}
                    placeholder={t.settings.email_change_password_placeholder}
                />
                {errors[EMAIL_CHANGE_FIELDS.PASSWORD] && <span className="field-error">{errors[EMAIL_CHANGE_FIELDS.PASSWORD]}</span>}
            </div>
        </SecurityFormLayout>
    );
};

export default EmailChangeForm;
