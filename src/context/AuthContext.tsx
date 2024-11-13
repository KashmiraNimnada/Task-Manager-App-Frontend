import { createContext, useContext, useState } from "react";
import AuthContextType from "../types/AuthContextType";
import AuthProviderPropsType from "../types/AuthProviderPropsType";

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    jwtToken: "",
    login: () => {},
    logout: () => {},
    username: "",
});

export function AuthProvider({children}: AuthProviderPropsType) {
    
    const [isAuthenticated,setIsAuthenticated] = useState<boolean>(false);
    const [jwtToken,setJwtToken] = useState<string>("");
    const [username,setUsername] = useState<string>("");

    function login(jwtToken:string,username:string) {
        setIsAuthenticated(true);
        setJwtToken(jwtToken);
        setUsername(username);
        console.log(username);
    }

    function logout() {
        setIsAuthenticated(false);
        setJwtToken("");
    }

    return (
        <AuthContext.Provider value={{isAuthenticated,jwtToken,login,logout,username}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}