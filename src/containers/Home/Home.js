import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "../Menu/Menu";
import Nfs from "../NfsContent/Nfs";
import { Layout } from "antd";
import Sider from "../Sider/Sider";
import BreadCrump from "../../components/BreadCrump/BreadCrumb";
import { Loading } from "../../components";
const { Content } = Layout;
const HistoricoLazy = lazy(() => import("../Historico/Historico"));

const Home = () => {
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
              <Route
                path="historico"
                element={
                  <Suspense fallback={<Loading size="medium" />}>
                    <HistoricoLazy />
                  </Suspense>
                }
              />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
