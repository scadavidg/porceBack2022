const mysql = require("mysql2/promise");
const bluebird = require("bluebird");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
  Promise: bluebird,
};

const pool = async (query) => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute(query);

  return rows;
};

module.exports = pool;
