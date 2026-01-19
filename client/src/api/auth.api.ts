// client/src/api/auth.api.ts
import api from "./client";
import type { ApiResponse } from "../types";

export type LoginResponse = ApiResponse<{
  token: string;
  user: { user_id: number; email: string };
}>;

export async function login(email: string, password: string) {
  const res = await api.post<LoginResponse>("/auth/login", { email, password });
  return res.data;
}

export type RegisterResponse = ApiResponse<{ user_id: number; email: string }>;

export async function register(payload: { email: string; password: string }) {
  const res = await api.post<RegisterResponse>("/auth/register", payload);
  return res.data;
}


