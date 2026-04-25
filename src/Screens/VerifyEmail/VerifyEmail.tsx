import './VerifyEmail.css';
import { Link, useSearchParams } from 'react-router-dom'
import useVerifyEmail from '../../hooks/useEmailRegister/useVerifyEmail';

function VerifyEmail() {

    const [ searchParams ] = useSearchParams();
    const verify_email_token = searchParams.get('verify_email_token');
    const {response, loading} = useVerifyEmail(verify_email_token);

    return (
        <div className='verify-email'>
            {loading && <p>verificando...</p>}
            {!loading && response && response.ok && 
            <div>
                <h1>{response.message}</h1>
                <Link to={'/login'}>Click aqui para loggearse</Link>
            </div>
            }
            {!loading && response && !response.ok &&
                <div>
                    <h1>Tu email ya fue verificado anteriormente</h1>
                    <Link to={'/login'}>Click aqui para loggearse</Link>
                </div>
            }

        </div>
    )
}

export default VerifyEmail