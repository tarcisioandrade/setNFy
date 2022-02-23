import React from "react";
import "./Content.css";
import { ReactComponent as PalosoIcon } from "../../imgs/paloso.svg";
import Nfs from "../NfsContent/Nfs";
const Content = () => {
  return (
    <section className="content">
      <div className="content__header">
        <h1 className="content__title">
          Bem vindo de volta, <strong>Tarcisio.</strong>
        </h1>
        <PalosoIcon className="content__title_icon" />
      </div>
      <Nfs />
    </section>
  );
};

export default Content;
