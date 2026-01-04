import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /api/auth/register
router.post("/register", register);


// POST /api/auth/login
router.post("/login", login);

router.get('/me', requireAuth, me);

export default router;