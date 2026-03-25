const ENVIRONMENT = {
    API_URL: import.meta.env.VITE_API_URL // todo lo que es el frontend, siempre se expondra. inlcuso si se trata de ocultar con Proxy.
};

export default ENVIRONMENT;

/*

Para el frontend
en el .ENV:
    las variables de entorno deben de empezar con VITE_
    (no se porque pero es obligatorio al parecer)

en el ENVIRONMENT:
    En el caso de Vite la forma correcta de trabajarlo es: API_URL: import.meta.env.VITE_API_URL
    Segun tengo entendido con otras tecnologias la forma de traer las ENV es diferente.

*/