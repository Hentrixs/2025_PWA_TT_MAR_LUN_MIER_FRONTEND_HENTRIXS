import { createContext, useContext } from "react";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import useWorkspaceDetail from "../../hooks/useWorkspace/useWorkspaceDetail";
import useWorkspaces from "../../hooks/useWorkspaces/useWorkspaces";
import { useParams } from "react-router";
import { LOCAL_STORAGE_TOKEN_KEY } from "../AuthContext/AuthContext";
import type { WorkspaceContextType, IMember, ITokenPayload } from "../../types";

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



    // Se Extrae Token -> Se Extrae el Payload -> se Busca el miembro activo con ese Payload

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const tokenPayload: ITokenPayload | null = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const activeMember = members?.find((m: IMember) => m.user_id === tokenPayload?.id) ?? null;

    const providerValues = {
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
    };

    return (
        <WorkspaceContext.Provider value={providerValues}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspaceContext = () => useContext(WorkspaceContext) as WorkspaceContextType;
export default WorkspaceContextProvider;
