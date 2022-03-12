import React from "react";
import { useDispatch, useSelector } from "react-redux";
import getLocalStorage from "../../store/helper/getLocalStorage";
import { getNF } from "../../store/slices/setNotaFiscal";
import Head from "../Head/Head";
import "./Finalizados.css";
import Loading from "../Loading/Loading";

const Finalizados = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const { data, loading } = useSelector((state) => state.setNotaFiscal);
  const dispatch = useDispatch();
  const id_user = getLocalStorage("id_user", null);

  React.useEffect(() => {
    if (id_user) {
      dispatch(getNF(id_user));
    }
  }, [dispatch, id_user]);

  if (loading) return <Loading />;
  return (
    <section className="finalizados">
      <Head title="Finalizadas" description="NFs Finalizadas" />
      <div className="finalizados__header">
        <h2>Nota Fiscais Finalizadas</h2>
        <input
          type="search"
          name="search"
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
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .filter(({ statusFinal }) => statusFinal === "Completo")
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
