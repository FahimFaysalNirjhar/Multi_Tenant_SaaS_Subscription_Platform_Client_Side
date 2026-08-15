import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          //   {
          //     path: "forgot-password",
          //     element: <ForgotPassword />,
          //   },
          //   {
          //     path: "reset-password/:token",
          //     element: <ResetPassword />,
          //   },
        ],
      },
    ],
  },
]);
