const tasksModel = require('../models/tasksModel');


const createTask = async(body) => {
  const tasks = await tasksModel.createTask(body)
  return tasks
}

const getAllTasks = async() => {
  const tasks = await tasksModel.getAllTasks()
  return tasks
}

const updateTask = async(body) => {
  const task = await tasksModel.updateTask(body)
  return task
}

const removeTask = async(id) => {
  const task = await tasksModel.removeTask(id)
  return task

}
module.exports = { createTask, getAllTasks, updateTask, removeTask }