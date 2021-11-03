const mongoConnection = require('./connection/mongoConnection');


const createTask = async (body) => {
  const { task, employee, date } = body; 
  const tasks = await getLastTask()
  if(!tasks) {
    console.log('entrei')
    const db = await mongoConnection();
    return db
    .collection('tasks').insertOne({ task, employee, date, id: 1 });
  }
  console.log(tasks, 'tasks', tasks.map(({id}) => id))

  const db = await mongoConnection();
  return db
  .collection('tasks').insertOne({ task, employee, date, id: Number(tasks.map(({id}) => id)) + 1 });
};

const getAllTasks = async() => {
  const db = await mongoConnection();
  return db
  .collection('tasks').find({}).toArray();
}

const getLastTask = async() => {
  const db = await mongoConnection();
  return db
  .collection('tasks').find({}, { _id: 0, id: 1}).sort({ id: -1}).limit(1).toArray();
}

module.exports = {
  createTask, getAllTasks
}