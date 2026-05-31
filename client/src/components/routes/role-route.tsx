import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";

interface RoleRouteProps {
  allowedRoles: string[];
}

const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { user, isAuthenticated, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;