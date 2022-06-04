import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import generateID from "../../store/helper/generateID";
import { addNF } from "../../store/slices/setNotaFiscal";
import { Modal, Form, Input, Row, Col, Select } from "antd";

const AddNF = ({ show, handleClose }) => {
  // CONSTANTES ANTD
  const [form] = Form.useForm();
  const { Option } = Select;
  // State Redux Métodos
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.setNotaFiscal);
  const { id_user } = useSelector((state) => state.setToken.data);
  // Valida se statusNF está enviado para habilitar o select do boleto
  const { statusNF } = form.getFieldValue();
  const [onStatusNF, setOnStatusNF] = useState(statusNF);
  const statusValid = onStatusNF === "Enviado";

  console.log(statusValid);
  const onSubmit = (data) => {
    // const { residuo, nfCliente, nfGri, processo, statusNF, statusBoleto } =
    //   data;
    // dispatch(
    //   addNF({
    //     id_user,
    //     nf_id: generateID(),
    //     type: tipoNF,
    //     residuo,
    //     nfClient: Number(nfCliente),
    //     nfGri: nfGri === "" ? null : Number(nfGri),
    //     processo: processo === "" ? null : processo,
    //     statusNF,
    //     statusBoleto: statusNF === "Pendente" ? "Pendente" : statusBoleto,
    //     statusFinal:
    //       statusNF === "Enviado" && statusBoleto === "Enviado"
    //         ? "Completo"
    //         : "Incompleto",
    //   })
    // );
    console.log(data);
  };

  if (data && data.ok) return <Navigate to="/" />;
  return (
    <Modal
      style={{ padding: "16px 0" }}
      destroyOnClose
      focusTriggerAfterClose={false}
      centered
      visible={show}
      onCancel={handleClose}
      okText="Adicionar"
      title="Adicionar Nota Fiscal"
      onOk={() => {
        form
          .validateFields()
          .then((values) => onSubmit(values))
          .catch((err) => err);
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          statusNF: "Pendente",
          statusBoleto: "Pendente",
          tipo: "Venda",
        }}
      >
        <Row>
          <Col span={12}>
            <Form.Item name="tipo" label="Tipo">
              <Select>
                <Option value="Venda" />
                <Option value="Complementar" />
                <Option value="Doação" />
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Resíduo"
          name="residuo"
          rules={[
            {
              required: true,
              message: "Insira o nome do Resíduo",
            },
            {
              pattern: /^[a-zA-Z\u00C0-\u00FF\s]*$/,
              message: "Digite apenas letras",
            },
          ]}
        >
          <Input placeholder="Ex: Bombonas" />
        </Form.Item>

        <Form.Item
          label="NF Cliente"
          name="nfCliente"
          rules={[
            {
              required: true,
              message: "Insira o número da NF do Cliente.",
            },
            {
              pattern: /^[0-9]*$/,
              message: "Digite apenas números.",
              max: 7,
            },
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="NF Gri"
          name="nfGri"
          rules={[
            {
              max: 7,
              pattern: /^[0-9]*$/,
              message: "Digite apenas números.",
            },
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="Processo"
          name="processo"
          rules={[
            {
              pattern: /^([0-9]*[.])?([0-9]*[\s]?)+$/,
              message: "Digite apenas números.",
            },
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Row gutter={15}>
          <Col span={12}>
            <Form.Item label="Envio NF" name="statusNF">
              <Select
                value={onStatusNF}
                onChange={(value) => setOnStatusNF(value)}
              >
                <Option value="Pendente" />
                <Option value="Enviado" />
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Envio Boleto" name="statusBoleto">
              <Select disabled={statusValid ? false : true}>
                <Option value="Pendente" />
                <Option value="Enviado" />
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddNF;
