const sql = require("./db");

// constructor
const OfficeHours = function (officeHours) {
  officeHours.taskId && (this.taskId = officeHours.taskId);
  officeHours.staffId && (this.staffId = officeHours.staffId);
  officeHours.description && (this.description = officeHours.description);
  officeHours.hours && (this.hours = officeHours.hours);
};

OfficeHours.getAll = (staffId, result) => {
  const query = "CALL get_office_hours(?)";
  sql.query(query, [staffId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res[0]);
  });
};

OfficeHours.create = (newOfficeHours, result) => {
  console.log(newOfficeHours);
  sql.query(
    "CALL enter_office_hours(?, ?, ?, ?)",
    [
      newOfficeHours.taskId,
      newOfficeHours.staffId,
      newOfficeHours.description,
      newOfficeHours.hours,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      console.log("Created OfficeHours: ", {
        id: res.insertId,
        ...newOfficeHours,
      });
      result(null, { id: res.insertId, ...newOfficeHours });
    },
  );
};

OfficeHours.delete = (officeHoursId, staffId, result) => {
  console.log(officeHoursId, staffId);
  sql.query(
    "CALL delete_office_hours(?, ?)",
    [officeHoursId, staffId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found officeHours with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Deleted officeHours with id: ", officeHoursId);
      result(null, res);
    },
  );
};

module.exports = OfficeHours;
