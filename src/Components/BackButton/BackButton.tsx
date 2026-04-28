import './BackButton.css';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    to: string;
    label?: string;
}

function BackButton({ to, label = 'Volver' }: BackButtonProps) {
    const navigate = useNavigate();
    return (
        <button
            className="back-button"
            onClick={() => navigate(to)}
            aria-label={label}
            title={label}
        >
            ←
        </button>
    );
}

export default BackButton;
