import { Link } from 'react-router-dom';
import './HomeHero.css';

const HomeHero = () => {
    return (
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
    );
};

export default HomeHero;
