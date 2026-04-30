import ENVIRONMENT from "../config/environment.config";
import { getApiHeaders } from "../helpers/apiHelper";

export const getMemberList = async (workspace_id: string) => {
    const response = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/member`, {
        method: 'GET',
        headers: getApiHeaders(true)
    });
    return response.json();
};

export const inviteMember = async (workspace_id: string, email: string, role: string) => {
    const response = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/member/invite`, {
        method: 'POST',
        headers: getApiHeaders(true),
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
        headers: getApiHeaders(true)
    });
    return response.json();
};

export const respondToInvitation = async (_workspace_id: string | null, token: string | null) => {
    const response = await fetch(`${ENVIRONMENT.API_URL}/api/invitation/respond?token=${token}`, {
        method: 'GET',
        headers: getApiHeaders(true)
    });
    return response.json();
};

export const updateMemberRole = async (workspace_id: string, member_id: string, role: string) => {
    const response = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/member/${member_id}`, {
        method: 'PUT',
        headers: getApiHeaders(true),
        body: JSON.stringify({
            role: role
        })
    });
    return response.json();
};

