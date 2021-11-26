const mongoConnection = require('./connection/mongoConnection');

const getLastTask = async () => {
  const db = await mongoConnection();
  return db
  .collection('tasks').find({}, { _id: 0, id: 1 }).sort({ id: -1 }).limit(1)
.toArray();
};

const createTask = async (body) => {
  const { task, employee, date, status } = body; 
  const tasks = await getLastTask();
  if (!tasks) {
    const db = await mongoConnection();
    return db
    .collection('tasks').insertOne({ task, employee, date, status, id: 1 });
  }

  const db = await mongoConnection();
  return db
  .collection('tasks')
  .insertOne({ task, employee, date, status, id: Number(tasks.map(({ id }) => id)) + 1 });
};

const getAllTasks = async () => {
  const db = await mongoConnection();
  return db
  .collection('tasks').find({}).toArray();
};

const updateTask = async (body) => {
  const { task, employee, date, status, id } = body; 

  const db = await mongoConnection();
  return db
  .collection('tasks').updateOne({ id }, {
    $set: { task, employee, date, status },
  });
};

const removeTask = async (id) => {
  const db = await mongoConnection();
  return db
  .collection('tasks').deleteOne({ id: Number(id) });
};

module.exports = {
  createTask, getAllTasks, updateTask, removeTask,
};