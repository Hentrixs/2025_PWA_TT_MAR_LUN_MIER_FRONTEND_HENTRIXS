import useRequest from "../useRequest/useRequest";
import { requestEmailChange } from "../../services/authService";

const useRequestEmailChange = () => {
    const { loading, response, error, sendRequest } = useRequest();

    const handleRequestEmailChange = async (formState: Record<string, string>) => {
        const { password, new_email } = formState;
        sendRequest({
            requestCb: () => requestEmailChange({ password, new_email })
        });
    };

    return {
        handleRequestEmailChange,
        loading,
        response,
        error
    };
};

export default useRequestEmailChange;
