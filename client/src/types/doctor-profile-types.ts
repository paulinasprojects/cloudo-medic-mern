import { DoctorLevel, Education, Gender } from "./types";

export interface DoctorProfileFormData {
  personalInfo: {
    address: string;
    dateOfBirth: string;
    gender: Gender | "";
    phoneNumber: string;
    bio: string;
  },
  workInfo: {
    education: Education | "";
    specialization: string;
    hospital: string;
    doctorLevel: DoctorLevel | "";
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