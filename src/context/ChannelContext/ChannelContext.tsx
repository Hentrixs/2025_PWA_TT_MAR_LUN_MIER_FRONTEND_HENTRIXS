import { createContext, useContext } from "react";
import useChannel from "../../hooks/useChannel/useChannel";
import { useParams } from "react-router-dom";
import { useWorkspaceContext } from "../WorkspaceContext/WorkspaceContext";

const ChannelContext = createContext<any>(null);

export function ChannelContextProvider({ children }: { children: React.ReactNode }) {
    const { channel_id } = useParams();
    const { workspace_id } = useWorkspaceContext();

    const {
        channel_list,
        refetchChannels,
        loading: loadingChannels,
        error: errorChannel,
        response: responseChannel
    } = useChannel(workspace_id ?? '');

    const providerValues = {
        channel_id,
        channel_list,
        refetchChannels,
        loadingChannels,
        errorChannel,
        responseChannel
    };

    return (
        <ChannelContext.Provider value={providerValues}>
            {children}
        </ChannelContext.Provider>
    );
};

export const useChannelContext = () => useContext(ChannelContext);
export default ChannelContextProvider;
