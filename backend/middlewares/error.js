const { isCelebrateError } = require("celebrate");

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    return res.status(BAD_REQUEST).send({
      message: "Dados inválidos"
    });
  }

  if (err.statusCode === UNAUTHORIZED) {
    return res.status(UNAUTHORIZED).send({
      message: "E-mail ou senha incorretos"
    });
  }

  if (err.statusCode === FORBIDDEN) {
    return res.status(FORBIDDEN).send({
      message: "Acesso negado"
    });
  }

  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({
      message: "Dados inválidos"
    });
  }

  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({
      message: "ID inválido"
    });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({
      message: "Recurso não encontrado"
    });
  }

  if (err.code === 11000) {
    return res.status(CONFLICT).send({
      message: "Este e-mail já está cadastrado"
    });
  }

  return res.status(INTERNAL_SERVER_ERROR).send({
    message: "Ocorreu um erro no servidor"
  });
};
