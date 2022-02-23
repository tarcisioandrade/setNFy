import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Nfs.css";
import { ReactComponent as DeleteIcon } from "../../imgs/delete.svg";
import { ReactComponent as EditIcon } from "../../imgs/edit.svg";
import { ReactComponent as DoneIcon } from "../../imgs/done.svg";
import { deleteNfItem, finalizeNfItem } from "../../store/slices/setNotaFiscal";

const Nfs = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <section className="nfs">
      <div className="nfs__header">
        <h2>Notas Fiscais</h2>
        <div className="nfs__search">
          <input type="search" name="search" />
        </div>
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
              <th>NF Gri</th>
              <th>Nº Processo</th>
              <th>Status NF</th>
              <th>Status Boleto</th>
              <th>Acões</th>
            </tr>
          </thead>
          <tbody>
            {state.map(
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
                <tr key={id} id={id}>
                  <td>{tipoNF}</td>
                  <td>{residuo}</td>
                  <td>{nfCliente}</td>
                  <td>{nfGri}</td>
                  <td>{processo}</td>
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
                      <DoneIcon onClick={() => dispatch(finalizeNfItem(id))} />
                    </button>
                    <button className="nfs__table_icon">
                      <Link to={`nf/${id}`}>
                        <EditIcon />
                      </Link>
                    </button>
                    <button className="nfs__table_icon">
                      <DeleteIcon onClick={() => dispatch(deleteNfItem(id))} />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Nfs;
