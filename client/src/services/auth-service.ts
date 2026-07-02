import { ApiResponse,AuthResponse, User } from "@/types/types";
import api from "./api";
import { EditUserRequest, LoginRequest, SignupRequest, UserImage } from "@/types/auth-types";

export const signup = async (data: SignupRequest) => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/signup", data);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", data);
  return response.data;
};

export const getUser = async () => {
  const response = await api.get<ApiResponse<User>>("/auth/user");
  return response.data;
}

export const editUser = async (data: EditUserRequest) => {
  const response = await api.patch<ApiResponse<User>>("/auth/user", data);
  return response.data;
}

export const uploadUserImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post<ApiResponse<UserImage>>("/auth/user/image", formData);
  return response.data;
}

export const deleteUserImage = async () => {
  const response = await api.delete<ApiResponse<null>>("/auth/user/image");
  return response.data;
}