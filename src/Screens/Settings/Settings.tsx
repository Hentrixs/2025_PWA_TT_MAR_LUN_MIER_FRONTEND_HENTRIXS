import './Settings.css';
import defaultAvatar from '../../assets/default_avatar.png';
import useGetProfile from '../../hooks/useGetProfile/useGetProfile';
import { useState } from 'react';
import ProfileTab from '../../Components/ProfileTab/ProfileTab';
import SecurityTab from '../../Components/SecurityTab/SecurityTab';
import BackButton from '../../Components/BackButton/BackButton';

const Settings = () => {

    const { profile, error, loading, refetchProfile } = useGetProfile();
    const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

    return (
        <div className='settings-screen'>
            <div className='settings-card'>
                <BackButton />
                <header className='settings-header'>
                    <h1>Configuración de Perfil</h1>
                    <p>Administra tu información personal y seguridad</p>
                </header>
                {loading && <h2>Cargando...</h2>}
                {!loading && !error && profile &&
                    <>
                        <div className="settings-tabs-container">
                            <button
                                className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                Perfil
                            </button>
                            <button
                                className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
                                onClick={() => setActiveTab('security')}
                            >
                                Seguridad
                            </button>
                        </div>

                        {activeTab === 'profile' && <ProfileTab profile={profile} avatarUrl={defaultAvatar} onProfileUpdated={refetchProfile} />}

                        {activeTab === 'security' && <SecurityTab />}
                    </>
                }

            </div>
        </div>
    );
};

export default Settings;
