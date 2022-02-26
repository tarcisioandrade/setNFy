import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Nfs.css";
import { ReactComponent as DeleteIcon } from "../../imgs/delete.svg";
import { ReactComponent as EditIcon } from "../../imgs/edit.svg";
import { ReactComponent as DoneIcon } from "../../imgs/done.svg";
import { deleteNfItem, nfFinalizeSet } from "../../store/slices/setNotaFiscal";

const Nfs = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.data);
  const dispatch = useDispatch();

  function modalConfirm(id, message, action) {
    if (window.confirm(message)) {
      dispatch(action(id));
    }
  }

  return (
    <div className="nfs">
      <div className="nfs__header">
        <h2>Notas Fiscais</h2>
        <button onClick={() => navigate("/adicionar")} className="nfs__add">
          +
        </button>
      </div>

      <div className="nfs__content">
        <table className="nfs__table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Resíduo</th>
              <th>NF Cliente</th>
              <th>Nº Processo</th>
              <th>NF Gri</th>
              <th>Status NF</th>
              <th>Status Boleto</th>
              <th>Acões</th>
            </tr>
          </thead>
          <tbody>
            {state &&
              state.map(
                ({
                  id,
                  tipoNF,
                  residuo,
                  nfCliente,
                  nfGri,
                  processo,
                  statusNF,
                  statusBoleto,
                }) => (
                  <tr key={id}>
                    <td
                      className={`${
                        tipoNF === "Complementar" ? "addNF__tipo--red" : ""
                      }`}
                    >
                      {tipoNF}
                    </td>
                    <td>{residuo}</td>
                    <td>{nfCliente}</td>
                    <td>{processo}</td>
                    <td>{nfGri}</td>
                    <td
                      className={
                        statusNF === "Enviado"
                          ? "nfs__status--true"
                          : "nfs__status--false"
                      }
                    >
                      {statusNF === "Enviado" ? "Enviado" : "Pendente"}
                    </td>
                    <td
                      className={
                        statusBoleto === "Enviado"
                          ? "nfs__status--true"
                          : "nfs__status--false"
                      }
                    >
                      {statusBoleto === "Enviado" ? "Enviado" : "Pendente"}
                    </td>
                    <td className="test">
                      <button className="nfs__table_icon">
                        <DoneIcon
                          onClick={() =>
                            modalConfirm(
                              id,
                              `Deseja Finalizar o Processo da NF ${nfGri}?`,
                              nfFinalizeSet
                            )
                          }
                        />
                      </button>
                      <button className="nfs__table_icon">
                        <Link to={`nf/${id}`}>
                          <EditIcon />
                        </Link>
                      </button>
                      <button className="nfs__table_icon">
                        <DeleteIcon
                          onClick={() =>
                            modalConfirm(
                              id,
                              `Deseja Remover a NF ${nfGri}?`,
                              deleteNfItem
                            )
                          }
                        />
                      </button>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Nfs;
