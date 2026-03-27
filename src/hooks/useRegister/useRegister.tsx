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

/*
        await sendRequest({
            requestCb: async () => {
                // Ejecutamos la función register que hicimos en authService.ts mandándole los 3 campos exactos
                return await register({
                    name: formState[REGISTER_FORM_FIELDS.NAME],
                    email: formState[REGISTER_FORM_FIELDS.EMAIL],
                    password: formState[REGISTER_FORM_FIELDS.PASSWORD]
                });
            }
        });

*/