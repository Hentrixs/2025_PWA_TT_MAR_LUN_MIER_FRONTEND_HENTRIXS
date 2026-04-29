import { useState, useEffect } from 'react';
import useForm from '../../hooks/useForm/useForm';
import './CreateChannelModal.css';
import useCreateChannel from '../../hooks/useCreateChannel/useCreateChannel';
import { useWorkspaceContext } from '../../context/WorkspaceContext/WorkspaceContext';
import Modal from '../Modal/Modal';

const CreateChannelModal = ({ onSuccess, onClose }: { onSuccess: () => void, onClose: () => void }) => {

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
            if (!name) return setChannelNameError('Este campo es obligatorio');
            if (name.length < 3) return setChannelNameError('Debe tener al menos 3 caracteres.');
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
        <Modal title="Crear Canal" onClose={onClose}>
            {
                step === 1 && <form className='create-channel-form' onSubmit={handleStep}>
                    <div className='input-group'>
                        <label htmlFor={CREATE_CHANNEL_FORM_FIELDS.CHANNEL_NAME}>Nombre del canal</label>
                        <input type="text" placeholder="# e.g. plan-de-marketing"
                            id={CREATE_CHANNEL_FORM_FIELDS.CHANNEL_NAME}
                            name={CREATE_CHANNEL_FORM_FIELDS.CHANNEL_NAME}
                            value={formState[CREATE_CHANNEL_FORM_FIELDS.CHANNEL_NAME]}
                            onChange={handleChangeInput}
                        />
                        {channelNameError && <span className='error-text'>{channelNameError}</span>}
                    </div>
                    <span className='hint-text'>Los canales son donde ocurren las conversaciones sobre un tema. Usa un nombre que se pueda buscar y comprender fácilmente.</span>
                    <div className='create-channel-form-footer'>
                        <span className='step'>Paso 1 de 2</span>
                        <button type="submit">Siguiente</button>
                    </div>
                </form>
            }
            {
                step === 2 && <form className='create-channel-form' onSubmit={onSubmit}>
                    <div className='input-group'>
                        <label htmlFor={CREATE_CHANNEL_FORM_FIELDS.CHANNEL_DESCRIPTION}>Descripción (opcional)</label>
                        <textarea 
                            id={CREATE_CHANNEL_FORM_FIELDS.CHANNEL_DESCRIPTION}
                            placeholder="# ¿De qué trata este canal?"
                            name={CREATE_CHANNEL_FORM_FIELDS.CHANNEL_DESCRIPTION}
                            value={formState[CREATE_CHANNEL_FORM_FIELDS.CHANNEL_DESCRIPTION]}
                            onChange={handleChangeInput}
                            rows={4}
                        />
                    </div>
                    <div className='create-channel-form-footer'>
                        <span className='step'>Paso 2 de 2</span>
                        <div className='create-channel-btn-container'>
                            <button type="button" onClick={handleStep}>Volver</button>
                            <button type="submit" disabled={loading}>{loading && 'Creando...' || 'Crear'}</button>
                        </div>
                    </div>
                </form>
            }
        </Modal>
    );
};

export default CreateChannelModal;