import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Nfs.css";
import { ReactComponent as DeleteIcon } from "../../imgs/delete.svg";
import { ReactComponent as EditIcon } from "../../imgs/edit.svg";
import { ReactComponent as DoneIcon } from "../../imgs/done.svg";
import Head from "../Head/Head";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import getLocalStorage from "../../store/helper/getLocalStorage";
import { filterIncompleteNF, getNF } from "../../store/slices/setNotaFiscal";
import Loading from "../Loading/Loading";
import { API_DEL_NF, API_FIN_NF } from "../../API";

const Nfs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(filterIncompleteNF);
  const { loading } = useSelector((state) => state.setNotaFiscal);
  const id_user = getLocalStorage("id_user", null);
  const [toggleModal, setToggleModal] = React.useState(false);
  const [actionModal, setActionModal] = React.useState({
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

  React.useEffect(() => {
    dispatch(getNF(id_user));
  }, [dispatch, id_user]);

  if (loading) return <Loading />;
  return (
    <section className="nfs">
      <ModalConfirm
        closeModal={closeModal}
        toggleModal={toggleModal}
        finalize={actionModal}
      />
      <Head
        title="Gerenciador de Notas Fiscais"
        description="Gerencie e controle suas notas fiscais"
      />
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
            {data &&
              data.map(
                ({
                  nf_id,
                  type,
                  residuo,
                  nfClient,
                  nfGri,
                  processo,
                  statusNF,
                  statusBoleto,
                }) => (
                  <tr key={nf_id}>
                    <td
                      className={`${
                        type === "Complementar" ? "addNF__tipo--red" : ""
                      }`}
                    >
                      {type}
                    </td>
                    <td>{residuo}</td>
                    <td>{nfClient}</td>
                    <td>{processo}</td>
                    <td>{nfGri === null ? "" : nfGri}</td>
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
                          onClick={() => {
                            openModal();
                            setActionModal({
                              nf_id,
                              message: `Deseja finalizar o processo da NF ${nfGri}?`,
                              action: API_FIN_NF,
                            });
                          }}
                        />
                      </button>
                      <button className="nfs__table_icon">
                        <Link to={`nf/${nf_id}`}>
                          <EditIcon />
                        </Link>
                      </button>
                      <button className="nfs__table_icon">
                        <DeleteIcon
                          onClick={() => {
                            openModal();
                            setActionModal({
                              nf_id,
                              message: `Deseja remover a NF ${nfGri}?`,
                              action: API_DEL_NF,
                            });
                          }}
                        />
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
