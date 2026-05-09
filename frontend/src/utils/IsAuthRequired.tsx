import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function IsAuthRequired() {
  const { auth } = useAuth();

  if (auth !== null) {
    return <Navigate to="/c"></Navigate>
  }

  return <Outlet></Outlet>
}