import ENVIRONMENT from "../config/environment.config";
import { LOCAL_STORAGE_TOKEN_KEY } from "../context/AuthContext/AuthContext";

export const login = async ({ email, password }: any) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/login`, { // se hace fetch
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email, // pense que esto era algo asi como email: email y abajo password: password
            password
        })
    });

    const response = await response_http.json(); // se pasa el response a json.
    return response; // se lo retorna.
};

export const register = async ({ name, email, password }: any) => {

    // TODO= meter la URL en el .env y importarla aca.
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });

    const response = await response_http.json();
    return response;
};

export const resetPassword = async ({ email }: any) => { // tengo qeu checkar despues que la URL este bien
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/reset-password-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
        })
    });
    const response = await response_http.json();
    return response;
};

// Nota: decidi no crear un endpoint aparte y fusionar el auth con lo que antes era un enpoint aparte para 
// el user ya que son similares

export const getProfile = async () => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        }
    });
    const response = await response_http.json();
    return response;
};

export const updateProfile = async ({ name, description }: any) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/update-profile`, {
        method: 'PATCH',

        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: description
        })
    });
    const response = await response_http.json();
    return response;
};

export const deleteAccount = async ({ password }: any) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/delete-account`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password
        })
    });
    const response = await response_http.json();
    return response;
};

export const updatePassword = async ({ old_password, new_password }: any) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/update_password`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            old_password,
            new_password
        })
    });
    const response = await response_http.json();
    return response;
};

export const requestEmailChange = async ({ password, new_email }: any) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/request-email-change`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            new_email
        })
    });
    const response = await response_http.json();
    return response;
};