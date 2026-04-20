import useRequest from "../useRequest/useRequest";
import { createWorkspace } from "../../services/workspaceService";

const useCreateWorkspace = () => {
    const { sendRequest, response, loading, error } = useRequest();

    const submitCreateWorkspace = async (title: string, description: string) => {
        if (!title || title.trim() === '') return;
        await sendRequest({ requestCb: () => createWorkspace(title, description, 'admin') });
    };

    return { submitCreateWorkspace, response, loading, error };
};

export default useCreateWorkspace;
