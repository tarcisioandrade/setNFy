import React from "react";
import { Button, Table, Space, Row, Typography, Modal } from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Head } from "../../components";
import { filterIncompleteNF, getNF } from "../../store/slices/setNotaFiscal";
import { API_DEL_NF, API_FIN_NF } from "../../API";
import AddNF from "./AddNF";
import ModalFunctions from "../../components/ModalConfirm/ModalFunctions";

// CONSTANTES DO ANTD
const { Column } = Table;
const { Text } = Typography;
const { confirm } = Modal;

const Nfs = () => {
  // CONSTANTES DO STATE
  const dispatch = useDispatch();
  const data = useSelector(filterIncompleteNF);
  const { loading } = useSelector((state) => state.setNotaFiscal);
  const { id_user } = useSelector((state) => state.setToken.data);

  // MODAL FUNCOES
  const { openModalAdd, toggleModalAdd, closeModalAdd } = ModalFunctions();

  // FUNÇÕES DO ANTD
  const showDeleteConfirm = (nf_id, name, action, message) => {
    confirm({
      title: `Deseja ${message} o processo da NF ${name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Confirmar",
      cancelText: "Cancelar",
      async onOk() {
        const { data } = await action({ nf_id });
        if (data.ok) dispatch(getNF(id_user));
      },
    });
  };

  React.useEffect(() => {
    dispatch(getNF(id_user));
  }, [dispatch, id_user]);

  return (
    <>
      <Head
        title="Gerenciador de Notas Fiscais"
        description="Gerencie e controle suas notas fiscais"
      />
      <Row justify="space-between" style={{ marginBottom: "10px" }}>
        <h2>Notas Fiscais</h2>
        <Button
          type="primary"
          onClick={() => openModalAdd()}
          icon={<UserAddOutlined />}
          size="large"
        >
          Adicionar
        </Button>
      </Row>
      <Table
        dataSource={data}
        pagination={{ responsive: true }}
        loading={loading}
        rowKey={({ nfClient }) => nfClient + 1}
      >
        <Column
          title="TIPO"
          dataIndex="type"
          key="type"
          render={(_, { type }) => (
            <Text type={type === "Venda" ? "" : "danger"}>{type}</Text>
          )}
        />
        <Column
          title="RESÍDUO"
          dataIndex="residuo"
          key="residuo"
          className="weight"
        />
        <Column title="NF CLIENTE" dataIndex="nfClient" key="nfClient" />
        <Column title="NF GRI" dataIndex="nfGri" key="nfGri" />
        <Column title="PROCESSO" dataIndex="processo" key="processo" />
        <Column
          title="ENVIO NF"
          dataIndex="statusNF"
          key="statusNF"
          render={(_, { statusNF }) => (
            <Text
              type={statusNF === "Pendente" ? "danger" : "success"}
              className="weight"
              title={statusNF}
            >
              {statusNF}
            </Text>
          )}
        />
        <Column
          title="ENVIO BOLETO"
          dataIndex="statusBoleto"
          key="statusBoleto"
          render={(_, { statusBoleto }) => (
            <Text
              type={statusBoleto === "Pendente" ? "danger" : "success"}
              className="weight"
            >
              {statusBoleto}
            </Text>
          )}
        />
        <Column
          title="AÇÃO"
          align="center"
          key="ação"
          render={(_, { nf_id, nfClient }) => (
            <Space size="small">
              <Button
                size="small"
                type="primary"
                icon={<CheckOutlined />}
                onClick={() =>
                  showDeleteConfirm(nf_id, nfClient, API_FIN_NF, "finalizar")
                }
              />
              <Button size="small" type="primary" icon={<EditOutlined />} />
              <Button
                size="small"
                icon={<DeleteOutlined />}
                type="primary"
                onClick={() =>
                  showDeleteConfirm(nf_id, nfClient, API_DEL_NF, "apagar")
                }
              />
            </Space>
          )}
        />
      </Table>
      <AddNF show={toggleModalAdd} handleClose={closeModalAdd} />
    </>
  );
};

export default Nfs;
