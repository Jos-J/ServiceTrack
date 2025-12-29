// server/src/routes/maintenance.route.ts
import { Router, type Request, type Response } from "express";
import {
  getMaintenance,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../controllers/maintenance.controller.js";

import type {
  VehicleMaintenanceCreateRequest,
  VehicleMaintenanceNested,
  ApiResponse,
} from "../types/api.js";

const router = Router();

// GET /api/maintenance - fetch all maintenance records
router.get(
  "/",
  async (_req: Request, res: Response<ApiResponse<VehicleMaintenanceNested[]>>) => {
    const result = await getMaintenance();
    res.json(result);
  }
);

// POST /api/maintenance - create a new maintenance record
router.post(
  "/",
  async (
    req: Request<{}, ApiResponse<VehicleMaintenanceNested>, VehicleMaintenanceCreateRequest>,
    res: Response<ApiResponse<VehicleMaintenanceNested>>
  ) => {
    const result = await createMaintenance(req.body);
    res.status(201).json(result);
  }
);

// PATCH /api/maintenance/:id - update a maintenance record
router.patch(
  "/:id",
  async (
    req: Request<{ id: string }, ApiResponse<VehicleMaintenanceNested>, Partial<VehicleMaintenanceCreateRequest>>,
    res: Response<ApiResponse<VehicleMaintenanceNested>>
  ) => {
    const id = Number(req.params.id);
    const result = await updateMaintenance(id, req.body);
    res.json(result);
  }
);

// DELETE /api/maintenance/:id - delete a maintenance record
router.delete(
  "/:id",
  async (
    req: Request<{ id: string }>,
    res: Response<ApiResponse<{ id: number }>>
  ) => {
    const id = Number(req.params.id);
    const result = await deleteMaintenance(id);
    res.json(result);
  }
);

export default router;

