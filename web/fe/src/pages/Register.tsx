// src/pages/Register.tsx
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout.tsx';
import Button from '../components/common/Button.tsx';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    // --- LOGIC PHÍA FRONTEND: Chuẩn bị dữ liệu ---
    console.log('Dữ liệu đăng ký:', formData);

    // Trong thực tế: GỌI API ĐẾN BACKEND ĐỂ TẠO TÀI KHOẢN
    try {
      // await api.post('/auth/register', formData);
      alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto my-10 p-8 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Đăng Ký Tài Khoản</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 mb-4 text-center border p-2 bg-red-50">{error}</p>}
          
          <input
            type="text"
            name="username"
            placeholder="Tên người dùng"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận Mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          
          <Button type="submit" variant="primary" className="w-full py-3">
            Tạo Tài Khoản
          </Button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link to="/login" className="font-medium text-amber-600 hover:text-amber-800">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </MainLayout>
  );
};

export default Register;