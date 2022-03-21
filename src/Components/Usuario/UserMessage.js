import React from "react";
import "./Usuario.css";

const UserMessage = ({ message }) => {
  return (
    <section className="usuario">
      <div className="usuario__form">
        <h2 className="usuario__message">{message}</h2>
      </div>
    </section>
  );
};

export default UserMessage;
