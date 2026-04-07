import { useEffect } from "react";
import { verifyEmail } from "../../services/verifyEmailService";
import useRequest from "../useRequest/useRequest";

const useVerifyEmail = (verify_email_token: any) => {
    const { sendRequest, response, error, loading } = useRequest();

    useEffect(() => {
        if (verify_email_token) {
            sendRequest({requestCb: () => verifyEmail(verify_email_token)});        
        };
    },[])

    return {
        response,
        loading,
        error,
    };
};

export default useVerifyEmail;