import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attNF } from "../../store/slices/setNotaFiscal";
import { Modal, Form, Input, Row, Col, Select } from "antd";

// CONSTANTES DO ANTD
const { Option } = Select;

const EditNF = ({ show, handleClose, id }) => {
  const { data } = useSelector((state) => state.setNotaFiscal);
  const nfTarget = data?.length && data?.filter((nf) => nf.nf_id === id)[0];
  // CONSTANTES DO  ANTD
  const [form] = Form.useForm();
  // State Redux Métodos
  const dispatch = useDispatch();
  // Valida se statusNF está enviado para habilitar o select do boleto
  const [onStatusNF, setOnStatusNF] = useState("");
  const statusValid = onStatusNF === "Enviado";
  useEffect(() => {
    setOnStatusNF(nfTarget?.statusNF);
  }, [nfTarget?.statusNF]);

  const onSubmit = (values) => {
    const { residuo, nfClient, nfGri, processo, statusNF, statusBoleto } =
      values;

    dispatch(
      attNF({
        nf_id: id,
        type: nfTarget.type,
        residuo,
        nfClient: Number(nfClient),
        nfGri: nfGri === null ? null : Number(nfGri),
        processo:
          processo === null ? null : +processo.toString().replace(/\./g, ""),
        statusNF,
        statusBoleto: statusNF === "Pendente" ? "Pendente" : statusBoleto,
        statusFinal:
          statusNF === "Enviado" && statusBoleto === "Enviado"
            ? "Completo"
            : "Incompleto",
      })
    );
  };

  return (
    <Modal
      style={{ padding: "16px 0" }}
      destroyOnClose
      focusTriggerAfterClose={false}
      centered
      visible={show}
      onCancel={handleClose}
      okText="Salvar Mudanças"
      title="Editar Nota Fiscal"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onSubmit(values);
            handleClose();
          })
          .catch((err) => err);
      }}
    >
      <Form preserve={false} form={form} layout="vertical">
        <Row gutter={15}>
          <Col span={12}>
            <Form.Item>
              <Input
                value={nfTarget?.type}
                disabled
                style={{ fontWeight: "bold" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          initialValue={nfTarget?.residuo}
          label="Resíduo"
          name="residuo"
          rules={[
            {
              required: true,
              message: "Insira o nome do Resíduo.",
            },
            {
              pattern: /^[a-zA-Z\u00C0-\u00FF\s]*$/,
              message: "Digite apenas letras.",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="NF Cliente"
          name="nfClient"
          initialValue={nfTarget?.nfClient}
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
          initialValue={nfTarget?.nfGri}
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
          initialValue={nfTarget?.processo}
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
            <Form.Item
              label="Envio NF"
              name="statusNF"
              initialValue={nfTarget?.statusNF}
            >
              <Select onChange={(value) => setOnStatusNF(value)}>
                <Option value="Pendente" />
                <Option value="Enviado" />
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Envio Boleto"
              name="statusBoleto"
              initialValue={nfTarget?.statusBoleto}
            >
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

export default EditNF;
