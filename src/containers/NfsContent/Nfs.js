import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Nfs.css";
import { ReactComponent as DeleteIcon } from "../../assets/imgs/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/imgs/edit.svg";
import { ReactComponent as DoneIcon } from "../../assets/imgs/done.svg";
import { Loading, Head, ModalConfirm, ModalFunctions } from "../../components";
import { filterIncompleteNF, getNF } from "../../store/slices/setNotaFiscal";
import { API_DEL_NF, API_FIN_NF } from "../../API";

const Nfs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(filterIncompleteNF);
  const { loading, error } = useSelector((state) => state.setNotaFiscal);
  const { id_user } = useSelector((state) => state.setToken.data);
  const { closeModal, openModal, toggleModal, actionModal, setActionModal } =
    ModalFunctions();

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
              <th>NF Gri</th>
              <th>Nº Processo</th>
              <th>Status NF</th>
              <th>Status Boleto</th>
              <th>Acões</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .sort((a, b) => b.processo - a.processo)
                .map(
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
                      <td>{nfGri === null ? "" : nfGri}</td>
                      <td>{processo === null ? "" : processo}</td>
                      <td
                        className={
                          statusNF === "Enviado"
                            ? "nfs__status--true"
                            : "nfs__status--false"
                        }
                      >
                        {statusNF}
                      </td>
                      <td
                        className={
                          statusBoleto === "Enviado"
                            ? "nfs__status--true"
                            : "nfs__status--false"
                        }
                      >
                        {statusBoleto}
                      </td>
                      <td>
                        <button className="nfs__table_icon">
                          <DoneIcon
                            onClick={() => {
                              openModal();
                              setActionModal({
                                nf_id,
                                message: `Deseja finalizar o processo da NF ${nfClient}?`,
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
                                message: `Deseja remover a NF ${nfClient}?`,
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
        {error && (
          <p className="nfs__errorMsg">Nenhuma nota fiscal foi encontrada.</p>
        )}
      </div>
    </section>
  );
};

export default Nfs;