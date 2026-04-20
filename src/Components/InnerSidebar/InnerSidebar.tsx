import { Navigate, NavLink } from 'react-router-dom';
import { useWorkspaceContext } from '../../context/WorkspaceContext/WorkspaceContext';
import { useChannelContext } from '../../context/ChannelContext/ChannelContext';
import './InnerSidebar.css';
import { useState } from 'react';
import CreateChannelModal from '../CreateChannelModal/CreateChannelModal';
import InviteMemberModal from '../InviteMemberModal/InviteMemberModal';
import ManageMembersModal from '../ManageMembersModal/ManageMembersModal';

const InnerSidebar = () => {

    const {
        workspace,
        isMobile,
        workspace_id
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

    if (!isMobile && workspace_id && !channel_id && channel_list && channel_list.length > 0) {
        return <Navigate to={`/workspace/${workspace_id}/channel/${channel_list[0].channel_id}`} replace />
    };

    return (
        <div className='inner-sidebar'>
            <div>
                <h2>{workspace?.workspace_name ?? 'Cargando...'}</h2>

                <div className='channel-list'>
                    <p className='channels-title'>Canales</p>
                    {responseChannel && channel_list && !loadingChannels && !errorChannel && channel_list.map((channel: any, index: number) => {
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
