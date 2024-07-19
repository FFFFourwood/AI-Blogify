"use client";
import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Permission } from "@/utils/permissions";

const Admin: React.FC = () => {
    return <h1 className="text-3xl font-bold">Admin Dashboard</h1>;
};

const AdminPage: React.FC = () => (
    <ProtectedRoute permissions={[Permission.ADMIN]}>
        <Admin />
    </ProtectedRoute>
);

export default AdminPage;
