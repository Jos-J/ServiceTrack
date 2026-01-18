// client/src/api/parts.api.ts
import api from "./client";
import type { ApiResponse, Part, PartCreateRequest, PartUpdateRequest, PartNested } from "../types";

// GET /api/parts (protected; returns only your parts now)
export async function fetchParts() {
  const res = await api.get<ApiResponse<PartNested[]>>("/parts");
  return res.data;
}

// POST /api/parts (maintenance_id REQUIRED)
export async function createPart(payload: PartCreateRequest) {
  // payload must include maintenance_id
  const res = await api.post<ApiResponse<Part>>("/parts", payload);
  return res.data;
}

// PATCH /api/parts/:id (no maintenance_id allowed in update)
export async function updatePart(id: number, body: PartUpdateRequest) {
  const res = await api.patch<ApiResponse<Part>>(`/parts/${id}`, body);
  return res.data;
}

// DELETE /api/parts/:id
export async function deletePart(id: number) {
  const res = await api.delete<ApiResponse<{ id: number }>>(`/parts/${id}`);
  return res.data;
}
