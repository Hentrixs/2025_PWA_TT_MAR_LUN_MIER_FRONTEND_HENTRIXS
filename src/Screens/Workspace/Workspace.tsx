import './Workspace.css';
import { Outlet } from 'react-router-dom';
import WorkspaceContextProvider from '../../context/WorkspaceContext/WorkspaceContext';
import ChannelContextProvider, { useChannelContext } from '../../context/ChannelContext/ChannelContext';
import OuterSidebar from '../../Components/OuterSidebar/OuterSidebar';
import InnerSidebar from '../../Components/InnerSidebar/InnerSidebar';

function WorkspaceLayout() {
    const { channel_id } = useChannelContext();

    return (
        <div className={`workspace-layout ${channel_id ? 'has-channel' : ''}`}>
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