import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm/useForm";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import { useWorkspaceContext } from "../../context/WorkspaceContext/WorkspaceContext";
import { useChannelContext } from "../../context/ChannelContext/ChannelContext";
import ChatContextProvider, { useChatContext } from "../../context/ChatContext/ChatContext";

const SUBMIT_MESSAGE_FORM_FIELDS = {
    CONTENT: 'content'
};

const Chat = () => {

    const { activeMember, workspace_id } = useWorkspaceContext();
    const { channel_list, channel_id } = useChannelContext();
    const member_id = activeMember?.member_id;

    const navigate = useNavigate();
    const { isMobile } = useIsMobile();

    const activeChannel = channel_list?.find((ch: any) => ch.channel_id === channel_id);

    const initialFormState = {
        [SUBMIT_MESSAGE_FORM_FIELDS.CONTENT]: ''
    };

    const {
        refreshMessages,
        messagelist,
        responseMessages: responseMessageList,
        loadingMessages: loadingMessageList,
        errorMessages: errorMessageList,
        sendMessageSubmit,
        loadingSend
    } = useChatContext();


    const { formState, handleChangeInput, onSubmit } = useForm({
        initialFormState,
        submitFn: async (formState: any) => {
            await sendMessageSubmit({
                fk_id_channel: channel_id,
                fk_id_workspace: workspace_id,
                fk_id_member: member_id,
                content: formState.content
            });
            refreshMessages();
        }
    });

    return (
        <div className='chat-main'>
            <div className='chat-header'>
                {isMobile && (
                    <button onClick={() => navigate(`/workspace/${workspace_id}`)}>
                        Volver
                    </button>
                )}
                <h2># {activeChannel?.name ?? 'Cargando...'}</h2>
            </div>

            <div className='chat-history'>
                <div className='message-dummy'>
                    {messagelist && responseMessageList && !loadingMessageList && !errorMessageList && messagelist.map((m: any, index: number) => {
                        return (
                            <div key={m.message_id ?? index} className="message-div">
                                <div className="message-header">
                                    <span>{m.created_at}</span>
                                    <p>{m.sender_name}</p>
                                </div>
                                <p>{m.content}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='chat-input-container'>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="content"
                        placeholder={loadingSend && 'Enviando...' || 'Enviar mensage...'}
                        value={formState.content}
                        onChange={handleChangeInput}
                        disabled={loadingSend}
                    />
                </form>
            </div>
        </div>

    );
};

const ChatWithContext = () => (
    <ChatContextProvider>
        <Chat />
    </ChatContextProvider>
);

export default ChatWithContext;
