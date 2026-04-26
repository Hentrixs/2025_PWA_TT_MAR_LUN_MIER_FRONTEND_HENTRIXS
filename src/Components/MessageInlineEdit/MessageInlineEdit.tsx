import React, { useState } from 'react';
import useForm from '../../hooks/useForm/useForm';
import './MessageInlineEdit.css';

interface MessageInlineEditProps {
    message_id: string;
    initialContent: string;
    onCancel: () => void;
    onSuccess: () => void;
    onEditSubmit: (content: string) => Promise<void>;
}

const MessageInlineEdit: React.FC<MessageInlineEditProps> = ({ initialContent, onCancel, onSuccess, onEditSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);

    const { formState, handleChangeInput, onSubmit, errors } = useForm({
        initialFormState: { content: initialContent },
        validationRules: { content: ['required'] },
        submitFn: async (state: { content: string }) => {
            setLoading(true);
            setEditError(null);
            try {
                await onEditSubmit(state.content);
                onSuccess();
            } catch (e: unknown) {
                setEditError((e as Error).message || 'Error al guardar');
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <form onSubmit={onSubmit} className="inline-edit-container">
            <input
                type="text"
                name="content"
                className="inline-edit-input"
                value={formState.content}
                onChange={handleChangeInput}
                disabled={loading}
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Escape') onCancel(); }}
            />
            {errors.content && <span style={{ color: 'red', fontSize: '11px', display: 'block', marginTop: '4px', marginLeft: '4px' }}>{errors.content}</span>}
            <div className="inline-edit-actions">
                <button type="button" className="inline-cancel-btn" onClick={onCancel} disabled={loading}>
                    Cancelar
                </button>
                <button type="submit" className="inline-save-btn" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
            {editError && <span className="inline-edit-error" style={{ color: 'red', fontSize: '0.8rem', display: 'block', marginTop: '5px' }}>{editError}</span>}
        </form>
    );
};

export default MessageInlineEdit;
