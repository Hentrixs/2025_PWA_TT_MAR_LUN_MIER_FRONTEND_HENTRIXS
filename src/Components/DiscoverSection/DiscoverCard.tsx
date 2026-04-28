interface DiscoverCardProps {
    title: string;
    description: string;
    buttonText: string;
    iconColor: 'blue' | 'green' | 'orange';
    icon: React.ReactNode;
}

function DiscoverCard({ title, description, buttonText, iconColor, icon }: DiscoverCardProps) {
    return (
        <div className="discover-card">
            <div className="discover-card-info">
                <h4>{title}</h4>
                <p>{description}</p>
                <button className="discover-btn">{buttonText}</button>
            </div>
            <div className={`discover-card-img ${iconColor}`}>
                {icon}
            </div>
        </div>
    );
}

export default DiscoverCard;
