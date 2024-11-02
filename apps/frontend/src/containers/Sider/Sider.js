import React from "react";
import { Popconfirm, Layout, Avatar, Row } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/setUser";
import { ReactComponent as Logo } from "../../assets/imgs/newLogo.svg";

const { Sider: SiderAntd } = Layout;

const Sider = ({ children: Menu }) => {
  const { username } = useSelector((state) => state.setToken.data);
  const dispatch = useDispatch();
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
      <Row className="logo" align="middle" style={{ paddingLeft: "24px" }}>
        <Logo />
        <h1 style={{ color: "#ece6e6", margin: 0 }}>SetNFy</h1>
      </Row>
      {Menu}
      <div className="profile">
        <Popconfirm
          title="Deseja encerrar a sessão?"
          okText="Sair"
          placement="right"
          icon={<LogoutOutlined />}
          onConfirm={() => dispatch(logout())}
        >
          <Avatar
            style={{ background: "#1890ff" }}
            size="large"
            icon={<UserOutlined />}
          />
        </Popconfirm>
        <p style={{ textTransform: "capitalize" }}>{username}</p>
      </div>
    </SiderAntd>
  );
};

export default Sider;
