import { EditDoctorRequest } from "@/types/doctor-types";
import { ApiResponse, Doctor } from "@/types/types";
import api from "./api";

export const EditDoctorByDoctor = async (data: EditDoctorRequest) => {
  const response = await api.patch<ApiResponse<Doctor>>("/doctor/profile", data);
  return response.data;
}