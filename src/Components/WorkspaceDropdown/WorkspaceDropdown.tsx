import './WorkspaceDropdown.css';

interface WorkspaceDropdownProps {
    onClose: () => void;
    onOpenSettings: () => void;
}

const WorkspaceDropdown = ({ onClose, onOpenSettings }: WorkspaceDropdownProps) => {
    return (
        <div className="workspace-dropdown-overlay" onClick={onClose}>
            <div className="workspace-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                <button className="dropdown-item" onClick={() => { onOpenSettings(); onClose(); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.14.474a.502.502 0 0 1-.608.304l-.477-.133c-1.39-.388-2.82.572-2.82 1.943l.054.493a.502.502 0 0 1-.306.607l-.475.14c-1.399.413-1.399 2.397 0 2.81l.475.14a.502.502 0 0 1 .306.608l-.054.493c0 1.371 1.43 2.331 2.82 1.943l.477-.133a.502.502 0 0 1 .608.304l.14.474c.413 1.399 2.397 1.399 2.81 0l.14-.474a.502.502 0 0 1 .608-.304l.477.133c1.39.388 2.82-.572 2.82-1.943l-.054-.493a.502.502 0 0 1 .306-.607l.475-.14c1.399-.413 1.399-2.397 0-2.81l-.475-.14a.502.502 0 0 1-.306-.608l.054-.493c0-1.371-1.43-2.331-2.82-1.943l-.477.133a.502.502 0 0 1-.608-.304l-.14-.474zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                    Configuración de Workspace
                </button>
            </div>
        </div>
    );
};

export default WorkspaceDropdown;
