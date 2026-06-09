export interface DoctorProfileFormData {
  personalInfo: {
    address: string;
    dateOfBirth: string;
    gender: "male" | "female";
    phoneNumber: string;
    bio: string;
  },
  workInfo: {
    education: "undergraduate" | "primary" | "graduate";
    specialization: string;
    hospital: string;
    doctorLevel: "intern" | "resident" | "fellow" | "attending";
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