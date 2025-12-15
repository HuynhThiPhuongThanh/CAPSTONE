// src/pages/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.tsx';
import Button from '../components/common/Button.tsx';
import { useAuth } from '../context/AuthContext.tsx'; // Giả định đã tạo

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // --- LOGIC PHÍA FRONTEND (Chỉ xử lý input, sau đó gọi backend) ---
    if (!email || !password) {
      setError('Vui lòng nhập email và mật khẩu.');
      return;
    }

    try {
      // Trong thực tế, hàm login sẽ gọi API: 
      // await api.post('/auth/login', { email, password });
      
      // Giả lập đăng nhập thành công (Dữ liệu này sẽ đến từ API thật)
      login({ id: '1', username: 'Test User', email, role: 'customer' }); 
      
      navigate('/'); // Chuyển hướng về trang chủ
    } catch (err: any) {
      // Xử lý lỗi từ backend
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto my-10 p-8 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Đăng Nhập</h2>
        
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4 text-center border p-2 bg-red-50">{error}</p>}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              placeholder="nhap@emailcuaban.com"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              placeholder="********"
              required
            />
          </div>
          
          <Button type="submit" variant="primary" className="w-full py-3">
            Đăng Nhập
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-sm text-amber-600 hover:text-amber-800">
            Quên mật khẩu?
          </Link>
        </div>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="font-medium text-amber-600 hover:text-amber-800">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </MainLayout>
  );
};

export default Login;