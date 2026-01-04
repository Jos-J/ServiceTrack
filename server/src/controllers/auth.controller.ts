//server/src/controller/auth.controller

import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";
import type { ApiResponse } from "../types/api.js";
import type { AuthedRequest } from "../middleware/auth.js";

type AuthUser = {
  user_id: number;
  email: string;
};

function signToken(payload: { userId: number; email: string }) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not set");
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

// POST /api/auth/register
export async function register(
  req: Request<{}, any, { email: string; password: string }>,
  res: Response<ApiResponse<{ user: AuthUser; token: string }>>
) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ data: null as any, message: "Email and password required" });
  }

  const existing = await prisma.users.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ data: null as any, message: "Email already in use" });
  }

  const password_hash = await bcrypt.hash(password, 10);

  // ✅ assumes your Prisma `users` model has fields: email, password_hash (or similar)
  const user = await prisma.users.create({
    data: { email, password_hash },
    select: { user_id: true, email: true },
  });

  const token = signToken({ userId: user.user_id, email: user.email });

  return res.status(201).json({ data: { user, token } });
}

// POST /api/auth/login
export async function login(
  req: Request<{}, any, { email: string; password: string }>,
  res: Response<ApiResponse<{ user: AuthUser; token: string }>>
) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ data: null as any, message: "Email and password required" });
  }

  const userRow = await prisma.users.findUnique({
    where: { email },
    // ✅ adjust field name if your DB uses something else
    select: { user_id: true, email: true, password_hash: true },
  });

  if (!userRow) {
    return res.status(401).json({ data: null as any, message: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, userRow.password_hash);
  if (!ok) {
    return res.status(401).json({ data: null as any, message: "Invalid credentials" });
  }

  const user: AuthUser = { user_id: userRow.user_id, email: userRow.email };
  const token = signToken({ userId: user.user_id, email: user.email });

  // ✅ IMPORTANT: token is RAW JWT (NO "Bearer " here)
  return res.json({ data: { user, token } });
}

// GET /api/auth/me
export async function me(req: AuthedRequest, res: Response<ApiResponse<any>>) {
  // requireAuth already validated token and attached req.user
  return res.json({ data: req.user ?? null });
}
