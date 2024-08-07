const express = require("express");
const { isAuthenticated, checkRole } = require("../middlewares/auth.js");
const { signup, login, logout, currentUser } = require("../controllers/userController.js");
const router = express.Router();

router.get("/user",isAuthenticated, currentUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router; 