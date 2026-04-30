import { useTranslation } from "../../context/LanguageContext/LanguageContext";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./PreferencesTab.css";

const PreferencesTab = () => {
    const { t } = useTranslation();

    return (
        <div className="preferences-tab">
            <div className="preference-item">
                <div className="preference-info">
                    <h3>{t.settings.language_label}</h3>
                    <p>{t.settings.language_desc}</p>
                </div>
                <LanguageToggle />
            </div>

            <div className="preference-item">
                <div className="preference-info">
                    <h3>{t.settings.theme_label}</h3>
                    <p>{t.settings.theme_desc}</p>
                </div>
                <ThemeToggle />
            </div>
        </div>
    );
};

export default PreferencesTab;
