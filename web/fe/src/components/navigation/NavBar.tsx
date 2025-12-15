// src/components/navigation/NavBar.tsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../common/Logo.tsx';
import { useCart } from '../../context/CartContext.tsx'; // Giả sử đã tạo

const NavBar: React.FC = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Sản Phẩm', path: '/products' },
    { name: 'Giới Thiệu', path: '/about' },
    { name: 'Liên Hệ', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                isActive 
                  ? "text-amber-600 font-bold border-b-2 border-amber-600" 
                  : "text-gray-700 hover:text-amber-500 transition duration-150"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/wishlist" className="relative p-2 hover:text-amber-500">
            <span role="img" aria-label="Wishlist">🤍</span>
            {/* Giả sử có counter cho Wishlist */}
          </Link>
          
          <Link to="/cart" className="relative p-2 hover:text-amber-500">
            <span role="img" aria-label="Cart">🛒</span>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center -mt-1 -mr-1">
                {totalItems}
              </span>
            )}
          </Link>
          
          <Link to="/login" className="text-sm border rounded-full px-4 py-1.5 hover:bg-gray-100 transition">
            Đăng nhập
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;