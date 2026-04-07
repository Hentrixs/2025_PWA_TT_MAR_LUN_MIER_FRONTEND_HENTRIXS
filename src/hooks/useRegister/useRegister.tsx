import { register } from "../../services/authService";
import useRequest from "../useRequest/useRequest"

const useRegister = () => {
    const { sendRequest, response, error, loading } = useRequest();

    const registerSubmit = (formstate: any) => {

        const { name, email, password } = formstate;
        sendRequest({ requestCb: () => register({ name, email, password }) })
    };

    return {
        registerSubmit,
        response,
        error,
        loading
    };
};

export default useRegister;
