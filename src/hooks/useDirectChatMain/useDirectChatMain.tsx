import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useRequest from "../useRequest/useRequest";
import { getDirectMessageHistory } from "../../services/directMessageService";
import { useWorkspaceContext } from "../../context/WorkspaceContext/WorkspaceContext";

function useDirectChatMain() {
    const { response, loading, error, sendRequest } = useRequest();
    const { workspace_id } = useWorkspaceContext();
    const { member_id: other_member_id } = useParams();

    useEffect(() => {
        if (!workspace_id || !other_member_id) return;
        sendRequest({ requestCb: () => getDirectMessageHistory(workspace_id, other_member_id) });
    }, [workspace_id, other_member_id]);

    const messagelist = response?.data?.messages || [];

    return {
        messagelist,
        response,
        loading,
        error,
        refreshMessages: () => {
            if (!workspace_id || !other_member_id) return;
            sendRequest({ requestCb: () => getDirectMessageHistory(workspace_id, other_member_id) });
        }
    };
}

export default useDirectChatMain;
