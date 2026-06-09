import { Outlet } from "react-router-dom"
import { DoctorFormProgressIndicator } from "./doctor-form-progress-indicator"
import { DoctorProfileFormProvider } from "@/context/doctor-profile-form-context";

export const DoctorProfileFormLayout = () => {
  return (
    <main className="p-6 space-y-12 max-w-3xl mx-auto">
      <DoctorProfileFormProvider>
        <DoctorFormProgressIndicator />
        <Outlet />
      </DoctorProfileFormProvider>
    </main>
  )
}
