import useMemberList from "../../hooks/useMemberList/useMemberList";
import Modal from "../Modal/Modal";
import type { IMember } from "../../types";
import './ManageMembersModal.css';
import useDeleteMember from "../../hooks/useDeleteMember/useDeleteMember";
import { useEffect, useState } from "react";
import useUpdateMemberRole from "../../hooks/useUpdateMemberRole/useUpdateMemberRole";
import { useWorkspaceContext } from "../../context/WorkspaceContext/WorkspaceContext";
interface ManageMembersModalProps {
    onClose: () => void
};

const ManageMembersModal = ({ onClose }: ManageMembersModalProps) => {
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
        <Modal title="Administrar Miembros" onClose={onClose}>
            <table className="manage-members-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className="manage-members-table-body">
                    {member_list.map((member: IMember) => {
                        const isSelf = activeMember?.member_id === member.member_id;

                        return (
                            <tr key={member.member_id}>
                                <td data-label="Nombre">{member.user_name}</td>
                                <td data-label="Email">{member.user_email}</td>
                                <td data-label="Rol">
                                    {isSelf ? (
                                        <span>{member.member_role} <strong>(Tú)</strong></span>
                                    ) : (
                                        editingMemberId === member.member_id ? (
                                            <select
                                                disabled={loadingUpdate}
                                                defaultValue={member.member_role}
                                                onChange={(e) => onRoleChange(member.member_id, e.target.value)}
                                            >
                                                <option value="admin">admin</option>
                                                <option value="member">member</option>
                                            </select>
                                        ) : (
                                            <>
                                                <span>{member.member_role}</span>
                                                <span
                                                    className="role-change-link"
                                                    onClick={() => setEditingMemberId(member.member_id)}
                                                >
                                                    (Cambiar)
                                                </span>
                                            </>
                                        )
                                    )}
                                </td>
                                <td data-label="Acciones">
                                    {!isSelf && (
                                        <button
                                            disabled={loadingDelete}
                                            onClick={() => handleDeleteMember(member.member_id)}
                                            className="btn-delete-member"
                                        >
                                            {loadingDelete && '...' || 'Eliminar'}
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