import { ApiResponse, Doctor, Patient } from "@/types/types";
import api from "./api";

export const getDoctorProfile = async () => {
  const response = await api.get<ApiResponse<Doctor>>("/doctor/profile");
  return response.data;
};

export const getPatientProfile = async () => {
  const response = await api.get<ApiResponse<Patient>>("/patient/profile");
  return response.data;
};

export const createDoctor = async (data: {
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
}) => {
  const response = await api.post<ApiResponse<Doctor>>("/doctor/profile", data);
  return response.data;
}
export const createPatient = async (data: {
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
}) => {
  const response = await api.post<ApiResponse<Patient>>("/patient/profile", data);
  return response.data;
}