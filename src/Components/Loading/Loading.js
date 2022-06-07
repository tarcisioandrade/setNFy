import React from "react";
import { Spin } from "antd";
import "./Loader.css";

const Loading = () => {
  document.body.classList.remove("user");
  document.body.classList.add("home");

  return (
    <div className="loader">
      <Spin size="large"></Spin>
    </div>
  );
};

export default React.memo(Loading);
