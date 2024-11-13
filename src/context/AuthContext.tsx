import { createContext } from "react";
import AuthContextType from "../types/AuthContextType";
import AuthProviderPropsType from "../types/AuthProviderPropsType";

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    jwtToken: null,
    login: () => {},
    logout: () => {},
});

export function AuthProvider({children}: AuthProviderPropsType) {
    
}