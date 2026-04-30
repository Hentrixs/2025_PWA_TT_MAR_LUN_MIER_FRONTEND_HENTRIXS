import { useTranslation } from '../../context/LanguageContext/LanguageContext';
import './LoadingScreen.css';

interface LoadingScreenProps {
    message?: string;
    isFullPage?: boolean;
}

const LoadingScreen = ({ message, isFullPage = true }: LoadingScreenProps) => {
    const { t } = useTranslation();
    const displayMessage = message || t.common.loading;

    return (
        <div className={`loading-container ${isFullPage ? 'full-page' : 'inline'}`}>
            <div className="spinner-border text-primary" role="status">
            </div>
            {displayMessage && <p className="loading-message">{displayMessage}</p>}
        </div>
    );
};

export default LoadingScreen;
