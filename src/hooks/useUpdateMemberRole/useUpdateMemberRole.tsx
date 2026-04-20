import { updateMemberRole } from "../../services/workspaceMemberService";
import useRequest from "../useRequest/useRequest";

const useUpdateMemberRole = (workspace_id: string | any) => {
    const { response, loading, error, sendRequest } = useRequest();

    const handleUpdateMemberRole = (member_id: string, role: string) => {
        if (!workspace_id || !member_id || !role) return;
        sendRequest({ requestCb: () => updateMemberRole(workspace_id, member_id, role) });
    };

    return {
        handleUpdateMemberRole,
        response,
        loading,
        error
    };
};

export default useUpdateMemberRole;
