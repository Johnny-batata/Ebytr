const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const renderError = require('../helper/renderError').renderError

const TOKEN_ERROR_MSG = 'token expirado, necessário fazer o login novamente ';


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
return res.status(422).json(renderError(error.message)); 
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
return res.status(422).json(renderError(error.message)); 
}

next();
};



module.exports = { validateIfRegisterFieldsExists, validateLogin, };