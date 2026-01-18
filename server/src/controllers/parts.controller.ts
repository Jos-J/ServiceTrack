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

// ✅ Ownership scope helper: part belongs to a maintenance that belongs to a vehicle that belongs to user
const partBelongsToUser = async (userId: number, partId: number) => {
  return prisma.parts.findFirst({
    where: {
      part_id: partId,
      vehiclemaintenance: {
        auto: { owner_id: userId },
      },
    },
    select: {
      part_id: true,
      quantity: true,
      unit_cost: true,
    },
  });
};

// ✅ GET /api/parts (only your parts)
export const getParts = async (userId: number): Promise<ApiResponse<PartNested[]>> => {
  const parts = await prisma.parts.findMany({
    where: {
      vehiclemaintenance: {
        auto: { owner_id: userId },
      },
    },
    include: { vehiclemaintenance: true },
    orderBy: { created_date: "desc" },
  });

  return { data: normalizeNullsToUndefined(parts) as unknown as PartNested[] };
};

// ✅ POST /api/parts (must attach to your maintenance)
export const createPart = async (
  userId: number,
  body: PartCreateRequest
): Promise<ApiResponse<Part>> => {
  // Require maintenance_id for secure linkage (recommended)
  if (!body.maintenance_id) {
    return { data: null as any, message: "maintenance_id is required" };
  }

  // Ownership check: maintenance must belong to user
  const ownedMaintenance = await prisma.vehiclemaintenance.findFirst({
    where: {
      maintenance_id: body.maintenance_id,
      auto: { owner_id: userId },
    },
    select: { maintenance_id: true },
  });

  // Option A: hide existence
  if (!ownedMaintenance) {
    return { data: null as any, message: "Not found" };
  }

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

    // ✅ compute server-side; do not accept from client
    total_cost: computeTotalCost(qty, unitCost),

    supplier_name: body.supplier_name,
    purchase_date: body.purchase_date,
    under_warranty: body.under_warranty ?? false,
    warranty_expiration: body.warranty_expiration,
    created_by: body.created_by ?? "system",
    notes: body.notes,

    vehiclemaintenance: { connect: { maintenance_id: body.maintenance_id } },
  };

  const part = await prisma.parts.create({ data });
  return { data: normalizeNullsToUndefined(part) as unknown as Part };
};

// ✅ PATCH /api/parts/:id (only your part)
export const updatePart = async (
  userId: number,
  id: number,
  body: PartUpdateRequest
): Promise<ApiResponse<Part | null>> => {
  // Option A: only consider parts owned by user
  const existing = await partBelongsToUser(userId, id);
  if (!existing) return { data: null, message: "Not found" };

  const hasQty = Object.prototype.hasOwnProperty.call(body, "quantity");
  const hasUnit = Object.prototype.hasOwnProperty.call(body, "unit_cost");

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
  };

  // IMPORTANT: prevent re-linking a part to another maintenance via PATCH
  // (If you want to support this later, we can add an ownership-checked move.)
  // So we intentionally DO NOT allow maintenance_id updates here.

  if (hasUnit) {
    data.unit_cost =
      body.unit_cost === null || body.unit_cost === undefined
        ? null
        : new Prisma.Decimal(body.unit_cost as any);
  }

  // Recompute total_cost only when qty or unit changes
  if (hasQty || hasUnit) {
    const nextQty = hasQty ? (body.quantity ?? null) : existing.quantity;

    const nextUnit = hasUnit
      ? (data.unit_cost as Prisma.Decimal | null)
      : existing.unit_cost;

    data.total_cost = computeTotalCost(nextQty, nextUnit);
  }

  const part = await prisma.parts.update({
    where: { part_id: id },
    data,
  });

  return { data: normalizeNullsToUndefined(part) as unknown as Part };
};

// ✅ DELETE /api/parts/:id (only your part)
export const deletePart = async (
  userId: number,
  id: number
): Promise<ApiResponse<{ id: number }>> => {
  const existing = await partBelongsToUser(userId, id);
  if (!existing) return { data: { id }, message: "Not found" };

  await prisma.parts.delete({ where: { part_id: id } });
  return { data: { id } };
};



