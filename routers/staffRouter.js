const express = require("express");
const {
  getAllStaff,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
  loginStaffMember,
} = require("../controllers/staffController");
const { protect, checkAccess } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllStaff);
router.post("/", createStaffMember);
router.post("/login", loginStaffMember);
router.patch("/:staffId", updateStaffMember);
router.delete("/:staffId", deleteStaffMember);

module.exports = router;
