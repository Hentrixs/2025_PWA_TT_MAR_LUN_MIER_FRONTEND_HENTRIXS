import { createContext, useContext, useEffect } from "react";
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

    // Polling cada 3 segundos para simular mensajes en tiempo real.
    // WebSockets sería la solución ideal pero Vercel (serverless) no mantiene
    // conexiones persistentes, por lo que no es compatible con Socket.io u otras
    // implementaciones de WebSocket sin cambiar el proveedor de hosting.

    useEffect(() => {
        const interval = setInterval(refreshMessages, 3000);
        return () => clearInterval(interval);
    }, [refreshMessages]);

    const otherMemberName = members?.find((m: IMember) => m.member_id === other_member_id)?.user_name ?? 'Usuario';

    const providerValues = {
        messagelist,
        responseMessages,
        loadingMessages,
        errorMessages,
        refreshMessages,
        sendMessageSubmit,
        loadingSend,
        errorSend,
        otherMemberName
    };

    return (
        <DirectChatContext.Provider value={providerValues}>
            {children}
        </DirectChatContext.Provider>
    );
}

export const useDirectChatContext = () => useContext(DirectChatContext) as DirectChatContextType;
export default DirectChatContextProvider;
