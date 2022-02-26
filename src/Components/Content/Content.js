import React from "react";
import "./Content.css";
import { ReactComponent as PalosoIcon } from "../../imgs/paloso.svg";
import Nfs from "../NfsContent/Nfs";

const Content = () => {
  return (
    <section className="content">
      <Nfs />
    </section>
  );
};

export default Content;
