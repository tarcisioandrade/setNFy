const mysql = require("mysql");
require("dotenv").config();

var pool = mysql.createPool({
  connectionLimit: 1000,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.MYSQL_PORT,
});

exports.execute = (query, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, result, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

exports.pool = pool;
