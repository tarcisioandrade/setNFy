import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import User from "./Components/Usuario/User";
import { useDispatch } from "react-redux";
import { autoLogin } from "./store/slices/setUser";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/user/*" element={<User />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
