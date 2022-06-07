import React from "react";
import { Route, Routes } from "react-router-dom";
import Finalizados from "../Finalizados/Finalizados";
import Menu from "../Menu/Menu";
import Nfs from "../NfsContent/Nfs";
import { Layout } from "antd";
import Sider from "../Sider/Sider";
import BreadCrump from "../../components/BreadCrump/BreadCrumb";
const { Content } = Layout;

const Home = () => {
  // Altera a cor do backgroung do body
  document.body.classList.remove("user");
  document.body.classList.add("home");

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: "0 0px" }}>
          <BreadCrump />
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>
              <Route path="home" element={<Nfs />} />
              <Route path="finalizadas" element={<Finalizados />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
