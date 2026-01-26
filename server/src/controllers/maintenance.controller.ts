// server/src/controllers/maintenance.controller.ts
import { prisma } from "../prisma.js";
import type {
  ApiResponse,
  VehicleMaintenanceNested,
  VehicleMaintenanceCreateRequest,
  VehicleMaintenanceUpdateRequest,
} from "../types/api.js";

function normalizeNullsToUndefined<T>(obj: T): T {
  const copy: any = { ...(obj as any) };
  Object.keys(copy).forEach((k) => {
    if (copy[k] === null) copy[k] = undefined;
  });
  return copy as T;
}

// ✅ GET /api/maintenance?vehicle_id=123 (or all if no query)
export const getMaintenance = async (
  userId: number,
  vehicleId?: number
): Promise<ApiResponse<VehicleMaintenanceNested[]>> => {
  const maintenance = await prisma.vehiclemaintenance.findMany({
    where: {
      auto: { owner_id: userId },
      ...(typeof vehicleId === "number" ? { vehicle_id: vehicleId } : {}),
    },
    orderBy: { createddate: "desc" },
    include: {
      servicetype: {
        select: {
          servicetype_id: true,
          servicename: true,
          servicecategory: true,
        },
      },
    },
  });

  return {
    data: maintenance.map((m) => normalizeNullsToUndefined(m) as any),
  };
};

// ✅ POST /api/maintenance (owner check by auto.owner_id)
export const createMaintenance = async (
  userId: number,
  body: VehicleMaintenanceCreateRequest
): Promise<ApiResponse<VehicleMaintenanceNested>> => {
  const auto = await prisma.auto.findFirst({
    where: { vin_id: body.vehicle_id, owner_id: userId },
    select: { vin_id: true },
  });

  if (!auto) {
    return { data: null as any, message: "Forbidden" };
  }

  const created = await prisma.vehiclemaintenance.create({
    data: {
      vehicle_id: body.vehicle_id,
      vehiclename: body.vehiclename ?? null,
      mainttype: body.mainttype ?? null,
      description: body.description ?? null,
      status: body.status,
      odometerreading: body.odometerreading,
      warrantystatus: body.warrantystatus,
      createdby: body.createdby,
      isactive: body.isactive ?? true,

      servicetype_id: body.servicetype_id ?? null,
      technician_type: body.technician_type ?? "Self",
      technician_id: body.technician_id ?? null,
      shop_id: body.shop_id ?? null,
      totalcost: body.totalcost ?? 0,
    },
    include: {
      servicetype: {
        select: {
          servicetype_id: true,
          servicename: true,
          servicecategory: true,
        }
      }
    }
  });


  return {
    data: normalizeNullsToUndefined(created) as unknown as VehicleMaintenanceNested,
  };
};

// ✅ PATCH /api/maintenance/:id (owner check by maintenance -> auto.owner_id)
export const updateMaintenance = async (
  userId: number,
  id: number,
  body: VehicleMaintenanceUpdateRequest
): Promise<ApiResponse<VehicleMaintenanceNested | null>> => {
  // ✅ single query: must exist AND belong to user
  const record = await prisma.vehiclemaintenance.findFirst({
    where: {
      maintenance_id: id,
      auto: { owner_id: userId },
    },
  });

  if (!record) {
    return { data: null, message: "Not found" };
  }

  const updated = await prisma.vehiclemaintenance.update({
    where: { maintenance_id: id },
    data: {
      ...body,
      updateddate: new Date(),
    },
    include: {
      servicetype: {
        select: {
          servicetype_id: true,
          servicename: true,
          servicecategory: true,
        },
      },
    },
  });


  return {
    data: normalizeNullsToUndefined(updated) as unknown as VehicleMaintenanceNested,
  };
};

// ✅ DELETE /api/maintenance/:id (owner check by maintenance -> auto.owner_id)
export const deleteMaintenance = async (
  userId: number,
  id: number
): Promise<ApiResponse<{ id: number }>> => {
  const row = await prisma.vehiclemaintenance.findUnique({
    where: { maintenance_id: id },
    select: {
      maintenance_id: true,
      auto: { select: { owner_id: true } },
    },
  });

  if (!row) return { data: { id }, message: "Not found" };
  if (row.auto.owner_id !== userId) return { data: { id }, message: "Forbidden" };

  await prisma.vehiclemaintenance.delete({ where: { maintenance_id: id } });
  return { data: { id } };
};

