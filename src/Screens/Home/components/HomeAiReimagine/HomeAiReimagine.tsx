import './HomeAiReimagine.css';
import aiMobile from '../../../../assets/slack_ai_mobile.png';
import { useTranslation } from '../../../../context/LanguageContext/LanguageContext';

const HomeAiReimagine = () => {
    const { t } = useTranslation();
    return (
        <section className="home-ai-reimagine">
            <div className="ai-reimagine-content">
                <h2>{t.home.ai_reimagine.title}</h2>
                <p className="ai-reimagine-desc">
                    {t.home.ai_reimagine.desc}
                </p>

                <div className="ai-reimagine-grid">
                    <div className="ai-feature-list-card">
                        <ul>
                            <li className="active">{t.home.ai_reimagine.feature_1}</li>
                            <li>{t.home.ai_reimagine.feature_2}</li>
                            <li>{t.home.ai_reimagine.feature_3}</li>
                            <li>{t.home.ai_reimagine.feature_4}</li>
                            <li>{t.home.ai_reimagine.feature_5}</li>
                            <li>{t.home.ai_reimagine.feature_6}</li>
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
