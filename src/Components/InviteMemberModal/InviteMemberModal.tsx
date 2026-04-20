import useInviteMember from "../../hooks/useInviteMember/useInviteMember";
import Modal from "../Modal/Modal";
import './InviteMemberModal.css';
import { useState } from "react";
import useForm from "../../hooks/useForm/useForm";
import { useWorkspaceContext } from "../../context/WorkspaceContext/WorkspaceContext";

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

    const { workspace_id } = useWorkspaceContext();


    const {
        handleInviteMember,
        response,
        loading
    } = useInviteMember(workspace_id);

    const { formState, handleChangeInput, onSubmit } = useForm({
        initialFormState,
        submitFn: (data) => {
            handleInviteMember(data.email, data.role)
        }
    });

    return (
        <Modal title="Invitar personas" onClose={onClose}>
            <form className='invite-member-form' onSubmit={onSubmit}>
                <p>Envía una invitación a tus colegas.</p>
                <input
                    name={INVITE_MEMBER_MODAL_FIELDS.EMAIL}
                    type="email"
                    placeholder="email@example.com"
                    value={formState[INVITE_MEMBER_MODAL_FIELDS.EMAIL]}
                    onChange={handleChangeInput}
                />
                <select
                    name={INVITE_MEMBER_MODAL_FIELDS.ROLE}
                    value={formState[INVITE_MEMBER_MODAL_FIELDS.ROLE]}
                    onChange={handleChangeInput}
                >
                    <option value={"member"}>Miembro</option>
                    <option value={"admin"}>Administrador</option>
                </select>
                <button type="submit" disabled={loading}>{loading && 'Enviando Invitacion...' || 'Enviar Invitacion'}</button>
            </form>
        </Modal>
    );
};

export default InviteMemberModal;

