import ENVIRONMENT from "../config/environment.config"

export const verifyEmail = async (verify_email_token: string) =>{
    const verifyEmail = await fetch(`${ENVIRONMENT.API_URL}/api/auth/verify-email?verify_email_token=${verify_email_token}`, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    });
    
    const response = await verifyEmail.json();
    console.log(response);
    return response;
};