const bcrypt = require("bcryptjs");
const Staff = require("../models/staffModel");

// Get all clients
const getAllStaff = (req, res) => {
  Staff.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage ||
          "Some error occurred while retrieving staff members.",
      });
    else res.send(data);
  });
};

// // Create new client
const createStaffMember = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("1234", salt);

  // Create a Staff Member
  const staffMember = new Staff({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    address: req.body.address,
    dob: req.body.dob,
    sex: req.body.sex,
    role: req.body.role,
    password: hashedPassword,
  });

  // Save Staff Member in the database
  Staff.create(req.body.hostId, staffMember, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage ||
          "Some error occurred while adding new staff member.",
      });
    else res.send(data);
  });
};

// // Update staff identified by the id in the request
const updateStaffMember = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const staffId = req.params.staffId;

  // constructor
  const staff = new Staff(req.body);

  Staff.update(req.body.hostId, staffId, staff, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found staff with id ${staffId}.`,
        });
      } else {
        res.status(500).send({
          message:
            err?.sqlMessage ||
            "Error updating staff member with id " + clientId,
        });
      }
    } else res.send(data);
  });
};

// // Delete client identified by the id in the request
const deleteStaffMember = (req, res) => {
  const staffId = req.params.staffId;

  console.log(req.body.hostId);

  Staff.delete(req.body.hostId, staffId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found staff member with id ${staffId}.`,
        });
      } else {
        res.status(500).send({
          message:
            err?.sqlMessage || "Error deleting staff member with id " + staffId,
        });
      }
    } else res.send(data);
  });
};

const loginStaffMember = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Staff Member
  const staffMember = new Staff({
    email: req.body.email,
    password: req.body.password,
  });

  // Save Staff Member in the database
  Staff.login(staffMember, (err, data) => {
    if (err)
      if (err?.kind === "not_found") {
        res.status(500).send({
          message: `Not found staff with email ${req.body.email}.`,
        });
      } else {
        res.status(500).send({
          message:
            err?.message ||
            err?.sqlMessage ||
            "Some error occurred while logging in.",
        });
      }
    else res.send(data);
  });
};

module.exports = {
  getAllStaff,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
  loginStaffMember,
};
