import { deleteMember } from "../../services/workspaceMemberService";
import useRequest from "../useRequest/useRequest";

const useDeleteMember = (workspace_id: string) => {
    const { response, loading, error, sendRequest } = useRequest();

    const handleDeleteMember = (member_id: string) => {
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
