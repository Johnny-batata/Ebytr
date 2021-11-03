const tasksModel = require('../models/tasksModel');


const createTask = async(body) => {
  const tasks = await tasksModel.createTask(body)
  return tasks
}

const getAllTasks = async() => {
  const tasks = await tasksModel.getAllTasks()
  return tasks
}

module.exports = { createTask, getAllTasks }