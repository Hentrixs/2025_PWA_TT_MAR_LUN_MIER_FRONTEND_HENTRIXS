import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useWorkspaceSelectorContext } from '../../context/WorkspaceSelectorContext/WorkspaceSelectorContext';
import './MobileNavOverlay.css';

function MobileNavOverlay() {
    const { isNavOpen, isMobile, setIsNavOpen, handleLogout } = useWorkspaceSelectorContext();

    if (!isNavOpen || !isMobile) return null;

    const close = () => setIsNavOpen(false);

    return (
        <div className="mobile-nav-overlay">
            <Link to="/create-workspace" className='mobile-nav-item mobile-create-btn' onClick={close}>
                Crear un espacio de trabajo
            </Link>
            <NavLink to="/settings" className='mobile-nav-item mobile-settings-btn' onClick={close}>
                Ajustes de Perfil
            </NavLink>
            <div className="mobile-nav-item">
                <div className="mobile-theme-row">
                    <span>Cambiar Tema</span>
                    <ThemeToggle />
                </div>
            </div>
            <button className="mobile-nav-item mobile-logout-btn" onClick={() => { close(); handleLogout(); }}>
                Cerrar sesión
            </button>
        </div>
    );
}

export default MobileNavOverlay;
