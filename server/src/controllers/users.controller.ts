import type { Response, Request } from "express";
import type { AuthedRequest } from "../middleware/auth.js";
import { prisma } from "../prisma.js";

/**
 * GET /api/users/me
 * Returns the logged-in user's profile (safe fields only)
 */
export async function getMe(req: AuthedRequest, res: Response) {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({ data: null, message: "Unauthorized" });
    }

    const user = await prisma.users.findUnique({
      where: { user_id: req.user.user_id },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        phone_number: true,
        email: true,
        mechanic_rating: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      return res.status(404).json({ data: null, message: "User not found" });
    }

    return res.json({ data: user, message: "OK" });
  } catch (err) {
    console.error("getMe error:", err);
    return res.status(500).json({ data: null, message: "Server error" });
  }
}

/**
 * PUT /api/users/me
 * Updates logged-in user's profile fields (NOT password_hash)
 */
export async function updateMe(req: AuthedRequest, res: Response) {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({ data: null, message: "Unauthorized" });
    }

    const {
      first_name,
      last_name,
      phone_number,
      email,
      mechanic_rating,
      dob,
      street_address,
      city,
      state_province,
      postal_code,
      country,
    } = req.body as any;

    if (email !== undefined && typeof email === "string" && email.trim() === "") {
      return res.status(400).json({ data: null, message: "Email cannot be empty" });
    }

    const updated = await prisma.users.update({
      where: { user_id: req.user.user_id },
      data: {
        ...(first_name !== undefined ? { first_name } : {}),
        ...(last_name !== undefined ? { last_name } : {}),
        ...(phone_number !== undefined ? { phone_number } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(mechanic_rating !== undefined ? { mechanic_rating } : {}),
        ...(dob !== undefined ? { dob } : {}),
        ...(street_address !== undefined ? { street_address } : {}),
        ...(city !== undefined ? { city } : {}),
        ...(state_province !== undefined ? { state_province } : {}),
        ...(postal_code !== undefined ? { postal_code } : {}),
        ...(country !== undefined ? { country } : {}),
      },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        phone_number: true,
        email: true,
        mechanic_rating: true,
        dob: true,
        street_address: true,
        city: true,
        state_province: true,
        postal_code: true,
        country: true,
        created_at: true,
        updated_at: true,
      },
    });

    return res.json({ data: updated, message: "Updated" });
  } catch (err: any) {
    console.error("updateMe error:", err);

    // Prisma unique constraint violation (email already exists)
    if (err?.code === "P2002") {
      return res.status(409).json({ data: null, message: "Email already in use" });
    }

    return res.status(500).json({ data: null, message: "Server error" });
  }
}

/**
 * GET /api/users/:id/basic
 * Returns a safe "nested" user shape (UserNested)
 */
export async function getUserBasicById(req: Request, res: Response) {
  try {
    const userId = Number(req.params.id);
    if (Number.isNaN(userId)) {
      return res.status(400).json({ data: null, message: "Invalid user id" });
    }

    const user = await prisma.users.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
      },
    });

    if (!user) {
      return res.status(404).json({ data: null, message: "User not found" });
    }

    return res.json({ data: user, message: "OK" });
  } catch (err) {
    console.error("getUserBasicById error:", err);
    return res.status(500).json({ data: null, message: "Server error" });
  }
}
