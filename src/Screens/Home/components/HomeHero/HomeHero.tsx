import { Link } from 'react-router-dom';
import { useTranslation } from '../../../../context/LanguageContext/LanguageContext';
import './HomeHero.css';

const HomeHero = () => {
    const { t } = useTranslation();
    return (
        <section className="home-hero">
            <div className="home-title">
                <h1>{t.home.hero.title}</h1>
                <p>{t.home.hero.subtitle}</p>
            </div>
            <div className="home-hero-buttons">
                <Link to="/register" className="home-btn home-btn--primary">{t.home.hero.cta_start}</Link>
                <Link to="/login" className="home-btn home-btn--secondary">{t.home.hero.cta_login}</Link>
            </div>
        </section>
    );
};

export default HomeHero;
