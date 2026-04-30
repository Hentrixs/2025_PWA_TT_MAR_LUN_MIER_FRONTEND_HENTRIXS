import { useState, useEffect } from 'react';
import useForm from '../../hooks/useForm/useForm';
import './CreateChannelModal.css';
import useCreateChannel from '../../hooks/useCreateChannel/useCreateChannel';
import { useWorkspaceContext } from '../../context/WorkspaceContext/WorkspaceContext';
import Modal from '../Modal/Modal';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

const CreateChannelModal = ({ onSuccess, onClose }: { onSuccess: () => void, onClose: () => void }) => {
    const { t } = useTranslation();
    const { workspace_id } = useWorkspaceContext();
    const { createChannelSubmit, response, loading } = useCreateChannel(workspace_id);

    const [step, setStep] = useState(1);
    const [channelNameError, setChannelNameError] = useState<string | null>(null);

    const CREATE_CHANNEL_FORM_FIELDS = {
        CHANNEL_NAME: 'channel_name',
        CHANNEL_DESCRIPTION: 'channel_description'
    };

    const initialFormState = {
        [CREATE_CHANNEL_FORM_FIELDS.CHANNEL_NAME]: '',
        [CREATE_CHANNEL_FORM_FIELDS.CHANNEL_DESCRIPTION]: ''
    };

    const { handleChangeInput, onSubmit, formState } = useForm({
        initialFormState,
        submitFn: createChannelSubmit
    });

    const handleStep = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (step === 1) {
            const name = formState[CREATE_CHANNEL_FORM_FIELDS.CHANNEL_NAME].trim();
            if (!name) return setChannelNameError(t.sidebar.create_channel.name_error_required);
            if (name.length < 3) return setChannelNameError(t.sidebar.create_channel.name_error_min);
            setChannelNameError(null);
        }
        setStep(step === 1 ? 2 : 1);
    };

    useEffect(() => {
        if (response && response.ok) {
            onSuccess();
        }
    }, [response, onSuccess]);

    return (
        <Modal title={t.sidebar.create_channel.title} onClose={onClose}>
            {
                step === 1 && <form className='create-channel-form' onSubmit={handleStep}>
                    <div className='input-group'>
                        <label htmlFor={CREATE_CHANNEL_FORM_FIELDS.CHANNEL_NAME}>{t.sidebar.create_channel.name_label}</label>
                        <input type="text" placeholder={t.sidebar.create_channel.name_placeholder}
                            id={CREATE_CHANNEL_FORM_FIELDS.CHANNEL_NAME}
                            name={CREATE_CHANNEL_FORM_FIELDS.CHANNEL_NAME}
                            value={formState[CREATE_CHANNEL_FORM_FIELDS.CHANNEL_NAME]}
                            onChange={handleChangeInput}
                        />
                        {channelNameError && <span className='error-text'>{channelNameError}</span>}
                    </div>
                    <span className='hint-text'>{t.sidebar.create_channel.hint}</span>
                    <div className='create-channel-form-footer'>
                        <span className='step'>{t.sidebar.create_channel.step_1}</span>
                        <button type="submit">{t.common.next}</button>
                    </div>
                </form>
            }
            {
                step === 2 && <form className='create-channel-form' onSubmit={onSubmit}>
                    <div className='input-group'>
                        <label htmlFor={CREATE_CHANNEL_FORM_FIELDS.CHANNEL_DESCRIPTION}>{t.sidebar.create_channel.description_label}</label>
                        <textarea 
                            id={CREATE_CHANNEL_FORM_FIELDS.CHANNEL_DESCRIPTION}
                            placeholder={t.sidebar.create_channel.description_placeholder}
                            name={CREATE_CHANNEL_FORM_FIELDS.CHANNEL_DESCRIPTION}
                            value={formState[CREATE_CHANNEL_FORM_FIELDS.CHANNEL_DESCRIPTION]}
                            onChange={handleChangeInput}
                            rows={4}
                        />
                    </div>
                    <div className='create-channel-form-footer'>
                        <span className='step'>{t.sidebar.create_channel.step_2}</span>
                        <div className='create-channel-btn-container'>
                            <button type="button" onClick={handleStep}>{t.common.back}</button>
                            <button type="submit" disabled={loading}>{loading ? t.sidebar.create_channel.creating : t.sidebar.create_channel.create_btn}</button>
                        </div>
                    </div>
                </form>
            }
        </Modal>
    );
};

export default CreateChannelModal;