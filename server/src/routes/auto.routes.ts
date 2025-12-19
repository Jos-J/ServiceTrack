// server/src/routes/auto.routes.ts
import { Router, type Request, type Response } from "express";
import {
  getAutos,
  getAutoById,
  createAuto,
} from "../controllers/auto.controller";
import type {
  Auto,
  AutoCreateRequest,
  ApiResponse,
} from "../types/tsInterfaces";

const router = Router();

// GET /api/autos - fetch all autos
router.get(
  "/",
  async (_req: Request, res: Response<ApiResponse<Auto[]>>) => {
    const result = await getAutos();
    res.json(result);
  }
);

// GET /api/autos/:id - fetch auto by ID
interface AutoParams {
  id: string; // URL params are always strings
}

router.get(
  "/:id",
  async (req: Request<AutoParams>, res: Response<ApiResponse<Auto>>) => {
    const vinId = Number(req.params.id);
    const result = await getAutoById(vinId);
    res.json(result);
  }
);

// POST /api/autos - create a new auto
router.post(
  "/",
  async (
    req: Request<{}, ApiResponse<Auto>, AutoCreateRequest>,
    res: Response<ApiResponse<Auto>>
  ) => {
    const result = await createAuto(req.body);
    res.json(result);
  }
);

export default router;
