import { updateChannelMessage } from "../../services/channelMessageService";
import useRequest from "../useRequest/useRequest";

function useUpdateMessage(fk_id_channel: string, message_id: string, fk_id_workspace: string) {
    const { response, loading, error, sendRequest } = useRequest();


    const fetchUpdateMessage = (FormState: { content: string }) => {
        const { content } = FormState;
        sendRequest({
            requestCb: () => updateChannelMessage(fk_id_channel, fk_id_workspace, message_id, content)
        });
    }

    return {
        fetchUpdateMessage,
        response,
        loading,
        error,
        sendRequest
    };
};

export default useUpdateMessage;