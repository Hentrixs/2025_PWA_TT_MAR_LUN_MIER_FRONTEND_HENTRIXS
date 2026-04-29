import './Home.css';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import ThemeToggle from '../../Components/ThemeToggle/ThemeToggle';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useIsMobile from '../../hooks/useIsMobile/useIsMobile';
import aiMobile from '../../assets/slack_ai_mobile.png';
import aiDesktop from '../../assets/slack_ai_desktop.png';

const Home = () => {

    const { isLogged } = useContext(AuthContext);
    const { isMobile } = useIsMobile();
    const { toggleTheme } = useTheme();
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
                                <Link to="/login" className="home-nav-link">Iniciar sesión</Link>
                                <Link to="/register" className="home-nav-link home-nav-link--cta">Registrarse</Link>
                            </>
                        )}
                    </div>
                </nav>

                {isHomeNavOpened && isMobile && (
                    <div className="mobile-nav-overlay">
                        <Link to="/login" className='mobile-nav-item mobile-login-btn' onClick={() => setIsHomeNavOpened(false)}>
                            Iniciar sesión
                        </Link>
                        <Link to="/register" className='mobile-nav-item mobile-register-btn' onClick={() => setIsHomeNavOpened(false)}>
                            Registrarse
                        </Link>
                        <button className="mobile-nav-item" onClick={toggleTheme}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <span>Cambiar Tema</span>
                                <ThemeToggle readonly />
                            </div>
                        </button>
                    </div>
                )}
            </header>

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

                <section className="home-ai-reimagine">
                    <div className="ai-reimagine-content">
                        <h2>Reimagina los límites de lo posible con la IA y los agentes.</h2>
                        <p className="ai-reimagine-desc">
                            Con la IA en GreenSlack podrás dejar de darle vueltas a todo, ya que te ayuda a completar tareas.
                            Resume y hace búsquedas basándose en conversaciones reales y, de este modo, consigue que cada
                            aplicación y cada agente sean más útiles y más conscientes del contexto que nunca.
                        </p>

                        <div className="ai-reimagine-grid">
                            <div className="ai-feature-list-card">
                                <ul>
                                    <li className="active">Actualizar negociaciones solo con pedírselo a GreenSlackBot</li>
                                    <li>Resumir una conversación que te perdiste</li>
                                    <li>Obtener respuestas rápidamente con Claude</li>
                                    <li>Activar la función de tomar notas de la IA en las juntas</li>
                                    <li>Revisar código con GitHub Copilot</li>
                                    <li>Buscar datos de clientes en Agentforce</li>
                                </ul>
                            </div>
                            <div className="ai-feature-image">
                                <img src={aiMobile} alt="GreenSlack AI Mobile" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-ai-context">
                    <div className="ai-context-content">
                        <h2>Proporciona contexto al instante a los demás.</h2>
                        <p className="ai-context-desc">
                            Obtén acceso a cada archivo, decisión y conversación para poder profundizar en el trabajo
                            ya hecho en lugar de empezar de cero.
                        </p>

                        <div className="ai-context-layout">
                            <div className="ai-context-text">
                                <div className="context-item">
                                    <h3>Conoce GreenSlackBot: tu agente personal para el trabajo.</h3>
                                    <p>GreenSlackBot no es una IA cualquiera. Es una IA que te conoce a ti y a tu equipo. Coordina el trabajo entre tus aplicaciones y agentes.</p>
                                    <a href="#">Más información sobre GreenSlackBot →</a>
                                </div>
                                <div className="context-item">
                                    <h3>Una búsqueda para gobernarlas a todas.</h3>
                                    <p>Integra los datos de tu CRM directamente en la conversación y encuentra lo que necesitas en segundos.</p>
                                </div>
                                <div className="context-item highlight">
                                    <span className="stat">97 minutos</span>
                                    <p>Ahorrados por semana en promedio por usuario.</p>
                                </div>
                            </div>
                            <div className="ai-context-image">
                                <img src={aiDesktop} alt="GreenSlack AI Desktop Search" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-cta-final">
                    <h2>¿Listo para empezar?</h2>
                    <p>Únete a millones de personas que ya están usando GreenSlack.</p>
                    <Link to="/register" className="home-btn home-btn--primary">Probar gratis</Link>
                </section>
            </main>

            <footer className="home-footer">
                <div className="home-footer-content">
                    <div className="footer-brand">
                        <Logo className='footer-logo' showText={true} />
                        <p>El cerebro colectivo de tu equipo.</p>
                        <div className="footer-socials">
                            <a href="#">X</a>
                            <a href="#">In</a>
                            <a href="#">Ig</a>
                            <a href="#">Fb</a>
                        </div>
                    </div>
                    <div className="footer-links-grid">
                        <div className="footer-column">
                            <h4>Producto</h4>
                            <Link to="#">Funciones</Link>
                            <Link to="#">Integraciones</Link>
                            <Link to="#">Precios</Link>
                            <Link to="#">Changelog</Link>
                        </div>
                        <div className="footer-column">
                            <h4>Recursos</h4>
                            <Link to="#">Centro de ayuda</Link>
                            <Link to="#">Eventos</Link>
                            <Link to="#">Desarrolladores</Link>
                            <Link to="#">Blog</Link>
                        </div>
                        <div className="footer-column">
                            <h4>Compañía</h4>
                            <Link to="#">Sobre nosotros</Link>
                            <Link to="#">Empleo</Link>
                            <Link to="#">Noticias</Link>
                            <Link to="#">Contacto</Link>
                        </div>
                    </div>
                </div>
                <div className="home-footer-bottom">
                    <div className="footer-legal">
                        <Link to="#">Privacidad</Link>
                        <Link to="#">Términos</Link>
                        <Link to="#">Cookies</Link>
                    </div>
                    <p className="footer-copyright">&copy; 2026 GreenSlack. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
