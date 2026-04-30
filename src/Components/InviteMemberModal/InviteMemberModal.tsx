import useInviteMember from "../../hooks/useInviteMember/useInviteMember";
import Modal from "../Modal/Modal";
import './InviteMemberModal.css';
import useForm from "../../hooks/useForm/useForm";
import { useWorkspaceContext } from "../../context/WorkspaceContext/WorkspaceContext";
import { useTranslation } from "../../context/LanguageContext/LanguageContext";

interface InviteMemberModalProps {
    onClose: () => void
};

const INVITE_MEMBER_MODAL_FIELDS = {
    EMAIL: 'email',
    ROLE: 'role'
};

const initialFormState = {
    [INVITE_MEMBER_MODAL_FIELDS.EMAIL]: '',
    [INVITE_MEMBER_MODAL_FIELDS.ROLE]: 'member'
};


const InviteMemberModal = ({ onClose }: InviteMemberModalProps) => {
    const { t } = useTranslation();
    const { workspace_id } = useWorkspaceContext();


    const {
        handleInviteMember,
        loading
    } = useInviteMember(workspace_id);

    const { formState, handleChangeInput, onSubmit, errors } = useForm({
        initialFormState,
        validationRules: {
            [INVITE_MEMBER_MODAL_FIELDS.EMAIL]: ['required', 'email']
        },
        submitFn: (data) => {
            handleInviteMember(data.email, data.role)
        }
    });

    return (
        <Modal title={t.sidebar.invite_members_modal.title} onClose={onClose}>
            <form className='invite-member-form' onSubmit={onSubmit}>
                <p>{t.sidebar.invite_members_modal.subtitle}</p>
                <input
                    name={INVITE_MEMBER_MODAL_FIELDS.EMAIL}
                    type="email"
                    placeholder={t.sidebar.invite_members_modal.email_placeholder}
                    value={formState[INVITE_MEMBER_MODAL_FIELDS.EMAIL]}
                    onChange={handleChangeInput}
                />
                {errors[INVITE_MEMBER_MODAL_FIELDS.EMAIL] && <span style={{ color: 'var(--error-primary)', fontSize: '13px' }}>{errors[INVITE_MEMBER_MODAL_FIELDS.EMAIL]}</span>}
                <select
                    name={INVITE_MEMBER_MODAL_FIELDS.ROLE}
                    value={formState[INVITE_MEMBER_MODAL_FIELDS.ROLE]}
                    onChange={handleChangeInput}
                >
                    <option value={"member"}>{t.sidebar.invite_members_modal.role_member}</option>
                    <option value={"admin"}>{t.sidebar.invite_members_modal.role_admin}</option>
                </select>
                <button type="submit" disabled={loading}>{loading ? t.sidebar.invite_members_modal.inviting : t.sidebar.invite_members_modal.invite_btn}</button>
            </form>
        </Modal>
    );
};

export default InviteMemberModal;

