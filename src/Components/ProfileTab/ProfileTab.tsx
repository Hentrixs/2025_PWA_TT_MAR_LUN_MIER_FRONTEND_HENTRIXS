import React, { useEffect } from 'react';
import useUpdateProfile from '../../hooks/useUpdateProfile/useUpdateProfile';
import useForm from '../../hooks/useForm/useForm';

interface ProfileTabProps {
    profile: any;
    userProfile: {
        url_image: string;
    };
    onProfileUpdated: () => void;
}

const PROFILE_TAB_FIELDS = {
    NAME: 'name',
    DESCRIPTION: 'description',
    URL_IMAGE: 'url_image'
}

const ProfileTab: React.FC<ProfileTabProps> = ({ profile, userProfile, onProfileUpdated }) => {

    const { handleUpdateProfile, loading, response, error } = useUpdateProfile();

    useEffect(() => {
        if (response && response.ok && !error && !loading) {
            onProfileUpdated();
        }
    }, [response, error, loading, onProfileUpdated]);

    const initialFormState = {
        [PROFILE_TAB_FIELDS.NAME]: '',
        [PROFILE_TAB_FIELDS.DESCRIPTION]: '',
        [PROFILE_TAB_FIELDS.URL_IMAGE]: '', // Falta implementar la funcion para cambiar foto, despues vere como hacer un useX para eso
        // de todas formas esto es de muy baja prioridad asi que lo vere al final de todo no ahora.
    };

    const { onSubmit, handleChangeInput, formState } = useForm({
        initialFormState,
        submitFn: () => handleUpdateProfile(formState)
    });

    return (
        <div className='tab-content fade-in'>
            <form onSubmit={onSubmit}>
                <div className='profile-section'>
                    <div className='avatar-container'>
                        <div className='avatar-wrapper'>
                            <img src={userProfile.url_image} alt="Profile" className='profile-avatar' />
                        </div>

                        <div className='img-name-wrapper'>
                            <h1>{profile.user_name}</h1>
                            <span className='change-photo-text'>Cambiar Foto</span>
                        </div>
                    </div>
                </div>

                <div className='settings-form'>
                    <div className='form-group'>
                        <label>Descripción</label>
                        <textarea
                            className='form-group-textarea'
                            name={PROFILE_TAB_FIELDS.DESCRIPTION}
                            value={formState[PROFILE_TAB_FIELDS.DESCRIPTION]}
                            autoComplete='description'
                            onChange={handleChangeInput}
                            disabled={loading}
                            placeholder={profile.user_description || 'Introdusca descripcion Aqui...'}>
                        </textarea>
                    </div>

                    <div className='form-group'>
                        <label>Nombre Completo</label>
                        <input
                            className='form-group-input'
                            name={PROFILE_TAB_FIELDS.NAME}
                            value={formState[PROFILE_TAB_FIELDS.NAME]}
                            type='name'
                            autoComplete='name'
                            onChange={handleChangeInput}
                            disabled={loading}
                            placeholder={profile.user_name || 'Nombre de Usuario'}>
                        </input>
                    </div>

                    <button className='btn-apply-changes' type='submit'>
                        Aplicar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileTab;
