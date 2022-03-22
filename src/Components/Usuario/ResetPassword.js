import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { API_USER_RESET_PASSWORD } from "../../API";
import useFetch from "../../Hooks/useFetch";
import Error from "../Error/Error";
import Head from "../Head/Head";
import Input from "../Inputs/Input";
import UserMessage from "./UserMessage";

const ResetPassword = () => {
  const [successReset, setSuccessReset] = React.useState(false);
  const { loading, request } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { token } = useParams();

  async function onSubmit(data) {
    const { password } = data;
    const { url, options } = API_USER_RESET_PASSWORD(token, { password });
    const { response } = await request(url, options);
    if (response.ok) setSuccessReset(true);
  }

  if (successReset)
    return <UserMessage message="Senha Redefinida com Sucesso!" />;
  return (
    <section className="usuario" onSubmit={handleSubmit(onSubmit)}>
      <Head title="Nova Senha" descripion="Digite sua nova senha" />
      <form className="usuario__form">
        <Input
          type="password"
          {...register("password", {
            required: true,
            pattern: {
              value: /^.{8,}$/,
              message: "Insira uma senha com no mínimo 8 carácteres.",
            },
          })}
        >
          Nova Senha:
        </Input>
        {errors.email?.message && <Error message={errors.email.message} />}
        {loading ? (
          <button className="usuario__button" style={{ cursor: "await" }}>
            Enviando...
          </button>
        ) : (
          <button className="usuario__button">Enviar</button>
        )}
      </form>
    </section>
  );
};

export default ResetPassword;
