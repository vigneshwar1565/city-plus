import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  useEffect(() => {
    console.log("ProtectedRoute component mounted");
  }, []);
  if (!isAuthenticated()) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
