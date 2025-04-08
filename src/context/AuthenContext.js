import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/api";

const AuthenContext = createContext();

const AuthenProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái xác thực
  const [currentUser, setCurrentUser] = useState(null); // Người dùng hiện tại
  const [loginButton, setLoginButton] = useState(false)
  const navigate = useNavigate(); // Điều hướng
  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem("role");
    return savedRole ? savedRole : null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      console.log("CurUser: " + currentUser);
      
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // Hàm đăng nhập
  const login = (role) => {
    setRole(role);
  };

  // Hàm đăng xuất
  const logout = () => {
    setIsAuthenticated(false); // Đặt trạng thái xác thực về false
    setCurrentUser(null); // Xóa thông tin người dùng
    localStorage.removeItem("role");
    setLoginButton(false);
    navigate("/"); // Quay lại trang đăng nhập
  };

  return (
    <AuthenContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        setIsAuthenticated,
        setCurrentUser,
        loginButton, 
        setLoginButton
      }}
    >
      {children}
    </AuthenContext.Provider>
  );
};

export { AuthenContext, AuthenProvider };
