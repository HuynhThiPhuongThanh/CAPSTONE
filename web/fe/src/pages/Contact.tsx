// src/pages/Contact.tsx
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout.tsx';
import Button from '../components/common/Button.tsx';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dữ liệu liên hệ:', formData);
    // Trong thực tế: Gửi dữ liệu này đến API backend
    alert('Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Liên Hệ Chúng Tôi</h1>
        <p className="text-center text-gray-600 mb-8">Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn.</p>

        <div className="bg-white p-8 rounded-xl shadow-lg border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Họ và Tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Nội dung</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              ></textarea>
            </div>
            <Button type="submit" variant="primary" className="w-full py-3">
              Gửi Liên Hệ
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;