import ENVIRONMENT from "../config/environment.config";
import { getApiHeaders } from "../helpers/apiHelper";

export const getDirectMessageHistory = async (workspace_id: string, other_member_id: string) => {
    const res = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/dm/${other_member_id}`, {
        method: 'GET',
        headers: getApiHeaders(true)
    });
    return res.json();
};

export const sendDirectMessage = async (workspace_id: string, other_member_id: string, content: string) => {
    const res = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/dm/${other_member_id}`, {
        method: 'POST',
        headers: getApiHeaders(true),
        body: JSON.stringify({ content })
    });
    return res.json();
};

export const updateDirectMessage = async (workspace_id: string, other_member_id: string, message_id: string, content: string) => {
    const res = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/dm/${other_member_id}/message/${message_id}`, {
        method: 'PATCH',
        headers: getApiHeaders(true),
        body: JSON.stringify({ content })
    });
    return res.json();
};
