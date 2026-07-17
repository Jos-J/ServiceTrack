//client/src/api/autos.api

import api from "./client";
import type { ApiResponse, Auto, AutoCreateRequest } from "../types"; // 

export async function fetchAutos() {
  const res = await api.get<ApiResponse<Auto[]>>("/autos");
  return res.data;
}

export async function createAuto(payload: AutoCreateRequest) {
  const res = await api.post<ApiResponse<Auto>>("/autos", payload);
  return res.data;
}

export async function fetchAutoById(id: number) {
  const res = await api.get<ApiResponse<Auto>>(`/autos/${id}`);
  return res.data;
}