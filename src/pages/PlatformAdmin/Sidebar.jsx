import React from "react";
import { NavLink } from "react-router";

const Sidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      path: "/platform-admin",
      icon: "📊",
    },
    {
      name: "Plans",
      path: "/platform-admin/plans",
      icon: "💳",
    },
    {
      name: "Organizations",
      path: "/platform-admin/organizations",
      icon: "🏢",
    },
    {
      name: "Users",
      path: "/platform-admin/users",
      icon: "👥",
    },
    {
      name: "Subscriptions",
      path: "/platform-admin/subscriptions",
      icon: "📋",
    },
  ];

  return (
    <aside className="hidden w-64 border-r border-gray-200 bg-white md:block">
      <div className="sticky top-0 flex h-screen flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <NavLink
            to="/platform-admin"
            className="text-2xl font-bold text-primary"
          >
            Octopi
          </NavLink>
        </div>

        {/* Admin Label */}
        <div className="px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Platform Admin
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/platform-admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <span>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-gray-200 p-4">
          <NavLink
            to="/"
            className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            ← Back to Website
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
