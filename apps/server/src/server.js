const http = require("http");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 4444;
const server = http.createServer(app);

server.listen(port);
