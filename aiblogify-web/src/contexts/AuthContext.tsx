"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { Permission } from "@/utils/permissions";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { apiRequest } from "@/utils/api";

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: any) => void;
    isAuthenticated: boolean;
    hasPermission: (permissions: Permission[]) => boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(apiRequest.auth.verify, { withCredentials: true });
                setUser(response.data.user);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
                console.error("Not authenticated:", error);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [user]);

    const hasPermission = (permissions: Permission[]) => {
        if (!user || !user.role) return false;
        return permissions.every((permission) => user.role.permissions.includes(permission));
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(apiRequest.auth.login, { email, password }, { withCredentials: true });
            if (response.data.result) {
                const user = response.data.user;
                enqueueSnackbar(`Welcome! ${user.username}`, { variant: "success" });
                setUser(user);
                setIsAuthenticated(true);
            }
            return response.data;
        } catch (error: any) {
            console.error("Login failed:", error);
            if (error?.response?.status === 401) {
                enqueueSnackbar(error?.response?.data.message, { variant: "error" });
                return error?.response?.data;
            } else {
                enqueueSnackbar("Unknown Error", { variant: "error" });
                return false;
            }
        }
    };

    const logout = async () => {
        try {
            await axios.post(apiRequest.auth.logout, {}, { withCredentials: true });
            setUser(null);
            setIsAuthenticated(false);
            enqueueSnackbar("Logged out!", { variant: "info" });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <SnackbarProvider maxSnack={5}>
            <AuthContext.Provider value={{ user, login, logout, setUser, isAuthenticated, hasPermission }}>{children} </AuthContext.Provider>
        </SnackbarProvider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProviderWrap = ({ children }: { children: ReactNode }) => {
    return (
        <SnackbarProvider maxSnack={5}>
            <AuthProvider>{children}</AuthProvider>
        </SnackbarProvider>
    );
};
