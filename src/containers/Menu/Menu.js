import React from "react";
import { Link } from "react-router-dom";
import { CheckOutlined, PieChartOutlined } from "@ant-design/icons";
import { Menu as MenuAntd } from "antd";

const Menu = () => {
  const menuOptions = [
    getItem(<Link to="/home">Notas Fiscais</Link>, "1", <PieChartOutlined />),
    getItem(<Link to="historico">Histórico</Link>, "2", <CheckOutlined />),
  ];

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  return (
    <MenuAntd
      style={{ background: "#102e44" }}
      theme="dark"
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={menuOptions}
    />
  );
};

export default Menu;
