import ENVIRONMENT from "../config/environment.config";
import { LOCAL_STORAGE_TOKEN_KEY } from "../context/AuthContext/AuthContext";

export const getChannels = async (fk_id_workspace: string) => {
    const channel_list = await fetch(`${ENVIRONMENT.API_URL}/api/channel/?fk_id_workspace=${fk_id_workspace}`, {
        method: 'GET', // ok, aca en el body tiene que ir la fk_id_workspace, ya vere de donde la saco...
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json',
        }
    })
    const response = await channel_list.json();
    return response;
};

