import { useState } from 'react';
import Modal from '../Modal/Modal';
import { updateChannel, deleteChannel } from '../../services/channelService';
import { useWorkspaceContext } from '../../context/WorkspaceContext/WorkspaceContext';
import type { IChannel } from '../../types';
import './ChannelSettingsModal.css';
import useForm from '../../hooks/useForm/useForm';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

interface ChannelSettingsModalProps {
    channel: IChannel;
    onClose: () => void;
    onSuccess: () => void;
}

const ChannelSettingsModal = ({ channel, onClose, onSuccess }: ChannelSettingsModalProps) => {
    const { t } = useTranslation();
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
                    setError(response.message || t.sidebar.channel_settings.update_error);
                }
            } catch {
                setError(t.sidebar.channel_settings.conn_error);
            } finally {
                setLoading(false);
            }
        }
    });

    const handleDelete = async () => {
        if (!confirm(t.sidebar.channel_settings.delete_confirm.replace('{{name}}', channel.channel_name))) return;
        if (!workspace_id) return;
        setLoading(true);
        setError(null);
        try {
            const response = await deleteChannel(workspace_id, channel.channel_id);
            if (response.ok) {
                onSuccess();
            } else {
                setError(response.message || t.sidebar.channel_settings.delete_error);
            }
        } catch {
            setError(t.sidebar.channel_settings.conn_error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title={`${t.sidebar.channel_settings.title_prefix} #${channel.channel_name}`} onClose={onClose}>
            <div className="channel-settings-container">
                <div className="settings-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        {t.sidebar.channel_settings.general_tab}
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'delete' ? 'active' : ''}`}
                        onClick={() => setActiveTab('delete')}
                    >
                        {t.sidebar.channel_settings.danger_tab}
                    </button>
                </div>

                <div className="settings-content">
                    {activeTab === 'general' ? (
                        <form className="settings-form" onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>{t.sidebar.channel_settings.name_label}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleChangeInput}
                                    placeholder={t.sidebar.create_channel.name_placeholder}
                                />
                                {errors.name && <span style={{ color: 'var(--error-primary)', fontSize: '13px' }}>{errors.name}</span>}
                            </div>
                            <div className="form-group">
                                <label>{t.sidebar.channel_settings.description_label}</label>
                                <textarea
                                    name="description"
                                    value={formState.description}
                                    onChange={handleChangeInput}
                                    placeholder={t.sidebar.channel_settings.description_placeholder}
                                    rows={4}
                                />
                                {errors.description && <span style={{ color: 'var(--error-primary)', fontSize: '13px' }}>{errors.description}</span>}
                            </div>
                            <div className="form-actions">
                                {error && <span className="error-message">{error}</span>}
                                <button type="button" className="secondary-btn" onClick={onClose} disabled={loading}>{t.common.cancel}</button>
                                <button type="submit" className="primary-btn" disabled={loading}>
                                    {loading ? t.sidebar.channel_settings.saving : t.sidebar.channel_settings.save_changes}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="danger-zone">
                            <div className="danger-info">
                                <h3>{t.sidebar.channel_settings.delete_title} #{channel.channel_name}</h3>
                                <p>{t.sidebar.channel_settings.delete_desc}</p>
                                {error && <span className="error-message" style={{ display: 'block', marginTop: '10px' }}>{error}</span>}
                            </div>
                            <button className="delete-btn" onClick={handleDelete} disabled={loading}>
                                {loading ? t.sidebar.channel_settings.deleting : t.sidebar.channel_settings.delete_btn}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ChannelSettingsModal;
