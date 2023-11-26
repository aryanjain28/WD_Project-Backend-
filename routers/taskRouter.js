const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  addMember,
  getTaskMembers,
  removeMember,
} = require("../controllers/taskController");
const {
  createNewTask,
  getTask,
  getUsersTasks,
  getDashboardDetails,
  getClientsTasksDetails,
} = require("../controllers__/taskController");
const { protect, checkAccess } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

router.get("/:taskId/members", getTaskMembers);
router.post("/:taskId/members", addMember);
router.delete("/:taskId/members", removeMember);

// router.get("/task/:taskId", protect, getTask);
// router.get("/myTasks", protect, getUsersTasks);
// router.get("/:id", protect, getClientsTasksDetails);
// router.get("/dashboard", protect, getDashboardDetails);
// router.post("/task/create", protect, checkAccess, createNewTask);
// router.patch("/task/:taskId", protect, updateTask);

module.exports = router;
