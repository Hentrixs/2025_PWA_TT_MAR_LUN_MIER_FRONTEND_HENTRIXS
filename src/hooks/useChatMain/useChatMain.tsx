import { useEffect } from "react";
import useRequest from "../useRequest/useRequest";
import { channelMessageHistory } from "../../services/channelMessageService";

function useChatMain(channel_id: string | any) {
    
    const {response, loading, error, sendRequest} = useRequest();
    
    // Aver: esto ha de traer el historial de mensajes
    // Ademas ha de tener la funcion para enviar un mensaje
    // el historial de mensajes ha de re-renderizarse por cada vez que subo o borro un mensaje
    // por ahora centramos en solamente hacerlo para cuando subo el msg porque estamos buscando el MVP

    // Entonces, esto debera tener un useEffect()
    // El useEffect traera el historial de msg y el titulo del header
    // por otra parte, en el componente principal (ChatMain)
    // tendre que usar el useForm para realizar la parte de enviar los mensajes
    // Aca creo que el problema sera la parte de que el historial de msg se actualize
    // cuando agrego un msg.

    // Por ahora intentare Solamente hacer ambas partes por separado y luego me preocupare por la conexion.
    // Con lo cual el paso logico seria crear el historial de msg.
    
    
    useEffect(() => {
        sendRequest({requestCb: () => {return channelMessageHistory(channel_id)}})
    },[channel_id])
    
    let messagelist = null
    if (response) {
        messagelist = response.data.channelMessagesHistory;
    }

    return {
        messagelist,
        response,
        loading,
        error,
        refreshMessages: () => sendRequest({requestCb: () => channelMessageHistory(channel_id)})
    }
};

export default useChatMain;