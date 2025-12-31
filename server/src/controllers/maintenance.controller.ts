//server/src/controllers/maintenance.controller
import { prisma } from "../prisma.js";
import type {
  ApiResponse,
  VehicleMaintenanceNested,
  VehicleMaintenanceCreateRequest,
  VehicleMaintenanceUpdateRequest,
} from "../types/api.js";

import { requireAuth } from "..//middleware/requireAuth.js";

function normalizeNullsToUndefined<T>(obj: T): T {
  const copy: any = { ...(obj as any) };
  Object.keys(copy).forEach((k) => {
    if (copy[k] === null) copy[k] = undefined;
  });
  return copy as T;
}

export const getMaintenance = async (
  vehicleId?: number
): Promise<ApiResponse<VehicleMaintenanceNested[]>> => {
  const maintenance = await prisma.vehiclemaintenance.findMany({
    where: typeof vehicleId === "number" ? { vehicle_id: vehicleId } : undefined,
    orderBy: { createddate: "desc" },
  });

  return {
    data: maintenance.map((m) => normalizeNullsToUndefined(m) as unknown as VehicleMaintenanceNested),
  };
};

// Protect create/update/delete

export const createMaintenance = async (
  body: VehicleMaintenanceCreateRequest
): Promise<ApiResponse<VehicleMaintenanceNested>> => {
  const maintenance = await prisma.vehiclemaintenance.create({ data: body });
  return { data: normalizeNullsToUndefined(maintenance) as unknown as VehicleMaintenanceNested };
};

export const updateMaintenance = async (
  id: number,
  body: VehicleMaintenanceUpdateRequest
): Promise<ApiResponse<VehicleMaintenanceNested>> => {
  const updated = await prisma.vehiclemaintenance.update({
    where: { maintenance_id: id },
    data: body,
  });

  return { data: normalizeNullsToUndefined(updated) as unknown as VehicleMaintenanceNested };
};

export const deleteMaintenance = async (
  id: number
): Promise<ApiResponse<{ id: number }>> => {
  await prisma.vehiclemaintenance.delete({ where: { maintenance_id: id } });
  return { data: { id } };
};
