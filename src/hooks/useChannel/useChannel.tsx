import { useEffect } from "react";
import { getChannels } from "../../services/channelService";
import useRequest from "../useRequest/useRequest";

const useChannel = (fk_id_workspace: string | undefined) => {
    const { response, loading, error, sendRequest } = useRequest();

    const refetchChannels = () => {
        if (!fk_id_workspace || fk_id_workspace === '') return;
        sendRequest({ requestCb: () => getChannels(fk_id_workspace) });
    };

    useEffect(() => {
        refetchChannels();
    }, [fk_id_workspace]);

    const channel_list = response?.data?.channel_list || [];

    return {
        response,
        loading,
        error,
        channel_list,
        refetchChannels
    };
};

export default useChannel;