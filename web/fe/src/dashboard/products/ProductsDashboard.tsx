// src/dashboard/products/ProductsDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button.tsx';
import Spinner from '../../components/common/Spinner.tsx';
import { Product } from '../../types/product.ts';

// Giả định dữ liệu sản phẩm
const mockProducts: Product[] = [
  { id: 'P01', name: 'Ghế Sofa Da Cao Cấp Nordic', description: '...', price: 18500000, category: 'Sofa', stock: 15, imageUrl: '/assets/sofa-nordic.jpg', rating: 4.8 },
  { id: 'P02', name: 'Bàn Ăn Gỗ Sồi 6 Ghế', description: '...', price: 12000000, category: 'Bàn & Ghế', stock: 0, imageUrl: '/assets/table.jpg', rating: 4.5 },
  { id: 'P03', name: 'Đèn Trang Trí Đứng Tối Giản', description: '...', price: 2500000, category: 'Đèn', stock: 25, imageUrl: '/assets/lamp.jpg', rating: 4.9 },
  // ... thêm sản phẩm
];

const ProductsDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- LOGIC GỌI API: Lấy danh sách sản phẩm ---
  useEffect(() => {
    setLoading(true);
    // Trong thực tế: GỌI API GET /admin/products
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${id}?`)) {
      console.log(`Đang xóa sản phẩm ${id} (GỌI API)`);
      // Trong thực tế: GỌI API DELETE /products/{id}
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'text-red-600 font-bold';
    if (stock < 5) return 'text-yellow-600 font-bold';
    return 'text-green-600';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý Sản phẩm</h2>
        <Link to="/admin/products/add">
          <Button variant="primary">➕ Thêm Sản phẩm Mới</Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg">
        {/* Thanh Tìm kiếm và Lọc */}
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo Tên sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-lg flex-grow max-w-sm"
          />
          {/* Có thể thêm dropdown lọc theo Danh mục, Trạng thái ở đây */}
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Sản phẩm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      <Link to={`/admin/products/edit/${product.id}`} className="hover:text-amber-600">
                        {product.name}
                      </Link>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={getStockStatus(product.stock)}>
                        {product.stock}
                        {product.stock === 0 ? ' (Hết hàng)' : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/admin/products/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Sửa</Link>
                      <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">Xóa</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy sản phẩm nào phù hợp với tìm kiếm.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductsDashboard;