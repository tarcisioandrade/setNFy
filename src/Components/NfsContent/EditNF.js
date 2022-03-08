import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { nfEditSet } from "../../store/slices/setNotaFiscal";
import Head from "../Head/Head";
import Input from "../Inputs/Input";
import Select from "../Inputs/Select";
import "./AddNF.css";
import { useForm } from "react-hook-form";
import Error from "../Error/Error";

const EditNF = () => {
  // Seleciona a array especifica para editar
  const { id } = useParams();
  const state = useSelector((state) => state.setNotaFiscal.data);
  const nfTarget = state.filter((nf) => nf.id === id)[0];
  const tipoNF = nfTarget?.tipoNF;

// State Redux Métodos
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Utilitários
  const regexp = /\B(?=(\d{3})+(?!\d))/g;

  // Valores padroes no input
  const preValues = {
    residuo: nfTarget?.residuo,
    nfCliente: nfTarget?.nfCliente,
    nfGri: nfTarget?.nfGri,
    processo: Number(
      nfTarget?.processo.toString().replace(/\./g, "").replace(regexp, ".")
    ),
    statusNF: nfTarget?.statusNF,
    statusBoleto: nfTarget?.statusBoleto,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: preValues,
  });

  const onSubmit = (data) => {
    const { residuo, nfCliente, nfGri, processo, statusNF, statusBoleto } =
      data;
    dispatch(
      nfEditSet({
        id,
        tipoNF,
        residuo,
        nfCliente: Number(nfCliente),
        nfGri: nfGri === "" ? "" : Number(nfGri),
        processo,
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
      <Head title="Editar Nota Fiscal" descripion="Modifique uma Nota Fiscal" />
      <form className="addNF__form" onSubmit={handleSubmit(onSubmit)}>
        <p
          className={`addNF__tipo ${
            tipoNF === "Complementar" ? "addNF__tipo--red" : ""
          }`}
        >
          {tipoNF}
        </p>
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
        <button className="addNF__button">Editar Nota Fiscal</button>
      </form>
    </section>
  );
};

export default EditNF;
