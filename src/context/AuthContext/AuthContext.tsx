import { useState, useCallback, useMemo, type ReactNode } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router";


interface AuthContextType {
    isLogged: boolean | undefined;
    manageLogin: (auth_token: string) => void;
    manageLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLogged: false,
    manageLogin: () => { },
    manageLogout: () => { }
} as AuthContextType);

export const LOCAL_STORAGE_TOKEN_KEY = 'auth_token_slack'


const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const [isLogged, setIsLoggued] = useState<boolean | undefined>(
        Boolean(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY))
    );

    const manageLogin = useCallback((auth_token: string) => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, auth_token);
        setIsLoggued(true);
        navigate('/workspace-selector');
    }, [navigate]);

    const manageLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        setIsLoggued(false);
        navigate('/');
    }, [navigate]);

    const providerValues = useMemo(() => ({
        isLogged,
        manageLogin,
        manageLogout
    }), [isLogged, manageLogin, manageLogout]);


    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};

export default AuthContextProvider;