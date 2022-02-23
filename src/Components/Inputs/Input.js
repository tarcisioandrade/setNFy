import React from "react";
import "./Input.css";

const Input = ({ type = "text", placeholder, children, ...props }) => {
  return (
    <label className="labelComp">
      {children}
      <input
        className="inputComp"
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </label>
  );
};

export default Input;
