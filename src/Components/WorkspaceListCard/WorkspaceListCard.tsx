import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { useWorkspaceSelectorContext } from '../../context/WorkspaceSelectorContext/WorkspaceSelectorContext';
import WorkspaceItem from './WorkspaceItem';
import type { IWorkspace } from '../../types';
import './WorkspaceListCard.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function WorkspaceListCard() {
    const { workspaces, loading, error, response } = useWorkspaceSelectorContext();
    const { manageLogout } = useContext(AuthContext);

    const handleSwitchEmail = (e: React.MouseEvent) => {
        e.preventDefault();
        manageLogout();
    };

    return (
        <div className='workspace-card-wrapper main-card'>
            <div className="main-card-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" />
                </svg>
                <p className='workspace-card-label'>Mis espacios de trabajo</p>
            </div>

            <div className='workspace-card'>
                <div>
                    <p className='workspace-content-tab'>Espacios de trabajo</p>
                    <hr className='workspace-content-divider' />
                    <p className='workspace-content-section-label'>Listo para iniciar</p>

                    {loading && <LoadingScreen isFullPage={false} message="Buscando tus espacios..." />}

                    {workspaces && !loading && !error && !!response && workspaces.map((wk: IWorkspace, index: number) => (
                        <WorkspaceItem key={index} workspace={wk} />
                    ))}

                    {workspaces && workspaces.length === 0 && !loading && !error && !!response && (
                        <div className='workspace-empty-state'>
                            <div className='workspace-empty-icon'>📂</div>
                            <p className='empty-state-title'>No tienes espacios de trabajo</p>
                            <p className='empty-state-text'>Parece que aún no eres miembro de ningún espacio. Crea uno nuevo para empezar a colaborar.</p>
                            <Link to="/create-workspace" className='empty-state-btn'>Crear mi primer espacio</Link>
                        </div>
                    )}
                </div>

                <div>
                    <hr className='workspace-content-divider' />
                    <Link to="/create-workspace" className='workspace-content-footer-link'>Crear un nuevo espacio de trabajo</Link>
                    <p className='workspace-content-footer-text'>¿No encuentras tu espacio de trabajo? <a href="/login" onClick={handleSwitchEmail} className='workspace-content-footer-link'>Prueba con otro correo electrónico</a></p>
                </div>
            </div>
        </div>
    );
}

export default WorkspaceListCard;
