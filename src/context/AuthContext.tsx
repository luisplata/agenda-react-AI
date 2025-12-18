import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    profile: any; // Replace 'any' with your profile type
    login: (token: string, profile: any) => void;
    logout: () => void;
    // ... other functions like fetchAuthenticated
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
    children: ReactNode; // Use ReactNode for the children prop
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // 1. Read token from localStorage on initialization
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [profile, setProfile] = useState<any>(null); // Initialize with null or fetched profile

    // ... useEffect for initial profile fetch or validation (if needed)

    const login = (newToken: string, userProfile: any) => {
        // 2. Store token in localStorage on login
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setProfile(userProfile);
    };

    const logout = () => {
        // 3. Remove token from localStorage on logout
        localStorage.removeItem('token');
        setToken(null);
        setProfile(null);
        // Redirection on logout can be handled here or by ProtectedRoute
    };

    // ... fetchAuthenticated function

    return (
        <AuthContext.Provider value={{ token, profile, login, logout /* ... */ }}>
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
