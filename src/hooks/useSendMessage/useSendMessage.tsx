import { createChannelMessage } from "../../services/channelMessageService";
import useRequest from "../useRequest/useRequest";

const useSendMessage = () => {
    const { sendRequest, response, error, loading } = useRequest();

    const sendMessageSubmit = async ({ fk_id_workspace, fk_id_channel, content, fk_id_member }: any) => {
        if (!fk_id_workspace || !fk_id_channel || !fk_id_member || !content || content.trim() === '') return;
        await sendRequest({ requestCb: () => createChannelMessage(fk_id_workspace, fk_id_channel, content, fk_id_member) })
    };

    return {
        sendMessageSubmit,
        response,
        error,
        loading
    };
};

export default useSendMessage;