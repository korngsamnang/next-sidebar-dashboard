"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing token/user on initial load
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("user");

        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setIsLoading(false);
    }, []);

    const login = (token: string, user: User) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
