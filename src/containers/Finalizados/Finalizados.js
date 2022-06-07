import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNF, filterCompleteNF } from "../../store/slices/setNotaFiscal";
import { API_DEL_NF } from "../../API";
import { Col, Row, Input, Table, Typography, Button, Modal } from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import GlobalFilters from "./GlobalFilters";

// CONSTANTES ANTD
const { Search } = Input;
const { Column } = Table;
const { Text } = Typography;
const { confirm } = Modal;

const Finalizados = () => {
  const data = useSelector(filterCompleteNF);
  const { loading } = useSelector((state) => state.setNotaFiscal);
  const { id_user } = useSelector((state) => state.setToken.data);
  const dispatch = useDispatch();
  const searchTerm = ["residuo", "nfClient", "nfGri", "processo"];
  const [searchData, setSearchData] = useState(data);

  useEffect(() => {
    dispatch(getNF(id_user));
    console.log("efectou");
  }, [dispatch, id_user]);

  // FUNÇÕES DO ANTD
  const showDeleteConfirm = (nf_id, name) => {
    confirm({
      title: `Deseja apagar o processo da NF ${name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Confirmar",
      cancelText: "Cancelar",
      async onOk() {
        const { data } = await API_DEL_NF({ nf_id });
        if (data?.ok) dispatch(getNF(id_user));
        console.log(data);
      },
    });
  };

  console.log("SearchData", searchData);
  console.log("Data", data);
  return (
    <>
      <Row justify="end" style={{ marginBottom: "16px" }}>
        <Col span={6}>
          <Search
            enterButton="Pesquisar"
            size="large"
            allowClear
            placeholder="Pesquisar"
            prefix={<SearchOutlined style={{ color: "#ccc" }} />}
            onSearch={(value) =>
              setSearchData(GlobalFilters(data, value, searchTerm))
            }
          />
        </Col>
      </Row>
      <Table
        pagination={{ responsive: true }}
        loading={loading}
        dataSource={searchData}
        rowKey={({ nfClient }) => nfClient + 1}
      >
        <Column
          title="TIPO"
          dataIndex="type"
          key="type"
          width={150}
          filters={[
            {
              text: "Venda",
              value: "Venda",
            },
            {
              text: "Complementar",
              value: "Complementar",
            },
            {
              text: "Doação",
              value: "Doação",
            },
          ]}
          onFilter={(value, record) => record.type.indexOf(value) === 0}
          render={(_, { type }) => (
            <Text
              type={
                type === "Venda" ? "" : type === "Complementar" ? "danger" : ""
              }
            >
              {type}
            </Text>
          )}
        />
        <Column
          width={240}
          title="RESÍDUO"
          dataIndex="residuo"
          key="residuo"
          className="weight"
        />

        <Column
          title="NF CLIENTE"
          dataIndex="nfClient"
          key="nfClient"
          sorter={(a, b) => a.nfGri - b.nfGri}
        />
        <Column
          title="NF GRI"
          dataIndex="nfGri"
          key="nfGri"
          sorter={(a, b) => a.nfGri - b.nfGri}
        />
        <Column
          title="PROCESSO"
          dataIndex="processo"
          key="processo"
          sorter={(a, b) => a.processo - b.processo}
          defaultSortOrder="descend"
        />
        <Column
          title="STATUS"
          dataIndex="statusFinal"
          key="statusFinal"
          render={(_, { statusFinal }) => (
            <Text type="success" className="weight">
              {statusFinal}
            </Text>
          )}
        />
        <Column
          title="AÇÃO"
          align="center"
          key="ação"
          render={(_, { nf_id, nfClient }) => (
            <Button
              size="small"
              icon={<DeleteOutlined />}
              type="primary"
              onClick={() => showDeleteConfirm(nf_id, nfClient)}
            />
          )}
        />
      </Table>
    </>
  );
};

export default Finalizados;
