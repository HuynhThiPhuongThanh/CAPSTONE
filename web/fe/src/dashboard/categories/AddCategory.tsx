// src/dashboard/categories/AddCategory.tsx
import React, { useState } from 'react';
import Button from '../../components/common/Button.tsx';
import { useNavigate } from 'react-router-dom';

const AddCategory: React.FC = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    // Tự động tạo slug (chỉ là giả lập, backend nên xử lý chính thức)
    const newSlug = newName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setSlug(newSlug);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const categoryData = { name, slug };
    console.log('Đang gửi dữ liệu danh mục mới (GỌI API):', categoryData);

    // Trong thực tế: GỌI API POST
    setTimeout(() => {
        setLoading(false);
        alert(`Danh mục "${name}" đã được thêm thành công!`);
        navigate('/admin/categories');
    }, 1000);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Thêm Danh mục Mới</h2>
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-gray-700 mb-1">Tên Danh mục</label>
            <input 
              type="text" 
              value={name} 
              onChange={handleNameChange} 
              className="w-full p-2 border rounded-lg" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Slug (URL thân thiện)</label>
            <input 
              type="text" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)} 
              className="w-full p-2 border rounded-lg bg-gray-50" 
              readOnly 
            />
            <p className="text-xs text-gray-500 mt-1">Ví dụ: sofa-ghe-cao-cap</p>
          </div>

          <Button type="submit" variant="primary" className="py-2 px-6" disabled={loading}>
            {loading ? 'Đang thêm...' : 'Lưu Danh mục'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;