import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps extends RouteProps {
  permissions?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  permissions = [],
  ...routeProps
}) => {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (!hasPermission(permissions)) {
    return <Redirect to="/not-authorized" />;
  }

  return <Route {...routeProps} />;
};

export default ProtectedRoute;
