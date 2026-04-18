import { useEffect } from "react";
import { getChannels } from "../../services/channelService";
import useRequest from "../useRequest/useRequest";

const useChannel = (fk_id_workspace: string) => {
    const { response, loading, error, sendRequest } = useRequest();

    const refetchChannels = () => {
        if (fk_id_workspace) {
            sendRequest({ requestCb: () => getChannels(fk_id_workspace) });
        };
    };

    useEffect(() => {
        refetchChannels();
    }, [fk_id_workspace]);

    let channel_list = null;

    if (response) {
        channel_list = response.data.channel_list;
    };

    console.log(channel_list);
    console.log(response);

    return {
        response,
        loading,
        error,
        channel_list,
        refetchChannels
    };
};

export default useChannel;