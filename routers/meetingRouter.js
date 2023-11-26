const express = require("express");

const {
  getAllMeetings,
  createMeeting,
  deleteMeeting,
  updateMeeting,
  addStaffMember,
  addClientMember,
  removeStaffMember,
  removeClientMember,
  getStaffMember,
  getClientMember,
} = require("../controllers/meetingController");
const { protect, checkAccess } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllMeetings);
router.post("/", createMeeting);
router.patch("/:meetingId", updateMeeting);
router.delete("/:meetingId", deleteMeeting);
router.get("/:meetingId/staff", getStaffMember);
router.get("/:meetingId/client", getClientMember);
router.post("/:meetingId/staff", addStaffMember);
router.post("/:meetingId/client", addClientMember);
router.delete("/:meetingId/staff", removeStaffMember);
router.delete("/:meetingId/client", removeClientMember);

module.exports = router;
