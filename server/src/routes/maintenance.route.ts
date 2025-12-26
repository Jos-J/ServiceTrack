// server/src/routes/maintenance.route.ts
import { Router, type Request, type Response } from "express";
import {
  getMaintenance,
  createMaintenance,
} from "../controllers/maintenance.controller";
import type {
  VehicleMaintenanceCreateRequest,
  VehicleMaintenanceResponse,
  VehicleMaintenanceNested,
  ApiResponse,
} from "../types/api";

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
    req: Request<{}, VehicleMaintenanceResponse, VehicleMaintenanceCreateRequest>,
    res: Response<VehicleMaintenanceResponse>
  ) => {
    const result = await createMaintenance(req.body);
    res.status(201).json(result);
  }
);

export default router;
