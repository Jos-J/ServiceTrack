import api from "./client";
import type { ApiResponse } from "../types";

export type MaintenanceMeta = {
  maintTypes: string[];
  statuses: string[];
};

export async function fetchMaintenanceMeta() {
  const res = await api.get<ApiResponse<MaintenanceMeta>>("/meta/maintenance");
  return res.data;
}
