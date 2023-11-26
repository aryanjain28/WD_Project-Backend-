const express = require("express");
const {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/cleintController");
const { protect, checkAccess } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllClients);
router.post("/client", createClient);
router.patch("/client/:clientId", updateClient);
router.delete("/client/:clientId", deleteClient);

// router.get("/client/:id", protect, getClientDetails);
// router.get("/client/:id/jobDetails", protect, getClientJobDetails);
// router.get("/taxpayertypes", protect, getTaxpayerTypes);
// router.get("/pincodes", protect, getPincodes);
// router.post("/client", protect, checkAccess, createClient);
// router.patch("/client/:id", protect, updateClient);

module.exports = router;
