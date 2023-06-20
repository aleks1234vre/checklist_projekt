import { ReactNode, useState } from 'react';
import {AuthContext, AuthContextProps} from './auth.context';
import axios from "axios";


export interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async (data: any) => {
        try {
            // Implement your login logic using the provided data
            // Example: Call an API endpoint to authenticate the user
            const response = await axios.post('http://localhost:3000/auth/login', data, { withCredentials: true });


            if (response.status === 200) {
                setIsAuthenticated(true);
                // Perform any additional actions after successful login
            } else {
                // Handle login error, display error message, etc.
            }
        } catch (error) {
            // Handle login error, display error message, etc.
        }
    };

    const authContextValue: AuthContextProps = {
        isAuthenticated,
        login: handleLogin,
        // Other authentication-related values and functions
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;