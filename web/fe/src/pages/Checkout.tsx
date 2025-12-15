// src/pages/Checkout.tsx
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout.tsx';
import Button from '../components/common/Button.tsx';
import { useCart } from '../context/CartContext.tsx';
import CartTotal from '../components/cart/CartTotal.tsx';

// Giả định kiểu dữ liệu cho thông tin đặt hàng
interface OrderDetails {
  fullName: string;
  phone: string;
  address: string;
  paymentMethod: 'cod' | 'card' | 'transfer';
}

const Checkout: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    fullName: '',
    phone: '',
    address: '',
    paymentMethod: 'cod',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Tính tổng số lượng hàng trong giỏ
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // --- LOGIC PHÍA FRONTEND: Chuẩn bị dữ liệu ---
    const orderData = {
      ...orderDetails,
      items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })),
      totalAmount: 9000000, // Thay bằng hàm tính tổng thật sự
    };
    
    console.log('Dữ liệu gửi đến Backend để tạo đơn hàng:', orderData);

    // Trong thực tế: GỌI API ĐẾN BACKEND ĐỂ TẠO ĐƠN HÀNG
    setTimeout(() => {
        setIsProcessing(false);
        alert('Đặt hàng thành công! Đơn hàng của bạn đang được xử lý.');
        clearCart(); // Xóa giỏ hàng sau khi đặt hàng thành công
        // Chuyển hướng đến trang PurchaseHistory
    }, 2000);
  };

  if (totalItems === 0) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-3xl font-semibold text-gray-700">Không có sản phẩm nào để thanh toán.</h2>
          <Link to="/products" className="text-amber-600 mt-4 block">Quay lại trang sản phẩm</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8 text-center">Tiến hành Thanh toán</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {/* Cột 1 & 2: Thông tin đặt hàng */}
        <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold border-b pb-3">1. Thông tin Giao hàng</h2>
          
          <div className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên người nhận"
              value={orderDetails.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              value={orderDetails.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ chi tiết (Số nhà, đường, phường/xã)"
              value={orderDetails.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <h2 className="text-xl font-semibold border-b pb-3 pt-4">2. Phương thức Thanh toán</h2>
          <div className="flex flex-col space-y-3">
            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={orderDetails.paymentMethod === 'cod'}
                onChange={handleChange}
              />
              <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="transfer"
                checked={orderDetails.paymentMethod === 'transfer'}
                onChange={handleChange}
              />
              <span className="font-medium">Chuyển khoản Ngân hàng</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={orderDetails.paymentMethod === 'card'}
                onChange={handleChange}
                disabled // Giả lập chưa hỗ trợ
              />
              <span className="text-gray-500">Thẻ tín dụng/ghi nợ (Sắp ra mắt)</span>
            </label>
          </div>
        </div>
        
        {/* Cột 3: Tóm tắt Đơn hàng */}
        <div className="lg:col-span-1">
          <CartTotal hideCheckoutButton={true} />
          
          <div className="mt-6">
            <Button type="submit" variant="primary" className="w-full py-3 text-lg" disabled={isProcessing}>
              {isProcessing ? 'Đang xử lý...' : 'HOÀN TẤT ĐẶT HÀNG'}
            </Button>
            <p className="text-xs text-center text-gray-500 mt-2">Bằng việc đặt hàng, bạn đồng ý với các điều khoản của chúng tôi.</p>
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export default Checkout;