import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { nfEditSet } from "../../store/slices/setNotaFiscal";
import Input from "../Inputs/Input";
import Select from "../Inputs/Select";
import "./AddNF.css";

const EditNF = () => {
  const { id } = useParams();
  const state = useSelector((state) => state.data);
  const nfTarget = state.filter((nf) => nf.id === id)[0];

  const [residuo, setResiduo] = React.useState(nfTarget.residuo);
  const [nfCliente, setNfCliente] = React.useState(nfTarget.nfCliente);
  const [nfGri, setNfGri] = React.useState(nfTarget.nfGri);
  const [processo, setProcesso] = React.useState(nfTarget.processo);
  const [statusNF, setStatusNF] = React.useState(nfTarget.statusNF);
  const [statusBoleto, setStatusBoleto] = React.useState(nfTarget.statusBoleto);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const regexp = /\B(?=(\d{3})+(?!\d))/g;

  const tipoDaNF = nfTarget.tipoNF;

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      nfEditSet({
        id,
        tipoNF: tipoDaNF,
        residuo,
        nfCliente: Number(nfCliente),
        nfGri: nfGri === "" ? "" : Number(nfGri),
        processo: Number(processo.toString().replace(regexp, ".")),
        statusNF,
        statusBoleto,
        statusFinal:
          statusNF === "Enviado" && statusBoleto === "Enviado"
            ? "Completo"
            : "Incompleto",
      })
    );
    navigate("/");
  }

  return (
    <section className="addNF" onSubmit={handleSubmit}>
      <h1 className="addNF__title">Editar Nota Fiscal</h1>
      <form className="addNF__form">
        <p
          className={`addNF__tipo ${
            tipoDaNF === "Complementar" ? "addNF__tipo--red" : ""
          }`}
        >
          {tipoDaNF}
        </p>
        <Input
          placeholder="ex: Tambores"
          value={residuo}
          onChange={({ target }) => setResiduo(target.value)}
        >
          Resíduo
        </Input>
        <Input
          type="number"
          value={nfCliente}
          onChange={({ target }) => setNfCliente(target.value)}
        >
          NF Cliente
        </Input>
        <Input
          type="number"
          value={nfGri}
          onChange={({ target }) => setNfGri(target.value)}
        >
          NF Gri
        </Input>
        <Input
          maxLength={6}
          value={processo}
          onChange={({ target }) => setProcesso(target.value)}
        >
          Nª Processo Lecom
        </Input>
        <div className="addNf__row">
          <Select
            value={statusNF}
            onChange={({ target }) => setStatusNF(target.value)}
            label="Status NF"
            optionOne="Pendente"
            optionTwo="Enviado"
          ></Select>
          <Select
            value={statusBoleto}
            onChange={({ target }) => setStatusBoleto(target.value)}
            label="Status Boleto"
            optionOne="Pendente"
            optionTwo="Enviado"
          ></Select>
        </div>
        <button className="addNF__button">Editar Nota Fiscal</button>
      </form>
    </section>
  );
};

export default EditNF;
