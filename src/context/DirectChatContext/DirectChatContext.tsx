import { createContext, useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import useDirectChatMain from "../../hooks/useDirectChatMain/useDirectChatMain";
import useDirectSendMessage from "../../hooks/useDirectSendMessage/useDirectSendMessage";
import { useWorkspaceContext } from "../WorkspaceContext/WorkspaceContext";
import type { DirectChatContextType, IMember } from "../../types";

const DirectChatContext = createContext<DirectChatContextType | null>(null);

export function DirectChatContextProvider({ children }: { children: React.ReactNode }) {
    const { member_id: other_member_id } = useParams();
    const { members } = useWorkspaceContext();

    const { messagelist, response: responseMessages, loading: loadingMessages, error: errorMessages, refreshMessages } = useDirectChatMain();
    const { sendMessageSubmit, loading: loadingSend, error: errorSend } = useDirectSendMessage();

    // Polling simulation for real-time messages (Serverless/Vercel limitation workaround)

    useEffect(() => {
        const interval = setInterval(refreshMessages, 3000);
        return () => clearInterval(interval);
    }, [refreshMessages]);

    const otherMemberName = useMemo(() => {
        return members?.find((m: IMember) => m.member_id === other_member_id)?.user_name ?? 'Usuario';
    }, [members, other_member_id]);

    const providerValues = useMemo(() => ({
        messagelist,
        responseMessages,
        loadingMessages,
        errorMessages,
        refreshMessages,
        sendMessageSubmit,
        loadingSend,
        errorSend,
        otherMemberName
    }), [
        messagelist,
        responseMessages,
        loadingMessages,
        errorMessages,
        refreshMessages,
        sendMessageSubmit,
        loadingSend,
        errorSend,
        otherMemberName
    ]);

    return (
        <DirectChatContext.Provider value={providerValues}>
            {children}
        </DirectChatContext.Provider>
    );
}

export const useDirectChatContext = () => {
    const context = useContext(DirectChatContext);
    if (!context) {
        throw new Error("useDirectChatContext must be used within a DirectChatContextProvider");
    }
    return context;
};
export default DirectChatContextProvider;
