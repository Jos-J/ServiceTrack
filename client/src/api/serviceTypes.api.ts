// client/src/api/serviceTypes.api.ts
import api from "./client";
import type { ApiResponse, ServiceType, ServiceTypeCreateRequest } from "../types";

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

export async function fetchServiceTypeById(id: number) {
  const res = await api.get<ApiResponse<ServiceType>>(`/service-types/${id}`);
  return res.data;
}

export async function createServiceType(payload: ServiceTypeCreateRequest & { createdby: string }) {
  const res = await api.post<ApiResponse<ServiceType>>("/service-types", payload);
  return res.data;
}

export async function updateServiceType(
  id: number,
  payload: Partial<Pick<ServiceTypeCreateRequest, "servicename" | "servicecategory" | "description" | "isactive">>
) {
  const res = await api.put<ApiResponse<ServiceType>>(`/service-types/${id}`, payload);
  return res.data;
}

export async function deactivateServiceType(id: number) {
  // your server uses DELETE as soft deactivate
  const res = await api.delete<ApiResponse<ServiceType>>(`/service-types/${id}`);
  return res.data;
}