import React from "react";
import "./Usuario.css";
import { Head } from "../../components";
import { useNavigate } from "react-router-dom";
import { API_USER_REGISTER } from "../../API";
import useFetch from "../../hooks/useFetch";
import { ReactComponent as Logo } from "../../assets/imgs/newLogo.svg";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import URL from "../../helper/getUrl";

const Signup = () => {
  const navigate = useNavigate();
  const { loading, request } = useFetch();

  // CONSTANTES ANTD
  const [form] = Form.useForm();

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    const { url, options } = API_USER_REGISTER({
      username,
      email,
      password,
    });
    const { response } = await request(url, options);
    if (response.ok) {
      message.success("Cadastro realizado com sucesso!");
      navigate("/user/login");
    } else if (response.status === 409) {
      message.error("Usuário já cadastrado.");
      form.resetFields();
    } else {
      message.error(
        "Falha ao realizar o cadastro, Por favor, tente novamente."
      );
      form.resetFields();
    }
  };

  return (
    <section className="usuario">
      <Head title="Cadastro" description="Cria uma conta" />
      <div className="usuario__form">
        <div className="usuario_logo">
          <a href={`${URL}/user/login`}>
            <Logo />
          </a>
        </div>
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Digite seu nome." },
              {
                pattern: /^[a-zA-Z\u00C0-\u00FF\s]*$/,
                message: "Digite apenas letras.",
              },
            ]}
          >
            <Input
              autoComplete="off"
              placeholder="Nome"
              size="large"
              prefix={<UserOutlined className="usuario__icons" />}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Digite seu e-mail." },
              {
                pattern: /[\w.-]+@[\w-]+\.[\w-.]+/gi,
                message: "Digite um e-mail válido.",
              },
            ]}
          >
            <Input
              autoComplete="off"
              placeholder="E-mail"
              size="large"
              prefix={<MailOutlined className="usuario__icons" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Digite sua senha." },
              {
                pattern: /^.{8,}$/,
                message: "Digite uma senha válida.",
              },
            ]}
          >
            <Input.Password
              placeholder="Senha"
              size="large"
              prefix={<LockOutlined className="usuario__icons" />}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirme sua senha" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("Senhas Divergentes."));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirmar Senha"
              size="large"
              prefix={<LockOutlined className="usuario__icons" />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              className="usuario__button"
              size="large"
              type="primary"
              htmlType="submit"
            >
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Signup;
