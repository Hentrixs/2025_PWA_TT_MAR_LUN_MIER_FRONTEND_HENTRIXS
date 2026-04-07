import { useEffect } from "react";
import useRequest from "../useRequest/useRequest";
import { getWorkspaceDetail } from "../../services/workspaceService";

const useWorkspace = (workspace_id: string) => {
    const { sendRequest, response, loading, error } = useRequest();

    useEffect(() => {
        if (workspace_id) {
            sendRequest({ requestCb: () => getWorkspaceDetail(workspace_id) });
        }
    }, [workspace_id]);

    let workspace = null;
    let members = null;

    if (response) {
        workspace = response.workspace;
        members = response.members;
    }

    return { workspace, members, response, loading, error };
};

export default useWorkspace;
