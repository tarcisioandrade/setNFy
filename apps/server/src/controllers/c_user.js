const mysql = require("../mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const sendEmail = require("../utils/sendEmail");

const URL = "https://setnfy.netlify.app";

exports.register = async (req, res) => {
  try {
    const results = await mysql.execute(
      "SELECT * FROM tb_user WHERE usr_email = ?",
      [req.body.email]
    );
    if (results.length > 0) {
      return res
        .status(409)
        .send({ ok: false, message: "User already registered." });
    } else {
      bcrypt.hash(req.body.password, 10, async (errBcrypt, hash) => {
        try {
          if (errBcrypt) return res.status(500).send({ error: errBcrypt });
          const query =
            "INSERT INTO tb_user (usr_username, usr_email, usr_password) VALUES (?,?,?)";
          const results = await mysql.execute(query, [
            req.body.username,
            req.body.email,
            hash,
          ]);
          const data = moment(results.usr_create_time)
            .locale("pt-br")
            .format("L");
          return res.status(201).send({
            message: "The user was sucessfuly created!",
            user: {
              id_user: results.insertId,
              username: req.body.username,
              email: req.body.email,
              createdDate: data,
            },
          });
        } catch (error) {
          return res.status(500).send({ error: error });
        }
      });
    }
  } catch (error) {}
};

exports.login = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_user WHERE usr_email = ?";
    const results = await mysql.execute(query, [req.body.email]);
    if (results.length < 1)
      return res.status(401).send({ message: "Falha na Autenticação" });
    bcrypt.compare(
      req.body.password,
      results[0].usr_password,
      (err, result) => {
        if (err) {
          return res.status(400).send({ message: "Authentication failure." });
        }
        if (result) {
          const token = jwt.sign(
            {
              id_user: results[0].usr_id,
              username: results[0].usr_username,
              email: results[0].usr_email,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "2 days",
            }
          );
          return res.status(200).send({
            message: "Authentication sucessfuly.",
            id_user: results[0].usr_id,
            username: results[0].usr_username,
            token: token,
          });
        }
        return res.status(401).send({ message: "Falha na Autenticação" });
      }
    );
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.loginToken = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_KEY);
    if (decode) {
      return res.status(200).send({ ...decode });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.sendResetLink = async (req, res) => {
  const query = "SELECT * FROM tb_user WHERE usr_email = ?";
  try {
    const { email } = req.body;
    const results = await mysql.execute(query, [email]);
    if (results.length < 1) {
      return res.status(409).send({ message: "User not found" });
    }
    const token = jwt.sign(
      { email: results[0].usr_email },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    const link = `${URL}/user/reset_password/${token}`;
    await sendEmail(
      email,
      "setnfy@setnfy.com.br",
      "SetNFy - Recuperação de Senha",
      link
    );
    return res
      .status(200)
      .send({ message: "Password has been successfully sent to your email" });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.resetPassword = async (req, res) => {
  const query = "UPDATE tb_user SET usr_password = ? WHERE usr_email = ?";
  try {
    const { password } = req.body;
    const { token } = req.params;
    const { email } = jwt.verify(token, process.env.JWT_KEY);
    const hash = bcrypt.hashSync(password, 10);
    await mysql.execute(query, [hash, email]);
    return res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
