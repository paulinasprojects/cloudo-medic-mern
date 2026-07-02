import { EditPatientRequest } from "@/types/patient-types"
import { ApiResponse, Patient } from "@/types/types"
import api from "./api"

export const EditPatientByPatient = async (data: EditPatientRequest) => {
  const response = await api.patch<ApiResponse<Patient>>("/patient/profile", data);
  return response.data;
}