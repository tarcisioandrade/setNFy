const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const routeSetNFy = require("./routes/r_setnfy");
const routeUser = require("./routes/r_user");

const corsOptions = {
  origin: "*",
  methods: "PUT, POST, PATCH, GET, DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", cors(corsOptions), routeSetNFy);
app.use("/user", cors(corsOptions), routeUser);

app.use((req, res, next) => {
  const erro = new Error("Not Found");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: error.message,
  });
});

module.exports = app;
