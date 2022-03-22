import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import generateID from "../../store/helper/generateID";
// import { nfSet } from "../../store/slices/setNotaFiscal";
import Input from "../Inputs/Input";
import Select from "../Inputs/Select";
import Radio from "../Inputs/Radio";
import "./AddNF.css";
import Head from "../Head/Head";
import { useForm } from "react-hook-form";
import Error from "../Error/Error";
import { addNF } from "../../store/slices/setNotaFiscal";

const AddNF = () => {
  // Tipo de NF Venda por padrão
  const [tipoNF, setTipoNF] = React.useState("Venda");
  // State Redux Métodos
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.setNotaFiscal);
  const { id_user } = useSelector((state) => state.setToken.data);
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
      addNF({
        id_user,
        nf_id: generateID(),
        type: tipoNF,
        residuo,
        nfClient: Number(nfCliente),
        nfGri: nfGri === "" ? null : Number(nfGri),
        processo:
          processo === ""
            ? null
            : Number(
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
  };

  if (data && data.ok) return <Navigate to="/" />;
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
            pattern: {
              value: /^[0-9]*$/,
              message: "Digite apenas números",
            },
          })}
        >
          NF Cliente*
        </Input>
        {errors.nfCliente?.message && (
          <Error message={errors.nfCliente.message} />
        )}
        <Input
          {...register("nfGri", {
            pattern: {
              value: /^[0-9]*$/,
              message: "Digite apenas números",
            },
            maxLength: { value: 4, message: "Digite no máximo 4 números." },
          })}
        >
          NF Gri
        </Input>
        {errors.nfGri?.message && <Error message={errors.nfGri.message} />}
        <Input
          {...register("processo", {
            pattern: {
              value: /^[0-9]*$/,
              message: "Digite apenas números",
            },

            maxLength: { value: 6, message: "Digite no máximo 6 números" },
          })}
        >
          Nª Processo Lecom
        </Input>
        {errors.processo?.message && (
          <Error message={errors.processo.message} />
        )}
        <div className="addNf__row">
          <Select label="Status NF" {...register("statusNF")}></Select>

          <Select label="Status Boleto" {...register("statusBoleto")}></Select>
        </div>
        {loading ? (
          <button disabled style={{ cursor: "wait" }} className="addNF__button">
            Adicionando...
          </button>
        ) : (
          <button className="addNF__button">Adicionar</button>
        )}
      </form>
    </section>
  );
};

export default AddNF;
