import { Outlet } from "react-router-dom"
import { PatientProfileFormProvider } from "@/context/patient-profile-form-context"
import { PatientFormProgressIndicator } from "./patient-form-progress-indicatior"

export const PatientProfileFormLayout = () => {
  return (
    <main className="p-6 space-y-12 max-w-3xl mx-auto">
      <PatientProfileFormProvider>
        <PatientFormProgressIndicator />
        <Outlet />
      </PatientProfileFormProvider>
    </main>
  )
}
