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

interface PasswordChangeFormProps {
    onClose: () => void
};

function PasswordChangeForm({ onClose }: PasswordChangeFormProps) {

    const { handleUpdatePassword, response, loading, error } = useUpdatePassword();
    const { handleChangeInput, onSubmit, formState, errors } = useForm({
        initialFormState,
        validationRules: {
            [PASSWORD_CHANGE_FORM_NAMES.OLD_PASSWORD]: ['required'],
            [PASSWORD_CHANGE_FORM_NAMES.NEW_PASSWORD]: ['required', 'min:6']
        },
        submitFn: () => handleUpdatePassword({ formState })
    });

    return (
        <SecurityFormLayout
            onSubmit={onSubmit}
            onClose={onClose}
            loading={loading}
            error={error}
            success={response?.ok ? response : undefined}
            submitText="Cambiar Contraseña"
            useSuccessView={true}
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
                {errors[PASSWORD_CHANGE_FORM_NAMES.OLD_PASSWORD] && <span className="field-error">{errors[PASSWORD_CHANGE_FORM_NAMES.OLD_PASSWORD]}</span>}
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
                {errors[PASSWORD_CHANGE_FORM_NAMES.NEW_PASSWORD] && <span className="field-error">{errors[PASSWORD_CHANGE_FORM_NAMES.NEW_PASSWORD]}</span>}
            </div>
        </SecurityFormLayout>
    );
};

export default PasswordChangeForm;