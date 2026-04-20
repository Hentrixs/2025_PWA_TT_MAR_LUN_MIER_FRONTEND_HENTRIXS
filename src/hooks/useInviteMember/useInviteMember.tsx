import { inviteMember } from "../../services/workspaceMemberService";
import useRequest from "../useRequest/useRequest";

const useInviteMember = (workspace_id: string | any) => {
    const { response, loading, error, sendRequest } = useRequest();

    const handleInviteMember = (email: string, role: string) => {
        if (!workspace_id || !email || !role) return;
        sendRequest({ requestCb: () => inviteMember(workspace_id, email, role) });
    };

    return {
        handleInviteMember,
        response,
        loading,
        error
    };
};

export default useInviteMember;