import DiscoverCard from './DiscoverCard';
import './DiscoverSection.css';

const downloadIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
    </svg>
);

const appsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
        <path d="M2.5 0c-.703 0-1.274.571-1.274 1.274v1.549c0 .703.571 1.274 1.274 1.274h1.549c.703 0 1.274-.571 1.274-1.274v-1.549C5.323.571 4.752 0 4.049 0zm1.549 3.031h-1.549v-1.549h1.549zM2.5 10.677c-.703 0-1.274.571-1.274 1.274v1.549c0 .703.571 1.274 1.274 1.274h1.549c.703 0 1.274-.571 1.274-1.274v-1.549c0-.703-.571-1.274-1.274-1.274zm1.549 3.03h-1.549v-1.548h1.549zM10.677 2.5c0-.703.571-1.274 1.274-1.274h1.549c.703 0 1.274.571 1.274 1.274v1.549c0 .703-.571 1.274-1.274 1.274h-1.549c-.703 0-1.274-.571-1.274-1.274zm3.031 1.549v-1.549h-1.549v1.549zM10.677 10.677c0-.703.571-1.274 1.274-1.274h1.549c.703 0 1.274.571 1.274 1.274v1.549c0 .703-.571 1.274-1.274 1.274h-1.549c-.703 0-1.274-.571-1.274-1.274zm3.031 3.03h-1.549v-1.548h1.549z" />
    </svg>
);

const starsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 2.276 4.61l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
    </svg>
);

function DiscoverSection() {
    return (
        <div className="workspace-discover-section">
            <div className="discover-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16a6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 1 2-2 1 1 0 0 1 1-1h1a1 1 0 0 1 1 1 2 2 0 0 1 2 2 4 4 0 0 1 4 4 6 6 0 0 1-6 6z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                </svg>
                <h3>Descubre más</h3>
            </div>

            <div className="discover-grid">
                <DiscoverCard
                    title="Descargar GreenSlack para Windows"
                    description="Mantente al día con las notificaciones."
                    buttonText="Descargar aplicación"
                    iconColor="blue"
                    icon={downloadIcon}
                />
                <DiscoverCard
                    title="Conecta tus aplicaciones."
                    description="Elige entre más de 2600 aplicaciones o crea la tuya propia."
                    buttonText="Explorar aplicaciones"
                    iconColor="green"
                    icon={appsIcon}
                />
                <DiscoverCard
                    title="Novedades de GreenSlack"
                    description="Descubre ahora las nuevas funciones disponibles."
                    buttonText="Más información"
                    iconColor="orange"
                    icon={starsIcon}
                />
            </div>
        </div>
    );
}

export default DiscoverSection;
