export interface PatientProfileFormData {
  personalInfo: {
    address: string;
    dateOfBirth: string;
    gender: "male" | "female";
    phoneNumber: string;
    bio: string;
  },
  medicalInfo: {
    bloodType: "O+" | "O-" | "A+" | "A-" | "B+" | "AB+" | "AB-";
    emergencyContactNumber: string;
    emergencyContactName: string;
    allergies: string;
    medicalHistory: string;
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