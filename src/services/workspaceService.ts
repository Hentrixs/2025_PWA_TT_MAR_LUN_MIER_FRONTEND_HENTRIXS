import ENVIRONMENT from '../config/environment.config';
import { LOCAL_STORAGE_TOKEN_KEY } from '../context/AuthContext/AuthContext';

async function getWorkspaces() {
    const response_http = await fetch(
        ENVIRONMENT.API_URL + '/api/workspace',
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
            }
        }
    )


    const response = await response_http.json();
    console.log(response);
    return response
};