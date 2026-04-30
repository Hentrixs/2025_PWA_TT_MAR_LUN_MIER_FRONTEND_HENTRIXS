import './Settings.css';
import defaultAvatar from '../../assets/default_avatar.png';
import useGetProfile from '../../hooks/useGetProfile/useGetProfile';
import { useState } from 'react';
import ProfileTab from '../../Components/ProfileTab/ProfileTab';
import SecurityTab from '../../Components/SecurityTab/SecurityTab';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import BackButton from '../../Components/BackButton/BackButton';
import PreferencesTab from '../../Components/PreferencesTab/PreferencesTab';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

const Settings = () => {
    const { t } = useTranslation();
    const { profile, error, loading, refetchProfile } = useGetProfile();
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');

    return (
        <div className='settings-screen'>
            <div className='settings-card'>
                <BackButton />
                <header className='settings-header'>
                    <h1>{t.settings.title}</h1>
                    <p>{t.settings.subtitle}</p>
                </header>
                {loading && <LoadingScreen isFullPage={false} message={t.settings.loading_profile} />}
                {!loading && !error && profile &&
                    <>
                        <div className="settings-tabs-container">
                            <button
                                className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                {t.settings.profile_tab}
                            </button>
                            <button
                                className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
                                onClick={() => setActiveTab('security')}
                            >
                                {t.settings.security_tab}
                            </button>
                            <button
                                className={`settings-tab ${activeTab === 'preferences' ? 'active' : ''}`}
                                onClick={() => setActiveTab('preferences')}
                            >
                                {t.settings.preferences_tab}
                            </button>
                        </div>

                        {activeTab === 'profile' && <ProfileTab profile={profile} avatarUrl={defaultAvatar} onProfileUpdated={refetchProfile} />}

                        {activeTab === 'security' && <SecurityTab />}

                        {activeTab === 'preferences' && <PreferencesTab />}
                    </>
                }

            </div>
        </div>
    );
};

export default Settings;
