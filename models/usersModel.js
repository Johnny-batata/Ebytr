const mongoConnection = require('./connection/mongoConnection');

const usersData = require('../helper/firstTimeLogin.js/defaultData/defaultUsers');
const tasksData = require('../helper/firstTimeLogin.js/defaultData/defaultTasks');
const tasks = require('./tasksModel').createTask;

const getAllUser = async () => {
  const db = await mongoConnection();
  return db.collection('users').find({}).toArray();
};

const createUser = async (body) => {
  const { name, birthdate, email, password } = body; 
  const db = await mongoConnection();

    return db
  .collection('users')
  .insertOne({ name, birthdate, email, password, role: 'employee' });
};
const initialLoggin = async () => {
  console.log(usersData);
  await Promise.all(usersData.map(async (el) => createUser(el)));
  await Promise.all(tasksData.map(async (el) => tasks(el)));

  console.log(tasksData);
};

const findUserByEmail = async (email) => {
  const users = await getAllUser();

    if (users.length < 1) {
    await initialLoggin();
    console.log('entrei');
    }

    const db = await mongoConnection();

    const data = await db.collection('users').findOne({ email });
    console.log('data', data);
    return data;
};

module.exports = { createUser, findUserByEmail, getAllUser };