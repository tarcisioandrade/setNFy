import React from "react";
import Input from "../Inputs/Input";
import "./Usuario.css";
import { useForm } from "react-hook-form";
import Error from "../Error/Error";
import Head from "../Head/Head";
import { Link } from "react-router-dom";

const Forgot = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  document.body.style.backgroundColor = "#B1D0E0";
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
        {errors.email?.message && <Error message={errors.email.message} />}
        <button className="usuario__button">Enviar</button>
      </form>
    </section>
  );
};

export default Forgot;
