import { Link, NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import { useWorkspaceSelectorContext } from '../../context/WorkspaceSelectorContext/WorkspaceSelectorContext';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';
import './WorkspaceSelectorNav.css';

function WorkspaceSelectorNav() {
    const { isMobile, isNavOpen, setIsNavOpen, handleLogout } = useWorkspaceSelectorContext();
    const { t } = useTranslation();

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
                        <LanguageToggle />
                        <ThemeToggle />
                        <Link to="/create-workspace" state={{ from: '/workspace-selector' }} className='workspace-nav-create-btn'>{t.workspace_selector.nav_create_btn}</Link>
                        <NavLink to="/settings" className="workspace-settings-btn">{t.workspace_selector.nav_settings_btn}</NavLink>
                        <button className="workspace-logout-btn" onClick={handleLogout}>{t.workspace_selector.nav_logout_btn}</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default WorkspaceSelectorNav;
