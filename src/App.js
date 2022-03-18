import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import User from "./Components/Usuario/User";
import { useDispatch } from "react-redux";
import { autoLogin } from "./store/slices/setUser";
import ProtectedRoute from "./store/helper/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<Home />} />
          </Route>
          <Route path="/user/*" element={<User />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
