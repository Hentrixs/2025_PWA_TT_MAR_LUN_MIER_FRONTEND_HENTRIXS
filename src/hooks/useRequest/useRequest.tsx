import { useState } from "react";
import { type AppError, parseError } from "../../helpers/errorHelper";

interface useRequestProps {
    requestCb: () => Promise<any>;
};

const useRequest = () => {
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<AppError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const sendRequest = async ({ requestCb }: useRequestProps) => {
        try {
            setResponse(null);
            setError(null);
            setLoading(true);

            const res = await requestCb();

            // Si la API devolvió un { ok: false, message: ... } pero el fetch no tiró error
            if (res && res.ok === false) {
                setError(parseError(res));
                setResponse(res);
            } else {
                setResponse(res);
            }
        } catch (err) {
            setError(parseError(err));
        } finally {
            setLoading(false);
        }
    };

    return {
        sendRequest,
        response,
        error,
        loading
    }
};

export default useRequest;