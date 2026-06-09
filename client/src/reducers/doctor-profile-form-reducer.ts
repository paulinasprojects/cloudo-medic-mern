import { DoctorProfileFormData, DoctorProfileFormAction } from "@/types/doctor-profile-types";

export const initialFormState: DoctorProfileFormData = {
  personalInfo: {
    address:"",
    dateOfBirth: "",
    gender: "male",
    phoneNumber: "",
    bio: "",
  },
  workInfo: {
    education: "undergraduate",
    specialization: "",
    hospital: "",
    doctorLevel: "intern",
    licenseNumber: "",
    consultationFee: 0,
    yearsOfExperience: 0,
  }
}

export function doctorProfileFormReducer(state: DoctorProfileFormData, action: DoctorProfileFormAction) {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          ...action.payload,
        }
      };
      case "UPDATE_WORK_INFO":
        return {
          ...state,
          workInfo: {
            ...state.workInfo,
            ...action.payload
          }
        };
      case "RESET_FORM":
        return initialFormState;
      default:
        return state;    
  }
}