const sql = require("./db");

// constructor
const Client = function (client) {
  client.name && (this.name = client.name);
  client.mobile && (this.mobile = client.mobile);
  client.email && (this.email = client.email);
  client.address && (this.address = client.address);
};

Client.getAll = (result) => {
  const query = "SELECT * FROM Clients";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Client.create = (hostId, newClient, result) => {
  console.log(newClient);
  sql.query(
    "CALL add_client(?, ?, ?, ?, ?)",
    [
      hostId,
      newClient.name,
      newClient.mobile,
      newClient.email,
      newClient.address,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      console.log("Created Client: ", { id: res.insertId, ...newClient });
      result(null, { id: res.insertId, ...newClient });
    },
  );
};

Client.update = (hostId, clientId, client, result) => {
  console.log(client);
  sql.query(
    `CALL update_client(?, ?, ?, ?, ?, ?)`,
    [
      hostId,
      clientId,
      client.name,
      client.mobile,
      client.email,
      client.address,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found client with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated client: ", { clientId, ...client });
      result(null, { clientId, ...client });
    },
  );
};

Client.delete = (hostId, clientId, result) => {
  sql.query("CALL delete_client(?, ?)", [hostId, clientId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found client with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted client with id: ", clientId);
    result(null, res);
  });
};

module.exports = Client;
