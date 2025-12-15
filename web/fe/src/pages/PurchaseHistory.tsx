// src/pages/PurchaseHistory.tsx
import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout.tsx';
import Button from '../components/common/Button.tsx';
import Spinner from '../components/common/Spinner.tsx';

// Giả định kiểu dữ liệu cho Đơn hàng
interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  itemsCount: number;
}

const PurchaseHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // --- LOGIC GỌI API: Lấy lịch sử đơn hàng ---
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Giả lập dữ liệu đơn hàng
      const mockOrders: Order[] = [
        { id: 'ORD001', date: '2025-11-20', total: 18500000, status: 'Delivered', itemsCount: 2 },
        { id: 'ORD002', date: '2025-12-01', total: 3500000, status: 'Shipped', itemsCount: 1 },
        { id: 'ORD003', date: '2025-12-05', total: 24000000, status: 'Pending', itemsCount: 3 },
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3">Lịch Sử Mua Hàng</h1>
        
        {loading ? (
          <Spinner />
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Bạn chưa có đơn hàng nào.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center transition duration-200 hover:shadow-lg">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Mã Đơn hàng: {order.id}</h2>
                  <p className="text-sm text-gray-500">Ngày đặt: {order.date}</p>
                  <p className="text-lg font-medium mt-1">Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <Link to={`/history/${order.id}`}>
                    <Button variant="outline" size="sm">Xem Chi tiết</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PurchaseHistory;