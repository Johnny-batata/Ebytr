const mongoConnection = require('./connection/mongoConnection');

const createUser = async (body) => {
  const { name, nickname, birthdate, email, password } = body; 

  const db = await mongoConnection();
  return db
  .collection('users').insertOne({ name,  birthdate, email, password, role: 'employee' });
};

const findUserByName = async (name) => mongoConnection()
.then((db) => db.collection('users').findOne({ name }))
.then((result) => result);

module.exports = { createUser, findUserByName };