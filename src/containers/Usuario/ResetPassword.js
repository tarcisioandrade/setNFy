import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_USER_RESET_PASSWORD } from "../../API";
import useFetch from "../../hooks/useFetch";
import { Head } from "../../components";
import { Button, Form, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { ReactComponent as Logo } from "../../assets/imgs/newLogo.svg";
import URL from "../../helper/getUrl";

const ResetPassword = () => {
  const { loading, request } = useFetch();
  const { token } = useParams();
  const navigate = useNavigate();

  // CONSTANTES ANTD
  const [form] = Form.useForm();

  async function onSubmit(data) {
    const { password } = data;
    const { url, options } = API_USER_RESET_PASSWORD(token, { password });
    const { response } = await request(url, options);
    if (response.ok) {
      message.error("Ocorreu um erro. Por favor, tente novamente.");
    } else {
      message.success("E-mail de redefinição foi enviado!");
      navigate("/user/login");
    }
  }

  return (
    <section className="usuario">
      <Head title="Nova Senha" description="Digite sua nova senha" />
      <div className="usuario__form">
        <div className="usuario_logo">
          <a href={`${URL}/user/login`}>
            <Logo />
          </a>
        </div>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Digite sua nova senha" },
              {
                pattern: /^.{8,}$/,
                message: "Insira uma senha com no mínimo 8 carácteres.",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Nova Senha"
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
              size="large"
              type="primary"
              className="usuario__button"
              htmlType="submit"
              loading={loading}
            >
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default ResetPassword;
