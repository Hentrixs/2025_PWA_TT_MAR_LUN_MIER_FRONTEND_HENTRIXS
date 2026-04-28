import { createContext, useContext, useEffect } from "react";
import type { ChatContextType } from "../../types";
import useChatMain from "../../hooks/useChatMain/useChatMain";
import useSendMessage from "../../hooks/useSendMessage/useSendMessage";

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatContextProvider({ children }: { children: React.ReactNode }) {

    // El useChatMain internamente se encarga de fetchear basándose en los contextos superiores
    const { messagelist, response: responseMessages, loading: loadingMessages, error: errorMessages, refreshMessages } = useChatMain();

    const { sendMessageSubmit, loading: loadingSend, error: errorSend } = useSendMessage();

    // Polling cada 3 segundos para simular mensajes en tiempo real.
    // WebSockets sería la solución ideal pero Vercel (serverless) no mantiene
    // conexiones persistentes, por lo que no es compatible con Socket.io u otras
    // implementaciones de WebSocket sin cambiar el proveedor de hosting.
    
    useEffect(() => {
        const interval = setInterval(refreshMessages, 3000);
        return () => clearInterval(interval);
    }, [refreshMessages]);

    const providerValues = {
        messagelist,
        responseMessages,
        loadingMessages,
        errorMessages,
        refreshMessages,
        sendMessageSubmit,
        loadingSend,
        errorSend
    };

    return (
        <ChatContext.Provider value={providerValues}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => useContext(ChatContext) as ChatContextType;
export default ChatContextProvider;
