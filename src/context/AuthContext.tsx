import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'; // Use type-only import for ReactNode

interface AuthContextType {
    token: string | null;
    profile: string | null;
    login: (newToken: string, newProfile: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props type for AuthProvider, including children
interface AuthProviderProps {
    children?: ReactNode; // children can be optional and of type ReactNode
}

// Use the defined props type for AuthProvider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [profile, setProfile] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        const storedProfile = sessionStorage.getItem('userProfile');
        if (storedToken && storedProfile) {
            setToken(storedToken);
            setProfile(storedProfile);
        }
    }, []);

    const login = (newToken: string, newProfile: string) => {
        sessionStorage.setItem('authToken', newToken);
        sessionStorage.setItem('userProfile', newProfile);
        setToken(newToken);
        setProfile(newProfile);
    };

    const logout = () => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userProfile');
        setToken(null);
        setProfile(null);
    };

    return (
        <AuthContext.Provider value={{ token, profile, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
