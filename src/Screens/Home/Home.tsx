import './Home.css';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Home = () => {

    const { isLogged } = useContext(AuthContext);
    if (isLogged) return <Navigate to={'/workspace-selector'} replace />;

    return (
        <div className="home">
            <nav className="home-nav">
                <Logo className='logo-responsive' />
                <div className="home-nav-links">
                    <Link to="/login" className="home-nav-link">Iniciar sesión</Link>
                    <Link to="/register" className="home-nav-link home-nav-link--cta">Registrarse</Link>
                </div>
            </nav>

            <main className="home-center">
                <section className="home-hero">
                    <div className="home-title">
                        <h1>🧠 El cerebro colectivo<br />de tu equipo.</h1>
                        <p>Moverse más rápido y trabajar de forma más inteligente junto a personas, aplicaciones e IA.</p>
                    </div>
                    <div className="home-hero-buttons">
                        <Link to="/register" className="home-btn home-btn--primary">Comenzar gratis</Link>
                        <Link to="/login" className="home-btn home-btn--secondary">Ya tengo cuenta →</Link>
                    </div>
                </section>

                <section className="home-brands">
                    <p className="home-brands-label">Usado por equipos de todo el mundo</p>
                    <div className="home-brands-list">
                        <span>Airbnb</span>
                        <span>NASA</span>
                        <span>Spotify</span>
                        <span>Target</span>
                        <span>Oracle</span>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
