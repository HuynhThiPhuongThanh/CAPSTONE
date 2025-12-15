// src/pages/ProductDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.tsx';
import Button from '../components/common/Button.tsx';
import Spinner from '../components/common/Spinner.tsx';
import RecommendedProducts from '../components/RecommendedProducts.tsx'; // Component gợi ý
import { Product } from '../types/product.ts';
import { useCart } from '../context/CartContext.tsx';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [error, setError] = useState('');

  // --- LOGIC GỌI API (Chỉ là giả lập ở Frontend) ---
  useEffect(() => {
    // Trong thực tế: Dùng useFetch(apiFetch(`/products/${id}`))
    setLoading(true);
    setError('');
    setTimeout(() => {
      // Giả lập dữ liệu sản phẩm lấy từ backend
      if (id === '1') {
        setProduct({
          id: '1',
          name: 'Ghế Sofa Da Cao Cấp Nordic',
          description: 'Sofa 3 chỗ ngồi phong cách Bắc Âu, bọc da thật, chân gỗ sồi. Thiết kế tối giản, mang lại sự sang trọng và thoải mái tối đa cho phòng khách của bạn.',
          price: 18500000,
          category: 'Sofa & Ghế',
          stock: 15,
          imageUrl: '/assets/sofa-nordic.jpg',
          rating: 4.8,
        });
      } else {
        setProduct(null);
        setError('Không tìm thấy sản phẩm.');
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`Đã thêm ${quantity} x ${product.name} vào giỏ hàng!`);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Spinner />
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-red-500">{error || 'Sản phẩm không tồn tại.'}</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="product-details-page">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Cột 1: Hình ảnh */}
          <div>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </div>

          {/* Cột 2: Thông tin chi tiết */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-amber-600 mb-4">{product.category}</p>
            
            {/* Giá */}
            <p className="text-4xl font-bold text-red-600 mb-6">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            </p>

            {/* Mô tả */}
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Mô tả sản phẩm</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            
            {/* Trạng thái kho */}
            <p className="text-sm text-gray-700 mb-4">
              Tình trạng: 
              <span className={product.stock > 0 ? 'text-green-600 font-bold ml-2' : 'text-red-600 font-bold ml-2'}>
                {product.stock > 0 ? `Còn hàng (${product.stock} sản phẩm)` : 'Hết hàng'}
              </span>
            </p>

            {/* Thao tác: Số lượng & Thêm giỏ hàng */}
            <div className="flex items-center space-x-4 mb-8">
              <label htmlFor="quantity" className="text-lg font-medium">Số lượng:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                className="w-20 p-2 border border-gray-300 rounded-lg text-center"
              />
              <Button 
                onClick={handleAddToCart} 
                variant="primary"
                disabled={product.stock === 0}
                className="py-3 px-8 text-lg"
              >
                {product.stock > 0 ? '🛒 Thêm vào Giỏ hàng' : 'Hết hàng'}
              </Button>
            </div>
            
            {/* Thao tác khác */}
            <Button variant="secondary" className="mr-4">
                🤍 Thêm vào Yêu thích
            </Button>
          </div>
        </div>

        <hr className="my-12" />

        {/* Component Gợi ý sản phẩm liên quan */}
        <RecommendedProducts title="Sản phẩm gợi ý" currentProductId={product.id} />
      </div>
    </MainLayout>
  );
};

export default ProductDetails;