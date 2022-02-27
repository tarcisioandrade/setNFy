import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import generateID from "../../store/helper/generateID";
import { nfSet } from "../../store/slices/setNotaFiscal";
import Input from "../Inputs/Input";
import Select from "../Inputs/Select";
import Radio from "../Inputs/Radio";
import "./AddNF.css";
import Head from "../Head/Head";
import { useForm } from "react-hook-form";
import Error from "../Error/Error";

const AddNF = () => {
  // Tipo de NF Venda por padrão
  const [tipoNF, setTipoNF] = React.useState("Venda");

  // State Redux Métodos
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Utilities
  const regexp = /\B(?=(\d{3})+(?!\d))/g;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { residuo, nfCliente, nfGri, processo, statusNF, statusBoleto } =
      data;
    dispatch(
      nfSet({
        id: generateID(),
        tipoNF,
        residuo,
        nfCliente: Number(nfCliente),
        nfGri: nfGri === "" ? "" : Number(nfGri),
        processo: Number(
          processo.toString().replace(/\./g, "").replace(regexp, ".")
        ),
        statusNF,
        statusBoleto,
        statusFinal:
          statusNF === "Enviado" && statusBoleto === "Enviado"
            ? "Completo"
            : "Incompleto",
      })
    );
    navigate("/");
  };

  return (
    <section className="addNF">
      <Head
        title="Adicionar Nota Fiscal"
        descripion="Adicione uma Nota Fiscal"
      />
      <form className="addNF__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="addNf__row--radio">
          <Radio
            options={["Venda", "Complementar"]}
            value={tipoNF}
            setValue={setTipoNF}
          />
        </div>
        <Input
          {...register("residuo", {
            required: "Insira um nome do resíduo.",
            pattern: {
              value: /^[a-zA-Z\u00C0-\u00FF\s]*$/,
              message: "Digite apenas letras",
            },
          })}
          placeholder="ex: Tambores"
        >
          Resíduo*
        </Input>
        {errors.residuo?.message && <Error message={errors.residuo.message} />}
        <Input
          {...register("nfCliente", {
            required: "Insira o número da NF do Cliente.",
            maxLength: { value: 5, message: "Digite no máximo 5 números." },
          })}
          type="number"
        >
          NF Cliente*
        </Input>
        {errors.nfCliente?.message && (
          <Error message={errors.nfCliente.message} />
        )}
        <Input
          type="number"
          {...register("nfGri", {
            maxLength: { value: 4, message: "Digite no máximo 4 números." },
          })}
        >
          NF Gri
        </Input>
        {errors.nfGri?.message && <Error message={errors.nfGri.message} />}
        <Input
          {...register("processo", {
            required: "Insira o número do processo Lecom",
            valueAsNumber: true,
          })}
        >
          Nª Processo Lecom*
        </Input>
        {errors.processo?.message && (
          <Error message={errors.processo.message} />
        )}
        <div className="addNf__row">
          <Select label="Status NF" {...register("statusNF")}></Select>

          <Select label="Status Boleto" {...register("statusBoleto")}></Select>
        </div>
        <button className="addNF__button">Adicionar</button>
      </form>
    </section>
  );
};

export default AddNF;
