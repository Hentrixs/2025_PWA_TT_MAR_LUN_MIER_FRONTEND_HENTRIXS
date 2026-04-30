import './WorkspaceSelector.css';
import { WorkspaceSelectorProvider, useWorkspaceSelectorContext } from '../../context/WorkspaceSelectorContext/WorkspaceSelectorContext';
import WorkspaceSelectorNav from '../../Components/WorkspaceSelectorNav/WorkspaceSelectorNav';
import MobileNavOverlay from '../../Components/MobileNavOverlay/MobileNavOverlay';
import WorkspaceHero from '../../Components/WorkspaceHero/WorkspaceHero';
import WorkspaceListCard from '../../Components/WorkspaceListCard/WorkspaceListCard';
import WorkspaceSidebar from '../../Components/WorkspaceSidebar/WorkspaceSidebar';
import DiscoverSection from '../../Components/DiscoverSection/DiscoverSection';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal';

import { useTranslation } from '../../context/LanguageContext/LanguageContext';

function WorkspaceSelectorInner() {
    const { isLogoutModalOpen, setIsLogoutModalOpen, confirmLogout } = useWorkspaceSelectorContext();
    const { t } = useTranslation();

    return (
        <div className="workspace-selector">
            <header className="workspace-header-sticky">
                <WorkspaceSelectorNav />
                <MobileNavOverlay />
            </header>
            <WorkspaceHero />

            <div className="workspace-main">
                <div className="workspace-main-top">
                    <WorkspaceListCard />
                    <WorkspaceSidebar />
                </div>
                <DiscoverSection />
                <footer className="workspace-footer">
                    <p>{t.workspace_selector.footer_help}</p>
                    <p>{t.workspace_selector.footer_center} <a href="#">{t.workspace_selector.footer_link}</a>.</p>
                </footer>
            </div>

            {isLogoutModalOpen && (
                <ConfirmationModal
                    title={t.workspace_selector.logout_modal_title}
                    message={t.workspace_selector.logout_modal_message}
                    confirmText={t.workspace_selector.logout_modal_confirm}
                    onConfirm={confirmLogout}
                    onCancel={() => setIsLogoutModalOpen(false)}
                    isDanger={true}
                />
            )}
        </div>
    );
}

function WorkspaceSelector() {
    return (
        <WorkspaceSelectorProvider>
            <WorkspaceSelectorInner />
        </WorkspaceSelectorProvider>
    );
}

export default WorkspaceSelector;
