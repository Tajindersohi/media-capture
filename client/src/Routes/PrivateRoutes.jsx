import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import GeneralLayout from "../Layouts/GeneralLayout";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const user = useSelector((state)=>state.user.user);
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <GeneralLayout>
      <Outlet />
    </GeneralLayout>
  );
};

export default PrivateRoute;
