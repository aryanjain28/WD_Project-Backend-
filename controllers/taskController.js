const Task = require("../models/taskModel");

// Get all tasks
const getAllTasks = (req, res) => {
  Task.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage || "Some error occurred while retrieving tasks.",
      });
    else res.send(data);
  });
};

// Create new task
const createTask = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (!req.body?.staffId) {
    res.status(400).send({
      message: "StaffId can not be empty!",
    });
  }

  // Create a Task
  const task = new Task({
    taskTypeId: req.body.taskTypeId,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    startDate: req.body.startDate,
    priority: req.body.priority,
    clientId: req.body.clientId,
  });

  // Save Task in the database
  Task.create(task, req.body.staffId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage || "Some error occurred while creating the task.",
      });
    else res.send(data);
  });
};

// Update task identified by the id in the request
const updateTask = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const taskId = req.params.taskId;

  // constructor
  const task = new Task({
    taskTypeId: req.body.taskTypeId,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    startDate: req.body.startDate,
    priority: req.body.priority,
    clientId: req.body.clientId,
  });

  Task.update(taskId, task, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${taskId}.`,
        });
      } else {
        res.status(500).send({
          message: err?.sqlMessage || "Error updating task with id " + taskId,
        });
      }
    } else res.send(data);
  });
};

// Delete task identified by the id in the request
const deleteTask = (req, res) => {
  const taskId = req.params.taskId;

  Task.delete(taskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${taskId}.`,
        });
      } else {
        res.status(500).send({
          message: err?.sqlMessage || "Error deleting task with id " + taskId,
        });
      }
    } else res.send(data);
  });
};

// get all members of task
const getTaskMembers = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Save Task in the database
  Task.getAllMembers(req.params.taskId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage || "Some error occurred while getting staff members.",
      });
    else res.send(data);
  });
};

// Add new member to task
const addMember = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (!req.body?.staffId) {
    res.status(400).send({
      message: "StaffId can not be empty!",
    });
  }

  // Save Task in the database
  Task.addMember(req.params.taskId, req.body.staffId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage ||
          "Some error occurred while adding staff member to task.",
      });
    else res.send(data);
  });
};

// remove member from task
const removeMember = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (!req.body?.staffId) {
    res.status(400).send({
      message: "StaffId can not be empty!",
    });
  }

  // Save Task in the database
  Task.removeMember(req.params.taskId, req.body.staffId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage ||
          "Some error occurred while adding staff member to task.",
      });
    else res.send(data);
  });
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskMembers,
  addMember,
  removeMember,
};
