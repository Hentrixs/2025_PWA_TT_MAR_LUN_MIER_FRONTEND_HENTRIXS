import { createContext, useContext } from "react";
import useChatMain from "../../hooks/useChatMain/useChatMain";
import useSendMessage from "../../hooks/useSendMessage/useSendMessage";

const ChatContext = createContext<any>(null);

export function ChatContextProvider({ children }: { children: React.ReactNode }) {

    // El useChatMain internamente se encarga de fetchear basándose en los contextos superiores
    const { messagelist, response: responseMessages, loading: loadingMessages, error: errorMessages, refreshMessages } = useChatMain();

    const { sendMessageSubmit, loading: loadingSend, error: errorSend } = useSendMessage();

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

export const useChatContext = () => useContext(ChatContext);
export default ChatContextProvider;
