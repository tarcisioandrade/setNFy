import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DeleteIcon } from "../../assets/imgs/delete.svg";
import { getNF, filterCompleteNF } from "../../store/slices/setNotaFiscal";
import { Head, Loading } from "../../components";
import "./Finalizados.css";
import { API_DEL_NF } from "../../API";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import ModalFunctions from "../ModalConfirm/ModalFunctions";

const Finalizados = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const data = useSelector(filterCompleteNF);
  const { loading } = useSelector((state) => state.setNotaFiscal);
  const { id_user } = useSelector((state) => state.setToken.data);
  const dispatch = useDispatch();
  const { closeModal, openModal, toggleModal, actionModal, setActionModal } =
    ModalFunctions();

  React.useEffect(() => {
    dispatch(getNF(id_user));
  }, [dispatch, id_user]);

  if (loading) return <Loading />;
  return (
    <section className="finalizados">
      <Head title="Finalizadas" description="NFs Finalizadas" />
      <ModalConfirm
        closeModal={closeModal}
        toggleModal={toggleModal}
        finalize={actionModal}
      />
      <div className="finalizados__header">
        <h2>Notas Fiscais Finalizadas</h2>
        <input
          type="search"
          name="search"
          placeholder="Pesquisar..."
          className="finalizados__search"
          onChange={({ target }) => setSearchValue(target.value)}
        />
      </div>
      <div className="finalizados__table-content">
        <table className="finalizados__table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Resíduo</th>
              <th>NF Cliente</th>
              <th>NF Gri</th>
              <th>Nº Processo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .filter(({ type, residuo, nfClient, nfGri, processo }) => {
                  if (searchValue === "") {
                    return residuo;
                  } else if (
                    residuo
                      .toLocaleLowerCase()
                      .includes(searchValue.toLocaleLowerCase())
                  ) {
                    return residuo;
                  } else if (
                    type
                      .toLocaleLowerCase()
                      .includes(searchValue.toLocaleLowerCase())
                  ) {
                    return residuo;
                  } else if (
                    nfClient.toString().includes(searchValue.toString())
                  ) {
                    return nfClient;
                  } else if (
                    processo
                      .toString()
                      .replace(/\./g, "")
                      .includes(searchValue.toString().replace(/\./g, ""))
                  ) {
                    return processo;
                  } else if (
                    nfGri.toString().includes(searchValue.toString())
                  ) {
                    return nfGri;
                  } else {
                    return null;
                  }
                })
                .sort((a, b) => b.processo - a.processo)
                .map(
                  ({
                    nf_id,
                    type,
                    residuo,
                    nfClient,
                    nfGri,
                    processo,
                    statusFinal,
                  }) => (
                    <tr key={nf_id}>
                      <td
                        className={`${
                          type === "Complementar"
                            ? "finalizados__tipo--red"
                            : ""
                        }`}
                      >
                        {type}
                      </td>
                      <td>{residuo}</td>
                      <td>{nfClient}</td>
                      <td>{nfGri}</td>
                      <td>{processo}</td>
                      <td
                        className={
                          statusFinal === "Completo"
                            ? "finalizados__status--true"
                            : "finalizados__status--false"
                        }
                      >
                        {statusFinal}
                      </td>
                      <td>
                        <button className="finalizados__table_icon">
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
      </div>
    </section>
  );
};

export default Finalizados;
