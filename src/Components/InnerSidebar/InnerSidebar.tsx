import { Navigate, NavLink, useMatch } from 'react-router-dom';
import { useWorkspaceContext } from '../../context/WorkspaceContext/WorkspaceContext';
import { useChannelContext } from '../../context/ChannelContext/ChannelContext';
import type { IChannel, IMember } from '../../types';
import './InnerSidebar.css';
import { useState } from 'react';
import CreateChannelModal from '../CreateChannelModal/CreateChannelModal';
import InviteMemberModal from '../InviteMemberModal/InviteMemberModal';
import ManageMembersModal from '../ManageMembersModal/ManageMembersModal';
import WorkspaceDropdown from '../WorkspaceDropdown/WorkspaceDropdown';
import WorkspaceSettingsModal from '../WorkspaceSettingsModal/WorkspaceSettingsModal';
import ChannelSettingsModal from '../ChannelSettingsModal/ChannelSettingsModal';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

const InnerSidebar = () => {
    const { t } = useTranslation();

    const {
        workspaceDetail,
        isMobile,
        workspace_id,
        members,
        activeMember
    } = useWorkspaceContext();

    const {
        channel_list,
        responseChannel,
        loadingChannels,
        errorChannel,
        refetchChannels,
        channel_id
    } = useChannelContext();

    const isAdminOrOwner = activeMember?.member_role === 'owner' || activeMember?.member_role === 'admin';

    const [channelSettingsTarget, setChannelSettingsTarget] = useState<IChannel | null>(null);
    const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] = useState(false);
    const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] = useState(false);
    const [isManageMembersModalOpen, setIsManageMembersModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const isDmRoute = useMatch('/workspace/:workspace_id/dm/:member_id');

    if (!isMobile && workspace_id && !channel_id && !isDmRoute && channel_list && channel_list.length > 0) {
        return <Navigate to={`/workspace/${workspace_id}/channel/${channel_list[0].channel_id}`} replace />
    };

    return (
        <div className='inner-sidebar'>
            <div>
                <div className='workspace-title'>
                    <div>
                        <h2>{workspaceDetail?.title ?? t.sidebar.loading_workspace}</h2>
                    </div>
                    <div className="chevron-container" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-chevron-down ${isDropdownOpen ? 'open' : ''}`} viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                    </div>

                    <div className="sidebar-theme-toggle-wrapper">
                        <ThemeToggle />
                    </div>

                    {isDropdownOpen && (
                        <WorkspaceDropdown
                            onClose={() => setIsDropdownOpen(false)}
                            onOpenSettings={() => setIsSettingsModalOpen(true)}
                        />
                    )}
                </div>

                {isSettingsModalOpen && (
                    <WorkspaceSettingsModal
                        onClose={() => setIsSettingsModalOpen(false)}
                    />
                )}

                <div className='channel-list'>
                    <p className='channels-title'>{t.sidebar.channels}</p>

                    {!!responseChannel && channel_list && !loadingChannels && !errorChannel && channel_list.map((channel: IChannel, index: number) => (
                        <div key={channel.channel_id ?? index} className='channel-item-wrapper'>
                            <NavLink to={`/workspace/${workspace_id}/channel/${channel.channel_id}`} className='channel-item'># {channel.channel_name}</NavLink>
                            {isAdminOrOwner && (
                                <button className='channel-gear-btn' onClick={() => setChannelSettingsTarget(channel)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}

                </div>

                <button className='create-channel-btn' onClick={() => setIsCreateChannelModalOpen(!isCreateChannelModalOpen)}>{t.sidebar.add_channel}</button>

                {isCreateChannelModalOpen && <CreateChannelModal
                    onSuccess={() => { refetchChannels(); setIsCreateChannelModalOpen(false); }}
                    onClose={() => setIsCreateChannelModalOpen(false)}
                />}

                {channelSettingsTarget && (
                    <ChannelSettingsModal
                        channel={channelSettingsTarget}
                        onClose={() => setChannelSettingsTarget(null)}
                        onSuccess={() => { refetchChannels(); setChannelSettingsTarget(null); }}
                    />
                )}

            </div>
            <div>

                <p className='channels-title'>{t.sidebar.direct_messages}</p>
                <div className='channel-list'>
                    {members && members.map((member: IMember) => {
                        return (
                            <NavLink to={`/workspace/${workspace_id}/dm/${member.member_id}`} key={member.member_id} className='channel-item'># {member.user_name}</NavLink>
                        )
                    })}
                </div>

                <button className='create-channel-btn' onClick={() => setIsInviteMemberModalOpen(true)}>{t.sidebar.invite_members}</button>
                {isInviteMemberModalOpen && <InviteMemberModal
                    onClose={() => setIsInviteMemberModalOpen(false)}
                />}

            </div>

            <div>
                <button className='manage-members-btn' onClick={() => setIsManageMembersModalOpen(true)}>{t.sidebar.manage_members}</button>
                {isManageMembersModalOpen &&
                    <ManageMembersModal onClose={() => setIsManageMembersModalOpen(false)} />
                }
            </div>

        </div>
    );
};

export default InnerSidebar;
