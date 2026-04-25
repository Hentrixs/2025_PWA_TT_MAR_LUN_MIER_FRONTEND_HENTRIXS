import './WorkspaceSelector.css';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import { useContext } from 'react';
import { AuthContext, LOCAL_STORAGE_TOKEN_KEY } from '../../context/AuthContext/AuthContext';
import useWorkspaces from '../../hooks/useWorkspaces/useWorkspaces';
import type { IWorkspace } from '../../types';

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
                <div className="workspace-nav-actions">
                    <Link to="/create-workspace" className='workspace-nav-create-btn'>Crear un espacio de trabajo</Link>
                    <NavLink to={'/settings'} className='workspace-nav-settings-gear'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg>
                    </NavLink>
                    <button className="workspace-logout-btn" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            </nav>
            <div className="workspace-hero">
                <h1>Bienvenido, {userName}.</h1>
                <p>Elige un espacio de trabajo para comenzar.</p>
            </div>
            <div className="workspace-main">
                <div className="workspace-main-top">
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

                                {workspaces && !loading && !error && !!response && workspaces.map((wk: IWorkspace, index: number) => {
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

                    <aside className="workspace-sidebar">
                        <div className="sidebar-group-label">
                            <div className="mini-logo"></div>
                            <span>{workspaces?.[0]?.workspace_name ?? 'Empresa123'}</span>
                        </div>

                        <div className="sidebar-card">
                            <div className="sidebar-card-content">
                                <div className="sidebar-card-text">
                                    <h3>Invita a tu equipo: ¡es gratis!</h3>
                                    <p>Slack funciona mejor en grupo.</p>
                                    <button className="sidebar-btn-outline">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                        </svg>
                                        Invita compañeros de equipo
                                    </button>
                                </div>
                                <div className="sidebar-card-icon-illustration purple">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M15.854.146a.5.5 0 0 1 .11.54L13.02 14.82a.5.5 0 0 1-.917.11L9.417 9.417l-5.513-2.686a.5.5 0 0 1 .11-.917L15.314.036a.5.5 0 0 1 .54.11zM6.782 9.282l6.62-6.62L1.809 3.012z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="sidebar-card">
                            <div className="sidebar-card-content">
                                <div className="sidebar-card-text">
                                    <h3>Háblalo en tiempo real.</h3>
                                    <p>Conéctate a través de audio o video.</p>
                                    <button className="sidebar-btn-outline">Iniciar una junta</button>
                                </div>
                                <div className="sidebar-card-icon-illustration pink">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="workspace-discover-section">
                    <div className="discover-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 16a6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 1 2-2 1 1 0 0 1 1-1h1a1 1 0 0 1 1 1 2 2 0 0 1 2 2 4 4 0 0 1 4 4 6 6 0 0 1-6 6z" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                        </svg>
                        <h3>Descubre más</h3>
                    </div>
                    <div className="discover-grid">
                        <div className="discover-card">
                            <div className="discover-card-info">
                                <h4>Descargar Slack para Windows</h4>
                                <p>Mantente al día con las notificaciones.</p>
                                <button className="discover-btn">Descargar aplicación</button>
                            </div>
                            <div className="discover-card-img blue">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                </svg>
                            </div>
                        </div>

                        <div className="discover-card">
                            <div className="discover-card-info">
                                <h4>Conecta tus aplicaciones.</h4>
                                <p>Elige entre más de 2600 aplicaciones o crea la tuya propia.</p>
                                <button className="discover-btn">Explorar aplicaciones</button>
                            </div>
                            <div className="discover-card-img green">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.5 0c-.703 0-1.274.571-1.274 1.274v1.549c0 .703.571 1.274 1.274 1.274h1.549c.703 0 1.274-.571 1.274-1.274v-1.549C5.323.571 4.752 0 4.049 0zm1.549 3.031h-1.549v-1.549h1.549zM2.5 10.677c-.703 0-1.274.571-1.274 1.274v1.549c0 .703.571 1.274 1.274 1.274h1.549c.703 0 1.274-.571 1.274-1.274v-1.549c0-.703-.571-1.274-1.274-1.274zm1.549 3.03h-1.549v-1.548h1.549zM10.677 2.5c0-.703.571-1.274 1.274-1.274h1.549c.703 0 1.274.571 1.274 1.274v1.549c0 .703-.571 1.274-1.274 1.274h-1.549c-.703 0-1.274-.571-1.274-1.274zm3.031 1.549v-1.549h-1.549v1.549zM10.677 10.677c0-.703.571-1.274 1.274-1.274h1.549c.703 0 1.274.571 1.274 1.274v1.549c0 .703-.571 1.274-1.274 1.274h-1.549c-.703 0-1.274-.571-1.274-1.274zm3.031 3.03h-1.549v-1.548h1.549z" />
                                </svg>
                            </div>
                        </div>

                        <div className="discover-card">
                            <div className="discover-card-info">
                                <h4>Novedades de Slack</h4>
                                <p>Descubre ahora las nuevas funciones disponibles.</p>
                                <button className="discover-btn">Más información</button>
                            </div>
                            <div className="discover-card-img orange">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3 2.5a.5.5 0 0 1 .5-.5L4 2h.5a.5.5 0 0 1 0 1h-.42l.393.303a.5.5 0 1 1-.617.788L3.5 3.82V14.5a.5.5 0 0 1-1 0V3.82l-.356.271a.5.5 0 0 1-.617-.788L1.921 3h-.42a.5.5 0 0 1 0-1H2l.5.5a.5.5 0 0 1 .5 0" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="workspace-footer">
                    <p>¿Necesitas asistencia?</p>
                    <p>Encuentra la ayuda que necesitas en nuestro <a href="#">Centro de ayuda</a>.</p>
                </footer>
            </div>
        </div>
    );
};

export default WorkspaceSelector;
