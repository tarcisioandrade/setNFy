import React from "react";
import Menu from "./Components/Menu/Menu";
import "./App.css";
import Content from "./Components/Content/Content";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNF from "./Components/NfsContent/AddNF";
import EditNF from "./Components/NfsContent/EditNF";
import Finalizados from "./Components/Finalizados/Finalizados";

const App = () => {
  return (
    <main className="App">
      <Menu />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="adicionar" element={<AddNF />} />
          <Route path="nf/:id" element={<EditNF />} />
          <Route path="finalizados" element={<Finalizados />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
