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
import { Prisma } from "@prisma/client";

// helper: safe Decimal math
const computeTotalCost = (
  quantity?: number | null,
  unitCost?: Prisma.Decimal | null
): Prisma.Decimal => {
  const q = quantity ?? 0;
  const u = unitCost ?? new Prisma.Decimal(0);
  return new Prisma.Decimal(q).mul(u);
};

// GET /api/parts
export const getParts = async (): Promise<ApiResponse<PartNested[]>> => {
  const parts = await prisma.parts.findMany({
    include: { vehiclemaintenance: true },
  });

  return { data: normalizeNullsToUndefined(parts) as unknown as PartNested[] };
};

// POST /api/parts
export const createPart = async (
  body: PartCreateRequest
): Promise<ApiResponse<Part>> => {
  // Normalize unit_cost into Prisma.Decimal (handles string/number)
  const unitCost =
    body.unit_cost === null || body.unit_cost === undefined
      ? null
      : new Prisma.Decimal(body.unit_cost as any);

  const qty = body.quantity ?? null;

  const data: Prisma.partsCreateInput = {
    part_name: body.part_name,
    part_number: body.part_number,
    part_type: body.part_type,
    brand: body.brand,
    quantity: qty,
    unit_cost: unitCost,
    // ✅ compute server-side; do not take from client
    total_cost: computeTotalCost(qty, unitCost),

    supplier_name: body.supplier_name,
    purchase_date: body.purchase_date,
    under_warranty: body.under_warranty ?? false,
    warranty_expiration: body.warranty_expiration,
    created_by: body.created_by ?? "system",
    notes: body.notes,

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
  const hasQty = Object.prototype.hasOwnProperty.call(body, "quantity");
  const hasUnit = Object.prototype.hasOwnProperty.call(body, "unit_cost");

  // Build update payload
  const data: Prisma.partsUpdateInput = {
    part_name: body.part_name,
    part_number: body.part_number,
    part_type: body.part_type,
    brand: body.brand,
    quantity: body.quantity,
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

  // Normalize unit_cost if it was provided in the PATCH
  if (hasUnit) {
    data.unit_cost =
      body.unit_cost === null || body.unit_cost === undefined
        ? null
        : new Prisma.Decimal(body.unit_cost as any);
  }

  // ✅ Only recompute total_cost if quantity or unit_cost is being changed
  if (hasQty || hasUnit) {
    const current = await prisma.parts.findUnique({
      where: { part_id: id },
      select: { quantity: true, unit_cost: true },
    });
    if (!current) return { data: null as any, message: "Not found" };

    const nextQty = hasQty ? (body.quantity ?? null) : current.quantity;
    const nextUnit = hasUnit
      ? (data.unit_cost as Prisma.Decimal | null)
      : current.unit_cost;

    data.total_cost = computeTotalCost(nextQty, nextUnit);
  }

  const part = await prisma.parts.update({
    where: { part_id: id },
    data,
  });

  return { data: normalizeNullsToUndefined(part) as unknown as Part };
};


