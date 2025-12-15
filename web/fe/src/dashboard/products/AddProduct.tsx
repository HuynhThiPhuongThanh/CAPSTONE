// src/dashboard/products/AddProduct.tsx
import React, { useState } from 'react';
import Button from '../../components/common/Button.tsx';
import { Product } from '../../types/product.ts';
import { useNavigate } from 'react-router-dom';

const initialProductState: Omit<Product, 'id' | 'rating' | 'imageUrl'> & { imageFile: File | null, imageUrl: string } = {
  name: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
  imageFile: null,
  imageUrl: '', // Tạm thời để hiển thị preview
};

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState(initialProductState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setProduct({
      ...product,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct({
        ...product,
        imageFile: file,
        imageUrl: URL.createObjectURL(file), // Tạo URL tạm thời để preview
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // --- LOGIC PHÍA FRONTEND: Chuẩn bị FormData (nếu có file) ---
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('stock', product.stock.toString());
    if (product.imageFile) {
      formData.append('productImage', product.imageFile); // 'productImage' là key mà backend mong muốn
    }

    console.log('Đang gửi dữ liệu sản phẩm mới (GỌI API)');
    
    // Trong thực tế: GỌI API (có thể là POST với FormData)
    setTimeout(() => {
        setLoading(false);
        alert(`Sản phẩm "${product.name}" đã được thêm thành công!`);
        navigate('/admin/products');
    }, 1500);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Thêm Sản phẩm Mới</h2>
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Thông tin cơ bản */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Tên Sản phẩm</label>
              <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Danh mục</label>
              <select name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded-lg" required>
                <option value="">-- Chọn Danh mục --</option>
                <option value="Sofa">Sofa & Ghế</option>
                <option value="Table">Bàn & Ghế</option>
              </select>
            </div>
          </div>

          {/* Giá và Tồn kho */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Giá (VND)</label>
              <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-2 border rounded-lg" min="0" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Số lượng Tồn kho</label>
              <input type="number" name="stock" value={product.stock} onChange={handleChange} className="w-full p-2 border rounded-lg" min="0" required />
            </div>
          </div>
          
          {/* Mô tả */}
          <div>
            <label className="block text-gray-700 mb-1">Mô tả</label>
            <textarea name="description" value={product.description} onChange={handleChange} rows={4} className="w-full p-2 border rounded-lg"></textarea>
          </div>

          {/* Hình ảnh */}
          <div>
            <label className="block text-gray-700 mb-1">Hình ảnh Sản phẩm</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-lg" />
            {product.imageUrl && (
              <img src={product.imageUrl} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-lg border" />
            )}
          </div>

          <Button type="submit" variant="primary" className="py-2 px-6" disabled={loading}>
            {loading ? 'Đang thêm...' : 'Lưu Sản phẩm'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;