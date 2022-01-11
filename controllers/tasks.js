const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

// get
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// post
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  return res.status(201).json({ task });
});

// get one task
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID }).exec();
  if (!task) {
    return res
      .status(404)
      .json({ success: false, msg: `No task with id ${taskID}` });
  }
  res.status(200).json({ task });
});

// put
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!req.body.name)
    return res
      .status(400)
      .json({ success: false, msg: "Please provide credentials" });
  else if (!task)
    return res
      .status(404)
      .json({ success: false, msg: `No task with id ${taskID}` });
  res.status(200).json({ id: taskID, data: req.body });
});

// delete
const deleteTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const task = await Task.findOneAndDelete({ _id: taskID }).exec();
  if (!task)
    return res
      .status(404)
      .json({ success: false, msg: `No task with id ${taskID}` });
  res.status(200).json({ success: true, "deleted task": task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
