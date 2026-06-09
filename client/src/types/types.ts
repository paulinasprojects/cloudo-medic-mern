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

export interface Doctors {
  id: string;
  userId: string;
  address: string;
  phoneNumber: string;
  bio: string;
  dateOfBirth: string;
  education: string;
  doctorLevel: string;
  gender: string;
  specialization: string;
  hospital: string;
  licenseNumber: string;
  consultationFee: number;
  yearsOfExperience: number;
  createdAt: string;
  updatedAt: string;
  user: User; 
}
export interface Doctor {
  id: string;
  userId: string;
  address: string;
  phoneNumber: string;
  bio: string;
  dateOfBirth: string;
  education: string;
  doctorLevel: string;
  gender: string;
  specialization: string;
  hospital: string;
  licenseNumber: string;
  consultationFee: number;
  yearsOfExperience: number;
  createdAt: string;
  updatedAt: string;
  user: User; 
}

export interface Patient {
    id: string;
  userId: string;
  address: string;
  phoneNumber: string;
  bio: string;
  dateOfBirth: string;
    gender: string;
  bloodType: string;
  emergencyContactNumber: string;
  emergencyContactName: string;
  allergies: string;
  medicalHistory: string;
  createdAt: string;
  updatedAt: string;
  user: User; 
}