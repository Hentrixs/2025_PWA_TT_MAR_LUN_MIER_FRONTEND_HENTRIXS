import { Link } from 'react-router-dom';
import type { IWorkspace } from '../../types';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

interface WorkspaceItemProps {
    workspace: IWorkspace;
}

function WorkspaceItem({ workspace }: WorkspaceItemProps) {
    const { t } = useTranslation();

    return (
        <div className='workspace-content-workspace-item'>
            <div className='workspace-content-workspace-info'>
                <div className='workspace-content-logo-placeholder' />
                <Link to={`/workspace/${workspace.workspace_id}`}>
                    <div>
                        <p className='workspace-content-workspace-name'>{workspace.workspace_name}</p>
                        <p className='workspace-content-workspace-meta'>
                            1 {t.workspace_selector.item_member} • {t.workspace_selector.item_activity}
                        </p>
                    </div>
                </Link>
            </div>
            <span className='workspace-content-arrow'>→</span>
        </div>
    );
}

export default WorkspaceItem;
