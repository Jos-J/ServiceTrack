// maintenance.controller.ts
import { prisma } from "../prisma";
import type {
  VehicleMaintenanceNested,
  VehicleMaintenanceCreateRequest,
  ApiResponse,
} from "../types/tsInterfaces";

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


