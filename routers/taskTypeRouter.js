const express = require("express");
const {
  getAllTaskTypes,
  createTaskType,
  updateTaskType,
} = require("../controllers/taskTypeController");
const { protect, checkAccess } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllTaskTypes);
router.post("/taskType", createTaskType);
router.patch("/taskType/:taskTypeId", updateTaskType);

module.exports = router;
