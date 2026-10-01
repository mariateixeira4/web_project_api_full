const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error("string.uri");
};

// Cadastro
const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

// Login
const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

// Atualização do perfil
const validateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required()
  })
});

// Atualização do avatar
const validateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().custom(validateUrl).required()
  })
});

// Parâmetros de ID
const validateUserId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24).required()
  })
});

const validateCardId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required()
  })
});

module.exports = {
  validateSignup,
  validateSignin,
  validateProfile,
  validateAvatar,
  validateUserId,
  validateCardId
};
