import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Forgot from "./Forgot";
import { useSelector } from "react-redux";

const User = () => {
  const state = useSelector((state) => state.setUser.login);
  React.useEffect(() => {}, [state.data]);
  if ((state.data !== null) & (state.data?.token !== null)) {
    document.body.style.backgroundColor = "white";
    return <Navigate to="/" />;
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
