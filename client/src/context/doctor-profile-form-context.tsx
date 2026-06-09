/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { doctorProfileFormReducer, initialFormState } from "@/reducers/doctor-profile-form-reducer";
import { DoctorProfileFormAction, DoctorProfileFormData } from "@/types/doctor-profile-types";


interface DoctorProfileContextType {
  state: DoctorProfileFormData;
  dispatch: React.Dispatch<DoctorProfileFormAction>;
}

const DoctorFormContext = createContext<DoctorProfileContextType | undefined>(undefined);


export function DoctorProfileFormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(doctorProfileFormReducer, initialFormState);

  return (
    <DoctorFormContext.Provider value={{ state, dispatch }}>
      {children}
    </DoctorFormContext.Provider>
  )
}

export function useDoctorProfileFormContext() {
  const context = useContext(DoctorFormContext);

  if (!context) {
    throw new Error("Something went wrong. Please try again")
  }

  return context;
}