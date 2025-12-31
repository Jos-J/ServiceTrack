// server/src/routes/maintenance.route.ts
import { Router, type Request, type Response } from "express";
import {
  getMaintenance,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../controllers/maintenance.controller.js";

import type { VehicleMaintenanceUpdateRequest } from "../types/api.js";

import type {
  VehicleMaintenanceCreateRequest,
  VehicleMaintenanceNested,
  ApiResponse,
} from "../types/api.js";

const router = Router();

// ✅ GET /api/maintenance?vehicle_id=123
router.get(
  "/",
  async (req: Request, res: Response<ApiResponse<VehicleMaintenanceNested[]>>) => {
    const raw = req.query.vehicle_id;

    let vehicleId: number | undefined = undefined;

    if (typeof raw === "string") {
      vehicleId = Number(raw);
      if (!Number.isFinite(vehicleId)) {
        return res.status(400).json({ data: [], message: "Invalid vehicle_id" });
      }
    }

    const result = await getMaintenance(vehicleId);
    return res.json(result);
  }
);

// ✅ POST /api/maintenance
router.post(
  "/",
  async (
    req: Request<{}, ApiResponse<VehicleMaintenanceNested>, VehicleMaintenanceCreateRequest>,
    res: Response<ApiResponse<VehicleMaintenanceNested>>
  ) => {
    const result = await createMaintenance(req.body);
    return res.status(201).json(result);
  }
);

// ✅ PATCH /api/maintenance/:id
router.patch(
  "/:id",
  async (
    req: Request<{ id: string }, ApiResponse<VehicleMaintenanceNested>, VehicleMaintenanceUpdateRequest>,
    res: Response<ApiResponse<VehicleMaintenanceNested>>
  ) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ data: null as any, message: "Invalid id" });
    }
    const result = await updateMaintenance(id, req.body);
    return res.json(result);
  }
);


// ✅ DELETE /api/maintenance/:id
router.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response<ApiResponse<{ id: number }>>) => {
    const id = Number(req.params.id);
    const result = await deleteMaintenance(id);
    return res.json(result);
  }
);

export default router;


