import { Outlet } from "react-router-dom"
import { PatientProfileFormProvider } from "@/context/patient-profile-form-context"
import { PatientFormProgressIndicator } from "./patient-form-progress-indicatior"
import OuterNavbar from "../common/outer-navbar"

export const PatientProfileFormLayout = () => {
  return (
    <main>
      <PatientProfileFormProvider>
        <OuterNavbar />
        <div className="p-6 space-y-12 max-w-3xl mx-auto">
          <PatientFormProgressIndicator />
          <Outlet />
        </div>
      </PatientProfileFormProvider>
    </main>
  )
}
