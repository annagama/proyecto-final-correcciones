const { body, param } = require("express-validator");

const idrequired = param("id")
  .isint({ min: 0 })
  .withmessage("El parámetro debe ser un número mayor a 0");


  module.exports = {idrequired};
