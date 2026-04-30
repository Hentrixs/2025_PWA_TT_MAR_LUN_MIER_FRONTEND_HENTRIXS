import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext/LanguageContext';
import './InviteRespond.css';

function InviteRespond() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status');
    const message = searchParams.get('message');

    const isAccepted = status === 'accepted';
    const isRejected = status === 'rejected';

    return (
        <div className='invite-respond-container fade-in'>
            <div className='invite-respond-card'>
                {isAccepted && (
                    <div className="success-content">
                        <h2>{t.invite_respond.success_title}</h2>
                        <p>{t.invite_respond.success_desc}</p>
                        <Link to={'/login'} className="btn-primary">{t.invite_respond.success_btn}</Link>
                    </div>
                )}

                {isRejected && (
                    <div className="warning-content">
                        <h2>{t.invite_respond.rejected_title}</h2>
                        <p>{t.invite_respond.rejected_desc}</p>
                        <Link to={'/login'} className="btn-secondary">{t.invite_respond.rejected_btn}</Link>
                    </div>
                )}

                {!isAccepted && !isRejected && (
                    <div className="error-content">
                        <h2>{t.invite_respond.error_title}</h2>
                        <p>{message || t.invite_respond.error_desc}</p>
                        <Link to={'/login'} className="btn-secondary">{t.invite_respond.rejected_btn}</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InviteRespond;
