import './HomeAiContext.css';
import aiDesktop from '../../../../assets/slack_ai_desktop.png';

const HomeAiContext = () => {
    return (
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
    );
};

export default HomeAiContext;
