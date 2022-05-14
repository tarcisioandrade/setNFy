import React from "react";
import "./Usuario.css";
import { useForm } from "react-hook-form";
import { Error, Head, Input } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { API_USER_REGISTER } from "../../API";
import useFetch from "../../hooks/useFetch";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { loading, error, request } = useFetch();

  const onSubmit = async (data) => {
    const { usuario, email, senha } = data;
    const { url, options } = API_USER_REGISTER({
      username: usuario,
      email,
      password: senha,
    });
    const { response } = await request(url, options);
    if (response.ok) navigate("/user/login");
  };

  return (
    <section className="usuario" onSubmit={handleSubmit(onSubmit)}>
      <Head title="Criar uma Conta" description="Cria uma conta" />
      <form className="usuario__form">
        <Input
          autoComplete="off"
          {...register("usuario", {
            required: "Insira um nome de usuário.",
            pattern: {
              value: /^[a-zA-Z\u00C0-\u00FF\s]*$/,
              message: "Digite apenas letras.",
            },
          })}
        >
          Usuário:
        </Input>
        {errors.usuario?.message && <Error message={errors.usuario.message} />}
        <Input
          {...register("email", {
            required: true,
            pattern: {
              value: /[\w.-]+@[\w-]+\.[\w-.]+/gi,
              message: "Insira um email válido.",
            },
          })}
        >
          E-mail:
        </Input>
        {errors.email?.message && <Error message={errors.email.message} />}
        <Input
          type="password"
          {...register("senha", {
            required: true,
            pattern: {
              value: /^.{8,}$/,
              message: "Insira uma senha com no mínimo 8 carácteres.",
            },
          })}
        >
          Senha:
        </Input>
        {error && <Error message={error.message} />}
        {errors.senha?.message && <Error message={errors.senha.message} />}
        <p className="usuario__link">
          Já possui uma conta? <Link to="/user/login">Faça Login</Link>
        </p>
        {loading ? (
          <button
            disabled
            style={{ cursor: "wait" }}
            className="usuario__button"
          >
            Registrando...
          </button>
        ) : (
          <button className="usuario__button">Registrar</button>
        )}
      </form>
    </section>
  );
};

export default Signup;
