import { Router, type Response } from "express";
import { getAutos, getAutoById, createAuto } from "../controllers/auto.controller.js";
import type { Auto, AutoCreateRequest, ApiResponse } from "../types/api.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

const router = Router();

/** ✅ GET /api/autos (protected, only your autos) */
router.get(
  "/",
  requireAuth,
  async (req: AuthedRequest, res: Response<ApiResponse<Auto[]>>) => {
    const userId = req.user!.userId;
    const result = await getAutos(userId);
    return res.json(result);
  }
);

/** ✅ GET /api/autos/:id (protected, only your auto) */
router.get(
  "/:id",
  requireAuth,
  async (
    req: AuthedRequest<{ id: string }>,
    res: Response<ApiResponse<Auto | null>>
  ) => {
    const vinId = Number(req.params.id);
    if (!Number.isFinite(vinId)) {
      return res.status(400).json({ data: null, message: "Invalid id" });
    }

    const userId = req.user!.userId;
    const result = await getAutoById(vinId, userId);

    if (!result.data) {
      return res.status(404).json({ data: null, message: "Not found" });
    }

    return res.json(result);
  }
);

/** ✅ POST /api/autos (protected, force owner_id from token) */
router.post(
  "/",
  requireAuth,
  async (
    req: AuthedRequest<{}, ApiResponse<Auto>, AutoCreateRequest>,
    res: Response<ApiResponse<Auto>>
  ) => {
    const userId = req.user!.userId;

    const result = await createAuto({
      ...req.body,
      owner_id: userId,
    });

    return res.status(201).json(result);
  }
);

export default router;


