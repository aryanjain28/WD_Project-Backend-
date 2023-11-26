const express = require("express");
const { getAllRoles, createRole } = require("../controllers/rolesController");
const { protect, checkAccess } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllRoles);
router.post("/", createRole);

module.exports = router;
