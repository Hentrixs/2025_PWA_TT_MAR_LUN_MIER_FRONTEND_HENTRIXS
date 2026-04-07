import { createChannelMessage } from "../../services/channelMessageService";
import useRequest from "../useRequest/useRequest";

const useSendMessage = () => {
    const { sendRequest, response, error, loading } = useRequest();

    const sendMessageSubmit = async ({fk_id_channel, content, fk_id_member}: any) => {
        await sendRequest({requestCb: () => createChannelMessage(fk_id_channel, content, fk_id_member)})
    };

    return {
        sendMessageSubmit,
        response,
        error,
        loading
    };
};

export default useSendMessage;