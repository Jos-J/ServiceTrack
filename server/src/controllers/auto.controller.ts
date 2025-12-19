// server/src/controllers/auto.controller.ts
import { prisma } from "../prisma";
import type { Auto, AutoCreateRequest, ApiResponse } from "../types/tsInterfaces";

// GET /api/autos
export const getAutos = async (): Promise<ApiResponse<Auto[]>> => {
  const autos = await prisma.auto.findMany();
  return { data: autos };
};

// GET /api/autos/:id
export const getAutoById = async (id: number): Promise<ApiResponse<Auto>> => {
  const auto = await prisma.auto.findUnique({ where: { vin_id: id } });
  if (!auto) throw new Error("Auto not found"); // router will handle status
  return { data: auto };
};

// POST /api/autos
export const createAuto = async (
  body: AutoCreateRequest
): Promise<ApiResponse<Auto>> => {
  const auto = await prisma.auto.create({
    data: body,
  });
  return { data: auto };
};

