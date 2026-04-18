import ENVIRONMENT from "../config/environment.config";
import { LOCAL_STORAGE_TOKEN_KEY } from "../context/AuthContext/AuthContext";

export const channelMessageHistory = async (fk_id_workspace: string, fk_id_channel: string) => {
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