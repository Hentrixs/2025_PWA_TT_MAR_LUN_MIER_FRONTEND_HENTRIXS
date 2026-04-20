import { useEffect } from "react";
import useRequest from "../useRequest/useRequest";
import { getWorkspaceDetail } from "../../services/workspaceService";

const useWorkspace = (workspace_id: string | undefined) => {
    const { sendRequest, response, loading, error } = useRequest();

    useEffect(() => {
        if (!workspace_id || workspace_id === '') return;
        sendRequest({ requestCb: () => getWorkspaceDetail(workspace_id) });
    }, [workspace_id]);

    const workspace = response?.workspace || null;
    const members = response?.members || [];

    return { workspace, members, response, loading, error };
};

export default useWorkspace;
