import { Outlet } from "react-router-dom"
import { DoctorFormProgressIndicator } from "./doctor-form-progress-indicator"
import { DoctorProfileFormProvider } from "@/context/doctor-profile-form-context";
import OuterNavbar from "@/components/common/outer-navbar";

export const DoctorProfileFormLayout = () => {
  return (
    <main>
      <DoctorProfileFormProvider>
        <OuterNavbar />
        <div className="p-6 space-y-12 max-w-3xl mx-auto">
          <DoctorFormProgressIndicator />
          <Outlet />
        </div>
      </DoctorProfileFormProvider>
    </main>
  )
}
