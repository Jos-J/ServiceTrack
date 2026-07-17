// server/src/controllers/vehicleHistory

import { prisma } from "../prisma.js";
import type {
  ApiResponse,
  VehicleHistory,
  VehicleHistoryCreateRequest,
  VehicleHistoryUpdateRequest,
} from "../types/api.js";

/** Verify the auto belongs to this user */
async function ensureOwnedVehicle(vehicleId: number, userId: number) {
  return prisma.auto.findFirst({
    where: { vin_id: vehicleId, owner_id: userId },
    select: { vin_id: true },
  });
}

/** GET all my vehicle_history rows */
export async function getMyVehicleHistory(
  userId: number
): Promise<ApiResponse<VehicleHistory[]>> {
  const rows = await prisma.vehicle_history.findMany({
    where: { user_id: userId },
    orderBy: { history_id: "desc" },
    include: {
      auto: true,
      users: true,
    },
  });

  return { data: rows as unknown as VehicleHistory[] };
}

/** GET history for a specific vehicle (only if I own that vehicle) */
export async function getVehicleHistoryForVehicle(
  vehicleId: number,
  userId: number
): Promise<ApiResponse<VehicleHistory[] | null>> {
  const owned = await ensureOwnedVehicle(vehicleId, userId);
  if (!owned) return { data: null };

  const rows = await prisma.vehicle_history.findMany({
    where: { vehicle_id: vehicleId, user_id: userId },
    orderBy: { history_id: "desc" },
    include: {
      auto: true,
      users: true,
    },
  });

  return { data: rows as unknown as VehicleHistory[] };
}

/** GET a single history row (only if mine) */
export async function getVehicleHistoryById(
  historyId: number,
  userId: number
): Promise<ApiResponse<VehicleHistory | null>> {
  const row = await prisma.vehicle_history.findFirst({
    where: { history_id: historyId, user_id: userId },
    include: { auto: true, users: true },
  });

  return { data: row as unknown as VehicleHistory | null };
}

/** CREATE (only if I own the vehicle) */
export async function createVehicleHistory(
  userId: number,
  body: VehicleHistoryCreateRequest
): Promise<ApiResponse<VehicleHistory | null>> {
  const owned = await ensureOwnedVehicle(body.vehicle_id, userId);
  if (!owned) return { data: null };

  const created = await prisma.vehicle_history.create({
    data: {
      vehicle_id: body.vehicle_id,
      user_id: userId,
      registered: body.registered ?? true,
      registered_start: body.registered_start
        ? new Date(body.registered_start)
        : null,
      registered_end: body.registered_end ? new Date(body.registered_end) : null,
    },
    include: { auto: true, users: true },
  });

  return { data: created as unknown as VehicleHistory };
}

/** UPDATE (only if mine; do not allow changing vehicle_id/user_id) */
export async function updateVehicleHistory(
  historyId: number,
  userId: number,
  body: VehicleHistoryUpdateRequest
): Promise<ApiResponse<VehicleHistory | null>> {
  const existing = await prisma.vehicle_history.findFirst({
    where: { history_id: historyId, user_id: userId },
    select: { history_id: true },
  });
  if (!existing) return { data: null };

  const updated = await prisma.vehicle_history.update({
    where: { history_id: historyId },
    data: {
      registered: body.registered ?? undefined,
      registered_start:
        body.registered_start === undefined
          ? undefined
          : body.registered_start === null
          ? null
          : new Date(body.registered_start),
      registered_end:
        body.registered_end === undefined
          ? undefined
          : body.registered_end === null
          ? null
          : new Date(body.registered_end),
    },
    include: { auto: true, users: true },
  });

  return { data: updated as unknown as VehicleHistory };
}

/** DELETE (only if mine) */
export async function deleteVehicleHistory(
  historyId: number,
  userId: number
): Promise<ApiResponse<boolean>> {
  const existing = await prisma.vehicle_history.findFirst({
    where: { history_id: historyId, user_id: userId },
    select: { history_id: true },
  });
  if (!existing) return { data: false };

  await prisma.vehicle_history.delete({ where: { history_id: historyId } });
  return { data: true };
}

