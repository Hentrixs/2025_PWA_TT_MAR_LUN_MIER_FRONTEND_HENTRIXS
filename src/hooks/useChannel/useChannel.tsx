import { useEffect } from "react";
import { getChannels } from "../../services/channelService";
import useRequest from "../useRequest/useRequest";

const useChannel = (fk_id_workspace: string) => {
    const { response, loading, error, sendRequest } = useRequest();

    useEffect(() => {
        if (fk_id_workspace) {
            sendRequest({ requestCb: () => getChannels(fk_id_workspace) });
        }
    }, [fk_id_workspace]);

    let channel_list = null;

    if (response) {
        channel_list = response.data.channel_list;
    };

    return {
        response,
        loading,
        error,
        channel_list
    };
};

export default useChannel;