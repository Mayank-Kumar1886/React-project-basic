import React from "react";
import Header from "../UI/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../UI/Footer";

const AppLayout = () => {
  const location = useLocation();
  const hideFooter = ["/students", "/teachers"].includes(location.pathname);

  return (
    <>
      <Header />

      <Outlet />

      {!hideFooter && <Footer />}
    </>
  );
};

export default AppLayout;
