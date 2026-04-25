import './Home.css';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import aiMobile from '../../assets/slack_ai_mobile.png';
import aiDesktop from '../../assets/slack_ai_desktop.png';

const Home = () => {

    const { isLogged } = useContext(AuthContext);
    if (isLogged) return <Navigate to={'/workspace-selector'} replace />;

    return (
        <div className="home">
            <nav className="home-nav">
                <Logo className='logo-responsive' showText={true} />
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
                                    <li className="active">Actualizar negociaciones solo con pedírselo a Slackbot</li>
                                    <li>Resumir una conversación que te perdiste</li>
                                    <li>Obtener respuestas rápidamente con Claude</li>
                                    <li>Activar la función de tomar notas de la IA en las juntas</li>
                                    <li>Revisar código con GitHub Copilot</li>
                                    <li>Buscar datos de clientes en Agentforce</li>
                                </ul>
                            </div>
                            <div className="ai-feature-image">
                                <img src={aiMobile} alt="Slack AI Mobile" />
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
                                    <h3>Conoce Slackbot: tu agente personal para el trabajo.</h3>
                                    <p>Slackbot no es una IA cualquiera. Es una IA que te conoce a ti y a tu equipo. Coordina el trabajo entre tus aplicaciones y agentes.</p>
                                    <a href="#">Más información sobre Slackbot →</a>
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
                                <img src={aiDesktop} alt="Slack AI Desktop Search" />
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
        </div>
    );
};

export default Home;
