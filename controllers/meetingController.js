const Meeting = require("../models/meetingModel");

// Get all clients
const getAllMeetings = (req, res) => {
  Meeting.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage || "Some error occurred while retrieving meetings.",
      });
    else res.send(data);
  });
};

// Create new meeting
const createMeeting = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Meeting
  const meeting = new Meeting({
    title: req.body.title,
    description: req.body.description,
    time: req.body.time,
  });

  // Save Meeting in the database
  Meeting.create(meeting, req.body.hostId, req.body.staffId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage || "Some error occurred while creating the meeting.",
      });
    else res.send(data);
  });
};

// Update meeting identified by the id in the request
const updateMeeting = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const meetingId = req.params.meetingId;

  Meeting.update(
    meetingId,
    req.body.hostId,
    req.body.description,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found meeting with id ${meetingId}.`,
          });
        } else {
          res.status(500).send({
            message:
              err?.sqlMessage || "Error updating meeting with id " + meetingId,
          });
        }
      } else res.send(data);
    },
  );
};

// Delete meeting identified by the id in the request
const deleteMeeting = (req, res) => {
  const meetingId = req.params.meetingId;

  Meeting.delete(req.body.hostId, meetingId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found meeting with id ${meetingId}.`,
        });
      } else {
        res.status(500).send({
          message:
            err?.sqlMessage || "Error deleting meeting with id " + meetingId,
        });
      }
    } else res.send(data);
  });
};

const getStaffMember = (req, res) => {
  const meetingId = req.params.meetingId;
  Meeting.getStaffMember(meetingId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found meeting with id ${meetingId}.`,
        });
      } else {
        res.status(500).send({
          message: err?.sqlMessage || "Error adding",
        });
      }
    } else res.send(data[0]);
  });
};

const getClientMember = (req, res) => {
  const meetingId = req.params.meetingId;

  Meeting.getClientMember(meetingId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found meeting with id ${meetingId}.`,
        });
      } else {
        res.status(500).send({
          message: err?.sqlMessage || "Error adding",
        });
      }
    } else res.send(data[0]);
  });
};

const addStaffMember = (req, res) => {
  const meetingId = req.params.meetingId;
  const staffId = req.body.staffId;

  Meeting.addStaffMember(meetingId, staffId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found meeting with id ${meetingId}.`,
        });
      } else {
        res.status(500).send({
          message: err?.sqlMessage || "Error adding",
        });
      }
    } else res.send(data);
  });
};

const addClientMember = (req, res) => {
  const meetingId = req.params.meetingId;
  const clientId = req.body.clientId;

  Meeting.addClientMember(meetingId, clientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found meeting with id ${meetingId}.`,
        });
      } else {
        res.status(500).send({
          message: err?.sqlMessage || "Error adding",
        });
      }
    } else res.send(data);
  });
};

const removeStaffMember = (req, res) => {
  const meetingId = req.params.meetingId;
  const staffId = req.body.staffId;

  Meeting.removeStaffMember(meetingId, staffId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found meeting with id ${meetingId}.`,
        });
      } else {
        res.status(500).send({
          message:
            err?.sqlMessage || "Error deleting meeting with id " + meetingId,
        });
      }
    } else res.send(data);
  });
};

const removeClientMember = (req, res) => {
  const meetingId = req.params.meetingId;
  const clientId = req.body.clientId;

  Meeting.removeClientMember(meetingId, clientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found meeting with id ${meetingId}.`,
        });
      } else {
        res.status(500).send({
          message:
            err?.sqlMessage || "Error deleting meeting with id " + meetingId,
        });
      }
    } else res.send(data);
  });
};

module.exports = {
  getAllMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
  getStaffMember,
  getClientMember,
  addStaffMember,
  addClientMember,
  removeStaffMember,
  removeClientMember,
};
