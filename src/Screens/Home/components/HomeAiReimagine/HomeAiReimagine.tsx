import './HomeAiReimagine.css';
import aiMobile from '../../../../assets/slack_ai_mobile.png';

const HomeAiReimagine = () => {
    return (
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
    );
};

export default HomeAiReimagine;
