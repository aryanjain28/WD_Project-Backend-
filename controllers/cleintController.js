const Client = require("../models/clientModel");

// Get all clients
const getAllClients = (req, res) => {
  Client.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage || "Some error occurred while retrieving clients.",
      });
    else res.send(data);
  });
};

// Create new client
const createClient = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Client
  const client = new Client({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    address: req.body.address,
  });

  // Save Client in the database
  Client.create(req.body.hostId, client, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err?.sqlMessage || "Some error occurred while creating the client.",
      });
    else res.send(data);
  });
};

// Update client identified by the id in the request
const updateClient = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const clientId = req.params.clientId;

  // constructor
  const client = new Client(req.body);

  Client.update(req.body.hostId, clientId, client, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found client with id ${clientId}.`,
        });
      } else {
        res.status(500).send({
          message:
            err?.sqlMessage || "Error updating client with id " + clientId,
        });
      }
    } else res.send(data);
  });
};

// Delete client identified by the id in the request
const deleteClient = (req, res) => {
  const clientId = req.params.clientId;

  Client.delete(req.body.hostId, clientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found client with id ${clientId}.`,
        });
      } else {
        res.status(500).send({
          message:
            err?.sqlMessage || "Error deleting client with id " + clientId,
        });
      }
    } else res.send(data);
  });
};

module.exports = {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
};
