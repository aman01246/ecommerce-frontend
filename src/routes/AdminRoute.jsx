import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  return user?.role === "ADMIN" || user?.role === "ROLE_ADMIN"
    ? children
    : <Navigate to="/" />;
}