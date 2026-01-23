//server/src/routes/vehicleHistory

import { Router, type Response } from "express";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";
import type {
  ApiResponse,
  VehicleHistory,
  VehicleHistoryCreateRequest,
  VehicleHistoryUpdateRequest,
} from "../types/api.js";

import {
  getMyVehicleHistory,
  getVehicleHistoryForVehicle,
  getVehicleHistoryById,
  createVehicleHistory,
  updateVehicleHistory,
  deleteVehicleHistory,
} from "../controllers/vehicleHistory.controllers.js";

const router = Router();

/** ✅ GET /api/vehicle-history (only mine) */
router.get(
  "/",
  requireAuth,
  async (req: AuthedRequest, res: Response<ApiResponse<VehicleHistory[]>>) => {
    const userId = req.user!.user_id;
    const result = await getMyVehicleHistory(userId);
    return res.json(result);
  }
);

/** ✅ GET /api/vehicle-history/vehicle/:vehicleId (only if I own that vehicle) */
router.get(
  "/vehicle/:vehicleId",
  requireAuth,
  async (
    req: AuthedRequest<{ vehicleId: string }>,
    res: Response<ApiResponse<VehicleHistory[] | null>>
  ) => {
    const vehicleId = Number(req.params.vehicleId);
    if (!Number.isFinite(vehicleId)) {
      return res.status(400).json({ data: null, message: "Invalid vehicleId" });
    }

    const userId = req.user!.user_id;
    const result = await getVehicleHistoryForVehicle(vehicleId, userId);

    if (result.data === null) {
      return res.status(404).json({ data: null, message: "Vehicle not found" });
    }

    return res.json(result);
  }
);

/** ✅ GET /api/vehicle-history/:historyId (only mine) */
router.get(
  "/:historyId",
  requireAuth,
  async (
    req: AuthedRequest<{ historyId: string }>,
    res: Response<ApiResponse<VehicleHistory | null>>
  ) => {
    const historyId = Number(req.params.historyId);
    if (!Number.isFinite(historyId)) {
      return res.status(400).json({ data: null, message: "Invalid historyId" });
    }

    const userId = req.user!.user_id;
    const result = await getVehicleHistoryById(historyId, userId);

    if (!result.data) {
      return res.status(404).json({ data: null, message: "Not found" });
    }

    return res.json(result);
  }
);

/** ✅ POST /api/vehicle-history (user_id forced from token, vehicle must be owned) */
router.post(
  "/",
  requireAuth,
  async (
    req: AuthedRequest<{}, ApiResponse<VehicleHistory | null>, VehicleHistoryCreateRequest>,
    res: Response<ApiResponse<VehicleHistory | null>>
  ) => {
    const userId = req.user!.user_id;
    const result = await createVehicleHistory(userId, req.body);

    if (!result.data) {
      return res.status(404).json({ data: null, message: "Vehicle not found" });
    }

    return res.status(201).json(result);
  }
);

/** ✅ PATCH /api/vehicle-history/:historyId */
router.patch(
  "/:historyId",
  requireAuth,
  async (
    req: AuthedRequest<
      { historyId: string },
      ApiResponse<VehicleHistory | null>,
      VehicleHistoryUpdateRequest
    >,
    res: Response<ApiResponse<VehicleHistory | null>>
  ) => {
    const historyId = Number(req.params.historyId);
    if (!Number.isFinite(historyId)) {
      return res.status(400).json({ data: null, message: "Invalid historyId" });
    }

    const userId = req.user!.user_id;
    const result = await updateVehicleHistory(historyId, userId, req.body);

    if (!result.data) {
      return res.status(404).json({ data: null, message: "Not found" });
    }

    return res.json(result);
  }
);

/** ✅ DELETE /api/vehicle-history/:historyId */
router.delete(
  "/:historyId",
  requireAuth,
  async (
    req: AuthedRequest<{ historyId: string }, ApiResponse<null>>,
    res: Response<ApiResponse<null>>
  ) => {
    const historyId = Number(req.params.historyId);
    if (!Number.isFinite(historyId)) {
      return res.status(400).json({ data: null, message: "Invalid historyId" });
    }

    const userId = req.user!.user_id;
    const result = await deleteVehicleHistory(historyId, userId);

    if (!result.data) {
      return res.status(404).json({ data: null, message: "Not found" });
    }

    return res.status(204).send();
  }
);

export default router;
