import './LoadingScreen.css';

interface LoadingScreenProps {
    message?: string;
    isFullPage?: boolean;
}

const LoadingScreen = ({ message = 'Cargando...', isFullPage = true }: LoadingScreenProps) => {
    return (
        <div className={`loading-container ${isFullPage ? 'full-page' : 'inline'}`}>
            <div className="spinner-border text-primary" role="status">
            </div>
            {message && <p className="loading-message">{message}</p>}
        </div>
    );
};

export default LoadingScreen;
