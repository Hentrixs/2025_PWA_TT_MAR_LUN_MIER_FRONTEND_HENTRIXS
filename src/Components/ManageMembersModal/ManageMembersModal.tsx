import useMemberList from "../../hooks/useMemberList/useMemberList";
import Modal from "../Modal/Modal";
import type { IMember } from "../../types";
import './ManageMembersModal.css';
import useDeleteMember from "../../hooks/useDeleteMember/useDeleteMember";
import { useEffect, useState } from "react";
import useUpdateMemberRole from "../../hooks/useUpdateMemberRole/useUpdateMemberRole";
import { useWorkspaceContext } from "../../context/WorkspaceContext/WorkspaceContext";
import { useTranslation } from "../../context/LanguageContext/LanguageContext";
interface ManageMembersModalProps {
    onClose: () => void
};

const ManageMembersModal = ({ onClose }: ManageMembersModalProps) => {
    const { t } = useTranslation();
    const { workspace_id, activeMember } = useWorkspaceContext();

    const { member_list, refetchMemberList } = useMemberList(workspace_id);
    const { handleDeleteMember, response: responseDelete, loading: loadingDelete } = useDeleteMember(workspace_id);

    const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
    const { handleUpdateMemberRole, loading: loadingUpdate } = useUpdateMemberRole(workspace_id);

    const onRoleChange = async (member_id: string, newRole: string) => {
        await handleUpdateMemberRole(member_id, newRole);
        setEditingMemberId(null); // Cerramos el dropdown
        refetchMemberList();      // Refrescamos la lista para ver el cambio
    };


    // Refrescar la lista cuando se borra a alguien con éxito
    useEffect(() => {
        if (responseDelete && responseDelete.ok) {
            refetchMemberList();
        }
    }, [responseDelete]);

    return (
        <Modal title={t.sidebar.manage_members_modal.title} onClose={onClose}>
            <table className="manage-members-table">
                <thead>
                    <tr>
                        <th>{t.sidebar.manage_members_modal.column_name}</th>
                        <th>{t.sidebar.manage_members_modal.column_email}</th>
                        <th>{t.sidebar.manage_members_modal.column_role}</th>
                        <th>{t.sidebar.manage_members_modal.column_actions}</th>
                    </tr>
                </thead>
                <tbody className="manage-members-table-body">
                    {member_list.map((member: IMember) => {
                        const isSelf = activeMember?.member_id === member.member_id;

                        return (
                            <tr key={member.member_id}>
                                <td data-label={t.sidebar.manage_members_modal.column_name}>{member.user_name}</td>
                                <td data-label={t.sidebar.manage_members_modal.column_email}>{member.user_email}</td>
                                <td data-label={t.sidebar.manage_members_modal.column_role}>
                                    {isSelf ? (
                                        <span>{member.member_role === 'admin' ? t.sidebar.manage_members_modal.role_admin : t.sidebar.manage_members_modal.role_member} <strong>{t.sidebar.manage_members_modal.self_tag}</strong></span>
                                    ) : (
                                        editingMemberId === member.member_id ? (
                                            <select
                                                disabled={loadingUpdate}
                                                defaultValue={member.member_role}
                                                onChange={(e) => onRoleChange(member.member_id, e.target.value)}
                                            >
                                                <option value="admin">{t.sidebar.manage_members_modal.role_admin}</option>
                                                <option value="member">{t.sidebar.manage_members_modal.role_member}</option>
                                            </select>
                                        ) : (
                                            <>
                                                <span>{member.member_role === 'admin' ? t.sidebar.manage_members_modal.role_admin : t.sidebar.manage_members_modal.role_member}</span>
                                                <span
                                                    className="role-change-link"
                                                    onClick={() => setEditingMemberId(member.member_id)}
                                                >
                                                    {t.sidebar.manage_members_modal.change_role}
                                                </span>
                                            </>
                                        )
                                    )}
                                </td>
                                <td data-label={t.sidebar.manage_members_modal.column_actions}>
                                    {!isSelf && (
                                        <button
                                            disabled={loadingDelete}
                                            onClick={() => handleDeleteMember(member.member_id)}
                                            className="btn-delete-member"
                                        >
                                            {loadingDelete ? '...' : t.sidebar.manage_members_modal.delete_btn}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Modal>
    );
};

export default ManageMembersModal;