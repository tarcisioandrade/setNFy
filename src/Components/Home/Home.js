import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Finalizados from "../Finalizados/Finalizados";
import Menu from "../Menu/Menu";
import AddNF from "../NfsContent/AddNF";
import EditNF from "../NfsContent/EditNF";
import Nfs from "../NfsContent/Nfs";

const Home = () => {
  const state = useSelector((state) => state.setUser.login);
  if (state.data === null || state.data.token === null) {
    document.body.style.backgroundColor = "#B1D0E0";
    return <Navigate to="/user/login" />;
  }
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Nfs />} />
        <Route path="adicionar" element={<AddNF />} />
        <Route path="nf/:id" element={<EditNF />} />
        <Route path="finalizados" element={<Finalizados />} />
      </Routes>
    </>
  );
};

export default Home;
