import { useNavigate, useParams } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import { useWorkspaceContext } from "../../context/WorkspaceContext/WorkspaceContext";
import DirectChatContextProvider, { useDirectChatContext } from "../../context/DirectChatContext/DirectChatContext";
import ChatView from "../../Components/ChatView/ChatView";
import { updateDirectMessage } from "../../services/directMessageService";

const DirectChat = () => {
    const { workspace_id, activeMember } = useWorkspaceContext();
    const { member_id: other_member_id } = useParams();
    const { messagelist, loadingMessages, errorMessages, refreshMessages, sendMessageSubmit, loadingSend, otherMemberName } = useDirectChatContext();

    const { isMobile } = useIsMobile();
    const navigate = useNavigate();

    const handleEditSubmit = async (message_id: string, content: string) => {
        await updateDirectMessage(workspace_id!, other_member_id!, message_id, content);
        refreshMessages();
    };

    return (
        <ChatView
            title={otherMemberName}
            messagelist={messagelist ?? []}
            loadingMessages={loadingMessages}
            errorMessages={errorMessages}
            refreshMessages={refreshMessages}
            sendMessageSubmit={async (content) => {
                await sendMessageSubmit({ fk_id_workspace: workspace_id!, other_member_id: other_member_id!, content });
            }}
            loadingSend={loadingSend}
            activeMemberId={activeMember?.member_id}
            onEditSubmit={handleEditSubmit}
            onBack={isMobile ? () => navigate(`/workspace/${workspace_id}`) : undefined}
        />
    );
};

const DirectChatWithContext = () => (
    <DirectChatContextProvider>
        <DirectChat />
    </DirectChatContextProvider>
);

export default DirectChatWithContext;
