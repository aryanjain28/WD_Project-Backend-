const express = require("express");

const {
  getOfficeHours,
  createOfficeHours,
  deleteOfficeHours,
} = require("../controllers/officeHoursController");
const { protect, checkAccess } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/:staffId", getOfficeHours);
router.post("/", createOfficeHours);
router.delete("/:officeHoursId", deleteOfficeHours);

module.exports = router;
