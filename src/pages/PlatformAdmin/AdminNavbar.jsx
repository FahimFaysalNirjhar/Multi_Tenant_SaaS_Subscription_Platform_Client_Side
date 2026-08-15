import React from "react";

import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          Platform Administration
        </h1>

        <p className="text-xs text-gray-500">
          Manage your Octopi SaaS platform
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-gray-900">{user?.name}</p>

          <p className="text-xs text-gray-500">Platform Admin</p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
