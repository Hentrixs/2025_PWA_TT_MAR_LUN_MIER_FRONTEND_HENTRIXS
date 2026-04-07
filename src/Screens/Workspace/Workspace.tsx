import './Workspace.css';
import useWorkspaces from '../../hooks/useWorkspaces/useWorkspaces';
import useWorkspace from '../../hooks/useWorkspace/useWorkspace';
import useChannel from '../../hooks/useChannel/useChannel';
import { Link, Navigate, NavLink, Outlet, useParams } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../context/AuthContext/AuthContext';

function Workspace() {
    const { workspace_id } = useParams();

    const {
        workspaces,
        loading: loadingWorkspaces,
        error: errorWorkspaces,
        response: responseWorkspaces
    } = useWorkspaces();

    const { workspace, members } = useWorkspace(workspace_id ?? '');

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const activeMember = members?.find((m: any) => m.user_id === tokenPayload?.id);

    const {
        channel_list,
        loading: loadingChannels,
        error: errorChannel,
        response: responseChannel
    } = useChannel(workspace_id ?? '');

    /*
        El replace hace que no quede /workspace en el historial del browser — si el usuario aprieta "atrás"
        no vuelve a /workspace y se queda en un loop.
    */
    if (!workspace_id && workspaces && workspaces.length > 0) {
        return <Navigate to={`/workspace/${workspaces[0]._id}`} replace />
    };

    return (
        <div className='workspace-layout'>
            <div className='outer-sidebar'>
                {responseWorkspaces && workspaces && Array.isArray(workspaces) && !loadingWorkspaces && !errorWorkspaces && workspaces.map((wk: any, index: number) => (
                    <Link to={`/workspace/${wk._id}`} key={wk._id ?? index} className='workspace-icon'>
                        <p>{(wk.name || 'W').charAt(0).toUpperCase()}</p>
                    </Link>
                ))}
            </div>
            <div className='inner-sidebar'>
                <h2>{workspace?.title ?? 'Cargando...'}</h2>

                <div className='channel-list'>
                    <p className='channels-title'>Canales</p>
                    {responseChannel && channel_list && !loadingChannels && !errorChannel && channel_list.map((channel: any, index: number) => {
                        return (
                            <NavLink to={`/workspace/${workspace_id}/channel/${channel._id}`} className='channel-item' key={channel._id ?? index}># {channel.name}</NavLink>
                        )
                    })}
                </div>
            </div>
            <Outlet context={{ member_id: activeMember?.member_id, channel_list }}/>
        </div>
    )
}

export default Workspace