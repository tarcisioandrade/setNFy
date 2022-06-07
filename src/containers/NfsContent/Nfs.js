import React, { useState } from "react";
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
import { ModalFunctions } from "../../components/";
import EditNF from "./EditNF";

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

  // ID DA NF QUE VAI SER EDITADA
  const [nfID, setNfID] = useState(false);

  // MODAL FUNCOES
  const {
    openModalAdd,
    toggleModalAdd,
    closeModalAdd,
    openModalEdit,
    toggleModalEdit,
    closeModalEdit,
  } = ModalFunctions();

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
      <Row justify="end" style={{ marginBottom: "10px" }}>
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
              <Button
                size="small"
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  openModalEdit();
                  setNfID(nf_id);
                }}
              />
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
      {nfID && (
        <EditNF show={toggleModalEdit} handleClose={closeModalEdit} id={nfID} />
      )}
    </>
  );
};

export default Nfs;
