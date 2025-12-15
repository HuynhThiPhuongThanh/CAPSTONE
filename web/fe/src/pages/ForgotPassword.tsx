// src/pages/ForgotPassword.tsx
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout.tsx';
import Button from '../components/common/Button.tsx';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Vui lòng nhập địa chỉ email.');
      return;
    }

    // --- LOGIC GỌI API: Yêu cầu đặt lại mật khẩu ---
    console.log(`Yêu cầu đặt lại mật khẩu cho email: ${email}`);
    
    // Giả lập phản hồi từ backend
    setTimeout(() => {
      setMessage('Yêu cầu đã được gửi. Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.');
      setEmail('');
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto my-10 p-8 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Quên Mật Khẩu?</h2>
        <p className="text-center text-gray-600 mb-6">
          Nhập địa chỉ email của bạn. Chúng tôi sẽ gửi một liên kết để bạn đặt lại mật khẩu.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {message && <p className="text-green-600 mb-4 text-center border p-2 bg-green-50 rounded-lg">{message}</p>}
          {error && <p className="text-red-500 mb-4 text-center border p-2 bg-red-50 rounded-lg">{error}</p>}

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="nhap@emailcuaban.com"
              required
            />
          </div>
          
          <Button type="submit" variant="primary" className="w-full py-3">
            Gửi Yêu Cầu
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-amber-600 hover:text-amber-800">
            Quay lại Đăng nhập
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;