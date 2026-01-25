import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getMe, updateMe, getUserBasicById } from "../controllers/users.controller.js";

const router = Router();

// Current user profile
router.get("/me", requireAuth, getMe);
router.put("/me", requireAuth, updateMe);

// Basic/nested user info (safe)
router.get("/:id/basic", getUserBasicById);

export default router;
