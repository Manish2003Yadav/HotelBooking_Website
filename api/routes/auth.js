import express from "express";
import { login, register, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout); // Correctly map the logout function

export default router;