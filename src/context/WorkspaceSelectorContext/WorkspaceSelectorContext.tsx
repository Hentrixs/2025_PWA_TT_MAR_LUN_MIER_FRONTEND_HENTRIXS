import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { AuthContext, LOCAL_STORAGE_TOKEN_KEY } from '../AuthContext/AuthContext';
import useWorkspaces from '../../hooks/useWorkspaces/useWorkspaces';
import useIsMobile from '../../hooks/useIsMobile/useIsMobile';
import type { IWorkspace } from '../../types';

interface WorkspaceSelectorContextType {
    workspaces: IWorkspace[];
    response: unknown;
    loading: boolean;
    error: unknown;
    userName: string;
    isMobile: boolean;
    isNavOpen: boolean;
    setIsNavOpen: (v: boolean) => void;
    isLogoutModalOpen: boolean;
    setIsLogoutModalOpen: (v: boolean) => void;
    handleLogout: () => void;
    confirmLogout: () => void;
}

const WorkspaceSelectorContext = createContext<WorkspaceSelectorContextType | null>(null);

export function WorkspaceSelectorProvider({ children }: { children: React.ReactNode }) {
    const { manageLogout } = useContext(AuthContext);
    const { isMobile } = useIsMobile();
    const { workspaces, response, error, loading } = useWorkspaces();

    const userName = useMemo(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        const tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : null;
        return tokenPayload?.name ?? 'Usuario';
    }, []);

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = useCallback(() => setIsLogoutModalOpen(true), []);

    const confirmLogout = useCallback(() => {
        manageLogout();
        setIsLogoutModalOpen(false);
    }, [manageLogout]);

    const providerValues = useMemo(() => ({
        workspaces,
        response,
        loading,
        error,
        userName,
        isMobile,
        isNavOpen,
        setIsNavOpen,
        isLogoutModalOpen,
        setIsLogoutModalOpen,
        handleLogout,
        confirmLogout
    }), [
        workspaces,
        response,
        loading,
        error,
        userName,
        isMobile,
        isNavOpen,
        setIsNavOpen,
        isLogoutModalOpen,
        setIsLogoutModalOpen,
        handleLogout,
        confirmLogout
    ]);

    return (
        <WorkspaceSelectorContext.Provider value={providerValues}>
            {children}
        </WorkspaceSelectorContext.Provider>
    );
}

export const useWorkspaceSelectorContext = () => {
    const context = useContext(WorkspaceSelectorContext);
    if (!context) {
        throw new Error("useWorkspaceSelectorContext must be used within a WorkspaceSelectorProvider");
    }
    return context;
};
