import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { data } = useSelector((state) => state.setToken);
  if (data === null) return false;
  else return true;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/user/login" />;
};

export default ProtectedRoute;
