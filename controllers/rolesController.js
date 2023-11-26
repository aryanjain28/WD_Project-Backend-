const Roles = require("../models/rolesModel");

// Get all roles
const getAllRoles = (req, res) => {
  Roles.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage || "Some error occurred while retrieving roles.",
      });
    else res.send(data);
  });
};

// Create new roles
const createRole = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Roles
  const role = new Roles({
    name: req.body.name,
  });

  // Save Roles in the database
  Roles.create(role, (err, data) => {
    if (err)
      res.status(500).send({
        message: err?.sqlMessage || "Some error occurred while creating role.",
      });
    else res.send(data);
  });
};

module.exports = {
  getAllRoles,
  createRole,
};
