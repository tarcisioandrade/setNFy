import React from "react";
import { useSelector } from "react-redux";
import "./Finalizados.css";

const Finalizados = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const state = useSelector((state) => state.completeList);
  
  return (
    <section className="finalizados">
      <h1 className="finalizados__title">Nota Fiscais Finalizadas</h1>
      <div className="finalizados__header">
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
            {state
              .filter(({ residuo, nfCliente, nfGri }) => {
                if (searchValue === "") {
                  return residuo;
                } else if (
                  residuo
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase())
                ) {
                  return residuo;
                } else if (
                  nfCliente.toString().includes(searchValue.toString())
                ) {
                  return nfCliente;
                } else if (nfGri.toString().includes(searchValue.toString())) {
                  return nfGri;
                } else {
                  return null;
                }
              })
              .map(
                ({
                  id,
                  tipoNF,
                  residuo,
                  nfCliente,
                  nfGri,
                  processo,
                  statusFinal,
                }) => (
                  <tr key={id}>
                    <td
                      className={`${
                        tipoNF === "Complementar"
                          ? "finalizados__tipo--red"
                          : ""
                      }`}
                    >
                      {tipoNF}
                    </td>
                    <td>{residuo}</td>
                    <td>{nfCliente}</td>
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
