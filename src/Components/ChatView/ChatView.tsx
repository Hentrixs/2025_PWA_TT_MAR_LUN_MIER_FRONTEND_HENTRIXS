import { useState } from "react";
import type { IMessage, AppError } from "../../types";
import useForm from "../../hooks/useForm/useForm";
import MessageItem from "../MessageItem/MessageItem";
import "./ChatView.css";


interface ChatViewProps {
    title: string;
    messagelist: IMessage[];
    loadingMessages: boolean;
    errorMessages: AppError | null;
    refreshMessages: () => void;
    sendMessageSubmit: (content: string) => Promise<void>;
    loadingSend: boolean;
    activeMemberId: string | undefined;
    onEditSubmit: (message_id: string, content: string) => Promise<void>;
    onBack?: () => void;
}

const ChatView = ({
    title,
    messagelist,
    loadingMessages,
    errorMessages,
    refreshMessages,
    sendMessageSubmit,
    loadingSend,
    activeMemberId,
    onEditSubmit,
    onBack
}: ChatViewProps) => {

    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [editDraft, setEditDraft] = useState<string>('');

    const { formState, handleChangeInput, onSubmit, resetForm } = useForm({
        initialFormState: { content: '' },
        submitFn: async (state: { content: string }) => {
            await sendMessageSubmit(state.content);
            refreshMessages();
            resetForm();
        }
    });

    return (
        <div className='chat-main'>
            <div className='chat-header'>
                {onBack && (
                    <button className="chat-back-btn" onClick={onBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                        </svg>
                        Volver
                    </button>
                )}
                <h2># {title}</h2>
            </div>

            <div className='chat-history'>
                <div className='message-dummy'>
                    {messagelist && !loadingMessages && !errorMessages && messagelist.map((m: IMessage, index: number) => (
                        <MessageItem
                            key={m.message_id ?? index}
                            message={m}
                            activeMemberId={activeMemberId}
                            isEditing={editingMessageId === m.message_id}
                            editDraft={editDraft}
                            onStartEdit={(id, content) => {
                                setEditingMessageId(id);
                                setEditDraft(content);
                            }}
                            onCancelEdit={() => setEditingMessageId(null)}
                            onSuccessEdit={() => {
                                setEditingMessageId(null);
                                refreshMessages();
                            }}
                            onEditSubmit={onEditSubmit}
                        />
                    ))}
                </div>

            </div>

            <div className='chat-input-container'>
                <form onSubmit={onSubmit} className="chat-input-form">
                    <input
                        type="text"
                        name="content"
                        placeholder={loadingSend ? 'Enviando...' : 'Enviar mensaje...'}
                        value={formState.content}
                        onChange={handleChangeInput}
                        disabled={loadingSend}
                    />
                    <button type="submit" className="chat-send-btn" disabled={loadingSend || !formState.content.trim()}>

                        {loadingSend ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                            </svg>
                        )}
                        
                    </button>
                </form>
            </div>
        </div >
    );
};

export default ChatView;
