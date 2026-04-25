import React from 'react';
import useForm from '../../hooks/useForm/useForm';
import useRequestEmailChange from '../../hooks/useRequestEmailChange/useRequestEmailChange';
import SecurityFormLayout from '../SecurityFormLayout/SecurityFormLayout';

const EMAIL_CHANGE_FIELDS = {
    PASSWORD: 'password',
    NEW_EMAIL: 'new_email'
};

interface EmailChangeFormProps {
    onCancel: () => void;
}

const EmailChangeForm: React.FC<EmailChangeFormProps> = ({ onCancel }) => {
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
            submitText="Solicitar Cambio"
        >
            <div className='form-group'>
                <label>Nueva Dirección de Email</label>
                <input
                    className='form-input'
                    name={EMAIL_CHANGE_FIELDS.NEW_EMAIL}
                    value={formState[EMAIL_CHANGE_FIELDS.NEW_EMAIL]}
                    type='email'
                    onChange={handleChangeInput}
                    placeholder='nuevo@email.com'
                />
                {errors[EMAIL_CHANGE_FIELDS.NEW_EMAIL] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors[EMAIL_CHANGE_FIELDS.NEW_EMAIL]}</span>}
            </div>
            <div className='form-group'>
                <label>Contraseña Actual</label>
                <input
                    className='form-input'
                    name={EMAIL_CHANGE_FIELDS.PASSWORD}
                    value={formState[EMAIL_CHANGE_FIELDS.PASSWORD]}
                    type='password'
                    onChange={handleChangeInput}
                    placeholder='Tu contraseña'
                />
                {errors[EMAIL_CHANGE_FIELDS.PASSWORD] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors[EMAIL_CHANGE_FIELDS.PASSWORD]}</span>}
            </div>
            {Object.keys(errors).length > 0 && <span style={{ color: 'var(--error-primary)', fontSize: '13px', display: 'block', marginBottom: '10px' }}>Por favor, revisa los errores.</span>}
        </SecurityFormLayout>
    );
};

export default EmailChangeForm;
