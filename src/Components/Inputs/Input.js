import React from "react";
import { Input as InputAntd, Form } from "antd";

const Input = React.forwardRef(({ type = "text", children, ...props }, ref) => {
  return (
    <Form.Item label={children}>
      <InputAntd type={type} ref={ref} {...props} />
    </Form.Item>
  );
});

export default Input;
