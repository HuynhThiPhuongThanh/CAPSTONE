// src/dashboard/orders/Orders.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../../pages/PurchaseHistory.tsx'; // Tái sử dụng type Order

const mockOrders: Order[] = [
  { id: 'ORD003', date: '2025-12-05', total: 24000000, status: 'Pending', itemsCount: 3 },
  { id: 'ORD002', date: '2025-12-01', total: 3500000, status: 'Shipped', itemsCount: 1 },
  { id: 'ORD001', date: '2025-11-20', total: 18500000, status: 'Delivered', itemsCount: 2 },
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  // State cho bộ lọc, phân trang, v.v.

  const getStatusColor = (status: Order['status']) => {
    const base = 'px-3 py-1 text-xs font-medium rounded-full ';
    switch (status) {
      case 'Delivered': return base + 'bg-green-100 text-green-800';
      case 'Shipped': return base + 'bg-blue-100 text-blue-800';
      case 'Pending': return base + 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return base + 'bg-red-100 text-red-800';
      default: return base + 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Quản lý Đơn hàng</h2>

      <div className="bg-white p-4 rounded-xl shadow-lg">
        {/* Thanh tìm kiếm và bộ lọc sẽ ở đây */}
        <div className="mb-4">
            <input type="text" placeholder="Tìm kiếm theo Mã đơn hàng / Khách hàng..." className="p-2 border rounded-lg w-full max-w-md" />
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã ĐH</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusColor(order.status)}>{order.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/admin/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Chi tiết</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;