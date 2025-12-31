import type { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization; // "Bearer <token>"
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  // TEMP: accept any non-empty token
  if (!token) {
    return res.status(401).json({ data: null, message: "Unauthorized" });
  }

  // later: verify JWT + set req.user
  // (req as any).user = decodedUser;

  next();
}
