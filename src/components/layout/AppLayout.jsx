import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />

      <Footer />
    </>
  );
};

export default AppLayout;
