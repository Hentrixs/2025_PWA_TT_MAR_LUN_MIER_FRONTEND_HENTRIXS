import './WorkspaceSelector.css';
import { WorkspaceSelectorProvider, useWorkspaceSelectorContext } from '../../context/WorkspaceSelectorContext/WorkspaceSelectorContext';
import WorkspaceSelectorNav from '../../Components/WorkspaceSelectorNav/WorkspaceSelectorNav';
import MobileNavOverlay from '../../Components/MobileNavOverlay/MobileNavOverlay';
import WorkspaceHero from '../../Components/WorkspaceHero/WorkspaceHero';
import WorkspaceListCard from '../../Components/WorkspaceListCard/WorkspaceListCard';
import WorkspaceSidebar from '../../Components/WorkspaceSidebar/WorkspaceSidebar';
import DiscoverSection from '../../Components/DiscoverSection/DiscoverSection';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal';

function WorkspaceSelectorInner() {
    const { isLogoutModalOpen, setIsLogoutModalOpen, confirmLogout } = useWorkspaceSelectorContext();

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
                    <p>¿Necesitas asistencia?</p>
                    <p>Encuentra la ayuda que necesitas en nuestro <a href="#">Centro de ayuda</a>.</p>
                </footer>
            </div>

            {isLogoutModalOpen && (
                <ConfirmationModal
                    title="Cerrar sesión"
                    message="¿Estás seguro de que quieres cerrar sesión? Tendrás que volver a ingresar tus credenciales para acceder."
                    confirmText="Cerrar sesión"
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
