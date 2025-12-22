// src/components/navigation/AdminSidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';


const adminNavItems = [
  { name: 'Tổng quan', path: '/admin', icon: '🏠' },
  { name: 'Sản phẩm', path: '/admin/products', icon: '🛋️' },
  { name: 'Đơn hàng', path: '/admin/orders', icon: '📦' },
  { name: 'Danh mục', path: '/admin/categories', icon: '🏷️' },
  { name: 'Người dùng', path: '/admin/users', icon: '👥' },
];

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 flex flex-col bg-gray-800 text-white h-full fixed top-0 left-0 z-20">
      {/* Logo/Tiêu đề Dashboard */}
      <div className="p-4 border-b border-gray-700">
        <Logo theme="light" />
        <h1 className="text-xl font-bold mt-2">Admin Panel</h1>
      </div>

      {/* Danh sách điều hướng */}
      <nav className="flex-grow p-4 space-y-2">
        {adminNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            // Sử dụng end: true cho path '/' để tránh active nhầm
            end={item.path === '/admin'} 
            className={({ isActive }) => 
              isActive 
                ? "flex items-center p-3 rounded-lg bg-amber-600 font-semibold" 
                : "flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-150"
            }
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer nhỏ */}
      <div className="p-4 text-xs text-gray-500 border-t border-gray-700">
        © 2025 FurniShop Dashboard
      </div>
    </div>
  );
};

export default Sidebar;