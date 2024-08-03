const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");
const { createEnquiry, getAllEnquiries, updateEnquiryStatus } = require("../controllers/enquiryController.js");
const router = express.Router();

router.post("/create",isAuthenticated, createEnquiry);
router.get("/getAllEnquiries",isAuthenticated, getAllEnquiries);
router.patch("/updateStatus/:id", updateEnquiryStatus);

module.exports = router; 