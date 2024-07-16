import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function AdminPage() {
	return (
		<div>
			<h1>Admin Dashboard</h1>
			{/* 其他内容 */}
		</div>
	);
}

export default function AdminRoute() {
	return (
		<ProtectedRoute permissions={["admin:read"]}>
			<AdminPage />
		</ProtectedRoute>
	);
}
