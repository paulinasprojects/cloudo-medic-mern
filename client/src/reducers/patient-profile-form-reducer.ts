import { PatientProfileFormData, PatientProfileFormAction } from "@/types/patient-profile-types";

export const initialFormState: PatientProfileFormData = {
  personalInfo: {
    address: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    bio: "",
  },
  medicalInfo: {
    bloodType: "",
    allergies: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
  }
};

export function patientProfileFormReducer(state: PatientProfileFormData, action: PatientProfileFormAction) {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          ...action.payload
        }
      };
    case "UPDATE_MEDICAL_INFO":
      return {
        ...state,
        medicalInfo: {
          ...state.medicalInfo,
          ...action.payload
        }
      };
    case "RESET_FORM":
      return initialFormState;
    default:
      return state;    
  }
};