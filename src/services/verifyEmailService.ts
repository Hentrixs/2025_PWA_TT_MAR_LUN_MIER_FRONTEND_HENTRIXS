import ENVIRONMENT from "../config/environment.config";
import { getApiHeaders } from "../helpers/apiHelper";

export const verifyEmail = async (verify_email_token: string) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/verify-email?verify_email_token=${verify_email_token}`, {
        method: 'GET',
        headers: getApiHeaders()
    });

    const response = await response_http.json();
    return response;
};