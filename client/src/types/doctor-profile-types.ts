import { DoctorLevel, Education, Gender } from "./types";

export interface DoctorProfileFormData {
  personalInfo: {
    userId?: string;
    address: string;
    dateOfBirth: string;
    gender: Gender | "" | string;
    phoneNumber: string;
    bio: string;
  },
  workInfo: {
    education: Education | "" | string;
    specialization: string;
    hospital: string;
    doctorLevel: DoctorLevel | "" | string;
    licenseNumber: string;
    consultationFee: number | string;
    yearsOfExperience: number | string;
  }
}


export type DoctorProfileFormAction = 
| {
  type: "UPDATE_PERSONAL_INFO",
  payload: Partial<DoctorProfileFormData["personalInfo"]>
}
| {
  type: "UPDATE_WORK_INFO",
  payload: Partial<DoctorProfileFormData["workInfo"]>;
}
| {
  type: "RESET_FORM";
};