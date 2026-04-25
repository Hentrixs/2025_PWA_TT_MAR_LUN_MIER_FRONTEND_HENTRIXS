import { useEffect } from 'react';
import useForm from '../../hooks/useForm/useForm';
import useUpdatePassword from '../../hooks/useUpdatePassword/useUpdatePassword';
import SecurityFormLayout from '../SecurityFormLayout/SecurityFormLayout';

const PASSWORD_CHANGE_FORM_NAMES = {
    OLD_PASSWORD: 'old_password',
    NEW_PASSWORD: 'new_password'
};

const initialFormState = {
    [PASSWORD_CHANGE_FORM_NAMES.NEW_PASSWORD]: '',
    [PASSWORD_CHANGE_FORM_NAMES.OLD_PASSWORD]: ''
};

interface onCloseI {
    onClose: () => void
};

function PasswordChangeForm({ onClose }: onCloseI) {

    const { handleUpdatePassword, response, loading, error } = useUpdatePassword();
    const { handleChangeInput, onSubmit, formState, errors } = useForm({
        initialFormState,
        validationRules: {
            [PASSWORD_CHANGE_FORM_NAMES.OLD_PASSWORD]: ['required'],
            [PASSWORD_CHANGE_FORM_NAMES.NEW_PASSWORD]: ['required', 'min:6']
        },
        submitFn: () => handleUpdatePassword({ formState })
    });

    useEffect(() => {
        if (response && response.ok) {
            onClose();
        }
    }, [response])

    return (
        <SecurityFormLayout
            onSubmit={onSubmit}
            onClose={onClose}
            loading={loading}
            error={error}
            submitText="Cambiar Contraseña"
        >
            <div className="form-group">
                <label>Contraseña Actual</label>
                <input
                    className="form-input"
                    type="password"
                    placeholder='Tu Contraseña'
                    name={PASSWORD_CHANGE_FORM_NAMES.OLD_PASSWORD}
                    value={formState[PASSWORD_CHANGE_FORM_NAMES.OLD_PASSWORD]}
                    autoComplete='old_password'
                    onChange={handleChangeInput}
                />
                {errors[PASSWORD_CHANGE_FORM_NAMES.OLD_PASSWORD] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors[PASSWORD_CHANGE_FORM_NAMES.OLD_PASSWORD]}</span>}
            </div>
            <div className="form-group">
                <label>Nueva Contraseña</label>
                <input
                    className="form-input"
                    type="password"
                    placeholder='Tu nueva Contraseña'
                    name={PASSWORD_CHANGE_FORM_NAMES.NEW_PASSWORD}
                    value={formState[PASSWORD_CHANGE_FORM_NAMES.NEW_PASSWORD]}
                    autoComplete='new_password'
                    onChange={handleChangeInput}
                />
                {errors[PASSWORD_CHANGE_FORM_NAMES.NEW_PASSWORD] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors[PASSWORD_CHANGE_FORM_NAMES.NEW_PASSWORD]}</span>}
            </div>
            {Object.keys(errors).length > 0 && <span style={{ color: 'var(--error-primary)', fontSize: '13px', display: 'block', marginBottom: '10px' }}>Por favor, revisa los errores.</span>}
        </SecurityFormLayout>
    );
};

export default PasswordChangeForm;