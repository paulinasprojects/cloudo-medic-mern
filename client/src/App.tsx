import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "@/pages/signup-page";
import PublicRoute from "@/components/routes/public-route";
import AdminPage from "@/pages/admin-page";
import AuthRoute from "@/components/routes/auth-route";
import RoleRoute from "@/components/routes/role-route";
import DoctorPage from "@/pages/doctor-page";
import PatientPage from "@/pages/patient-page";
import LoginPage from "@/pages/login-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>homepage</div>} />
      <Route element={<PublicRoute />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<AuthRoute />}>
        <Route element={<RoleRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route element={<RoleRoute allowedRoles={["doctor"]} />}>
          <Route path="/admin" element={<DoctorPage />} />
        </Route>
        <Route element={<RoleRoute allowedRoles={["patient"]} />}>
          <Route path="/admin" element={<PatientPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App