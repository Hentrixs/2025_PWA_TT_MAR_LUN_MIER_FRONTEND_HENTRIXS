import { useEffect } from 'react';
import useForm from '../../hooks/useForm/useForm';
import useDeleteAccount from '../../hooks/useDeleteAccount/useDeleteAccount';
import SecurityFormLayout from '../SecurityFormLayout/SecurityFormLayout';

const DELETE_ACCOUNT_FORM_NAMES = {
    PASSWORD: 'password'
};

const initialFormState = {
    [DELETE_ACCOUNT_FORM_NAMES.PASSWORD]: ''
};

interface onCloseI {
    onClose: () => void
};

function DeleteAccountForm({ onClose }: onCloseI) {
    const { handleAccountDeletion, response, loading, error } = useDeleteAccount();
    const { handleChangeInput, onSubmit, formState, errors } = useForm({
        initialFormState,
        validationRules: {
            [DELETE_ACCOUNT_FORM_NAMES.PASSWORD]: ['required']
        },
        submitFn: () => handleAccountDeletion(formState[DELETE_ACCOUNT_FORM_NAMES.PASSWORD])
    });

    useEffect(() => {
        if (response && response.ok) {
            // Se cerró la cuenta, acá convendría también desloguear si es que no lo hace el hook globalmente
            onClose();
        }
    }, [response]);

    return (
        <SecurityFormLayout
            onSubmit={onSubmit}
            onClose={onClose}
            loading={loading}
            error={error}
            submitText="Borrar Definitivamente"
            isDanger={true}
        >
            <div className="form-group danger-group">
                <label>Para confirmar, ingresa tu contraseña</label>
                <input
                    className="form-input"
                    type="password"
                    placeholder='Tu Contraseña'
                    name={DELETE_ACCOUNT_FORM_NAMES.PASSWORD}
                    value={formState[DELETE_ACCOUNT_FORM_NAMES.PASSWORD]}
                    autoComplete='current-password'
                    onChange={handleChangeInput}
                />
                {errors[DELETE_ACCOUNT_FORM_NAMES.PASSWORD] && <span style={{ color: 'var(--error-primary)', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors[DELETE_ACCOUNT_FORM_NAMES.PASSWORD]}</span>}
            </div>
        </SecurityFormLayout>
    );
};

export default DeleteAccountForm;
