import React from "react";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";

const AdminDashboard: React.FC = () => {
  return (
    <Layout showHeader={true} showFooter={true} showSidebar={true}>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      {/* 其他内容 */}
    </Layout>
  );
};

export default () => (
  <ProtectedRoute
    path="/admin/dashboard"
    component={AdminDashboard}
    permissions={["admin:read"]}
  />
);
