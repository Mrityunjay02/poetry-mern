const express = require('express');
const router = express.Router();
const {
  addShayaris,
  deleteShayaris,
  getShayaris,
  editShayaris,
} = require("../controller/shayari.controller.js");
const { loginUser, register } = require("../controller/auth.controller.js");
const { authenticateToken } = require("../middleware/auth.middleware.js");

// Public routes
router.get("/getShayari", getShayaris);
router.post("/login", loginUser);
router.post("/register", register);

// Protected routes - require authentication
router.post("/addShayari", authenticateToken, addShayaris);
router.delete("/deleteShayari/:id", authenticateToken, deleteShayaris);
router.put("/editShayari/:id", authenticateToken, editShayaris);

module.exports = router;
