import useRequest from "../useRequest/useRequest";
import { sendDirectMessage } from "../../services/directMessageService";
import type { SendDirectMessageParams } from "../../types";

const useDirectSendMessage = () => {
    const { sendRequest, response, error, loading } = useRequest();

    const sendMessageSubmit = async ({ fk_id_workspace, other_member_id, content }: SendDirectMessageParams) => {
        if (!fk_id_workspace || !other_member_id || !content || content.trim() === '') return;
        await sendRequest({ requestCb: () => sendDirectMessage(fk_id_workspace, other_member_id, content) });
    };

    return {
        sendMessageSubmit,
        response,
        error,
        loading
    };
};

export default useDirectSendMessage;
