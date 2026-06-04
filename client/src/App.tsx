import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "@/pages/signup-page";
import PublicRoute from "@/components/routes/public-route";
import AdminPage from "@/pages/admin-page";
import AuthRoute from "@/components/routes/auth-route";
import RoleRoute from "@/components/routes/role-route";
import DoctorPage from "@/pages/doctor-page";
import PatientPage from "@/pages/patient-page";
import LoginPage from "@/pages/login-page";
import Homepage from "./pages/home-page";
import HomeLayout from "./components/layouts/home-layout";
import { useAuthStore } from "./store/auth-store";
import AdminDashboardLayout from "./components/admin/admin-dashboard-layout";

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
        </Route>
        <Route element={<RoleRoute allowedRoles={["doctor"]} />}>
          <Route path="/doctor" element={<DoctorPage />} />
        </Route>
        <Route element={<RoleRoute allowedRoles={["patient"]} />}>
          <Route path="/patient" element={<PatientPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App