import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Forgot from "./Forgot";

const User = () => {
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
