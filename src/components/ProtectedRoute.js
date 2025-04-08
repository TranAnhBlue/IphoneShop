import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenContext } from "../context/AuthenContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, currentUser } = useContext(AuthenContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
  }

  if (currentUser && !allowedRoles.includes(currentUser.role)) {
    // Chuyển hướng nếu vai trò không được phép truy cập
    return <Navigate to="/" replace />;
  }

  return children; // Hiển thị nội dung được bảo vệ
};

export default ProtectedRoute;
