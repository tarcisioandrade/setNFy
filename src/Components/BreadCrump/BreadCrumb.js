import { Breadcrumb } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap = {
  "/home": "Notas Fiscais",
  "/finalizadas": "Finalizadas",
};

const BreadCrump = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i) || [""];

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">SetNFy</Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb style={{ margin: "16px 24px" }}>{breadcrumbItems}</Breadcrumb>
  );
};

export default BreadCrump;
