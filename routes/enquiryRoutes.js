const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");
const { createEnquiry, getAllEnquiries, updateEnquiryStatus, approvedEnq, pendingEnq, declinedEnq } = require("../controllers/enquiryController.js");
const router = express.Router();

router.post("/create",isAuthenticated, createEnquiry);
router.get("/getAllEnquiries",isAuthenticated, getAllEnquiries);
router.patch("/updateStatus/:id",isAuthenticated, updateEnquiryStatus);
router.get('/appoveEnq', isAuthenticated, approvedEnq)
router.get('/pendingEnq', isAuthenticated, pendingEnq)
router.get('/declinedEnq', isAuthenticated, declinedEnq)

module.exports = router; 