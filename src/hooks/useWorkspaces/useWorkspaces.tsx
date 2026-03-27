import { useEffect } from "react";
import useRequest from "../useRequest/useRequest";
import { getWorkspaces } from "../../services/workspaceService";


const useWorkspaces = () => {
    const { sendRequest, response, loading, error } = useRequest();

    useEffect(() => {
        sendRequest({
            requestCb: getWorkspaces
        }) // fijate qeu es normal que muchos hooks llamen a muchos hooks.
    }, []);
    let workspaces = null;
    if (response) {
        workspaces = response?.data?.workspaces
    }

    return { response, loading, error, workspaces };
};

export default useWorkspaces;