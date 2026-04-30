import { useState } from 'react';
import Modal from '../Modal/Modal';
import { updateWorkspace, deleteWorkspace } from '../../services/workspaceService';
import { useNavigate } from 'react-router-dom';
import './WorkspaceSettingsModal.css';
import { useWorkspaceContext } from '../../context/WorkspaceContext/WorkspaceContext';
import useForm from '../../hooks/useForm/useForm';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

interface WorkspaceSettingsModalProps {
    onClose: () => void;
}

const WorkspaceSettingsModal = ({ onClose }: WorkspaceSettingsModalProps) => {
    const { t } = useTranslation();
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
                    setError(response.message || t.sidebar.workspace_settings_modal.update_error);
                }
            } catch {
                setError(t.sidebar.workspace_settings_modal.conn_error);
            } finally {
                setLoading(false);
            }
        }
    });

    const handleDelete = async () => {
        if (!confirm(t.sidebar.workspace_settings_modal.delete_confirm)) return;
        setLoading(true);
        setError(null);
        try {
            const response = await deleteWorkspace(workspaceDetail?._id ?? '');
            if (response.ok) {
                navigate('/workspace');
            } else {
                setError(response.message || t.sidebar.workspace_settings_modal.delete_error);
            }
        } catch {
            setError(t.sidebar.workspace_settings_modal.conn_error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title={t.sidebar.workspace_settings_modal.title} onClose={onClose}>
            <div className="workspace-settings-container">
                <div className="settings-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        {t.sidebar.workspace_settings_modal.general_tab}
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'delete' ? 'active' : ''}`}
                        onClick={() => setActiveTab('delete')}
                    >
                        {t.sidebar.workspace_settings_modal.danger_tab}
                    </button>
                </div>

                <div className="settings-content">
                    {activeTab === 'general' ? (
                        <form className="settings-form" onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>{t.sidebar.workspace_settings_modal.name_label}</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formState.title}
                                    onChange={handleChangeInput}
                                    placeholder={t.sidebar.workspace_settings_modal.name_placeholder}
                                />
                                {errors.title && <span style={{ color: 'var(--error-primary)', fontSize: '13px' }}>{errors.title}</span>}
                            </div>
                            <div className="form-group">
                                <label>{t.sidebar.workspace_settings_modal.description_label}</label>
                                <textarea
                                    name="description"
                                    value={formState.description}
                                    onChange={handleChangeInput}
                                    placeholder={t.sidebar.workspace_settings_modal.description_placeholder}
                                    rows={4}
                                />
                                {errors.description && <span style={{ color: 'var(--error-primary)', fontSize: '13px' }}>{errors.description}</span>}
                            </div>
                            <div className="form-actions">
                                {error && <span className="error-message">{error}</span>}
                                <button type="button" className="secondary-btn" onClick={onClose} disabled={loading}>{t.common.cancel}</button>
                                <button type="submit" className="primary-btn" disabled={loading}>
                                    {loading ? t.sidebar.workspace_settings_modal.saving : t.sidebar.workspace_settings_modal.save_changes}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="danger-zone">
                            <div className="danger-info">
                                <h3>{t.sidebar.workspace_settings_modal.delete_title}</h3>
                                <p>{t.sidebar.workspace_settings_modal.delete_desc}</p>
                                {error && <span className="error-message" style={{ display: 'block', marginTop: '10px' }}>{error}</span>}
                            </div>
                            <button className="delete-btn" onClick={handleDelete} disabled={loading}>
                                {loading ? t.sidebar.workspace_settings_modal.deleting : t.sidebar.workspace_settings_modal.delete_btn}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default WorkspaceSettingsModal;
