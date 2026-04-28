import { useState } from 'react';
import Modal from '../Modal/Modal';
import { updateChannel, deleteChannel } from '../../services/channelService';
import { useWorkspaceContext } from '../../context/WorkspaceContext/WorkspaceContext';
import type { IChannel } from '../../types';
import './ChannelSettingsModal.css';
import useForm from '../../hooks/useForm/useForm';

interface ChannelSettingsModalProps {
    channel: IChannel;
    onClose: () => void;
    onSuccess: () => void;
}

const ChannelSettingsModal = ({ channel, onClose, onSuccess }: ChannelSettingsModalProps) => {
    const { workspace_id } = useWorkspaceContext();
    const [activeTab, setActiveTab] = useState<'general' | 'delete'>('general');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { formState, handleChangeInput, onSubmit, errors } = useForm({
        initialFormState: {
            name: channel.channel_name,
            description: channel.channel_description ?? ''
        },
        validationRules: {
            name: ['required', 'min:3'],
            description: ['min:3']
        },
        submitFn: async ({ name, description }) => {
            if (!workspace_id) return;
            setLoading(true);
            setError(null);
            try {
                const response = await updateChannel(workspace_id, channel.channel_id, name, description);
                if (response.ok) {
                    onSuccess();
                } else {
                    setError(response.message || 'Error al actualizar');
                }
            } catch {
                setError('Error de conexión');
            } finally {
                setLoading(false);
            }
        }
    });

    const handleDelete = async () => {
        if (!confirm(`¿Estás SEGURO de que deseas eliminar #${channel.channel_name}? Esto no se puede deshacer.`)) return;
        if (!workspace_id) return;
        setLoading(true);
        setError(null);
        try {
            const response = await deleteChannel(workspace_id, channel.channel_id);
            if (response.ok) {
                onSuccess();
            } else {
                setError(response.message || 'Error al eliminar');
            }
        } catch {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title={`Configuración de #${channel.channel_name}`} onClose={onClose}>
            <div className="channel-settings-container">
                <div className="settings-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        General
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'delete' ? 'active' : ''}`}
                        onClick={() => setActiveTab('delete')}
                    >
                        Zona de Peligro
                    </button>
                </div>

                <div className="settings-content">
                    {activeTab === 'general' ? (
                        <form className="settings-form" onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>Nombre del Canal</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleChangeInput}
                                    placeholder="nombre-del-canal"
                                />
                                {errors.name && <span style={{ color: 'var(--error-primary)', fontSize: '13px' }}>{errors.name}</span>}
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    name="description"
                                    value={formState.description}
                                    onChange={handleChangeInput}
                                    placeholder="De qué trata este canal..."
                                    rows={4}
                                />
                                {errors.description && <span style={{ color: 'var(--error-primary)', fontSize: '13px' }}>{errors.description}</span>}
                            </div>
                            <div className="form-actions">
                                {error && <span className="error-message">{error}</span>}
                                <button type="button" className="secondary-btn" onClick={onClose} disabled={loading}>Cancelar</button>
                                <button type="submit" className="primary-btn" disabled={loading}>
                                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="danger-zone">
                            <div className="danger-info">
                                <h3>Eliminar #{channel.channel_name}</h3>
                                <p>Esta acción es permanente y no se puede deshacer. Se borrarán todos los mensajes del canal.</p>
                                {error && <span className="error-message" style={{ display: 'block', marginTop: '10px' }}>{error}</span>}
                            </div>
                            <button className="delete-btn" onClick={handleDelete} disabled={loading}>
                                {loading ? 'Eliminando...' : 'Eliminar Canal Definitivamente'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ChannelSettingsModal;
