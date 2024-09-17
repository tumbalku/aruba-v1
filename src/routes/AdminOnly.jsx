import React from "react";
import NotFound from "../pages/exception/NotFound";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminOnly = () => {
  const { roles } = useSelector((state) => state.userState);
  const isAdmin = roles.includes("ADMIN");
  if (!isAdmin) {
    return <NotFound />;
  }
  return <Outlet />;
};

export default AdminOnly;
