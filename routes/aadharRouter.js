const express = require("express");
const router = express.Router();
const aadharController = require("../Controllers/aadharController");

router.get("/", aadharController.getStatus);
router.post("/update-status", aadharController.updateAadhaarStatus);

module.exports = router;
