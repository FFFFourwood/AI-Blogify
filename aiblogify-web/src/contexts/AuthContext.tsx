"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { axiosFetch } from "@/utils/axios";
import { Permission } from "@/utils/permissions";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { apiRequest } from "@/utils/api";
interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: any) => void;
    isAuthenticated: boolean;
    hasPermission: (permissions: Permission[]) => Promise<boolean>;
    getPermissions: () => Promise<Permission[]>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const { enqueueSnackbar } = useSnackbar();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const checkAuth = async () => {
            try {
                const response = await axiosFetch.get(apiRequest.auth.verify);
                setUser(response.data.user);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        const storedUser = sessionStorage.getItem("user");
        const storedPermissions = sessionStorage.getItem("permissions");
        if (storedUser && storedPermissions) {
            setUser(JSON.parse(storedUser));
            setPermissions(JSON.parse(storedPermissions));
            setIsAuthenticated(true);
        } else {
            checkAuth();
        }
    }, []);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
            sessionStorage.setItem("user", JSON.stringify(user));
        } else {
            setIsAuthenticated(false);
            sessionStorage.removeItem("user");
        }
    }, [user]);

    useEffect(() => {
        if (permissions.length > 0) {
            localStorage.setItem("permissions", JSON.stringify(permissions));
        } else {
            localStorage.removeItem("permissions");
        }
    }, [permissions]);

    const hasPermission = async (permissions: Permission[]) => {
        if (!user || !user.role) return false;
        const permissionsRes = await axiosFetch.get(apiRequest.users.getPermissionsByRole, { id: user.role });
        return permissions.every((permission) => permissionsRes.data.permissions.includes(permission));
    };

    const getPermissions = async () => {
        if (!user || !user.role) return [];
        try {
            const response = await axiosFetch.get(apiRequest.users.getPermissionsByRole, { id: user.role });
            return response.data.permissions;
        } catch (error) {
            console.error("Error getting permissions:", error);
            return [];
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await axiosFetch.post(apiRequest.auth.login, { email, password });
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
            await axiosFetch.post(apiRequest.auth.logout);
            setUser(null);
            setIsAuthenticated(false);
            enqueueSnackbar("Logged out!", { variant: "info" });
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <SnackbarProvider maxSnack={5}>
            <AuthContext.Provider value={{ user, login, logout, setUser, isAuthenticated, hasPermission, getPermissions }}>{children} </AuthContext.Provider>
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
