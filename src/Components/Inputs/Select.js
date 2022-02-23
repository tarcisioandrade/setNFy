import React from "react";
import "./Input.css";
const Select = ({ onChange, optionOne, optionTwo, label, value }) => {
  return (
    <label className="labelComp">
      {label}
      <select value={value} className="inputComp" onChange={onChange}>
        <option>{optionOne}</option>
        <option>{optionTwo}</option>
      </select>
    </label>
  );
};

export default Select;
