"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface AuthContextProps {
	user: any;
	setUser: (user: any) => void;
	hasPermission: (user: User, permissions: string[]) => boolean;
}
interface AuthProviderProps {
	children: ReactNode;
}
interface UserRole {
	permissions: string[];
}

interface User {
	role: UserRole;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		axios
			.get("/api/current-user")
			.then((response) => setUser(response.data))
			.catch(() => setUser(null));
	}, []);

	const hasPermission = (user: User, permissions: string[]): boolean => {
		return permissions.every((permission) => user.role.permissions.includes(permission));
	};

	return <AuthContext.Provider value={{ user, setUser, hasPermission }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
