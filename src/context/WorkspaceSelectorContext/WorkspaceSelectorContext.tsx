import { createContext, useContext, useState } from 'react';
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

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userName = tokenPayload?.name ?? 'Usuario';

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => setIsLogoutModalOpen(true);

    const confirmLogout = () => {
        manageLogout();
        setIsLogoutModalOpen(false);
    };

    return (
        <WorkspaceSelectorContext.Provider value={{
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
        }}>
            {children}
        </WorkspaceSelectorContext.Provider>
    );
}

export const useWorkspaceSelectorContext = () => useContext(WorkspaceSelectorContext) as WorkspaceSelectorContextType;
