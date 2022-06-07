import React from "react";
import "./Usuario.css";
import { Head } from "../../components";
import { API_USER_FORGOT } from "../../API";
import useFetch from "../../hooks/useFetch";
import { Button, Form, Input, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { ReactComponent as Logo } from "../../assets/imgs/newLogo.svg";
import URL from "../../helper/getUrl";

const Forgot = () => {
  const { loading, request } = useFetch();

  // CONSTANTES ANTD
  const [form] = Form.useForm();

  const onSubmit = async (data) => {
    const { email } = data;
    const { url, options } = API_USER_FORGOT({ email });
    const { response } = await request(url, options);
    if (response.status === 409) {
      message.error("Usuário não encontrado.");
    } else if (!response.ok) {
      message.error("Ocorreu um erro, verifique o email e tente novamente.");
    } else {
      message.success("E-mail de redefinição foi enviado!");
      form.resetFields();
    }
  };

  return (
    <section className="usuario">
      <Head title="Recuperar Senha" description="Recuperar senha esquecida" />
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
              { required: true, message: "Digite seu e-mail." },
              {
                pattern: /[\w.-]+@[\w-]+\.[\w-.]+/gi,
                message: "Digite um e-mail válido.",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="E-mail"
              prefix={<MailOutlined className="usuario__icons" />}
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

export default Forgot;
