import { useState } from 'react';
import Modal from '../Modal/Modal';
import { updateChannel, deleteChannel } from '../../services/channelService';
import { useWorkspaceContext } from '../../context/WorkspaceContext/WorkspaceContext';
import type { IChannel } from '../../types';
import './ChannelSettingsModal.css';

interface ChannelSettingsModalProps {
    channel: IChannel;
    onClose: () => void;
    onSuccess: () => void;
}

const ChannelSettingsModal = ({ channel, onClose, onSuccess }: ChannelSettingsModalProps) => {
    const { workspace_id } = useWorkspaceContext();
    const [name, setName] = useState(channel.channel_name);
    const [description, setDescription] = useState(channel.channel_description ?? '');
    const [activeTab, setActiveTab] = useState<'general' | 'delete'>('general');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
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
    };

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
                        <form className="settings-form" onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label>Nombre del Canal</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="nombre-del-canal"
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="De qué trata este canal..."
                                    rows={4}
                                />
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
