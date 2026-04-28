import { useState } from 'react';
import Modal from '../Modal/Modal';
import { updateWorkspace, deleteWorkspace } from '../../services/workspaceService';
import { useNavigate } from 'react-router-dom';
import './WorkspaceSettingsModal.css';
import { useWorkspaceContext } from '../../context/WorkspaceContext/WorkspaceContext';
import useForm from '../../hooks/useForm/useForm';

interface WorkspaceSettingsModalProps {
    onClose: () => void;
}

const WorkspaceSettingsModal = ({ onClose }: WorkspaceSettingsModalProps) => {
    const { workspaceDetail } = useWorkspaceContext();
    const [activeTab, setActiveTab] = useState<'general' | 'delete'>('general');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { formState, handleChangeInput, onSubmit, errors } = useForm({
        initialFormState: {
            title: workspaceDetail?.title || '',
            description: workspaceDetail?.description || ''
        },
        validationRules: {
            title: ['required', 'min:3'],
            description: ['min:3']
        },
        submitFn: async ({ title, description }) => {
            setLoading(true);
            setError(null);
            try {
                const response = await updateWorkspace(workspaceDetail?._id ?? '', title, description);
                if (response.ok) {
                    window.location.reload();
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
        if (!confirm('¿Estás SEGURO de que deseas eliminar este workspace? Esto no se puede deshacer.')) return;
        setLoading(true);
        setError(null);
        try {
            const response = await deleteWorkspace(workspaceDetail?._id ?? '');
            if (response.ok) {
                navigate('/workspace');
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
        <Modal title="Configuración de Workspace" onClose={onClose}>
            <div className="workspace-settings-container">
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
                                <label>Nombre del Espacio de Trabajo</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formState.title}
                                    onChange={handleChangeInput}
                                    placeholder="Nombre del espacio..."
                                />
                                {errors.title && <span style={{ color: 'var(--error-primary)', fontSize: '13px' }}>{errors.title}</span>}
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    name="description"
                                    value={formState.description}
                                    onChange={handleChangeInput}
                                    placeholder="De qué trata este espacio..."
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
                                <h3>Eliminar este Espacio de Trabajo</h3>
                                <p>Esta acción es permanente y no se puede deshacer. Se borrarán todos los canales y mensajes asociados.</p>
                                {error && <span className="error-message" style={{ display: 'block', marginTop: '10px' }}>{error}</span>}
                            </div>
                            <button className="delete-btn" onClick={handleDelete} disabled={loading}>
                                {loading ? 'Eliminando...' : 'Eliminar Espacio de Trabajo Definitivamente'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default WorkspaceSettingsModal;
