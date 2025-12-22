// src/components/AuthRoute.tsx
import React, { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx'; // Giả định AuthContext đã tạo

interface AuthRouteProps {
  // Yêu cầu quyền admin?
  requiredRole?: 'admin'; 
}

const AuthRoute: React.FC<AuthRouteProps> = ({ requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    // Tạm thời hiển thị Spinner trong khi đang kiểm tra trạng thái đăng nhập
    return <div className="text-center py-20">Đang tải...</div>; 
  }

  if (!isAuthenticated) {
    // 1. Chưa đăng nhập -> Chuyển hướng đến trang Login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'admin' && user?.role !== 'admin') {
    // 2. Đã đăng nhập nhưng không có quyền admin -> Chuyển hướng đến trang 404/Home
    return <Navigate to="/" replace />; // Hoặc trang 404
  }

  // 3. Hợp lệ -> Cho phép truy cập vào component con
  return <Outlet />; 
};

export default AuthRoute;