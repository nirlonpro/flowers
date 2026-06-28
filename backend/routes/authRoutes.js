import express from "express";

import {
  login,
  logout,
  checkAuth,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import loginLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

// Login
router.post("/login", loginLimiter, login);

// Logout
router.post("/logout", authMiddleware, logout);

// Check Authentication
router.get("/me", authMiddleware, checkAuth);

export default router;