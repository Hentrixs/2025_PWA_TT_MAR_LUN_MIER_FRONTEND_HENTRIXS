import useRequest from "../useRequest/useRequest";
import { login } from "../../services/authService";

const useLogin = () => {
    const { sendRequest, response, loading, error } = useRequest();

    const hacerLogin = (formState: any) => {
        const { email, password } = formState;
        sendRequest({ requestCb: () => login({ email, password }) });
    };

    return { hacerLogin, response, loading, error };
};

export default useLogin;