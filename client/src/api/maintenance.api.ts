//client/src/api/maintenance
import api from "./client";
import type {
  ApiResponse,
  VehicleMaintenanceNested,
  VehicleMaintenanceCreateRequest,
} from "../types";

export async function fetchMaintenance() {
  const res = await api.get<ApiResponse<VehicleMaintenanceNested[]>>("/maintenance");
  return res.data;
}

export async function createMaintenance(payload: VehicleMaintenanceCreateRequest) {
  const res = await api.post<ApiResponse<VehicleMaintenanceNested>>("/maintenance", payload);
  return res.data;
}
