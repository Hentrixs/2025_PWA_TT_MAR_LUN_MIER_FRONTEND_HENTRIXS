import { Navigate, NavLink } from 'react-router-dom';
import { useWorkspaceContext } from '../../context/WorkspaceContext/WorkspaceContext';
import './OuterSidebar.css';

const OuterSidebar = () => {

    const { responseWorkspaces, workspaces, loadingWorkspaces, errorWorkspaces, workspace_id } = useWorkspaceContext();

    if (!workspace_id && workspaces && workspaces.length > 0) {
        return <Navigate to={`/workspace/${workspaces[0].workspace_id}`} replace />
    };

    return (
        <div className='outer-sidebar'>
            {responseWorkspaces && workspaces && Array.isArray(workspaces) && !loadingWorkspaces && !errorWorkspaces && workspaces.map((wk: any, index: number) => (
                <NavLink to={`/workspace/${wk.workspace_id}`} key={wk.workspace_id ?? index} className='workspace-icon'>
                    <p>{(wk.workspace_name || 'W').charAt(0).toUpperCase()}</p>
                </NavLink>
            ))}
        </div>
    );
};

export default OuterSidebar;