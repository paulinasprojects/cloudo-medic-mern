import { useAuthStore } from "@/store/auth-store";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace />;
};

export default AuthRoute;