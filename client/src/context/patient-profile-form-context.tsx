/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { patientProfileFormReducer, initialFormState } from "@/reducers/patient-profile-form-reducer";
import { PatientProfileFormAction, PatientProfileFormData } from "@/types/patient-profile-types";

interface PatientProfileContextType {
  state: PatientProfileFormData;
  dispatch: React.Dispatch<PatientProfileFormAction>;
}

const PatientFormContext = createContext<PatientProfileContextType | undefined>(undefined);

export function PatientProfileFormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(patientProfileFormReducer, initialFormState);

  return (
    <PatientFormContext.Provider value={{ state, dispatch }}>
      {children}
    </PatientFormContext.Provider>
  )
}

export function usePatientProfileFormContext() {
  const context = useContext(PatientFormContext);

  if (!context) {
    throw new Error("Something went wrong. Please try again")
  }

  return context;
};