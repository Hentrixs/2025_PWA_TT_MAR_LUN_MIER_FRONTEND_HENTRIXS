import ENVIRONMENT from "../config/environment.config";
import { LOCAL_STORAGE_TOKEN_KEY } from "../context/AuthContext/AuthContext";
import type { LoginParams, RegisterParams, ResetPasswordParams, UpdateProfileParams, DeleteAccountParams, UpdatePasswordParams, RequestEmailChangeParams } from "../types";

export const login = async ({ email, password }: LoginParams) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, new_password })
    });
    const response = await response_http.json();
    return response;
};

export const getProfile = async () => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        }
    });
    const response = await response_http.json();
    return response;
};

export const updateProfile = async ({ name, description }: UpdateProfileParams) => {
    const response_http = await fetch(`${ENVIRONMENT.API_URL}/api/auth/update-profile`, {
        method: 'PATCH',

        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        },
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
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        },
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
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        },
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
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            new_email
        })
    });
    const response = await response_http.json();
    return response;
};