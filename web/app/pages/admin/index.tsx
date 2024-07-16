import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* 其他内容 */}
    </div>
  );
};

export default () => (
  <ProtectedRoute permissions={["admin:read"]}>
    <AdminPage />
  </ProtectedRoute>
);
