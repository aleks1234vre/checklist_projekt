import { createContext, ReactNode } from 'react';

export interface AuthContextProps {
    isAuthenticated: boolean;
    login: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    login: () => Promise.resolve(), // Placeholder implementation
    logout: () => Promise.resolve()
});

export interface AuthProviderProps {
    children: ReactNode;
}