import { useEffect } from 'react';
import useForm from '../../hooks/useForm/useForm';
import useDeleteAccount from '../../hooks/useDeleteAccount/useDeleteAccount';
import SecurityFormLayout from '../SecurityFormLayout/SecurityFormLayout';
import { useAuthContext } from '../../context/AuthContext/AuthContext';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

const DELETE_ACCOUNT_FORM_NAMES = {
    PASSWORD: 'password'
};

const initialFormState = {
    [DELETE_ACCOUNT_FORM_NAMES.PASSWORD]: ''
};

interface DeleteAccountFormProps {
    onClose: () => void
};

function DeleteAccountForm({ onClose }: DeleteAccountFormProps) {
    const { t } = useTranslation();
    const { manageLogout } = useAuthContext();
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
            onClose();
            manageLogout();
        }
    }, [response, manageLogout, onClose]);

    return (
        <SecurityFormLayout
            onSubmit={onSubmit}
            onClose={onClose}
            loading={loading}
            error={error}
            submitText={t.settings.delete_account_submit}
            isDanger={true}
        >
            <div className="form-group danger-group">
                <label>{t.settings.delete_account_password_label}</label>
                <input
                    className="form-input"
                    type="password"
                    placeholder={t.settings.delete_account_password_placeholder}
                    name={DELETE_ACCOUNT_FORM_NAMES.PASSWORD}
                    value={formState[DELETE_ACCOUNT_FORM_NAMES.PASSWORD]}
                    autoComplete='current-password'
                    onChange={handleChangeInput}
                />
                {errors[DELETE_ACCOUNT_FORM_NAMES.PASSWORD] && <span className="field-error">{errors[DELETE_ACCOUNT_FORM_NAMES.PASSWORD]}</span>}
            </div>
        </SecurityFormLayout>
    );
};

export default DeleteAccountForm;
