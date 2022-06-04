import React from "react";
import { Popconfirm, Layout, Avatar } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { logout } from "../../store/slices/setUser";

const { Sider: SiderAntd } = Layout;

const Sider = ({ children: Menu }) => {
  const { username } = useSelector((state) => state.setToken.data);

  return (
    <SiderAntd
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "#102e44",
        zIndex: 50,
      }}
    >
      <div className="logo">
        <h1 level={2} style={{ color: "#ece6e6", margin: 0 }}>
          SetNFy
        </h1>
      </div>
      {Menu}
      <div className="profile">
        <Popconfirm
          title="Deseja encerrar a sessão?"
          okText="Sair"
          placement="right"
          icon={<LogoutOutlined />}
          onConfirm={() => logout()}
        >
          <Avatar
            style={{ background: "#1890ff" }}
            size="large"
            icon={<UserOutlined />}
          />
        </Popconfirm>
        <p>{username}</p>
      </div>
    </SiderAntd>
  );
};

export default Sider;
