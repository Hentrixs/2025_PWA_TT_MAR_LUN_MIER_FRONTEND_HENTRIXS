import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { useWorkspaceSelectorContext } from '../../context/WorkspaceSelectorContext/WorkspaceSelectorContext';
import './MobileNavOverlay.css';

function MobileNavOverlay() {
    const { isNavOpen, isMobile, setIsNavOpen, handleLogout } = useWorkspaceSelectorContext();
    const { toggleTheme } = useTheme();

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
            <button id="THEME_TOGGLE_ROW" className="mobile-nav-item" onClick={toggleTheme}>
                <div className="mobile-theme-row">
                    <span>Cambiar Tema</span>
                    <ThemeToggle readonly />
                </div>
            </button>
            <button className="mobile-nav-item mobile-logout-btn" onClick={() => { close(); handleLogout(); }}>
                Cerrar sesión
            </button>
        </div>
    );
}

export default MobileNavOverlay;
