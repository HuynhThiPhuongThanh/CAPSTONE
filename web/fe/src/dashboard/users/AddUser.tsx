// src/dashboard/users/AddUser.tsx
import React, { useState } from 'react';
import Button from '../../components/common/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types/user.ts';

const AddUser: React.FC = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    role: 'customer' as UserRole 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Đang gửi dữ liệu người dùng mới (GỌI API):', formData);

    // Trong thực tế: GỌI API POST
    setTimeout(() => {
        setLoading(false);
        alert(`Tài khoản "${formData.username}" đã được tạo thành công!`);
        navigate('/admin/users');
    }, 1000);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Thêm Người dùng Mới</h2>
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input type="text" name="username" placeholder="Tên đăng nhập" value={formData.username} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
          <input type="password" name="password" placeholder="Mật khẩu (Tạm thời)" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
          
          <div>
            <label className="block text-gray-700 mb-1">Quyền hạn</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3 border rounded-lg">
              <option value="customer">Customer (Khách hàng)</option>
              <option value="admin">Admin (Quản trị viên)</option>
            </select>
          </div>

          <Button type="submit" variant="primary" className="w-full py-3" disabled={loading}>
            {loading ? 'Đang tạo...' : 'Tạo Tài khoản'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;