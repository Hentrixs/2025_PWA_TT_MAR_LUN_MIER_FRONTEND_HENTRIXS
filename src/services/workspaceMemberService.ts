import ENVIRONMENT from "../config/environment.config";
import { LOCAL_STORAGE_TOKEN_KEY } from "../context/AuthContext/AuthContext";


export const getMemberList = async (workspace_id: string) => {
    const response = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/member`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`
        }
    });
    return response.json();
};

export const inviteMember = async (workspace_id: string, email: string, role: string) => {
    const response = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/member/invite`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`
        },
        body: JSON.stringify({
            email: email,
            role: role
        })
    });
    return response.json();
};

export const deleteMember = async (workspace_id: string, member_id: string) => {
    const response = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/member/${member_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`
        }
    });
    return response.json();
};

export const updateMemberRole = async (workspace_id: string, member_id: string, role: string) => {
    const response = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/member/${member_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`
        },
        body: JSON.stringify({
            role: role
        })
    });
    return response.json();
};

