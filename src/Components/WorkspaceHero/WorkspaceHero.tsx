import { useWorkspaceSelectorContext } from '../../context/WorkspaceSelectorContext/WorkspaceSelectorContext';
import './WorkspaceHero.css';

function WorkspaceHero() {
    const { userName } = useWorkspaceSelectorContext();

    return (
        <div className="workspace-hero">
            <h1>Bienvenido, {userName}.</h1>
            <p>Elige un espacio de trabajo para comenzar.</p>
        </div>
    );
}

export default WorkspaceHero;
