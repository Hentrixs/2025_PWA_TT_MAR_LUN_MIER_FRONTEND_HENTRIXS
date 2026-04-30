import './Home.css';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import ThemeToggle from '../../Components/ThemeToggle/ThemeToggle';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { useContext, useState } from 'react';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useIsMobile from '../../hooks/useIsMobile/useIsMobile';
import HomeHero from './components/HomeHero/HomeHero';
import HomeBrands from './components/HomeBrands/HomeBrands';
import HomeAiReimagine from './components/HomeAiReimagine/HomeAiReimagine';
import HomeAiContext from './components/HomeAiContext/HomeAiContext';
import HomeFooter from './components/HomeFooter/HomeFooter';

const Home = () => {

    const { isLogged } = useContext(AuthContext);
    const { isMobile } = useIsMobile();
    const { toggleTheme } = useTheme();
    const { t } = useTranslation();
    const [isHomeNavOpened, setIsHomeNavOpened] = useState(false);

    const handleIsHomeNavOpened = () => {
        setIsHomeNavOpened(!isHomeNavOpened);
    };

    if (isLogged) return <Navigate to={'/workspace-selector'} replace />;

    return (
        <div className="home">
            <header className="home-header-sticky">
                <nav className="home-nav">
                    <Logo className='logo-responsive' showText={true} />
                    <div className="home-nav-links">
                        {isMobile ? (
                            <div className='home-nav-svg-wrapper' onClick={handleIsHomeNavOpened}>
                                {isHomeNavOpened ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                    </svg>
                                )}
                            </div>
                        ) : (
                            <>
                                <ThemeToggle />
                                <Link to="/login" className="home-nav-link">{t.home.login}</Link>
                                <Link to="/register" className="home-nav-link home-nav-link--cta">{t.home.register}</Link>
                            </>
                        )}
                    </div>
                </nav>

                {isHomeNavOpened && isMobile && (
                    <div className="mobile-nav-overlay">
                        <Link to="/login" className='mobile-nav-item mobile-login-btn' onClick={() => setIsHomeNavOpened(false)}>
                            {t.home.login}
                        </Link>
                        <Link to="/register" className='mobile-nav-item mobile-register-btn' onClick={() => setIsHomeNavOpened(false)}>
                            {t.home.register}
                        </Link>
                        <button className="mobile-nav-item" onClick={toggleTheme}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <span>{t.home.change_theme}</span>
                                <ThemeToggle readonly />
                            </div>
                        </button>
                    </div>
                )}
            </header>

            <main className="home-center">
                <HomeHero />
                <HomeBrands />
                <HomeAiReimagine />
                <HomeAiContext />

                <section className="home-cta-final">
                    <h2>{t.home.ready_title}</h2>
                    <p>{t.home.ready_subtitle}</p>
                    <Link to="/register" className="home-btn home-btn--primary">{t.home.try_free}</Link>
                </section>
            </main>

            <HomeFooter />
        </div>
    );
};

export default Home;
