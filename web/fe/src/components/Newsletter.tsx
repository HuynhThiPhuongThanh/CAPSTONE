import React, { useState } from 'react';
import Button from './common/Button.tsx';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    
    // Logic kiểm tra email cơ bản
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    
    console.log(`Đăng ký newsletter với email: ${email}`);
    // Trong thực tế: GỌI API POST /newsletter-subscribe
    
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="bg-amber-50 p-8 rounded-xl my-8 text-center shadow-inner">
      <h2 className="text-3xl font-bold mb-3 text-amber-800">Đăng Ký Nhận Tin</h2>
      <p className="text-gray-600 mb-6">
        Nhận những ưu đãi mới nhất và cập nhật về xu hướng nội thất ngay vào hộp thư của bạn!
      </p>

      <form onSubmit={handleSubmit} className="flex justify-center max-w-lg mx-auto">
        <input
          type="email"
          placeholder="Nhập địa chỉ email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-r-0 rounded-l-lg flex-grow focus:ring-amber-500 focus:border-amber-500"
          required
        />
        <Button type="submit" variant="primary" className="rounded-l-none px-6">
          Đăng ký
        </Button>
      </form>

      {status === 'success' && (
        <p className="text-green-600 mt-3 font-medium">Cảm ơn bạn đã đăng ký!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 mt-3 font-medium">Vui lòng nhập địa chỉ email hợp lệ.</p>
      )}
    </div>
  );
};

export default Newsletter;