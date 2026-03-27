import { useState } from "react";

interface useRequestProps {
    requestCb: () => Promise<any>; // aca esta diciendo qeu la requestCb debe ser una funcion que retorne un promise no?
};

// Maneja con estados de react los estados de una consulta http.

const useRequest = () => {
    const [response, setResponse] = useState<any>(null); // seteamos los states
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const sendRequest = async ({ requestCb }: useRequestProps) => {
        try {
            setResponse(null); // limpiamos los states
            setError(null);
            setLoading(true);

            const res = await requestCb(); // almacenamos en es el return del requestCb();
            setResponse(res); // seteamos response
        } catch (err) { // seteamos err si es necesario y al final siempre seteamos setLoading a false
            setError(err);
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