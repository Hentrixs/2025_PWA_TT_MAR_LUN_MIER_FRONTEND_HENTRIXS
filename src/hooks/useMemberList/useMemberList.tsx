import { useEffect } from "react";
import { getMemberList } from "../../services/workspaceMemberService";
import useRequest from "../useRequest/useRequest";

const useMemberList = (workspace_id: string) => {
    const { response, loading, error, sendRequest } = useRequest();

    const refetchMemberList = () => {
        if (workspace_id) {
            sendRequest({ requestCb: () => getMemberList(workspace_id) });
        }
    };

    useEffect(() => {
        refetchMemberList();
    }, [workspace_id]);

    const member_list = response?.data?.members || [];

    return {
        member_list,
        loading,
        error,
        refetchMemberList
    };
};

export default useMemberList;
