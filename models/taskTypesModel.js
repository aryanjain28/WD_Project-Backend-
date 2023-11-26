const sql = require("./db");

// constructor
const TaskTypes = function (taskType) {
  taskType.taskTypeId && (this.taskTypeId = taskType.taskTypeId);
  taskType.name && (this.name = taskType.name);
  taskType.description && (this.description = taskType.description);
  taskType.price && (this.price = taskType.price);
};

TaskTypes.getAll = (result) => {
  const query = "SELECT * FROM TaskTypes";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

TaskTypes.create = (newTaskType, result) => {
  console.log(newTaskType);
  sql.query("INSERT INTO TaskTypes SET ?", newTaskType, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    console.log("Created TaskType: ", { id: res.insertId, ...newTaskType });
    result(null, { id: res.insertId, ...newTaskType });
  });
};

TaskTypes.update = (taskTypeId, taskType, result) => {
  sql.query(
    `UPDATE TaskTypes SET ? WHERE taskTypeId = ${taskTypeId}`,
    taskType,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found taskType with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated taskType: ", { taskTypeId, ...taskType });
      result(null, { taskTypeId, ...taskType });
    },
  );
};

module.exports = TaskTypes;
