// src/pages/Products.tsx
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout.tsx';
import ProductsList from '../components/product/ProductsList.tsx'; // Component danh sách
import Sidebar from '../components/navigation/Sidebar.tsx'; // Component bộ lọc/Sidebar

// Dữ liệu sản phẩm giả lập
const mockProducts = [
  // ... (Sản phẩm giả lập như trong ProductDetails)
  { id: '1', name: 'Ghế Sofa Da Cao Cấp Nordic', description: '...', price: 18500000, category: 'Sofa', stock: 15, imageUrl: '/assets/sofa-nordic.jpg', rating: 4.8 },
  { id: '2', name: 'Bàn Ăn Gỗ Sồi 6 Ghế', description: '...', price: 12000000, category: 'Bàn & Ghế', stock: 10, imageUrl: '/assets/table.jpg', rating: 4.5 },
  { id: '3', name: 'Đèn Trang Trí Đứng Tối Giản', description: '...', price: 2500000, category: 'Đèn', stock: 25, imageUrl: '/assets/lamp.jpg', rating: 4.9 },
  // Thêm nhiều sản phẩm khác...
];

const Products: React.FC = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('price-desc');
  // Trong thực tế, bạn sẽ cần state cho `loading` và `error`

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Trong thực tế, gọi lại API để fetch dữ liệu mới
  };

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Khám phá Nội thất</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Cột 1: Sidebar (Bộ lọc & Danh mục) */}
        <aside className="lg:col-span-1">
          <Sidebar onFilterChange={handleFilterChange} />
        </aside>

        {/* Cột 2-4: Danh sách Sản phẩm */}
        <div className="lg:col-span-3">
          {/* Thanh sắp xếp */}
          <div className="flex justify-end mb-4">
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="name-asc">Tên: A-Z</option>
            </select>
          </div>
          
          <ProductsList products={mockProducts} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Products;