import { ApiResponse,AuthResponse } from "@/types/types";
import api from "./api";
import { LoginRequest, SignupRequest } from "@/types/auth-types";

export const signup = async (data: SignupRequest) => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/signup", data);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", data);
  return response.data;
};