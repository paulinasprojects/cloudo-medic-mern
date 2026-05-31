export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface UsersTypes {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = "doctor",
  PATIENT = "patient"
};


export interface AuthResponse {
  user: User;
  token: string;
}


export interface AuthResponse {
  user: User;
  token: string;
}

