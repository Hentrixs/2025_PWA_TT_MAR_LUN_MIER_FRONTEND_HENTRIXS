import './HomeAiContext.css';
import aiDesktop from '../../../../assets/slack_ai_desktop.png';
import { useTranslation } from '../../../../context/LanguageContext/LanguageContext';

const HomeAiContext = () => {
    const { t } = useTranslation();
    return (
        <section className="home-ai-context">
            <div className="ai-context-content">
                <h2>{t.home.ai_context.title}</h2>
                <p className="ai-context-desc">
                    {t.home.ai_context.desc}
                </p>

                <div className="ai-context-layout">
                    <div className="ai-context-text">
                        <div className="context-item">
                            <h3>{t.home.ai_context.item_1_title}</h3>
                            <p>{t.home.ai_context.item_1_desc}</p>
                            <a href="#">{t.home.ai_context.item_1_link}</a>
                        </div>
                        <div className="context-item">
                            <h3>{t.home.ai_context.item_2_title}</h3>
                            <p>{t.home.ai_context.item_2_desc}</p>
                        </div>
                        <div className="context-item highlight">
                            <span className="stat">{t.home.ai_context.stat_time}</span>
                            <p>{t.home.ai_context.stat_desc}</p>
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
