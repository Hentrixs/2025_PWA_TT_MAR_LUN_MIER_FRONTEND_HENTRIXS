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

const InnerSidebar = () => {

    const {
        workspaceDetail,
        isMobile,
        workspace_id,
        members
    } = useWorkspaceContext();

    const {
        channel_list,
        responseChannel,
        loadingChannels,
        errorChannel,
        refetchChannels,
        channel_id
    } = useChannelContext();

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
                        <h2>{workspaceDetail?.title ?? 'Cargando...'}</h2>
                        {/* Dropdown va aqui */}
                    </div>
                    <div className="chevron-container" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-chevron-down ${isDropdownOpen ? 'open' : ''}`} viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
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
                    <p className='channels-title'>Canales</p>
                    {!!responseChannel && channel_list && !loadingChannels && !errorChannel && channel_list.map((channel: IChannel, index: number) => {
                        return (
                            <NavLink to={`/workspace/${workspace_id}/channel/${channel.channel_id}`} className='channel-item' key={channel.channel_id ?? index}># {channel.channel_name}</NavLink>
                        )
                    })}
                </div>
                <button className='create-channel-btn' onClick={() => setIsCreateChannelModalOpen(!isCreateChannelModalOpen)}>Crear Canal</button>
                {isCreateChannelModalOpen && <CreateChannelModal
                    onSuccess={() => { refetchChannels(); setIsCreateChannelModalOpen(false); }}
                    onClose={() => setIsCreateChannelModalOpen(false)}
                />}
            </div>
            <div>
                <p className='channels-title'>Mensajes Directos</p>
                <div className='channel-list'>
                    {members && members.map((member: IMember) => {
                        return (
                            <NavLink to={`/workspace/${workspace_id}/dm/${member.member_id}`} key={member.member_id} className='channel-item'># {member.user_name}</NavLink>
                        )
                    })}
                </div>
                <button className='create-channel-btn' onClick={() => setIsInviteMemberModalOpen(true)}>Invitar a Personas</button>
                {isInviteMemberModalOpen && <InviteMemberModal
                    onClose={() => setIsInviteMemberModalOpen(false)}
                />}
            </div>
            <div>
                <button className='manage-members-btn' onClick={() => setIsManageMembersModalOpen(true)}>Administrar Miembros</button>
                {isManageMembersModalOpen &&
                    <ManageMembersModal onClose={() => setIsManageMembersModalOpen(false)} />
                }
            </div>
        </div>
    );
};

export default InnerSidebar;
