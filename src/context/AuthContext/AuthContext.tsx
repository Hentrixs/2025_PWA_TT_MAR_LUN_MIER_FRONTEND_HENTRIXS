import { useState } from "react";
import { useContext, createContext } from "react";
import { Outlet } from "react-router";

interface AuthContextType {
    isLogged: boolean | undefined;
    saveToken: (auth_token: string) => void;
}

// al crear un contexto se le puede pasar un obj con los typos y los nombres para autocompletar al usar el contexto mas tarde
export const AuthContext = createContext<AuthContextType>({ isLogged: false, saveToken: (auth_token: string) => { } } as AuthContextType);
//que carajos es esto, 

// maneje estado que indique si la sesion esta iniciada o no

export const LOCAL_STORAGE_TOKEN_KEY = 'auth_token_slack'


const AuthContextProvider = ({ children }: any) => {
    const [isLogged, setIsLoggued] = useState<boolean | undefined>(
        Boolean(
            localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
            // usualmente tambien se checkea con el backend usando un endpoint.
        )
    );

    const saveToken = (auth_token: string) => {
        // localstorage es un almacenamiento del navegador donde podemos guardar textos en tabla.
        localStorage.setItem('auth_token_slack', auth_token)
        // setItem('nombre','mati') setea en localstorage
        setIsLoggued(true); // ya estamos loggeados esto pasa a estar verdadero.
    };
    // la idea es llegar hasta el punto donde el sistema sepa por el localstorage que ya estaba loggeado

    const providerValues = {
        isLogged,
        saveToken
    };

    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;