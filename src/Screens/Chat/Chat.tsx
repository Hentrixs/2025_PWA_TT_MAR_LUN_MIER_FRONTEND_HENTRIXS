import { useParams } from "react-router-dom";
import useChatMain from "../../hooks/useChatMain/useChatMain";
import { useOutletContext } from "react-router-dom";
import useSendMessage from "../../hooks/useSendMessage/useSendMessage";
import useForm from "../../hooks/useForm/useForm";

const SUBMIT_MESSAGE_FORM_FIELDS = {
    CONTENT: 'content'
};

const Chat = () => {

    const { channel_id } = useParams();
    const { member_id, channel_list } = useOutletContext<{ member_id: string, channel_list: any[] }>();
    const activeChannel = channel_list?.find((ch: any) => ch._id === channel_id);

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
        response:
        responseSendMessage,
        loading: loadingSendMessage,
        error: errorSendMessage,
    } = useSendMessage();


    const { formState, handleChangeInput, onSubmit } = useForm({
        initialFormState,
        submitFn: async (formState: any) => {
            await sendMessageSubmit({
                fk_id_channel: channel_id,
                fk_id_member: member_id,
                content: formState.content
            });
            refreshMessages();
        }
    });

    return (
        <div className='chat-main'>
            <div className='chat-header'>
                <h2># {activeChannel?.name ?? 'Cargando...'}</h2>
            </div>

            <div className='chat-history'>
                <div className='message-dummy'>
                    {messagelist && responseMessageList && !loadingMessageList && !errorMessageList && messagelist.map((m: any) => {
                        return (
                            <div key={m.id} className="message-div">
                                <div className="message-header">
                                    <span>{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
