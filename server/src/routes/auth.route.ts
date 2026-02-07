// server/src/routes/auth.route.ts
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";
import type { AuthedRequest } from "../middleware/auth.js";
import  cors from "cors";

const router = Router();
router.options(/.*/, cors());

router.post("/register", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const existing = await prisma.users.findUnique({
    where: { email },
  });

  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const password_hash = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      email,
      password_hash,
      first_name,
      last_name,
    },
  });

  res.status(201).json({
    data: { user_id: user.user_id, email: user.email },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { user_id: user.user_id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.status(201).json({
    data: {
      token,
      user: {
        user_id: user.user_id,
        email: user.email,
      },
    },
  });
});

// ✅ NEW: validate token + return identity
router.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  return res.json({
    data: {
      user_id: req.user!.user_id,
      email: req.user!.email,
    },
  });
});

// ✅ NEW: logout (client clears token)
router.post("/logout", requireAuth, async (_req: AuthedRequest, res) => {
  return res.json({
    data: null,
    message: "Logged out",
  });
});

export default router;

