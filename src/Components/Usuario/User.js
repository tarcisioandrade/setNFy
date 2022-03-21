import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Forgot from "./Forgot";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import ResetPassword from "./ResetPassword";

const User = () => {
  const { data, loading } = useSelector((state) => state.setToken);

  if (loading) return <Loading />;
  if (data) {
    document.body.style.backgroundColor = "#fff";
    return <Navigate to="/" />;
  } else if (!data) document.body.style.backgroundColor = "#B1D0E0";
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="reset_password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default User;
