import { useTranslation } from "../../context/LanguageContext/LanguageContext";
import "./LanguageToggle.css";

const LanguageToggle = () => {
    const { language, setLanguage } = useTranslation();

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    return (
        <button 
            className="language-toggle-btn" 
            onClick={toggleLanguage}
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        >
            {language === 'es' ? (
                // Spanish Flag
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 750 500">
                    <rect width="750" height="500" fill="#c60b1e"/>
                    <rect width="750" height="250" y="125" fill="#ffc400"/>
                </svg>
            ) : (
                // UK Flag (English)
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 60 30">
                    <clipPath id="s">
                        <path d="M0,0 v30 h60 v-30 z"/>
                    </clipPath>
                    <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                </svg>
            )}
            <span className="lang-text">{language.toUpperCase()}</span>
        </button>
    );
};

export default LanguageToggle;
