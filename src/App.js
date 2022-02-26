import React from "react";
import Menu from "./Components/Menu/Menu";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNF from "./Components/NfsContent/AddNF";
import EditNF from "./Components/NfsContent/EditNF";
import Finalizados from "./Components/Finalizados/Finalizados";
import Nfs from "./Components/NfsContent/Nfs";

const App = () => {
  return (
    <main className="App">
      <Menu />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nfs />} />
          <Route path="adicionar" element={<AddNF />} />
          <Route path="nf/:id" element={<EditNF />} />
          <Route path="finalizados" element={<Finalizados />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
