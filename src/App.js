import React from "react";
import "./assets/styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home";
import User from "./containers/Usuario/User";
import { useDispatch } from "react-redux";
import { autoLogin } from "./store/slices/setUser";
import ProtectedRoute from "./routes/ProtectedRoute";

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
