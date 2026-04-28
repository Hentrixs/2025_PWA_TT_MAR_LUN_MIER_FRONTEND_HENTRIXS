import './SidebarPromoCard.css';

interface SidebarPromoCardProps {
    title: string;
    subtitle: string;
    buttonText: string;
    iconColor: 'purple' | 'pink';
    icon: React.ReactNode;
    buttonIcon?: React.ReactNode;
}

function SidebarPromoCard({ title, subtitle, buttonText, iconColor, icon, buttonIcon }: SidebarPromoCardProps) {
    return (
        <div className="sidebar-card">
            <div className="sidebar-card-content">
                <div className="sidebar-card-text">
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                    <button className="sidebar-btn-outline">
                        {buttonIcon}
                        <span>{buttonText}</span>
                    </button>
                </div>
                <div className={`sidebar-card-icon-illustration ${iconColor}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default SidebarPromoCard;
