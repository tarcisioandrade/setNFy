import React, { useEffect } from "react";
import { Head } from "../../components";
import { Link } from "react-router-dom";
import { login } from "../../store/slices/setUser";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ReactComponent as Logo } from "../../assets/imgs/newLogo.svg";
import URL from "../../helper/getUrl";

const Login = () => {
  const dispatch = useDispatch();
  const { setUser, setToken } = useSelector((state) => state);
  const loading = setUser.loading || setToken.loading;
  const error = setUser.error || setToken.error;

  // CONSTANTES ANTD
  const [form] = Form.useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(
      login({
        email,
        password,
      })
    );
  };

  const errorMessage = () => {
    message.error("Falha na autenticação. Por favor, tente novamente");
  };

  useEffect(() => {
    if (error) errorMessage();
  }, [error]);

  return (
    <section className="usuario">
      <Head title="Login" description="Logue em sua conta" />
      <div className="usuario__form">
        <div className="usuario_logo">
          <a href={`${URL}/user/login`}>
            <Logo />
          </a>
        </div>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor, digite seu e-mail",
              },
              {
                pattern: /[\w.-]+@[\w-]+\.[\w-.]+/gi,
                message: "Insira um e-mail válido.",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="usuario__icons" />}
              placeholder="E-mail"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Por favor, digite sua senha" },
              {
                pattern: /^.{8,}$/,
                message: "Insira uma senha com no mínimo 8 carácteres.",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="usuario__icons" />}
              placeholder="Senha"
            />
          </Form.Item>
          <Link className="usuario__forgot" to="/user/forgot">
            Esqueceu a senha?
          </Link>

          <Form.Item>
            <Button
              loading={loading}
              className="usuario__button"
              size="large"
              type="primary"
              htmlType="submit"
            >
              Entrar
            </Button>
            Ou{" "}
            <Link className="usuario__signup" to="/user/signup">
              Cadastre-se agora!
            </Link>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Login;
