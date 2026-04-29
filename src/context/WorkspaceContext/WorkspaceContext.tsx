import { createContext, useContext, useMemo } from "react";
import { useParams } from "react-router";
import { LOCAL_STORAGE_TOKEN_KEY } from "../AuthContext/AuthContext";
import type { WorkspaceContextType, IMember, ITokenPayload } from "../../types";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import useWorkspaceDetail from "../../hooks/useWorkspace/useWorkspaceDetail";
import useWorkspaces from "../../hooks/useWorkspaces/useWorkspaces";

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function WorkspaceContextProvider({ children }: { children: React.ReactNode }) {

    const { workspace_id } = useParams();
    const { isMobile } = useIsMobile();

    const {
        workspaces,
        loading: loadingWorkspaces,
        error: errorWorkspaces,
        response: responseWorkspaces
    } = useWorkspaces();

    const { workspaceDetail, members, loading: loadingWorkspace, error: errorWorkspace } = useWorkspaceDetail(workspace_id ?? '');


    const tokenPayload = useMemo<ITokenPayload | null>(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        return token ? JSON.parse(atob(token.split('.')[1])) : null;
    }, []);

    const activeMember = useMemo(() => {
        return members?.find((m: IMember) => m.user_id === tokenPayload?.id) ?? null;
    }, [members, tokenPayload?.id]);

    const providerValues = useMemo(() => ({
        workspace_id,
        workspaceDetail,
        members,
        activeMember,
        workspaces,
        loadingWorkspaces,
        errorWorkspaces,
        responseWorkspaces,
        loadingWorkspace,
        errorWorkspace,
        isMobile
    }), [
        workspace_id,
        workspaceDetail,
        members,
        activeMember,
        workspaces,
        loadingWorkspaces,
        errorWorkspaces,
        responseWorkspaces,
        loadingWorkspace,
        errorWorkspace,
        isMobile
    ]);

    return (
        <WorkspaceContext.Provider value={providerValues}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspaceContext = () => {
    const context = useContext(WorkspaceContext);
    if (!context) {
        throw new Error("useWorkspaceContext must be used within a WorkspaceContextProvider");
    }
    return context;
};
export default WorkspaceContextProvider;
