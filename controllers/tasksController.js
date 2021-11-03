const tasksService = require('../services/tasksService');
require('dotenv').config();

const createTask = async(req, res) => {
await tasksService.createTask(req.body)
return res.status(201).json({ message: "task criada" });
}
const getAllTasks = async(req, res) => {
  const tasks = await tasksService.getAllTasks()
  return res.status(200).json({ data: tasks})
}

module.exports = {
  createTask, getAllTasks
}