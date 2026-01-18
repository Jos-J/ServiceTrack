// server/src/routes/parts.route.ts
import { Router, type Response } from "express";
import {
  getParts,
  createPart,
  updatePart,
  deletePart,
} from "../controllers/parts.controller.js";

import type {
  Part,
  PartCreateRequest,
  PartUpdateRequest,
  PartNested,
  ApiResponse,
} from "../types/api.js";

import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

const router = Router();

// ✅ GET /api/parts (protected, only your parts)
router.get(
  "/",
  requireAuth,
  async (req: AuthedRequest, res: Response<ApiResponse<PartNested[]>>) => {
    const userId = req.user!.userId;
    const result = await getParts(userId);
    return res.json(result);
  }
);

// ✅ POST /api/parts (protected, only for your maintenance)
router.post(
  "/",
  requireAuth,
  async (
    req: AuthedRequest<{}, ApiResponse<Part>, PartCreateRequest>,
    res: Response<ApiResponse<Part>>
  ) => {
    const userId = req.user!.userId;
    const result = await createPart(userId, req.body);

    // Option A: do not leak existence
    if (!result.data) {
      const msg = result.message ?? "Not found";
      const status = msg === "Not found" ? 404 : 400;
      return res.status(status).json(result);
    }

    return res.status(201).json(result);
  }
);

// ✅ PATCH /api/parts/:id (protected + ownership)
router.patch(
  "/:id",
  requireAuth,
  async (
    req: AuthedRequest<{ id: string }, ApiResponse<Part | null>, PartUpdateRequest>,
    res: Response<ApiResponse<Part | null>>
  ) => {
    const userId = req.user!.userId;
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ data: null, message: "Invalid id" });
    }

    const result = await updatePart(userId, id, req.body);

    if (!result.data) {
      // Option A: not found covers "not yours" too
      return res.status(404).json(result);
    }

    return res.json(result);
  }
);

// ✅ DELETE /api/parts/:id (protected + ownership)
router.delete(
  "/:id",
  requireAuth,
  async (
    req: AuthedRequest<{ id: string }, ApiResponse<{ id: number }>>,
    res: Response<ApiResponse<{ id: number }>>
  ) => {
    const userId = req.user!.userId;
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ data: { id: -1 }, message: "Invalid id" });
    }

    const result = await deletePart(userId, id);

    if (result.message === "Not found") return res.status(404).json(result);
    return res.json(result);
  }
);

export default router;

