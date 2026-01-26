// client/src/api/serviceTypes.api.ts
import api from "./client";
import type { ApiResponse, ServiceType } from "../types";

export async function fetchServiceTypes(active?: boolean) {
  const params = active === undefined ? undefined : { active };
  const res = await api.get<ApiResponse<ServiceType[]>>("/service-types", {
    params,
  });
  return res.data;
}

export async function fetchActiveServiceTypes() {
  return fetchServiceTypes(true);
}

