import './BackButton.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';

interface BackButtonProps {
    to?: string;
    label?: string;
}

function BackButton({ to, label }: BackButtonProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const resolvedLabel = label ?? t.common.back;
    return (
        <button
            className="back-button"
            onClick={() => to ? navigate(to) : navigate(-1)}
            aria-label={resolvedLabel}
            title={resolvedLabel}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
        </button>
    );
}

export default BackButton;
