import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNF, filterCompleteNF } from "../../store/slices/setNotaFiscal";
import { Head } from "../../components";
import "./Finalizados.css";
import { API_DEL_NF } from "../../API";
import FinalizadosTable from "./FinalizadosTable";

const Finalizados = () => {
  const data = useSelector(filterCompleteNF);
  const { id_user } = useSelector((state) => state.setToken.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNF(id_user));
  }, [dispatch, id_user]);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "nf_id" },
      {
        Header: "Tipo",
        accessor: "type",
      },
      {
        Header: "Resíduo",
        accessor: "residuo",
      },
      {
        Header: "NF Cliente",
        accessor: "nfClient",
      },
      {
        Header: "NF Gri",
        accessor: "nfGri",
      },
      {
        Header: "Nº Processo",
        accessor: "processo",
      },
      {
        Header: "Status",
        accessor: "statusFinal",
      },
    ],
    []
  );

  return (
    <section className="finalizados">
      <Head title="Finalizadas" description="NFs Finalizadas" />
      <FinalizadosTable data={data} deleteNF={API_DEL_NF} columns={columns} />
    </section>
  );
};

export default Finalizados;
