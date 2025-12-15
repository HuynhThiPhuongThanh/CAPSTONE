// src/components/product/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product.ts';
import Button from '../common/Button.tsx'; // Giả định đã tạo

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover object-center"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          <Link to={`/products/${product.id}`} className="hover:text-amber-600">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        <div className="flex justify-between items-center mt-3">
          <p className="text-2xl font-bold text-gray-900">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </p>
          {/* Rating component sẽ được thêm vào sau */}
        </div>
        <div className="mt-4 flex space-x-2">
          <Button 
            onClick={() => console.log(`Thêm sản phẩm ${product.id} vào giỏ hàng`)} 
            variant="primary"
            className="flex-grow"
          >
            Thêm vào giỏ
          </Button>
          <Button 
            onClick={() => console.log(`Thêm sản phẩm ${product.id} vào yêu thích`)} 
            variant="secondary"
          >
            ❤️
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;