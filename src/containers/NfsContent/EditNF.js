import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import "./AddNF.css";
import { useForm } from "react-hook-form";
import { Error, Input, Select, Head } from "../../components";
import { attNF } from "../../store/slices/setNotaFiscal";

const EditNF = () => {
  // Seleciona a array especifica para editar
  const { id } = useParams();
  // const state = useSelector((state) => state.setNotaFiscal.data);
  const { data, loading } = useSelector((state) => state.setNotaFiscal);
  const nfTarget = data?.length && data?.filter((nf) => nf.nf_id === id)[0];
  const tipoNF = nfTarget?.type;

  // State Redux Métodos
  const dispatch = useDispatch();

  // Valores padroes no input
  const preValues = {
    residuo: nfTarget?.residuo,
    nfCliente: nfTarget?.nfClient,
    nfGri: nfTarget?.nfGri === null ? "" : nfTarget?.nfGri,
    processo: nfTarget?.processo === null ? "" : nfTarget?.processo,
    statusNF: nfTarget?.statusNF,
    statusBoleto: nfTarget?.statusBoleto,
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: preValues,
  });

  // Valida se statusNF está enviado para habilitar o select do boleto
  const { statusNF } = watch();
  const statusValid = statusNF === "Enviado";

  const onSubmit = (data) => {
    const { residuo, nfCliente, nfGri, processo, statusNF, statusBoleto } =
      data;
    dispatch(
      attNF({
        nf_id: id,
        type: tipoNF,
        residuo,
        nfClient: Number(nfCliente),
        nfGri: nfGri === "" ? null : Number(nfGri),
        processo:
          processo === "" ? null : +processo.toString().replace(/\./g, ""),
        statusNF,
        statusBoleto: statusNF === "Pendente" ? "Pendente" : statusBoleto,
        statusFinal:
          statusNF === "Enviado" && statusBoleto === "Enviado"
            ? "Completo"
            : "Incompleto",
      })
    );
  };

  if (data && data.ok) return <Navigate to="/" />;
  return (
    <section className="addNF">
      <Head
        title="Editar Nota Fiscal"
        description="Modifique uma Nota Fiscal"
      />
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
          autoComplete="off"
          {...register("nfCliente", {
            required: "Insira o número da NF do Cliente.",
            maxLength: { value: 5, message: "Digite no máximo 5 números." },
            pattern: {
              value: /^[0-9]*$/,
              message: "Digite apenas números",
            },
          })}
          type="number"
        >
          NF Cliente*
        </Input>
        {errors.nfCliente?.message && (
          <Error message={errors.nfCliente.message} />
        )}
        <Input
          autoComplete="off"
          {...register("nfGri", {
            maxLength: { value: 4, message: "Digite no máximo 4 números." },
            pattern: {
              value: /^[0-9]*$/,
              message: "Digite apenas números",
            },
          })}
        >
          NF Gri
        </Input>
        {errors.nfGri?.message && <Error message={errors.nfGri.message} />}
        <Input
          autoComplete="off"
          {...register("processo", {
            pattern: {
              value: /^([0-9]*[.])?([0-9]*[\s]?)+$/,
              message: "Digite apenas números",
            },
          })}
        >
          Nª Processo Lecom
        </Input>
        {errors.processo?.message && (
          <Error message={errors.processo.message} />
        )}
        <div className="addNf__row">
          <Select label="Status NF" {...register("statusNF")}></Select>

          {/* STATUS BOLETO SO É HABILITADO SE O STATUS NF FOR ENVIADO */}
          {statusValid === true ? (
            <Select
              label="Status Boleto"
              {...register("statusBoleto")}
            ></Select>
          ) : (
            <Select
              label="Status Boleto"
              {...register("statusBoleto")}
              disabled
            ></Select>
          )}
        </div>
        {loading ? (
          <button disabled style={{ cursor: "wait" }} className="addNF__button">
            Editando...
          </button>
        ) : (
          <button className="addNF__button">Editar</button>
        )}
      </form>
    </section>
  );
};

export default EditNF;
