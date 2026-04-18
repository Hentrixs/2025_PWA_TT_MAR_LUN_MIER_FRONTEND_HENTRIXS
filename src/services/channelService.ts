import ENVIRONMENT from "../config/environment.config";
import { LOCAL_STORAGE_TOKEN_KEY } from "../context/AuthContext/AuthContext";

export const getChannels = async (fk_id_workspace: string) => {
    const channel_list = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${fk_id_workspace}/channel`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json',
        }
    });

    const response = await channel_list.json();
    return response;
};

export const createChannel = async (channel: { channel_name: string, channel_description: string }, workspace_id: string) => {
    const channel_created = await fetch(`${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/channel`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: channel.channel_name,
            description: channel.channel_description
        })
    });

    const response = await channel_created.json();
    return response;
};
