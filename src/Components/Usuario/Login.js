import React from "react";
import Input from "../Inputs/Input";
import "./Usuario.css";
import { useForm } from "react-hook-form";
import Error from "../Error/Error";
import Head from "../Head/Head";
import { Link } from "react-router-dom";
import { login } from "../../store/slices/setUser";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { setUser, setToken } = useSelector((state) => state);
  const loading = setUser.loading || setToken.loading;
  const error = setUser.error || setToken.error;

  const onSubmit = (data) => {
    const { email, senha } = data;
    dispatch(
      login({
        email,
        password: senha,
      })
    );
  };

  return (
    <section className="usuario" onSubmit={handleSubmit(onSubmit)}>
      <Head title="Login" description="Logue em sua conta" />
      <form className="usuario__form">
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
        <p className="usuario__link">
          Não possui uma conta? <Link to="/user/signup">Cadastre-se</Link>
        </p>
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
        {error && <Error message="Falha na Autenticação." />}
        {errors.senha?.message  && <Error message={errors.senha.message} />}
        <p className="usuario__link usuario__link--margin">
          Esqueçeu a senha? <Link to="/user/forgot">Recuperar</Link>
        </p>
        {loading ? (
          <button
            disabled
            style={{ cursor: "wait" }}
            className="usuario__button"
          >
            Logando...
          </button>
        ) : (
          <button className="usuario__button">Login</button>
        )}
      </form>
    </section>
  );
};

export default Login;
