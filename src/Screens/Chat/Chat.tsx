import { useParams, useNavigate } from "react-router-dom";
import useChatMain from "../../hooks/useChatMain/useChatMain";
import useSendMessage from "../../hooks/useSendMessage/useSendMessage";
import useForm from "../../hooks/useForm/useForm";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import { useWorkspaceContext } from "../../context/WorkspaceContext/WorkspaceContext";

const SUBMIT_MESSAGE_FORM_FIELDS = {
    CONTENT: 'content'
};

const Chat = () => {

    const { activeMember, channel_list } = useWorkspaceContext();
    const member_id = activeMember?.member_id;

    const navigate = useNavigate();
    const { isMobile } = useIsMobile();
    const { workspace_id, channel_id } = useParams();

    const activeChannel = channel_list?.find((ch: any) => ch.channel_id === channel_id);

    const initialFormState = {
        [SUBMIT_MESSAGE_FORM_FIELDS.CONTENT]: ''
    };

    const {
        refreshMessages,
        messagelist,
        response: responseMessageList,
        loading: loadingMessageList,
        error: errorMessageList
    } = useChatMain(channel_id);

    const {
        sendMessageSubmit,
    } = useSendMessage();


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
                        placeholder='Enviar mensage...'
                        value={formState.content}
                        onChange={handleChangeInput}
                    />
                </form>
            </div>
        </div>

    );
};

export default Chat;
