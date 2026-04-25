import ENVIRONMENT from "../config/environment.config";
import { LOCAL_STORAGE_TOKEN_KEY } from "../context/AuthContext/AuthContext";

const authHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
    'Content-Type': 'application/json'
});

export const getDirectMessageHistory = async (workspace_id: string, other_member_id: string) => {
    const res = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/dm/${other_member_id}`, {
        method: 'GET',
        headers: authHeaders()
    });
    return res.json();
};

export const sendDirectMessage = async (workspace_id: string, other_member_id: string, content: string) => {
    const res = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/dm/${other_member_id}`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ content })
    });
    return res.json();
};

export const updateDirectMessage = async (workspace_id: string, other_member_id: string, message_id: string, content: string) => {
    const res = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/dm/${other_member_id}/message/${message_id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ content })
    });
    return res.json();
};
