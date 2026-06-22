import { BloodTypes, Gender } from "./types";

export interface PatientProfileFormData {
  personalInfo: {
    userId?: string;
    address: string;
    dateOfBirth: string;
    gender: Gender | "" | string;
    phoneNumber: string;
    bio: string;
  },
  medicalInfo: {
    bloodType: BloodTypes | "" | string;
    medicalHistory?: string;
    emergencyContactNumber: string;
    emergencyContactName: string;
    allergies: string;
  }
}

export type PatientProfileFormAction =
| {
  type: "UPDATE_PERSONAL_INFO",
  payload: Partial<PatientProfileFormData["personalInfo"]>
}
| {
  type: "UPDATE_MEDICAL_INFO",
  payload: Partial<PatientProfileFormData["medicalInfo"]>
}
| {
  type: "RESET_FORM"
};