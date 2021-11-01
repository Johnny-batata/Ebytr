const usersModel = require('../models/usersModel');

const err = { err: {
  message: 'E-mail/nickname inválido ou já cadastrado, por favor, verifique e tente novamente',
}, 
};

const createUser = async (body) => {
  const { nickname, email } = body; 
  const userMail = await usersModel.findUserbyEmail(email);

  if (userMail) {
    return { 
      err: {
        message: 'E-mail/nickname inválido ou já cadastrado, por favor, verifique e tente novamente',
      }, 
    };
  }
  return usersModel.createUser(body);
};

const loginUser = async (email, password) => {
  const userMail = await usersModel.findUserbyEmail(email);
  if (userMail.password !== password) {
    return {
      err: {
      message: 'email ou senha inválidos, por favor, verifique e tente novamente',
    }, 
    };
  }
return userMail;
};

module.exports = { createUser, loginUser };