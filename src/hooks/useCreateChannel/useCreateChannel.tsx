import { createChannel } from "../../services/channelService";
import useRequest from "../useRequest/useRequest";

const useCreateChannel = (workspace_id: string | undefined) => {
    const { sendRequest, response, error, loading } = useRequest();

    const createChannelSubmit = (formstate: Record<string, string>) => {
        const { channel_name, channel_description } = formstate;

        if (!workspace_id || !channel_name.trim() || !channel_description.trim()) {
            return;
        };

        sendRequest({ requestCb: () => createChannel({ channel_name, channel_description }, workspace_id) });
    };

    return {
        createChannelSubmit,
        response,
        error,
        loading
    };
};

export default useCreateChannel;