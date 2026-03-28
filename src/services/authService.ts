import ENVIRONMENT from "../config/environment.config";

export const login = async ({ email, password }: any) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}api/auth/login`, { // se hace fetch
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
    const response_http = await fetch(`${ENVIRONMENT.API_URL}api/auth/register`, {
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
    const response_http = await fetch(`${ENVIRONMENT.API_URL}api/auth/reset-password-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
        })
    });
    const response = await response_http.json();
    return response;
};

// en el frontend las llamadas al backend se realizan en la carpeta services, en este caso es authService.ts