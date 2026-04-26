import ENVIRONMENT from '../config/environment.config';
import { LOCAL_STORAGE_TOKEN_KEY } from '../context/AuthContext/AuthContext';

export const getWorkspaces = async () => {

    const response_http = await fetch(ENVIRONMENT.API_URL + '/api/workspace', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`
        },
    });

    const response = await response_http.json();

    return response.data.workspaces;
};

export const getWorkspaceDetail = async (workspace_id: string) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/workspaceDetail`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        }
    });
    const response = await response_http.json();
    return response.data;
};

export const createWorkspace = async (title: string, description: string, role: string) => {
    const response_http = await fetch(ENVIRONMENT.API_URL + '/api/workspace', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            url_image: '',
            role: role,
        })
    });

    const response = await response_http.json();
    return response.data;
};

export const updateWorkspace = async (workspace_id: string, title: string, description: string) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description
        })
    });

    return await response_http.json();
};

export const deleteWorkspace = async (workspace_id: string) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`
        }
    });

    return await response_http.json();
};
