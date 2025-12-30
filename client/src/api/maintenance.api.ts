// client/src/api/maintenance.api.ts
import api from "./client";
import type {
  ApiResponse,
  VehicleMaintenanceNested,
  VehicleMaintenanceCreateRequest,
} from "../types";

// If your api baseURL already points to http://localhost:3000/api
// then these paths are correct.
export async function fetchMaintenance(vehicleId?: number) {
  const url =
    typeof vehicleId === "number"
      ? `/maintenance?vehicle_id=${vehicleId}`
      : "/maintenance";

  const res = await api.get<ApiResponse<VehicleMaintenanceNested[]>>(url);
  return res.data;
}

export async function createMaintenance(payload: VehicleMaintenanceCreateRequest) {
  const res = await api.post<ApiResponse<VehicleMaintenanceNested>>(
    "/maintenance",
    payload
  );
  return res.data;
}

export type VehicleMaintenanceUpdateRequest = Partial<
  Pick<
    VehicleMaintenanceCreateRequest,
    "mainttype" | "status" | "odometerreading" | "description"
  >
>;

export async function updateMaintenance(id: number, body: VehicleMaintenanceUpdateRequest) {
  const res = await api.patch<ApiResponse<VehicleMaintenanceNested>>(
    `/maintenance/${id}`,
    body
  );
  return res.data;
}

export async function deleteMaintenance(id: number) {
  const res = await api.delete<ApiResponse<{ id: number }>>(`/maintenance/${id}`);
  return res.data;
}

