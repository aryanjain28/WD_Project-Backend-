const sql = require("./db");

// constructor
const Task = function (task) {
  task.taskType && (this.taskType = task.taskType);
  task.taskTypeId && (this.taskTypeId = task.taskTypeId);
  task.title && (this.title = task.title);
  task.description && (this.description = task.description);
  task.status && (this.status = task.status);
  task.startDate && (this.startDate = task.startDate);
  task.priority && (this.priority = task.priority);
  task.clientId && (this.clientId = task.clientId);
  task.client && (this.client = task.client);
};

Task.getAll = (result) => {
  const query = "CALL get_tasks()";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res[0]);
  });
};

Task.create = (newTask, staffId, result) => {
  sql.query(
    "CALL create_task (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      newTask.taskTypeId,
      newTask.title,
      newTask.description || null,
      newTask.status,
      newTask.startDate || null,
      newTask.priority,
      newTask.clientId,
      staffId,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      const newTaskId = res[0][0].taskId;
      console.log("Created Task: ", { taskId: newTaskId, staffId, ...newTask });
      result(null, { taskId: newTaskId, staffId, ...newTask });
    },
  );
};

Task.update = (taskId, task, result) => {
  const query = `UPDATE Tasks SET ?  WHERE taskId = ${taskId}`;
  sql.query(query, task, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found task with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Updated task: ", { taskId, ...task });
    result(null, { taskId, ...task });
  });
};

Task.delete = (taskId, result) => {
  sql.query("DELETE FROM Tasks WHERE taskId = ?", taskId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found task with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted task with id: ", taskId);
    result(null, res);
  });
};

Task.getAllMembers = (taskId, result) => {
  sql.query("CALL get_staff_of_task (?)", [taskId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res[0]);
  });
};

Task.addMember = (taskId, staffId, result) => {
  sql.query("CALL add_staff_to_task (?, ?)", [taskId, staffId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    console.log("Added Staff Member to task: ", {
      taskId,
      staffId,
    });
    result(null, { taskId, staffId });
  });
};

Task.removeMember = (taskId, staffId, result) => {
  sql.query(
    "CALL remove_staff_from_task (?, ?)",
    [taskId, staffId],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      console.log("Removed Staff Member from task: ", {
        taskId,
        staffId,
      });
      result(null, { taskId, staffId });
    },
  );
};

module.exports = Task;
