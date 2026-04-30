import type { IMessage } from "../../types";
import MessageInlineEdit from "../MessageInlineEdit/MessageInlineEdit";
import { useTranslation } from "../../context/LanguageContext/LanguageContext";
import './MessageItem.css';

const formatTime = (dateString: string | undefined) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
        return dateString;
    }
};

interface MessageItemProps {
    message: IMessage;
    activeMemberId: string | undefined;
    isEditing: boolean;
    editDraft: string;
    onStartEdit: (message_id: string, content: string) => void;
    onCancelEdit: () => void;
    onSuccessEdit: () => void;
    onEditSubmit: (message_id: string, content: string) => Promise<void>;
}

const MessageItem = ({
    message: m,
    activeMemberId,
    isEditing,
    editDraft,
    onStartEdit,
    onCancelEdit,
    onSuccessEdit,
    onEditSubmit
}: MessageItemProps) => {
    const { t } = useTranslation();
    return (
        <div className="message-div">
            <div className="message-avatar">
                {m.sender_name?.charAt(0).toUpperCase() || 'U'}
            </div>

            <div className="message-body">
                <div className="message-header">
                    <span className="message-sender">{m.sender_name}</span>
                    <span className="message-time">{formatTime(m.created_at)}</span>
                </div>

                {isEditing && m.member_id === activeMemberId ? (
                    <MessageInlineEdit
                        message_id={m.message_id}
                        initialContent={editDraft}
                        onCancel={onCancelEdit}
                        onSuccess={onSuccessEdit}
                        onEditSubmit={(content) => onEditSubmit(m.message_id, content)}
                    />
                ) : (
                    <div className="message-content">
                        <p>{m.content}</p>
                        {m.member_id === activeMemberId && (
                            <button className="edit-btn" onClick={() => onStartEdit(m.message_id, m.content)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                </svg>
                                {t.chat.edit}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageItem;
