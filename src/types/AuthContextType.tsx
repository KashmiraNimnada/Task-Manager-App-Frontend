interface AuthContextType {
    isAuthenticated: boolean,
    jwtToken: string,
    login: (jwtToken: string,username: string,email: string) => void,
    logout: () => void,
    username: string,
    email: string
}

export default AuthContextType;