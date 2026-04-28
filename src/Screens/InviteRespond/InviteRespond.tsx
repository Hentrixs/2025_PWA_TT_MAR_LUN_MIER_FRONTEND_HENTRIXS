import './InviteRespond.css';
import { Link, useSearchParams } from 'react-router-dom';
import BackButton from '../../Components/BackButton/BackButton';

function InviteRespond() {
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status');
    const message = searchParams.get('message');

    const isAccepted = status === 'accepted';
    const isRejected = status === 'rejected';

    return (
        <div className='invite-respond-container fade-in'>
            <BackButton to='/workspace-selector' />
            <div className='invite-respond-card'>
                {isAccepted && (
                    <div className="success-content">
                        <h2>¡Verificación Exitosa!</h2>
                        <p>Has aceptado la invitación correctamente. Ya eres parte del espacio de trabajo.</p>
                        <Link to={'/login'} className="btn-primary">Ir al inicio para iniciar sesión</Link>
                    </div>
                )}

                {isRejected && (
                    <div className="warning-content">
                        <h2>Invitación Rechazada</h2>
                        <p>Has declinado la invitación al espacio de trabajo. Si fue un error, solicita que te envíen una nueva.</p>
                        <Link to={'/login'} className="btn-secondary">Volver al inicio</Link>
                    </div>
                )}

                {!isAccepted && !isRejected && (
                    <div className="error-content">
                        <h2>Vaya, algo salió mal</h2>
                        <p>{message || 'La invitación ha expirado, ya fue procesada o hubo un error en el servidor.'}</p>
                        <Link to={'/login'} className="btn-secondary">Volver al inicio</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InviteRespond;
