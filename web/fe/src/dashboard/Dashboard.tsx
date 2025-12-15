// src/dashboard/Dashboard.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import Stats from '../components/dashboard/Stats.tsx'; // Component thống kê
import OrdersChart from '../components/dashboard/OrdersChart.tsx'; // Component biểu đồ

// Giả định dữ liệu thanh điều hướng bên trong DashboardLayout
const adminNavItems = [
  { name: 'Tổng quan', path: '/admin', icon: '🏠' },
  { name: 'Sản phẩm', path: '/admin/products', icon: '🛋️' },
  { name: 'Đơn hàng', path: '/admin/orders', icon: '📦' },
  { name: 'Danh mục', path: '/admin/categories', icon: '🏷️' },
  { name: 'Người dùng', path: '/admin/users', icon: '👥' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Tổng quan Quản trị</h1>
      
      {/* 1. Thanh Thống kê Nhanh */}
      <Stats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        
        {/* 2. Biểu đồ Đơn hàng */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Doanh số & Đơn hàng (30 ngày)</h2>
          <OrdersChart /> {/* Component giả lập biểu đồ */}
        </div>

        {/* 3. Truy cập Nhanh */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3">Truy cập Nhanh</h2>
          <nav className="space-y-3">
            {adminNavItems.filter(item => item.path !== '/admin').map(item => (
              <NavLink
                key={item.name}
                to={item.path}
                className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-amber-100 transition duration-150"
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span className="font-medium text-gray-700">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Thêm các phần khác như Đơn hàng gần đây, Hàng tồn kho sắp hết... */}
    </div>
  );
};

export default Dashboard;