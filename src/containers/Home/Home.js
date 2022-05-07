import React from "react";
import { Route, Routes } from "react-router-dom";
import Finalizados from "../Finalizados/Finalizados";
import Menu from "../Menu/Menu";
import AddNF from "../NfsContent/AddNF";
import EditNF from "../NfsContent/EditNF";
import Nfs from "../NfsContent/Nfs";

const Home = () => {
  
  // Altera a cor do backgroung do body
  document.body.classList.remove("user");
  document.body.classList.add("home");

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
