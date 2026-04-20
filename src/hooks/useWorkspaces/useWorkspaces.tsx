import { useEffect } from "react";
import useRequest from "../useRequest/useRequest";
import { getWorkspaces } from "../../services/workspaceService";


const useWorkspaces = () => {
    const { sendRequest, response, loading, error } = useRequest();

    useEffect(() => {
        sendRequest({ requestCb: () => getWorkspaces() });
    }, []);

    const workspaces = response || [];

    return { response, loading, error, workspaces };
};

export default useWorkspaces;