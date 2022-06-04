import React from "react";
import { Button, Modal, Form, Input } from "antd";

const ModalAdd = ({ show, handleClose }) => {
  return (
    <Modal
      destroyOnClose
      focusTriggerAfterClose={false}
      centered
      visible={show}
      onCancel={handleClose}
      title="Adicionar Nota Fiscal"
      footer={[
        <Button onClick={handleClose}>Cancelar</Button>,
        <Button
          type="primary"
          onClick={() => {
            handleClose();
          }}
        >
          Adicionar
        </Button>,
      ]}
    >
      ModalAdd
    </Modal>
  );
};

export default ModalAdd;
