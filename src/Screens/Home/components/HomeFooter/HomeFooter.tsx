import { Link } from 'react-router-dom';
import Logo from '../../../../Components/Logo/Logo';
import './HomeFooter.css';

const HomeFooter = () => {
    return (
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
    );
};

export default HomeFooter;
