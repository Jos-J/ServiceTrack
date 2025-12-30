//server/ src/ controller / maintenance.controller.ts
import { prisma } from "../prisma.js";
import type {
  VehicleMaintenanceNested,
  VehicleMaintenanceCreateRequest,
  ApiResponse,
} from "../types/api.js";

export type VehicleMaintenanceUpdateRequest = Partial<
  Pick<
    VehicleMaintenanceCreateRequest,
    "mainttype" | "status" | "odometerreading" | "description"
  >
>;

function normalizeNullsToUndefined<T>(obj: T): T {
  const copy: any = { ...(obj as any) };
  Object.keys(copy).forEach((k) => {
    if (copy[k] === null) copy[k] = undefined;
  });
  return copy as T;
}

export const getMaintenance = async (): Promise<ApiResponse<VehicleMaintenanceNested[]>> => {
  const maintenance = await prisma.vehiclemaintenance.findMany();
  const normalized = maintenance.map((m) => normalizeNullsToUndefined(m) as unknown as VehicleMaintenanceNested);
  return { data: normalized };
};

export const createMaintenance = async (
  body: VehicleMaintenanceCreateRequest
): Promise<ApiResponse<VehicleMaintenanceNested>> => {
  const maintenance = await prisma.vehiclemaintenance.create({
    data: body,
  });
  const normalized = normalizeNullsToUndefined(maintenance) as unknown as VehicleMaintenanceNested;
  return { data: normalized };
};


// ✅ PATCH /api/maintenance/:id
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

// ✅ DELETE /api/maintenance/:id
export const deleteMaintenance = async (id: number): Promise<ApiResponse<{ id: number }>> => {
  await prisma.vehiclemaintenance.delete({ where: { maintenance_id: id } });
  return { data: { id } };
};

// GET /api/ maintenance?vehicle_id=123
export const getMaintenanceByVehicleId = async (
  vehicleId: number
): Promise<ApiResponse<VehicleMaintenanceNested[]>> => {
  const rows = await prisma.vehiclemaintenance.findMany({
    where: { vehicle_id: vehicleId },
    orderBy: { createddate: "desc" }, // ✅ newest first
  });

  const normalized = rows.map((m) =>
    normalizeNullsToUndefined(m) as unknown as VehicleMaintenanceNested
  );

  return { data: normalized };
};
