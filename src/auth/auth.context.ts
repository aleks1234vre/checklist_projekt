import { createContext } from 'react';

export interface AuthContextProps {
    isAuthenticated: boolean;
    login: (data: any) => Promise<void>;
    // Add other authentication-related values and functions here
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    login: () => Promise.resolve(),
    // Initialize other authentication-related values and functions here
});