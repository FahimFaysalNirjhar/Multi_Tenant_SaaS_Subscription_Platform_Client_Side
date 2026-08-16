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
import Organizations from "../pages/PlatformAdmin/Dashboard/Organizations";
import OrganizationRoute from "../pages/Routes/OrganizationRoute";
import OrganizationDashboard from "../pages/OrganizationDashboard/OrganizationDashboard";
import ManageMembers from "../pages/OrganizationDashboard/Managemembers";
import Checkout from "../pages/CheckOut/Checkout";
import CheckoutSuccess from "../pages/CheckoutSuccess/CheckoutSuccess";
import Subscription from "../pages/OrganizationDashboard/Subscription";
import OrganizationSettings from "../pages/OrganizationDashboard/OrganizationSettings";

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

      {
        path: "organization",
        element: <OrganizationRoute />,
        children: [
          {
            index: true,
            element: <OrganizationDashboard />,
          },

          {
            path: "members",
            element: <ManageMembers />,
          },
          {
            path: "subscription",
            element: <Subscription />,
          },
          {
            path: "settings",
            element: <OrganizationSettings />,
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

      {
        path: "checkout/success",
        Component: CheckoutSuccess,
      },

      {
        path: "checkout/:planId",
        Component: Checkout,
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
              {
                path: "organizations",
                Component: Organizations,
              },
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
