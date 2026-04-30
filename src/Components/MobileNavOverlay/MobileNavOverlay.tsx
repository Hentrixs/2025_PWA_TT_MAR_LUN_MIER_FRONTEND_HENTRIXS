import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { useWorkspaceSelectorContext } from '../../context/WorkspaceSelectorContext/WorkspaceSelectorContext';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';
import './MobileNavOverlay.css';

function MobileNavOverlay() {
    const { t } = useTranslation();
    const { isNavOpen, isMobile, setIsNavOpen, handleLogout } = useWorkspaceSelectorContext();
    const { toggleTheme } = useTheme();

    if (!isNavOpen || !isMobile) return null;

    const close = () => setIsNavOpen(false);

    return (
        <div className="mobile-nav-overlay">
            <Link to="/create-workspace" state={{ from: '/workspace-selector' }} className='mobile-nav-item mobile-create-btn' onClick={close}>
                {t.workspace_selector.nav_create_btn}
            </Link>
            <NavLink to="/settings" className='mobile-nav-item mobile-settings-btn' onClick={close}>
                {t.workspace_selector.nav_settings_btn}
            </NavLink>
            <button id="THEME_TOGGLE_ROW" className="mobile-nav-item" onClick={toggleTheme}>
                <div className="mobile-theme-row">
                    <span>{t.home.change_theme}</span>
                    <ThemeToggle readonly />
                </div>
            </button>
            <button className="mobile-nav-item mobile-logout-btn" onClick={() => { close(); handleLogout(); }}>
                {t.workspace_selector.nav_logout_btn}
            </button>
        </div>
    );
}

export default MobileNavOverlay;
