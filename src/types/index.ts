export type { AppError } from '../helpers/errorHelper';

// ── Entidades de dominio (nombres de campo según DTOs del backend) ─────────────

// workspaceDTO (endpoint GET /workspace)
export interface IWorkspace {
    workspace_id: string;
    workspace_name: string | undefined;
    workspace_title: string;
    workspace_description?: string;
    workspace_url_image?: string;
}

// Raw workspace model (endpoint GET /workspace/:id/workspaceDetail)
export interface IWorkspaceDetail {
    _id?: string;
    title: string;
    description?: string;
    url_image?: string;
}

// channelDTO
export interface IChannel {
    channel_id: string;
    channel_name: string;
    name?: string;
    channel_description?: string;
}

// messageDTO
export interface IMessage {
    message_id: string;
    content: string;
    created_at: string;
    sender_name: string;
    member_id: string;
    channel_id?: string;
    edited?: boolean;
}

// WorkspaceMember (de getMemberList)
export interface IMember {
    member_id: string;
    user_id: string;
    user_name: string;
    user_email: string;
    member_role: 'owner' | 'admin' | 'member';
}

// userDTO (endpoint GET /auth/profile)
export interface IUser {
    user_id: string;
    user_name: string;
    user_email: string;
    user_email_verified?: boolean;
    user_description?: string;
}

export interface ITokenPayload {
    id: string;
    name: string;
    email: string;
    iat: number;
    exp: number;
}

// ── Params de formularios y servicios ────────────────────────────────────────

export interface LoginParams { email: string; password: string; }
export interface RegisterParams { name: string; email: string; password: string; }
export interface ResetPasswordParams { email: string; new_password: string; }
export interface UpdateProfileParams { name: string; description?: string; }
export interface DeleteAccountParams { password: string; }
export interface UpdatePasswordParams { old_password: string; new_password: string; }
export interface RequestEmailChangeParams { password: string; new_email: string; }

export interface SendChannelMessageParams {
    fk_id_workspace: string;
    fk_id_channel: string;
    fk_id_member: string;
    content: string;
}

export interface SendDirectMessageParams {
    fk_id_workspace: string;
    other_member_id: string;
    content: string;
}

// ── Tipos de valor de contextos ───────────────────────────────────────────────

import type { AppError } from '../helpers/errorHelper';

export interface WorkspaceContextType {
    workspace_id: string | undefined;
    workspaceDetail: IWorkspaceDetail | undefined;
    members: IMember[] | undefined;
    activeMember: IMember | null;
    workspaces: IWorkspace[] | undefined;
    loadingWorkspaces: boolean;
    errorWorkspaces: AppError | null;
    responseWorkspaces: unknown;
    loadingWorkspace: boolean;
    errorWorkspace: AppError | null;
    isMobile: boolean;
}

export interface ChannelContextType {
    channel_id: string | undefined;
    channel_list: IChannel[] | undefined;
    refetchChannels: () => void;
    loadingChannels: boolean;
    errorChannel: AppError | null;
    responseChannel: unknown;
}

export interface ChatContextType {
    messagelist: IMessage[] | undefined;
    responseMessages: unknown;
    loadingMessages: boolean;
    errorMessages: AppError | null;
    refreshMessages: () => void;
    sendMessageSubmit: (params: SendChannelMessageParams) => Promise<void>;
    loadingSend: boolean;
    errorSend: AppError | null;
}

export interface DirectChatContextType {
    messagelist: IMessage[] | undefined;
    responseMessages: unknown;
    loadingMessages: boolean;
    errorMessages: AppError | null;
    refreshMessages: () => void;
    sendMessageSubmit: (params: SendDirectMessageParams) => Promise<void>;
    loadingSend: boolean;
    errorSend: AppError | null;
    otherMemberName: string;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}
