const { Sequelize } = require("sequelize");

const db = new Sequelize({
  host: "localhost",
  port: "3306",
  database: "guembe.ind",
  username: "root",
  password: "a321654",
  dialect: "mysql",
});

module.exports = db;
