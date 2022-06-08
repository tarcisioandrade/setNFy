import { useState } from "react";

const ModalFunctions = () => {
  const [toggleModalAdd, setToggleModalAdd] = useState(false);
  function openModalAdd() {
    setToggleModalAdd(true);
  }
  function closeModalAdd() {
    setToggleModalAdd(false);
  }

  const [toggleModalEdit, setToggleModalEdit] = useState(false);
  function openModalEdit() {
    setToggleModalEdit(true);
  }
  function closeModalEdit() {
    setToggleModalEdit(false);
  }

  return {
    toggleModalAdd,
    openModalAdd,
    closeModalAdd,
    toggleModalEdit,
    openModalEdit,
    closeModalEdit,
  };
};

export default ModalFunctions;
