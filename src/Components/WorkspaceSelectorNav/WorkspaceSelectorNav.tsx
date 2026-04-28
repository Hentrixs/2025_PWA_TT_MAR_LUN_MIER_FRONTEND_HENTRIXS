import { Link, NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useWorkspaceSelectorContext } from '../../context/WorkspaceSelectorContext/WorkspaceSelectorContext';
import './WorkspaceSelectorNav.css';

function WorkspaceSelectorNav() {
    const { isMobile, isNavOpen, setIsNavOpen, handleLogout } = useWorkspaceSelectorContext();

    return (
        <nav className="workspace-nav">
            <Logo className='logo-responsive' showText={true} />
            <div className="workspace-nav-actions">
                {isMobile ? (
                    <div className='workspace-nav-svg-wrapper' onClick={() => setIsNavOpen(!isNavOpen)}>
                        {isNavOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                            </svg>
                        )}
                    </div>
                ) : (
                    <>
                        <ThemeToggle />
                        <Link to="/create-workspace" className='workspace-nav-create-btn'>Crear un espacio de trabajo</Link>
                        <NavLink to="/settings" className="workspace-settings-btn">Ajustes de Perfil</NavLink>
                        <button className="workspace-logout-btn" onClick={handleLogout}>Cerrar sesión</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default WorkspaceSelectorNav;
