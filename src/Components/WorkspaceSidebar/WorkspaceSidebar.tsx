import { useWorkspaceSelectorContext } from '../../context/WorkspaceSelectorContext/WorkspaceSelectorContext';
import SidebarPromoCard from '../SidebarPromoCard/SidebarPromoCard';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';
import './WorkspaceSidebar.css';

const inviteIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
        <path d="M15.854.146a.5.5 0 0 1 .11.54L13.02 14.82a.5.5 0 0 1-.917.11L9.417 9.417l-5.513-2.686a.5.5 0 0 1 .11-.917L15.314.036a.5.5 0 0 1 .54.11zM6.782 9.282l6.62-6.62L1.809 3.012z" />
    </svg>
);

const callIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5" />
    </svg>
);

const addPersonIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
    </svg>
);

function WorkspaceSidebar() {
    const { t } = useTranslation();
    const { workspaces } = useWorkspaceSelectorContext();
    const firstWorkspaceName = workspaces?.[0]?.workspace_name ?? 'Empresa123';

    return (
        <aside className="workspace-sidebar">
            <div className="sidebar-group-label">
                <div className="mini-logo"></div>
                <span>{firstWorkspaceName}</span>
            </div>

            <SidebarPromoCard
                title={t.workspace_selector.sidebar_invite_title}
                subtitle={t.workspace_selector.sidebar_invite_subtitle}
                buttonText={t.workspace_selector.sidebar_invite_btn}
                buttonIcon={addPersonIcon}
                iconColor="purple"
                icon={inviteIcon}
            />

            <SidebarPromoCard
                title={t.workspace_selector.sidebar_talk_title}
                subtitle={t.workspace_selector.sidebar_talk_subtitle}
                buttonText={t.workspace_selector.sidebar_talk_btn}
                iconColor="pink"
                icon={callIcon}
            />
        </aside>
    );
}

export default WorkspaceSidebar;
