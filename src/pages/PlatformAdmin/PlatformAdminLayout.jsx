import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

const PlatformAdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <AdminNavbar />

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PlatformAdminLayout;
