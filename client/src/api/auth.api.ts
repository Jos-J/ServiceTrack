//client/src/api/auth.api

import api from "./client";
import type { ApiResponse } from "../types";

type AuthUser = {
  user_id: number;
  email: string;
};

export async function login(email: string, password: string) {
  const res = await api.post<ApiResponse<{ user: AuthUser; token: string }>>(
    "/auth/login",
    { email, password }
  );
  return res.data;
}

export async function register(email: string, password: string) {
  const res = await api.post<ApiResponse<{ user: AuthUser; token: string }>>(
    "/auth/register",
    { email, password }
  );
  return res.data;
}
