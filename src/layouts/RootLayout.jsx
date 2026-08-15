import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="bg-secondary min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default RootLayout;
