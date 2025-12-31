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

// ✅ POST /api/autos  (owner_id should be forced by the route)
export const createAuto = async (
  body: AutoCreateRequest
): Promise<ApiResponse<Auto>> => {
  const auto = await prisma.auto.create({ data: body });
  return { data: auto };
};


