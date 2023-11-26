const TaskTypes = require("../models/taskTypesModel");

// Get all task types
const getAllTaskTypes = (req, res) => {
  TaskTypes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage || "Some error occurred while retrieving task types.",
      });
    else res.send(data);
  });
};

// Create task-type
const createTaskType = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Task Type
  const taskTypes = new TaskTypes({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  // Save Task Type in the database
  TaskTypes.create(taskTypes, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err?.sqlMessage || "Some error occurred while creating the tasktype.",
      });
    } else res.send(data);
  });
};

// Update task type identified by the id in the request
const updateTaskType = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const taskTypeId = req.params.taskTypeId;

  // constructor
  const client = new TaskTypes(req.body);

  TaskTypes.update(taskTypeId, client, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TaskType with id ${taskTypeId}.`,
        });
      } else {
        res.status(500).send({
          message:
            err?.sqlMessage || "Error updating TaskType with id " + taskTypeId,
        });
      }
    } else res.send(data);
  });
};

module.exports = {
  getAllTaskTypes,
  createTaskType,
  updateTaskType,
};
