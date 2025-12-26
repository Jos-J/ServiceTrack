// server/src/controllers/parts.controller.ts
import { prisma } from "../prisma.js";
import { normalizeNullsToUndefined } from "../utils/normalize.js";
import type {
  Part,
  PartNested,
  PartCreateRequest,
  PartUpdateRequest,
  ApiResponse,
} from "../types/api.js";
import type { Prisma } from "@prisma/client";

// GET /api/parts
export const getParts = async (): Promise<ApiResponse<PartNested[]>> => {
  const parts = await prisma.parts.findMany({
    include: { vehiclemaintenance: true }, // include relation for nested
  });

  return { data: normalizeNullsToUndefined(parts) as unknown as PartNested[] };
};

// POST /api/parts
export const createPart = async (
  body: PartCreateRequest
): Promise<ApiResponse<Part>> => {
  // Explicitly map to Prisma.partsCreateInput
  const data: Prisma.partsCreateInput = {
    part_name: body.part_name,
    part_number: body.part_number,
    part_type: body.part_type,
    brand: body.brand,
    quantity: body.quantity,
    unit_cost: body.unit_cost,
    total_cost: body.total_cost,
    supplier_name: body.supplier_name,
    purchase_date: body.purchase_date,
    under_warranty: body.under_warranty ?? false, // required
    warranty_expiration: body.warranty_expiration,
    created_by: body.created_by ?? "system",       // required
    notes: body.notes,
    // optional connect to vehiclemaintenance
    ...(body.maintenance_id
      ? { vehiclemaintenance: { connect: { maintenance_id: body.maintenance_id } } }
      : {}),
  };

  const part = await prisma.parts.create({ data });

  return { data: normalizeNullsToUndefined(part) as unknown as Part };
};

// PATCH /api/parts/:id
export const updatePart = async (
  id: number,
  body: PartUpdateRequest
): Promise<ApiResponse<Part>> => {
  // Explicitly map to Prisma.partsUpdateInput
  const data: Prisma.partsUpdateInput = {
    part_name: body.part_name,
    part_number: body.part_number,
    part_type: body.part_type,
    brand: body.brand,
    quantity: body.quantity,
    unit_cost: body.unit_cost,
    total_cost: body.total_cost,
    supplier_name: body.supplier_name,
    purchase_date: body.purchase_date,
    under_warranty: body.under_warranty,
    warranty_expiration: body.warranty_expiration,
    created_by: body.created_by,
    notes: body.notes,
    ...(body.maintenance_id
      ? { vehiclemaintenance: { connect: { maintenance_id: body.maintenance_id } } }
      : {}),
  };

  const part = await prisma.parts.update({
    where: { part_id: id },
    data,
  });

  return { data: normalizeNullsToUndefined(part) as unknown as Part };
};

