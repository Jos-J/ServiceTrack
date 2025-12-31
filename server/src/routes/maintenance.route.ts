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
  VehicleMaintenanceUpdateRequest,
  ApiResponse,
} from "../types/api.js";

import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

const router = Router();

// ✅ GET /api/maintenance?vehicle_id=123 (public for now)
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

// ✅ POST /api/maintenance (protected + ownership)
router.post(
  "/",
  requireAuth,
  async (
    req: AuthedRequest<{}, ApiResponse<VehicleMaintenanceNested>, VehicleMaintenanceCreateRequest>,
    res: Response<ApiResponse<VehicleMaintenanceNested>>
  ) => {
    const userId = req.user!.userId;

    const result = await createMaintenance(userId, req.body);

    if (result.message === "Forbidden") return res.status(403).json(result);
    return res.status(201).json(result);
  }
);

// ✅ PATCH /api/maintenance/:id (protected + ownership)
router.patch(
  "/:id",
  requireAuth,
  async (
    req: AuthedRequest<{ id: string }, ApiResponse<VehicleMaintenanceNested | null>, VehicleMaintenanceUpdateRequest>,
    res: Response<ApiResponse<VehicleMaintenanceNested | null>>
  ) => {
    const userId = req.user!.userId;

    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ data: null, message: "Invalid id" });
    }

    const result = await updateMaintenance(userId, id, req.body);

    if (result.message === "Forbidden") return res.status(403).json(result);
    if (!result.data) return res.status(404).json(result);
    return res.json(result);
  }
);

// ✅ DELETE /api/maintenance/:id (protected + ownership)
router.delete(
  "/:id",
  requireAuth,
  async (
    req: AuthedRequest<{ id: string }, ApiResponse<{ id: number }>, any>,
    res: Response<ApiResponse<{ id: number }>>
  ) => {
    const userId = req.user!.userId;

    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ data: { id: -1 }, message: "Invalid id" });
    }

    const result = await deleteMaintenance(userId, id);

    if (result.message === "Forbidden") return res.status(403).json(result);
    if (result.message === "Not found") return res.status(404).json(result);
    return res.json(result);
  }
);

export default router;




