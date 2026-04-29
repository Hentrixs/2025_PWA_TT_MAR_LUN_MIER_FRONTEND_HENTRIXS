import './Workspace.css';
import { Outlet, useMatch } from 'react-router-dom';
import WorkspaceContextProvider, { useWorkspaceContext } from '../../context/WorkspaceContext/WorkspaceContext';
import ChannelContextProvider, { useChannelContext } from '../../context/ChannelContext/ChannelContext';
import OuterSidebar from '../../Components/OuterSidebar/OuterSidebar';
import InnerSidebar from '../../Components/InnerSidebar/InnerSidebar';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import useVisualViewport from '../../hooks/useVisualViewport/useVisualViewport';


function WorkspaceLayout() {
    const { channel_id, loadingChannels } = useChannelContext();
    const { loadingWorkspaces, loadingWorkspace } = useWorkspaceContext();

    const isDmRoute = useMatch('/workspace/:workspace_id/dm/:member_id');
    const viewportHeight = useVisualViewport();

    const isInitialLoading = loadingWorkspace || loadingWorkspaces || loadingChannels;

    if (isInitialLoading) {
        return <LoadingScreen message="Cargando tu espacio..." />;
    };

    return (
        <div
            className={`workspace-layout ${channel_id || isDmRoute ? 'has-channel' : ''}`}
            style={{ height: `${viewportHeight}px` }}
        >
            <OuterSidebar />
            <InnerSidebar />
            <Outlet />
        </div>
    );
};

function Workspace() {
    return (
        <WorkspaceContextProvider>
            <ChannelContextProvider>
                <WorkspaceLayout />
            </ChannelContextProvider>
        </WorkspaceContextProvider>
    );
};

export default Workspace;