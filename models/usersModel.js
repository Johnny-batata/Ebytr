const mongoConnection = require('./connection/mongoConnection');

const createUser = async (body) => {
  const { name, birthdate, email, password } = body; 

  const db = await mongoConnection();
  return db
  .collection('users').insertOne({ name,  birthdate, email, password, role: 'employee' });
};

const findUserByEmail = async (email) => mongoConnection()
.then((db) => db.collection('users').findOne({ email }))
.then((result) => result);

const getAllUser = async() => {

}

module.exports = { createUser, findUserByEmail };