const express = require('express');
const router = express.Router();
const {
  addShayaris,
  deleteShayaris,
  getShayaris,
  editShayaris,
} = require("../controller/shayari.controller");
const { loginUser, register } = require("../controller/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

// Public routes
router.get("/getShayari", getShayaris);
router.post("/login", loginUser);
router.post("/register", register);

// Protected routes - require authentication
router.post("/addShayari", authenticateToken, addShayaris);
router.delete("/deleteShayari/:id", authenticateToken, deleteShayaris);
router.put("/editShayari/:id", authenticateToken, editShayaris);

module.exports = router;
