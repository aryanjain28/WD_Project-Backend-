const sql = require("./db");

// constructor
const Roles = function (roles) {
  roles.name && (this.name = roles.name);
};

Roles.getAll = (result) => {
  const query = "SELECT * FROM Roles";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Roles.create = (newRole, result) => {
  sql.query("INSERT INTO Roles SET ?", newRole, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    console.log("Created New Role: ", {
      id: res.insertId,
      ...newRole,
    });
    result(null, { id: res.insertId, ...newRole });
  });
};

module.exports = Roles;
