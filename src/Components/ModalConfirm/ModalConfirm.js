import React from "react";
import Modal from "react-modal";
import "./ModalConfirm.css";
import { ReactComponent as AlertIcon } from "../../imgs/alert-outline.svg";
import { useDispatch } from "react-redux";

const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.200)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 0px 5px 2px rgba(0,0,0,.5)",
    borderRadius: "2px",
  },
};

const ModalConfirm = ({ closeModal, toggleModal, finalize }) => {
  const dispatch = useDispatch();
  const { id, action, message } = finalize;

  return (
    <>
      <Modal
        isOpen={toggleModal}
        style={customStyles}
        contentLabel="Modal de Confirmação"
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="modal-confirm">
          <span>
            <AlertIcon />
            <p>{message}</p>
          </span>
          <div className="modal-confirm__buttons">
            <button
              className="modal-confirm_btn modal-confirm_btn--cancel"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                dispatch(action(id));
                closeModal();
              }}
              className="modal-confirm_btn modal-confirm_btn--confirm"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalConfirm;
