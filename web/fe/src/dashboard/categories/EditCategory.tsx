// src/dashboard/categories/EditCategory.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.tsx';

const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // --- LOGIC GỌI API: Lấy dữ liệu danh mục hiện tại ---
  useEffect(() => {
    setLoading(true);
    // Trong thực tế: GỌI API GET /categories/{id}
    setTimeout(() => {
      if (id === 'C01') {
        setName('Ghế Sofa Da Cao Cấp');
        setSlug('ghe-sofa-da-cao-cap');
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const updatedData = { id, name, slug };
    console.log('Đang cập nhật danh mục (GỌI API PUT/PATCH):', updatedData);

    // Trong thực tế: GỌI API PUT/PATCH
    setTimeout(() => {
        setIsSubmitting(false);
        alert(`Danh mục "${name}" đã được cập nhật thành công!`);
        navigate('/admin/categories');
    }, 1000);
  };

  if (loading) return <div className="p-6">Đang tải thông tin danh mục...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Sửa Danh mục: {id}</h2>
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-gray-700 mb-1">Tên Danh mục</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-2 border rounded-lg" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Slug</label>
            <input 
              type="text" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)} 
              className="w-full p-2 border rounded-lg bg-gray-50"
              required 
            />
          </div>

          <Button type="submit" variant="primary" className="py-2 px-6" disabled={isSubmitting}>
            {isSubmitting ? 'Đang lưu...' : 'Lưu Thay Đổi'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;