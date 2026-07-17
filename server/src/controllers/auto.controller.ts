// server/src/controllers/auto

// import type { autoCreateInput } from "../generated/prisma/models.js";
import { prisma } from "../prisma.js";
import type { Auto, AutoCreateRequest, ApiResponse } from "../types/api.js";

// ✅ GET /api/autos  (only autos owned by user)
export const getAutos = async (userId: number): Promise<ApiResponse<Auto[]>> => {
  const autos = await prisma.auto.findMany({
    where: { owner_id: userId },
    orderBy: { created_at: "desc" },
  });

  return { data: autos };
};

// ✅ GET /api/autos/:id  (only if owned by user)
export const getAutoById = async (
  vinId: number,
  userId: number
): Promise<ApiResponse<Auto | null>> => {
  const auto = await prisma.auto.findFirst({
    where: { vin_id: vinId, owner_id: userId },
  });

  return { data: auto };
};

// ✅ POST /api/autos  (server injects owner_id, prisma data is explicit)
export const createAuto = async (
  userId: number,
  body: AutoCreateRequest
): Promise<ApiResponse<Auto>> => {
  const auto = await prisma.auto.create({
    data: {
      vin: body.vin,
      make: body.make,
      model: body.model,
      vehicle_year: body.vehicle_year,
      miles: body.miles,
      owner_id: userId,
    },
  });

  return { data: auto };
};

