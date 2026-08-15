import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

const PlatformAdminRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (user.platformRole !== "PLATFORM_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PlatformAdminRoute;
