import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Forgot from "./Forgot";
import { useSelector } from "react-redux";
import { Loading } from "../../components";
import ResetPassword from "./ResetPassword";

const User = () => {
  const { data, loading } = useSelector((state) => state.setToken);

  // // Altera a cor do backgroung do body
  document.body.classList.remove("home");
  document.body.classList.add("user");

  if (loading) return <Loading />;
  if (data) return <Navigate to="/home" />;
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
