import { useState, type ReactNode } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
    isLogged: boolean | undefined;
    manageLogin: (auth_token: string) => void;
    manageLogout: () => void;
}

// al crear un contexto se le puede pasar un obj con los typos y los nombres para autocompletar al usar el contexto mas tarde
export const AuthContext = createContext<AuthContextType>({
    isLogged: false,
    manageLogin: () => { },
    manageLogout: () => { }
} as AuthContextType);

// maneje estado que indique si la sesion esta iniciada o no

export const LOCAL_STORAGE_TOKEN_KEY = 'auth_token_slack'


const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate(); // este hook nos trae navigate que sirve para hacer navegaciones

    const [isLogged, setIsLoggued] = useState<boolean | undefined>(
        Boolean(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY))
    );

    const manageLogin = (auth_token: string) => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, auth_token)
        setIsLoggued(true);
        navigate('/workspace-selector');
    };

    const manageLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        setIsLoggued(false);
        navigate('/');
    };

    const providerValues = {
        isLogged,
        manageLogin,
        manageLogout
    };

    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;