// src/dashboard/categories/Categories.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button.tsx';

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

const mockCategories: Category[] = [
  { id: 'C01', name: 'Sofa & Ghế', slug: 'sofa-ghe', productCount: 45 },
  { id: 'C02', name: 'Bàn Ăn', slug: 'ban-an', productCount: 22 },
  { id: 'C03', name: 'Tủ & Kệ', slug: 'tu-ke', productCount: 30 },
];

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  // Trong thực tế, bạn sẽ dùng useEffect để fetch categories từ backend

  const handleDelete = (id: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục ${id}?`)) {
      console.log(`Đang xóa danh mục ${id} (GỌI API)`);
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý Danh mục Sản phẩm</h2>
        <Link to="/admin/categories/add">
          <Button variant="primary">➕ Thêm Danh mục Mới</Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Danh mục</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng SP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.productCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/admin/categories/edit/${category.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Sửa</Link>
                  <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;