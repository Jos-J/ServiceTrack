// server/src/routes/parts.route.ts
import { Router, type Request, type Response } from "express";
import {
  getParts,
  createPart,
  updatePart,
} from "../controllers/parts.controller.js";
import type {
  Part,
  PartCreateRequest,
  PartUpdateRequest,
  PartNested,
  ApiResponse,
} from "../types/api.js";

const router = Router();

// GET /api/parts - fetch all parts
router.get(
  "/",
  async (_req: Request, res: Response<ApiResponse<PartNested[]>>) => {
    const result = await getParts();
    res.json(result);
  }
);

// POST /api/parts - create new part
router.post(
  "/",
  async (
    req: Request<{}, ApiResponse<Part>, PartCreateRequest>,
    res: Response<ApiResponse<Part>>
  ) => {
    const result = await createPart(req.body);
    res.status(201).json(result);
  }
);

// PATCH /api/parts/:id - update existing part
interface PartParams {
  id: string;
}

router.patch(
  "/:id",
  async (
    req: Request<PartParams, ApiResponse<Part>, PartUpdateRequest>,
    res: Response<ApiResponse<Part>>
  ) => {
    const id = Number(req.params.id);
    const result = await updatePart(id, req.body);
    res.json(result);
  }
);

export default router;
