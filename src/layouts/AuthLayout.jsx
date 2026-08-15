import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-secondary min-h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
