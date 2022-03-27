const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ status: true, tasks, count: tasks.length });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404))
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404))
  }
  res.status(200).json({ id: taskId, task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  const task = await Task.deleteOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404))
  }
  res.status(200).json({ status: "success", task: null });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
