const OfficeHours = require("../models/officeHoursModel");

// Get all clients
const getOfficeHours = (req, res) => {
  const staffId = req.params.staffId;
  console.log("STAFFID: ", staffId);
  OfficeHours.getAll(staffId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage || "Some error occurred while retrieving clients.",
      });
    else res.send(data);
  });
};

// Create new officeHours
const createOfficeHours = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a OfficeHours
  const officeHours = new OfficeHours({
    taskId: req.body.taskId,
    staffId: req.body.staffId,
    description: req.body.description,
    hours: req.body.hours,
  });

  // Save OfficeHours in the database
  OfficeHours.create(officeHours, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage ||
          "Some error occurred while creating the officeHours.",
      });
    else res.send(data);
  });
};

// Delete officeHours identified by the id in the request
const deleteOfficeHours = (req, res) => {
  const officeHoursId = req.params.officeHoursId;
  const staffId = req.body.staffId;

  OfficeHours.delete(officeHoursId, staffId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found officeHours with id ${officeHoursId}.`,
        });
      } else {
        res.status(500).send({
          message:
            err?.sqlMessage ||
            "Error deleting officeHours with id " + officeHoursId,
        });
      }
    } else res.send(data);
  });
};

module.exports = {
  getOfficeHours,
  createOfficeHours,
  deleteOfficeHours,
};
