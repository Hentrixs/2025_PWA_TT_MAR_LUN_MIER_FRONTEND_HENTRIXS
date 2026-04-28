import { Link } from 'react-router-dom';
import './NotFoundScreen.css';
import Logo from '../../Components/Logo/Logo';
import BackButton from '../../Components/BackButton/BackButton';

const NotFoundScreen = () => {

    return (
        <div className="not-found-screen fade-in">
            <div className="not-found-nav">
                <Logo />
                <BackButton to='/workspace-selector' />
            </div>
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Página no encontrada</h2>
                <p className="not-found-text">
                    La página que estás buscando no existe o parece haber sido eliminada de este universo.
                </p>
                <Link to="/" className="not-found-btn">
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFoundScreen;
