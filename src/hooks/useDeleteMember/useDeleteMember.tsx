import { deleteMember } from "../../services/workspaceMemberService";
import useRequest from "../useRequest/useRequest";

const useDeleteMember = (workspace_id: string | any) => {
    const { response, loading, error, sendRequest } = useRequest();

    const handleDeleteMember = (member_id: string | any) => {
        if (!workspace_id || !member_id) return;
        sendRequest({ requestCb: () => deleteMember(workspace_id, member_id) });
    };

    return {
        handleDeleteMember,
        response,
        loading,
        error
    };
};

export default useDeleteMember;
