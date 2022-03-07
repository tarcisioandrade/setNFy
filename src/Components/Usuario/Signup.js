import React from "react";
import Input from "../Inputs/Input";
import "./Usuario.css";
import { useForm } from "react-hook-form";
import Error from "../Error/Error";
import Head from "../Head/Head";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/slices/setUser";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {loading} = useSelector(state => state.setUser.register);

  const onSubmit = (data) => {
    const { usuario, email, senha } = data;
    dispatch(
      signup({
        username: usuario,
        email,
        password: senha,
      })
    );
    navigate("/user/login")
  };

  return (
    <section className="usuario" onSubmit={handleSubmit(onSubmit)}>
      <Head title="Criar uma Conta" descripion="Cria uma conta" />
      <form className="usuario__form">
        <Input
          {...register("usuario", { required: "Insira um nome de usuário", pattern: {
            value: /^[a-zA-Z\u00C0-\u00FF\s]*$/,
            message: "Digite apenas letras"
          } })}
        >
          Usuário:
        </Input>
        {errors.usuario?.message && <Error message={errors.usuario.message} />}
        <Input
          {...register("email", {
            required: true,
            pattern: {
              value: /[\w.-]+@[\w-]+\.[\w-.]+/gi,
              message: "Insira um email válido",
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
              message: "Insira uma senha com no mínimo 8 carácteres",
            },
          })}
        >
          Senha:
        </Input>
        {errors.senha?.message && <Error message={errors.senha.message} />}
        <p className="usuario__link">
          Já possui uma conta? <Link to="/user/login">Faça Login</Link>
        </p>
        {loading ? <button disabled style={{cursor: "wait"}} className="usuario__button">Registrando...</button> : <button className="usuario__button">Registrar</button>}
      </form>
    </section>
  );
};

export default Signup;
