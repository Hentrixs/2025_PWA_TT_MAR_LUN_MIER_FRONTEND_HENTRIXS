import { Link } from 'react-router-dom';
import type { IWorkspace } from '../../types';

interface WorkspaceItemProps {
    workspace: IWorkspace;
}

function WorkspaceItem({ workspace }: WorkspaceItemProps) {
    return (
        <div className='workspace-content-workspace-item'>
            <div className='workspace-content-workspace-info'>
                <div className='workspace-content-logo-placeholder' />
                <Link to={`/workspace/${workspace.workspace_id}`}>
                    <div>
                        <p className='workspace-content-workspace-name'>{workspace.workspace_name}</p>
                        <p className='workspace-content-workspace-meta'>1 miembro • Última actividad</p>
                    </div>
                </Link>
            </div>
            <span className='workspace-content-arrow'>→</span>
        </div>
    );
}

export default WorkspaceItem;
