import useRequest from "../useRequest/useRequest";
import { deleteAccount } from "../../services/authService";

const useDeleteAccount = () => {
    const { response, loading, error, sendRequest } = useRequest();

    const handleAccountDeletion = (password: string) => {
        if (!password) {
            return null;
        };
        sendRequest({ requestCb: () => deleteAccount({ password }) });
    };

    return { handleAccountDeletion, response, loading, error };
};

export default useDeleteAccount;
