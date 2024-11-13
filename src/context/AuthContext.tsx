import { createContext, useContext, useState } from "react";
import AuthContextType from "../types/AuthContextType";
import AuthProviderPropsType from "../types/AuthProviderPropsType";

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    jwtToken: "",
    login: () => {},
    logout: () => {},
    username: "",
    email: "",
});

export function AuthProvider({children}: AuthProviderPropsType) {
    
    const [isAuthenticated,setIsAuthenticated] = useState<boolean>(false);
    const [jwtToken,setJwtToken] = useState<string>("");
    const [username,setUsername] = useState<string>("");
    const [email,setEmail] = useState<string>("");

    function login(jwtToken:string,username:string,email:string) {
        setIsAuthenticated(true);
        setJwtToken(jwtToken);
        setUsername(username);
        setEmail(email);
        console.log(email);
        console.log(username);
    }

    function logout() {
        setIsAuthenticated(false);
        setJwtToken("");
    }

    return (
        <AuthContext.Provider value={{isAuthenticated,jwtToken,login,logout,username,email}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}