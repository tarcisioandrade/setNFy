import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import generateID from "../../store/helper/generateID";
import { nfSet } from "../../store/slices/setNotaFiscal";
import Input from "../Inputs/Input";
import Select from "../Inputs/Select";
import Radio from "../Inputs/Radio";
import "./AddNF.css";

const AddNF = () => {
  const [residuo, setResiduo] = React.useState("");
  const [nfCliente, setNfCliente] = React.useState("");
  const [nfGri, setNfGri] = React.useState("");
  const [processo, setProcesso] = React.useState("");
  const [statusNF, setStatusNF] = React.useState("");
  const [statusBoleto, setStatusBoleto] = React.useState("");
  const [tipoNF, setTipoNF] = React.useState("Venda");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const regexp = /\B(?=(\d{3})+(?!\d))/g;

  function handleSubmite(e) {
    e.preventDefault();
    if (residuo && nfCliente !== "") {
      dispatch(
        nfSet({
          id: generateID(),
          tipoNF,
          residuo,
          nfCliente: Number(nfCliente),
          nfGri: nfGri === "" ? "" : Number(nfGri),
          processo: Number(processo.replace(regexp, ".")),
          statusNF: statusNF !== "" ? statusNF : "Pendente",
          statusBoleto: statusBoleto !== "" ? statusBoleto : "Pendente",
          statusFinal:
            statusNF === "Enviado" && statusBoleto === "Enviado"
              ? "Completo"
              : "Incompleto",
        })
      );
      navigate("/");
    }
  }
  return (
    <section className="addNF">
      <h1 className="addNF__title">Adicione uma Nota Fiscal</h1>
      <form className="addNF__form" onSubmit={handleSubmite}>
        <div className="addNf__row--radio">
          <Radio
            options={["Venda", "Complementar"]}
            value={tipoNF}
            setValue={setTipoNF}
          />
        </div>
        <Input
          required
          placeholder="ex: Tambores"
          value={residuo}
          onChange={({ target }) => setResiduo(target.value)}
        >
          Resíduo*
        </Input>
        <Input
          required
          type="number"
          min={0}
          max={99999}
          maxLength={99999}
          value={nfCliente}
          onChange={({ target }) => setNfCliente(target.value)}
        >
          NF Cliente*
        </Input>
        <Input
          type="number"
          min={0}
          max={99999}
          maxLength={99999}
          value={nfGri}
          onChange={({ target }) => setNfGri(target.value)}
        >
          NF Gri
        </Input>
        <Input
          type="number"
          max={999999}
          maxLength={999999}
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
        <button className="addNF__button">Adicionar</button>
      </form>
    </section>
  );
};

export default AddNF;
