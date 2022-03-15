import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Forgot from "./Forgot";
import { useSelector } from "react-redux";

const User = () => {
  const { data, loading } = useSelector((state) => state.setUser.login);

  if ((data !== null) & (data?.token !== null)) {
    document.body.style.backgroundColor = "white";
    return <Navigate to="/" />;
  } else {
    document.body.style.backgroundColor = "#B1D0E0";
  }
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot" element={<Forgot />} />
      </Routes>
    </>
  );
};

export default User;
