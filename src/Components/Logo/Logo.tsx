import './Logo.css';

const Logo = ({ showText = true, className = '' }: { showText?: boolean, className?: string }) => {
    return (
        <div className={`green-slack-logo ${className}`}>
            <div className="logo-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Geométric Leaf Concept */}
                    <path
                        d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
                        fill="url(#leafGradient)"
                    />
                    <path
                        d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
                        stroke="#FFFFFF" strokeWidth="1.5"
                        strokeLinecap="round" opacity="0.6"
                    />
                    <defs>
                        <linearGradient id="leafGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#22C55E" />
                            <stop offset="1" stopColor="#0BA561" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            {showText && (
                <span className="logo-text">
                    Green<span>Slack</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
