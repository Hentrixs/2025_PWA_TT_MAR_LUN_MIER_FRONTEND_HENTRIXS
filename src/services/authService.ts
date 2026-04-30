import ENVIRONMENT from "../config/environment.config";
import type { LoginParams, RegisterParams, ResetPasswordParams, UpdateProfileParams, DeleteAccountParams, UpdatePasswordParams, RequestEmailChangeParams } from "../types";
import { getApiHeaders } from "../helpers/apiHelper";

export const login = async ({ email, password }: LoginParams) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/login`, {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify({
            email,
            password
        })
    });

    const response = await response_http.json();
    return response;
};

export const register = async ({ name, email, password }: RegisterParams) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/register`, {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify({
            name,
            email,
            password
        })
    });

    const response = await response_http.json();
    return response;
};

export const resetPassword = async ({ email, new_password }: ResetPasswordParams) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/reset-password-request`, {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify({ email, new_password })
    });
    const response = await response_http.json();
    return response;
};

export const getProfile = async () => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/profile`, {
        method: 'GET',
        headers: getApiHeaders(true)
    });
    const response = await response_http.json();
    return response;
};

export const updateProfile = async ({ name, description }: UpdateProfileParams) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/update-profile`, {
        method: 'PATCH',
        headers: getApiHeaders(true),
        body: JSON.stringify({
            name: name,
            description: description
        })
    });
    const response = await response_http.json();
    return response;
};

export const deleteAccount = async ({ password }: DeleteAccountParams) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/delete-account`, {
        method: 'DELETE',
        headers: getApiHeaders(true),
        body: JSON.stringify({
            password
        })
    });
    const response = await response_http.json();
    return response;
};

export const updatePassword = async ({ old_password, new_password }: UpdatePasswordParams) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/update_password`, {
        method: 'PUT',
        headers: getApiHeaders(true),
        body: JSON.stringify({
            old_password,
            new_password
        })
    });
    const response = await response_http.json();
    return response;
};

export const requestEmailChange = async ({ password, new_email }: RequestEmailChangeParams) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/request-email-change`, {
        method: 'POST',
        headers: getApiHeaders(true),
        body: JSON.stringify({
            password,
            new_email
        })
    });
    const response = await response_http.json();
    return response;
};

export const updateLanguage = async (language: 'es' | 'en') => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/update-language`, {
        method: 'PATCH',
        headers: getApiHeaders(true),
        body: JSON.stringify({ language })
    });
    const response = await response_http.json();
    return response;
};