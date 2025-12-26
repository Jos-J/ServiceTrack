import api from "./client";
import type { ApiResponse, Auto } from "../types"; // adjust path to your shared types

export async function fetchAutos() {
  const res = await api.get<ApiResponse<Auto[]>>("/autos");
  return res.data;
}
