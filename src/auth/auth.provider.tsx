import React, { useState } from 'react';
import {AuthContext, AuthContextProps, AuthProviderProps} from './auth.context';
import axios from 'axios';

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async (data: any) => {
        try {
            // Implement your login logic using the provided data
            // Example: Call an API endpoint to authenticate the user
            const response = await axios.post('http://localhost:3000/auth/login', data, {
                withCredentials: true,
            });

            if (response.status === 201) {
                setIsAuthenticated(true);
            } else {
                // Handle authentication failure
            }
        } catch (error) {
            // Handle error
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/auth/logout', null, { withCredentials: true });
            setIsAuthenticated(false);
            // Perform any additional logic after successful logout
        } catch (error) {
            // Handle error
        }
    };

    const authContextValue: AuthContextProps = {
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};