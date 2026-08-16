import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const OrganizationRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Platform admin should not access organization dashboard
  if (user.platformRole === "PLATFORM_ADMIN") {
    return <Navigate to="/platform-admin" replace />;
  }

  // User must belong to an organization
  if (!user.organization) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default OrganizationRoute;
