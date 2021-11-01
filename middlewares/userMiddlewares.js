const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const TOKEN_ERROR_MSG = 'token expirado, necessário fazer o login novamente ';

const renderError = (error) => {
  const err = {
    err: { 
      code: 'invalid_data',
      message: error.message },
  };
  return err;
};

const validateIfRegisterFieldsExists = (req, res, next) => {

const { error } = Joi.object({
  name: Joi.string().not().empty()
  .min(5),
  birthdate: Joi.not().empty().required(),
  email: Joi.string()
  .email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required(),
})
  .validate(req.body);
if (error) {
return res.status(422).json(renderError(error)); 
}

next();
};

const validateLogin = (req, res, next) => {
const { error } = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required(),
})
.validate(req.body);
if (error) {
return res.status(422).json(renderError(error)); 
}

next();
};



module.exports = { validateIfRegisterFieldsExists, validateLogin, };