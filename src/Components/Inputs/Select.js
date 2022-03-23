import React from "react";
import "./Input.css";
const Select = React.forwardRef(({ onChange, onBlur, name, label, ...props },ref, ) => {
  return (
    <label className="labelComp">
      {label}
      <select className="inputComp" name={name} ref={ref} onChange={onChange} onBlur={onBlur} {...props}>
        <option value="Pendente">Pendente</option>
        <option value="Enviado">Enviado</option>
      </select>
    </label>
  );
});

export default Select;
