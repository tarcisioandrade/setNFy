import React from "react";
import Input from "../Inputs/Input";
import "./Usuario.css";
import { useForm } from "react-hook-form";
import Error from "../Error/Error";
import Head from "../Head/Head";
import { Link } from "react-router-dom";
import { API_USER_FORGOT } from "../../API";
import useFetch from "../../Hooks/useFetch";
import UserMessage from "./UserMessage";

const Forgot = () => {
  const [successForgot, setSuccessForgot] = React.useState(true);
  const { loading, request, error } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email } = data;
    const { url, options } = API_USER_FORGOT({ email });
    const { response } = await request(url, options);
    if (response.ok) setSuccessForgot(true);
  };

  document.body.style.backgroundColor = "#B1D0E0";
  if (successForgot)
    return <UserMessage message="E-mail de redefinição foi enviado!" />;
  return (
    <section className="usuario" onSubmit={handleSubmit(onSubmit)}>
      <Head title="Recuperar Senha" descripion="Recuperar senha esquecida" />
      <form className="usuario__form">
        <Input
          {...register("email", {
            required: true,
            pattern: {
              value: /[\w.-]+@[\w-]+\.[\w-.]+/gi,
              message: "Insira um email válido",
            },
          })}
        >
          E-mail
        </Input>
        <p className="usuario__link">
          Lembrou a senha? <Link to="/user/login">Faça Login</Link>
        </p>
        {error && (
          <Error message="Ocorreu um erro, verifique o email e tente novamente" />
        )}
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

export default Forgot;
