import React from "react";
import "./Input.css";

const Input = React.forwardRef(({ type = "text", children, ...props }, ref) => {
  
  return (
    <label className="labelComp">
      {children}
      <input
        className="inputComp"
        type={type}
        ref={ref}
        {...props}
      />
    </label>
  );
});

export default Input;
