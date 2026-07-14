import { SignupRequest } from "@/types/auth-types";
import { ApiResponse, Appointment, Doctor,Patient, Prescription, User, Vaccine, editAdminUserRequest } from "../types/types";
import api from "./api";

export const getAllUsers = async () => {
  const response = await api.get<ApiResponse<User[]>>("/admin/users");
  return response.data;
}

export const getAllDoctors = async () => {
  const response = await api.get<ApiResponse<Doctor[]>>("/admin/doctors");
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
  workPhoneNumber: string;
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

export const createPatient = async (data: {
  userId: string;
  address: string;
  phoneNumber: string;
  bio: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  allergies: string;
  medicalHistory: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
}) => {
  const response = await api.post<ApiResponse<Patient>>("/admin/patients", data);
  return response.data;
}

export const editPatientByAdmin = async (id: string, data: {
  userId: string;
  address: string;
  phoneNumber: string;
  bio: string;
  dateOfBirth: string;
  workPhoneNumber: string;
  gender: string;
  bloodType: string;
  allergies: string;
  medicalHistory: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
}) => {
  const response = await api.patch<ApiResponse<Patient>>(`/admin/patients/${id}`, data);
  return response.data;
}

export const deletePatientByAdmin = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/admin/patinets/${id}`)
  return response.data;
}

export const registerUserByAdmin = async (data: SignupRequest) => {
  const response = await api.post<ApiResponse<User>>("/admin/users", data);
  return response.data;
}

export const editUserByAdmin = async (id: string, data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await api.patch<ApiResponse<User>>(`/admin/users/${id}`, data);
  return response.data;
}

export const deleteUserByAdmin = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/admin/users/${id}`)
  return response.data;
}

export const editDoctorByAdmin = async (id: string, data: {
  userId: string;
  address: string;
  phoneNumber: string;
  workPhoneNumber: string;
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
  const response = await api.patch<ApiResponse<Doctor>>(`/admin/doctors/${id}`, data);
  return response.data;
}

export const deleteDoctorByAdmin = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/admin/doctors/${id}`)
  return response.data;
}

export const editAdminUser = async (data: editAdminUserRequest) => {
  const response = await api.patch<ApiResponse<User>>("/admin/users", data);
  return response.data;
}

export const createPrescription = async (data: {
  patientId: string;
  doctorId: string;
  medication: string | string[];
  dosage: string | string[] | null;
  instructions: string;
  startDate: string;
  endDate: string;
}) => {
  const response = await api.post<ApiResponse<Prescription>>("/admin/prescriptions", data);
  return response.data;
}

export const editPrescriptionByAdmins = async (id: string, data: {
  medication: string | string[];
  dosage: string | string[] | null;
  instructions: string;
  endDate: string;
}) => {
  const response = await api.patch<ApiResponse<Prescription>>(`/admin/prescriptions/${id}`, data);
  return response.data;
}

export const deletePrescriptionByAdmins = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/admin/prescriptions/${id}`);
  return response.data;
}

export const createAppointment = async (data: {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  status: string;
  notes: string;
}) => {
  const response = await api.post<ApiResponse<Appointment>>("/admin/appointments", data);
  return response.data;
}

export const editAppointmentByAdmins = async (id: string, data: {
  appointmentDate: string;
  status: string;
  notes: string;
}) => {
  const response = await api.patch<ApiResponse<Appointment>>(`/admin/appointments/${id}`, data);
  return response.data;
}

export const deleteAppointmentByAdmins = async (id: string) => {
  const response = await api.delete<ApiResponse<null>>(`/admin/appointments/${id}`);
  return response.data;
}

export const getAllVaccinesByAdmins = async () => {
  const response = await api.get<ApiResponse<Vaccine[]>>("/admin/vaccines");
  return response.data;
}