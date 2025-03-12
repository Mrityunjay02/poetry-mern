import express from 'express';
const router = express.Router();
import {
  addShayaris,
  deleteShayaris,
  getShayaris,
  editShayaris,
} from "../controller/shayari.controller.js";
import { loginUser, register } from "../controller/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

// Public routes
router.get("/getShayari", getShayaris);
router.post("/login", loginUser);
router.post("/register", register);

// Protected routes - require authentication
router.post("/addShayari", authenticateToken, addShayaris);
router.delete("/deleteShayari/:id", authenticateToken, deleteShayaris);
router.put("/editShayari/:id", authenticateToken, editShayaris);

export default router;
