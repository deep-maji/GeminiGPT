import { createContext } from "react";
import axios from "axios";
import httpStatus from "http-status";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const api = axios.create({
  baseURL: import.meta.env.VITE_API_LOCALHOST_URL,
  // baseURL : import.meta.env.VITE_API_PRODUCTION_URL
});

export function AuthProvider({ children }) {
  const route = useNavigate();
  const handleLogin = async (email, password) => {
    try {
      const response = await api.post("/api/v1/user/login", {
        email,
        password,
      });

      if (response.status === httpStatus.OK) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("exp", Date.now() + 3600000);
        route("/chats");
      }

      return response;
    } catch (error) {
      throw error;
    }
  };
  const data = {
    handleLogin,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
