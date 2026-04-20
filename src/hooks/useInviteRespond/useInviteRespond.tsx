import { respondToInvitation } from "../../services/workspaceMemberService";
import useRequest from "../useRequest/useRequest";
import { useEffect } from "react";

const useInviteRespond = (workspace_id: string | null, token: string | null) => {
    const { response, loading, error, sendRequest } = useRequest();

    useEffect(() => {
        if (workspace_id && token) {
            sendRequest({ requestCb: () => respondToInvitation(workspace_id, token) });
        }
    }, [workspace_id, token]);

    return { response, loading, error };
};

export default useInviteRespond;
