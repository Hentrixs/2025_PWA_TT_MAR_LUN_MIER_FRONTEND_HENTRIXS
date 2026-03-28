import ENVIRONMENT from '../config/environment.config';
import { LOCAL_STORAGE_TOKEN_KEY } from '../context/AuthContext/AuthContext';

export const getWorkspaces = async () => {
    const response_http = await fetch(ENVIRONMENT.API_URL + 'api/workspace', {
        method: 'GET',
        headers: {          // porque se escribe eso de autorization asi y porque tenemos que hacerlo asi?
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`
        } // por alguna razon, use llaves y ahi si anduvo, bruh.
    });

    const response = await response_http.json();
    console.log(`response getted: ${response}`);
    return response
};