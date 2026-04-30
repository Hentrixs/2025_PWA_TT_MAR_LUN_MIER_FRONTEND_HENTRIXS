import { Link } from 'react-router-dom';
import Logo from '../../../../Components/Logo/Logo';
import { useTranslation } from '../../../../context/LanguageContext/LanguageContext';
import './HomeFooter.css';

const HomeFooter = () => {
    const { t } = useTranslation();
    return (
        <footer className="home-footer">
            <div className="home-footer-content">
                <div className="footer-brand">
                    <Logo className='footer-logo' showText={true} />
                    <p>{t.home.footer.tagline}</p>
                    <div className="footer-socials">
                        <a href="#">X</a>
                        <a href="#">In</a>
                        <a href="#">Ig</a>
                        <a href="#">Fb</a>
                    </div>
                </div>
                <div className="footer-links-grid">
                    <div className="footer-column">
                        <h4>{t.home.footer.product}</h4>
                        <Link to="#">{t.home.footer.product_features}</Link>
                        <Link to="#">{t.home.footer.product_integrations}</Link>
                        <Link to="#">{t.home.footer.product_pricing}</Link>
                        <Link to="#">{t.home.footer.product_changelog}</Link>
                    </div>
                    <div className="footer-column">
                        <h4>{t.home.footer.resources}</h4>
                        <Link to="#">{t.home.footer.resources_help}</Link>
                        <Link to="#">{t.home.footer.resources_events}</Link>
                        <Link to="#">{t.home.footer.resources_dev}</Link>
                        <Link to="#">{t.home.footer.resources_blog}</Link>
                    </div>
                    <div className="footer-column">
                        <h4>{t.home.footer.company}</h4>
                        <Link to="#">{t.home.footer.company_about}</Link>
                        <Link to="#">{t.home.footer.company_jobs}</Link>
                        <Link to="#">{t.home.footer.company_news}</Link>
                        <Link to="#">{t.home.footer.company_contact}</Link>
                    </div>
                </div>
            </div>
            <div className="home-footer-bottom">
                <div className="footer-legal">
                    <Link to="#">{t.home.footer.legal_privacy}</Link>
                    <Link to="#">{t.home.footer.legal_terms}</Link>
                    <Link to="#">{t.home.footer.legal_cookies}</Link>
                </div>
                <p className="footer-copyright">{t.home.footer.copyright}</p>
            </div>
        </footer>
    );
};

export default HomeFooter;
