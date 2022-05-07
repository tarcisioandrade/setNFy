import { useState } from "react";

const ModalFunctions = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [actionModal, setActionModal] = useState({
    nf_id: null,
    message: null,
    action: null,
  });

  function openModal() {
    setToggleModal(true);
  }

  function closeModal() {
    setToggleModal(false);
  }

  return { toggleModal, actionModal, setActionModal, openModal, closeModal };
};

export default ModalFunctions;
