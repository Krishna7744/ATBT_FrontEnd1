import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/authContext";
import { Navigate, useLocation, Routes, Outlet } from "react-router-dom";
import Layout from "./SideAndTopBars";

const RequireAuth = () => {
  const { authState } = useContext(AuthContext);
  const location = useLocation();
  return authState.token ? (
    <Layout>
      <Outlet/>
    </Layout>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;