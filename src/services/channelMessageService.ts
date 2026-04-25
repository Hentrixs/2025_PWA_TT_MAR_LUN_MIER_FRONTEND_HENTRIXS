import ENVIRONMENT from "../config/environment.config";
import { LOCAL_STORAGE_TOKEN_KEY } from "../context/AuthContext/AuthContext";

export const channelMessageHistory = async (fk_id_workspace: string, fk_id_channel: string) => {
    if (!fk_id_workspace || !fk_id_channel || fk_id_channel === 'undefined' || fk_id_workspace === 'undefined') {
        throw new Error("Invalid parameters: channel_id or workspace_id is undefined");
    }
    const channelMessageHistory = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${fk_id_workspace}/channel/${fk_id_channel}/message`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        }
    });

    const response = await channelMessageHistory.json();
    return response;
};

export const createChannelMessage = async (fk_id_workspace: string, fk_id_channel: string, content: string, fk_id_member: string) => {
    if (!fk_id_workspace || !fk_id_channel || fk_id_channel === 'undefined' || fk_id_workspace === 'undefined') {
        throw new Error("Invalid parameters: channel_id or workspace_id is undefined");
    }
    const createChannelMessage = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${fk_id_workspace}/channel/${fk_id_channel}/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`
        },
        body: JSON.stringify({
            fk_id_channel: fk_id_channel,
            content: content,
            fk_id_member: fk_id_member
        })
    });

    const response = await createChannelMessage.json();
    return response;
};

export const updateChannelMessage = async (fk_id_channel: string, fk_id_workspace: string, message_id: string, content: string) => {
    const response = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${fk_id_workspace}/channel/${fk_id_channel}/message/${message_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`
        },
        body: JSON.stringify({ content })
    });
    return await response.json();
};
