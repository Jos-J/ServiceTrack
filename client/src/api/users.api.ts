import api from "./client";
import type { ApiResponse } from "../types";


export type UserMe = {
    user_id: number;
    first_name?: string | null;
    last_name?: string | null;
    phone_number?: string | null;
    email: string;
    mechanic_rating?: string | null;
    created_at?: string;
    updated_at?: string;
};

export type UsersMeResponse = ApiResponse<UserMe>;
export async function getMyUserProfile() {
  const res = await api.get<UsersMeResponse>("/users/me");
  return res.data;
}

export type UpdateMePayload = Partial<Pick<
  UserMe,
  "first_name" | "last_name" | "phone_number" | "email" | "mechanic_rating"
>>;
export type UpdateMeResponse = ApiResponse<UserMe>;

export async function updateMyUserProfile(payload: UpdateMePayload) {
  const res = await api.put<UpdateMeResponse>("/users/me", payload);
  return res.data;
}