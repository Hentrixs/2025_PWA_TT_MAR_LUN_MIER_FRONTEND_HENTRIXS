import { createContext, useContext } from "react";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import useWorkspace from "../../hooks/useWorkspace/useWorkspace";
import useWorkspaces from "../../hooks/useWorkspaces/useWorkspaces";
import { useParams } from "react-router";
import useChannel from "../../hooks/useChannel/useChannel";
import { LOCAL_STORAGE_TOKEN_KEY } from "../AuthContext/AuthContext";

const WorkspaceContext = createContext<any>(null);

export function WorkspaceContextProvider({ children }: { children: React.ReactNode }) {

    const { workspace_id } = useParams();
    const { isMobile } = useIsMobile();

    const {
        workspaces,
        loading: loadingWorkspaces,
        error: errorWorkspaces,
        response: responseWorkspaces
    } = useWorkspaces();

    const { workspace, members } = useWorkspace(workspace_id ?? '');

    const {
        channel_list,
        refetchChannels,
        loading: loadingChannels,
        error: errorChannel,
        response: responseChannel
    } = useChannel(workspace_id ?? '');

    // Se Extrae Token -> Se Extrae el Payload -> se Busca el miembro activo con ese Payload

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const activeMember = members?.find((m: any) => m.user_id === tokenPayload?.id) ?? null;

    const providerValues = {
        workspace,
        members,
        activeMember,
        workspaces,
        loadingWorkspaces,
        errorWorkspaces,
        responseWorkspaces,
        isMobile,
        channel_list,
        refetchChannels,
        loadingChannels,
        errorChannel,
        responseChannel
    };

    return (
        <WorkspaceContext.Provider value={providerValues}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspaceContext = () => useContext(WorkspaceContext);
export default WorkspaceContextProvider;
