import { createBrowserRouter } from "react-router";

import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Plan from "../pages/Plan/Plan";

import PlatformAdminRoute from "../pages/Routes/PlatformAdminRoute";
import PlatformAdminLayout from "../pages/PlatformAdmin/PlatformAdminLayout";
import Dashboard from "../pages/PlatformAdmin/Dashboard";
import ManagePlans from "../pages/PlatformAdmin/Dashboard/ManagePlans";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      // =========================
      // Public Routes
      // =========================
      {
        index: true,
        Component: Home,
      },

      // =========================
      // Authentication Routes
      // =========================
      {
        Component: AuthLayout,
        children: [
          {
            path: "login",
            Component: Login,
          },
          {
            path: "register",
            Component: Register,
          },
          {
            path: "forgot-password",
            Component: ForgotPassword,
          },
          {
            path: "reset-password/:token",
            Component: ResetPassword,
          },
        ],
      },

      // =========================
      // Plans
      // =========================
      {
        path: "plans",
        Component: Plan,
      },

      // =========================
      // Platform Admin
      // =========================
      {
        element: <PlatformAdminRoute />,
        children: [
          {
            path: "platform-admin",
            Component: PlatformAdminLayout,
            children: [
              {
                index: true,
                Component: Dashboard,
              },
              {
                path: "plans",
                Component: ManagePlans,
              },
              // {
              //   path: "organizations",
              //   Component: Organizations,
              // },
              // {
              //   path: "users",
              //   Component: Users,
              // },
              // {
              //   path: "subscriptions",
              //   Component: Subscriptions,
              // },
            ],
          },
        ],
      },
    ],
  },
]);
