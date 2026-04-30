import { LOCAL_STORAGE_TOKEN_KEY } from "../context/AuthContext/AuthContext";

export const getApiHeaders = (useAuth = false) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-lang': localStorage.getItem('language') || 'es'
    };

    if (useAuth) {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};
