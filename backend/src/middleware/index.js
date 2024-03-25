const { validationResult } = require("express-validator");

const validarerrores = (req, res, next) => {
  const resultado = validationResult(req);
  if (!resultado.isempty()) {
    res.status(404).send({
      errors: resultado.array(),
    });
    return;
  }
  next();
};

module.exports = {
  validarerrores,
};
