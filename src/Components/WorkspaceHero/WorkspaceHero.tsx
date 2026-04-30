import { useWorkspaceSelectorContext } from '../../context/WorkspaceSelectorContext/WorkspaceSelectorContext';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';
import './WorkspaceHero.css';

function WorkspaceHero() {
    const { userName } = useWorkspaceSelectorContext();
    const { t } = useTranslation();

    return (
        <div className="workspace-hero">
            <h1>{t.workspace_selector.hero_welcome}, {userName}.</h1>
            <p>{t.workspace_selector.hero_subtitle}</p>
        </div>
    );
}

export default WorkspaceHero;
