import './Workspace.css';
import { NavLink, Navigate, Outlet, useParams } from 'react-router-dom';
import WorkspaceContextProvider, { useWorkspaceContext } from '../../context/WorkspaceContext/WorkspaceContext';
import CreateChannel from "../../Components/CreateChannel/CreateChannel";
import { useState } from 'react';
import InviteMemberModal from '../../Components/InviteMemberModal/InviteMemberModal';

function WorkspaceLayout() {
    const {
        workspace,
        workspaces,
        loadingWorkspaces,
        errorWorkspaces,
        responseWorkspaces,
        isMobile,
        channel_list,
        loadingChannels,
        errorChannel,
        responseChannel,
        refetchChannels
    } = useWorkspaceContext();

    const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] = useState(false);
    const { workspace_id, channel_id } = useParams();

    const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] = useState(false);

    if (!workspace_id && workspaces && workspaces.length > 0) {
        return <Navigate to={`/workspace/${workspaces[0].workspace_id}`} replace />
    };

    if (!isMobile && workspace_id && !channel_id && channel_list && channel_list.length > 0) {
        return <Navigate to={`/workspace/${workspace_id}/channel/${channel_list[0].channel_id}`} replace />
    };

    return (
        <div className={`workspace-layout ${channel_id ? 'has-channel' : ''}`}>

            <div className='outer-sidebar'>
                {responseWorkspaces && workspaces && Array.isArray(workspaces) && !loadingWorkspaces && !errorWorkspaces && workspaces.map((wk: any, index: number) => (
                    <NavLink to={`/workspace/${wk.workspace_id}`} key={wk.workspace_id ?? index} className='workspace-icon'>
                        <p>{(wk.workspace_name || 'W').charAt(0).toUpperCase()}</p>
                    </NavLink>
                ))}
            </div>

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
                    {isCreateChannelModalOpen && <CreateChannel
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
            </div>
            <Outlet />
        </div>
    );
};

function Workspace() {
    return (
        <WorkspaceContextProvider>
            <WorkspaceLayout />
        </WorkspaceContextProvider>
    );
};

export default Workspace;