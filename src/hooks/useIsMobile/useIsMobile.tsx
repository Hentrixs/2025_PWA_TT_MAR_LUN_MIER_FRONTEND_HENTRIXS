import { useState, useEffect } from "react";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    /*
        Gracias a este hook ahora puedo aislar logicas de react-router dependiendo del tamanio de la pantalla
    */

    useEffect(() => {

        const handleResise = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResise);

        return () => {
            window.removeEventListener('resize', handleResise);
        };


    }, []);

    return { isMobile };
};

export default useIsMobile;