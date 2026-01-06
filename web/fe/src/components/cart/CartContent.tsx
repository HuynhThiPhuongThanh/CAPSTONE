// src/components/cart/CartContent.tsx
import React from 'react';
import { useCart } from '../../context/CartContext.tsx';

import { Link } from 'react-router-dom';
import Button from '../Button.tsx';
import CartItem from './CartItem.tsx';
import CartTotal from './CartTotal.tsx';

const CartContent: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const isEmpty = cartItems.length === 0;

  if (isEmpty) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Giỏ hàng của bạn đang trống 😟</h2>
        <p className="text-gray-500 mb-6">Hãy khám phá các sản phẩm nội thất tuyệt vời của chúng tôi!</p>
        <Link to="/products">
          <Button variant="primary">Bắt đầu Mua sắm</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cột 1 & 2: Danh sách Sản phẩm */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 border-b pb-3 text-gray-800">
          Giỏ Hàng ({cartItems.length} Sản phẩm)
        </h2>
        
        {/* Danh sách các CartItem */}
        <div className="space-y-6">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Button onClick={clearCart} variant="secondary">
            Xóa hết Giỏ hàng
          </Button>
          <Link to="/products">
            <Button variant="outline">
              Tiếp tục Mua sắm
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Cột 3: Tổng Cộng và Checkout */}
      <div className="lg:col-span-1">
        <CartTotal/>
        <Link to="/checkout">
          <Button variant="primary" className="w-full mt-4 py-3 text-lg">
            Tiến hành Thanh toán
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartContent;