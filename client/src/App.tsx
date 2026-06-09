import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import SignupPage from "@/pages/signup-page";
import PublicRoute from "@/components/routes/public-route";
import AdminPage from "@/pages/admin-page";
import AuthRoute from "@/components/routes/auth-route";
import RoleRoute from "@/components/routes/role-route";
import DoctorPage from "@/pages/doctor-page";
import PatientPage from "@/pages/patient-page";
import LoginPage from "@/pages/login-page";
import Homepage from "@/pages/home-page";
import HomeLayout from "@/components/layouts/home-layout";
import AdminDoctorsPage from "@/pages/admin-doctors-page";
import AdminDashboardLayout from "@/components/admin/admin-dashboard-layout";
import DoctoProfilePage from "@/pages/doctor-profile-page";
import PatientProfilePage from "@/pages/patient-profile-page";
import { DoctorProfileFormLayout } from "@/components/doctor/doctor-profile-form/doctor-profile-form-layout";
import DoctorPersonalInfoPage from "@/pages/doctor-profile-form/doctor-personal-info-page";
import DoctorWorkInfoPage from "@/pages/doctor-profile-form/doctor-work-info-page";
import DoctorSubmitInfoPage from "./pages/doctor-profile-form/doctor-submit-info-page";
import DoctorProfileGuard from "./guards/doctor-profile-guard";
import DoctorProfileEdit from "./pages/doctor-edit-profile";

function App() {
  const { isAuthenticated, getUser } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomeLayout><Homepage /></HomeLayout>} />
      <Route element={<PublicRoute />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<AuthRoute />}>
        <Route element={<RoleRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboardLayout><AdminPage /></AdminDashboardLayout>} />
          <Route path="/admin/doctors" element={<AdminDashboardLayout><AdminDoctorsPage /></AdminDashboardLayout>} />
        </Route>
        <Route element={<RoleRoute allowedRoles={["doctor"]} />}>
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/doctor/profile" element={<DoctoProfilePage />} />
          <Route path="/doctor/profile/edit" element={<DoctorProfileEdit />} />
          <Route element={<DoctorProfileGuard />}>
            <Route element={<DoctorProfileFormLayout />}>
              <Route path="/doctor/profile/personal-info" element={<DoctorPersonalInfoPage />} />
              <Route path="/doctor/profile/work-info" element={<DoctorWorkInfoPage />} />
              <Route path="/doctor/profile/submit-info" element={<DoctorSubmitInfoPage />} />
            </Route>
          </Route>
        </Route>
        <Route element={<RoleRoute allowedRoles={["patient"]} />}>
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/patient/profile" element={<PatientProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App