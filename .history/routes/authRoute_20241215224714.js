import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// Define route for signup
router.post("/signup", signup);

// Define route for login
router.post("/login", login);

export default router;
