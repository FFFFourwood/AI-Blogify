// components/ProtectedRoute.tsx
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Permission } from "@/utils/permissions";

interface ProtectedRouteProps {
    children: ReactNode;
    permissions: Permission[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, permissions }) => {
    const { user, hasPermission } = useAuth();
    // const router = useRouter();

    useEffect(() => {
        if (!user) {
            // router.push("/login");
            alert("Please login first");
        } else if (!hasPermission(permissions)) {
            // router.push("/not-authorized");
            alert("You don't have permission to access this page");
        }
    }, [user, hasPermission, permissions]);

    if (!user || !hasPermission(permissions)) {
        return null; // 可以返回一个加载组件或者其他内容
    }

    return <>{children}</>;
};

export default ProtectedRoute;
