import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth === null) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (auth !== null && !auth.user.verified) {
    return <Navigate to="/verify" state={{ from: location }} replace />;
  }

  if (auth !== null && auth.accessToken === undefined) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
}