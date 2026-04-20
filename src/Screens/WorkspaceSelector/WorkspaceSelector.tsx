import './WorkspaceSelector.css';
import { Link } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import { useContext } from 'react';
import { AuthContext, LOCAL_STORAGE_TOKEN_KEY } from '../../context/AuthContext/AuthContext';
import useWorkspaces from '../../hooks/useWorkspaces/useWorkspaces';

function WorkspaceSelector() {
    const { manageLogout } = useContext(AuthContext);

    const handleLogout = () => {
        manageLogout();
    };

    const { workspaces, response, error, loading } = useWorkspaces();

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userName = tokenPayload?.name ?? 'Usuario';

    return (
        <div className="workspace-selector">
            <nav className="workspace-nav">
                <Logo className='logo-responsive' showText={true} />
                <button className="workspace-logout-btn" onClick={handleLogout}>Cerrar sesión</button>
            </nav>
            <div className="workspace-hero">
                <h1>Bienvenido, {userName}.</h1>
                <p>Elige un espacio de trabajo para comenzar.</p>
            </div>
            <div className="workspace-main">

                <div className='workspace-card-wrapper'>
                    <p className='workspace-card-label'>Mis espacios de trabajo</p>
                    <div className='workspace-card'>
                        <div>
                            <p className='workspace-content-tab'>Espacios de trabajo</p>
                            <hr className='workspace-content-divider' />
                            <p className='workspace-content-section-label'>Listo para iniciar</p>

                            {workspaces && !loading && !error && response && workspaces.map((wk: any, index: number) => {
                                return (
                                    <div className='workspace-content-workspace-item' key={index}>
                                        <div className='workspace-content-workspace-info'>
                                            <div className='workspace-content-logo-placeholder' />
                                            <Link to={`/workspace/${wk.workspace_id}`}>
                                                <div>
                                                    <p className='workspace-content-workspace-name'>{wk.workspace_name}</p>
                                                    <p className='workspace-content-workspace-meta'>1 miembro • Última actividad</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <span className='workspace-content-arrow'>→</span>
                                    </div>

                                )
                            })}

                            {workspaces && workspaces.length === 0 && !loading && !error && response && (
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
                            <p className='workspace-content-footer-text'>¿No encuentras tu espacio de trabajo? <a href="#" className='workspace-content-footer-link'>Prueba con otro correo electrónico</a></p>
                        </div>
                    </div>
                </div>

                <div className='workspace-card-wrapper'>
                    <p className='workspace-card-label'>Empresa 123</p>
                    <div className='workspace-card workspace-card--plan'>
                        <div>
                            <div className='workspace-content-plan-header'>
                                <p className='workspace-content-plan-title'>Tu plan de SlackClone</p>
                                <button className='workspace-content-plan-close'>✕</button>
                            </div>
                            <p className='workspace-content-plan-subtitle'>Ve lo que incluye tu plan.</p>
                        </div>
                        <button className='workspace-content-plan-btn'>✦ Más información</button>
                    </div>
                </div>

                <div className='workspace-card-wrapper workspace-card-wrapper--full'>
                    <div className='workspace-card'>
                        <p>[Card aun no hecha]</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WorkspaceSelector;
