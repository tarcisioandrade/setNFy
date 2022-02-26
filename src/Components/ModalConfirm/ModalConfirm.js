import React from 'react'
import "./ModalConfirm.css"

const ModalConfirm = () => {
  return (
    <div className='modal-confirm__content'>
      <div className="modal-confirm">
        <p>Remover Nota Fiscal?</p>
        <div className="modal-confirm__buttons">
          <button>Confirmar</button>
          <button>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm