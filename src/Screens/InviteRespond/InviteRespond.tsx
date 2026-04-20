import './InviteRespond.css';
import { Link, useSearchParams } from 'react-router-dom';
import useInviteRespond from '../../hooks/useInviteRespond/useInviteRespond';

function InviteRespond() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const workspace_id = searchParams.get('workspace_id');

    const { response, loading, error } = useInviteRespond(workspace_id, token);

    return (
        <div className='invite-respond-container'>
            <div className='invite-respond-card'>
                {loading && <p className="loading-text">Procesando tu respuesta...</p>}

                {!loading && response && response.ok && (
                    <div className="success-content">
                        <h2>¡Carga Completa!</h2>
                        <p>{response.message}</p>
                        <Link to={'/login'} className="btn-primary">Ir al inicio a loggearme</Link>
                    </div>
                )}

                {!loading && (error || (response && !response.ok)) && (
                    <div className="error-content">
                        <h2>Vaya, algo salió mal</h2>
                        <p>{error || response?.message}</p>
                        <Link to={'/login'} className="btn-secondary">Volver al inicio</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InviteRespond;
