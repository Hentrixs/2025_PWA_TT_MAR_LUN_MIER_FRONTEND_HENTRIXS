import { useEffect, useCallback } from "react";
import useRequest from "../useRequest/useRequest";
import { channelMessageHistory } from "../../services/channelMessageService";
import { useWorkspaceContext } from "../../context/WorkspaceContext/WorkspaceContext";
import { useChannelContext } from "../../context/ChannelContext/ChannelContext";

function useChatMain() {

    const { response, loading, error, sendRequest } = useRequest();
    const { workspace_id } = useWorkspaceContext();
    const { channel_id } = useChannelContext();

    useEffect(() => {
        if (!workspace_id || !channel_id) return;
        sendRequest({ requestCb: () => channelMessageHistory(workspace_id, channel_id) })
    }, [workspace_id, channel_id])

    const messagelist = response?.data?.channelMessagesHistory || [];


    const refreshMessages = useCallback(() => {
        if (!workspace_id || !channel_id) return;
        sendRequest({requestCb: () => channelMessageHistory(workspace_id, channel_id), silent: true})
    },[workspace_id, channel_id]);

    return {
        messagelist,
        response,
        loading,
        error,
        refreshMessages
    }
};

export default useChatMain;