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
const updateTask = async(req, res) => {
   await tasksService.updateTask(req.body)
  return res.status(200).json({ message: "task atualizada com sucesso" })
}

module.exports = {
  createTask, getAllTasks, updateTask
}