import { useNavigate } from "react-router-dom";
import { useWorkspaceContext } from "../../context/WorkspaceContext/WorkspaceContext";
import { useChannelContext } from "../../context/ChannelContext/ChannelContext";
import { updateChannelMessage } from "../../services/channelMessageService";
import type { IChannel } from "../../types";
import ChatContextProvider, { useChatContext } from "../../context/ChatContext/ChatContext";
import ChatView from "../../Components/ChatView/ChatView";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import { useTranslation } from "../../context/LanguageContext/LanguageContext";

const Chat = () => {
    const { t } = useTranslation();
    const { activeMember, workspace_id } = useWorkspaceContext();
    const { channel_list, channel_id } = useChannelContext();
    const { messagelist, loadingMessages, errorMessages, refreshMessages, sendMessageSubmit, loadingSend } = useChatContext();
    const { isMobile } = useIsMobile();
    const navigate = useNavigate();

    const activeChannel = channel_list?.find((ch: IChannel) => ch.channel_id === channel_id);

    const handleEditSubmit = async (message_id: string, content: string) => {
        await updateChannelMessage(channel_id!, workspace_id!, message_id, content);
        refreshMessages();
    };

    return (
        <ChatView
            title={activeChannel?.name ?? t.common.loading}
            messagelist={messagelist ?? []}
            loadingMessages={loadingMessages}
            errorMessages={errorMessages}
            refreshMessages={refreshMessages}
            sendMessageSubmit={async (content) => {
                await sendMessageSubmit({ fk_id_channel: channel_id!, fk_id_workspace: workspace_id!, fk_id_member: activeMember?.member_id ?? '', content });
            }}
            loadingSend={loadingSend}
            activeMemberId={activeMember?.member_id}
            onEditSubmit={handleEditSubmit}
            onBack={isMobile ? () => navigate(`/workspace/${workspace_id}`) : undefined}
        />
    );
};

const ChatWithContext = () => (
    <ChatContextProvider>
        <Chat />
    </ChatContextProvider>
);

export default ChatWithContext;
