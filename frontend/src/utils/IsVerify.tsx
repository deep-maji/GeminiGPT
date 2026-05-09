import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function IsVerify() {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth === null) {
    return <Navigate to="/auth" state={{ from: location }} replace></Navigate>
  }

  if (auth !== null && auth.user.verified) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
  }

  return <Outlet></Outlet>
}