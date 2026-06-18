import { ApiResponse, Appointment, Doctor, Doctors, Patient, Prescription, UsersTypes } from "../types/types";
import api from "./api";

export const getAllUsers = async () => {
  const response = await api.get<ApiResponse<UsersTypes[]>>("/admin/users");
  return response.data;
}

export const getAllDoctors = async () => {
  const response = await api.get<ApiResponse<Doctors[]>>("/admin/doctors");
  return response.data
}
export const getAllPatients = async () => {
  const response = await api.get<ApiResponse<Patient[]>>("/admin/patients");
  return response.data
}

export const getAllAppointments = async () => {
  const response = await api.get<ApiResponse<Appointment[]>>("/admin/appointments");
  return response.data;
}

export const getAllPrescriptions = async () => {
  const response = await api.get<ApiResponse<Prescription[]>>("/admin/prescriptions");
  return response.data;
}

export const createDoctor = async (data: {
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
}) => {
  const response = await api.post<ApiResponse<Doctor>>("/admin/doctors", data);
  return response.data;
}