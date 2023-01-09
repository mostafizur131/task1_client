import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-orange-600"></div>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivetRoutes;
