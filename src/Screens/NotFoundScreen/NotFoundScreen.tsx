import { Link } from 'react-router-dom';
import './NotFoundScreen.css';
import Logo from '../../Components/Logo/Logo';
import BackButton from '../../Components/BackButton/BackButton';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

const NotFoundScreen = () => {
    const { t } = useTranslation();

    return (
        <div className="not-found-screen fade-in">
            <div className="not-found-nav">
                <Logo />
                <BackButton to='/workspace-selector' />
            </div>
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">{t.not_found.subtitle}</h2>
                <p className="not-found-text">
                    {t.not_found.text}
                </p>
                <Link to="/" className="not-found-btn">
                    {t.not_found.back_home}
                </Link>
            </div>
        </div>
    );
};

export default NotFoundScreen;
