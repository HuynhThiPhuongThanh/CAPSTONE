// src/dashboard/orders/OrderDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/common/Button.tsx';
import Spinner from '../../components/common/Spinner.tsx';

// Giả định kiểu dữ liệu chi tiết
interface DetailedOrder {
    id: string;
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    phone: string;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    totalAmount: number;
    items: { productId: string; name: string; quantity: number; price: number; }[];
    paymentMethod: 'cod' | 'transfer';
}

const OrderDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<DetailedOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const [newStatus, setNewStatus] = useState<DetailedOrder['status']>('Pending');
    const [isUpdating, setIsUpdating] = useState(false);

    // --- LOGIC GỌI API: Lấy chi tiết đơn hàng ---
    useEffect(() => {
        setLoading(true);
        // Trong thực tế: GỌI API GET /orders/{id}
        setTimeout(() => {
            const mockOrder: DetailedOrder = {
                id: id || 'ORD003',
                customerName: 'Nguyễn Văn A',
                customerEmail: 'vana@test.com',
                shippingAddress: '123 Đường ABC, Phường 1, Quận XYZ, TP HCM',
                phone: '0901234567',
                status: 'Pending',
                totalAmount: 24000000,
                paymentMethod: 'cod',
                items: [
                    { productId: '1', name: 'Ghế Sofa Da Cao Cấp', quantity: 1, price: 18500000 },
                    { productId: '2', name: 'Bàn Ăn Gỗ Sồi', quantity: 1, price: 5500000 },
                ],
            };
            setOrder(mockOrder);
            setNewStatus(mockOrder.status);
            setLoading(false);
        }, 800);
    }, [id]);

    const handleStatusUpdate = () => {
        if (!order || newStatus === order.status) return;

        setIsUpdating(true);
        console.log(`Cập nhật trạng thái đơn hàng ${order.id} thành: ${newStatus} (GỌI API PUT)`);
        
        // Trong thực tế: GỌI API PUT/PATCH /orders/{id}/status
        setTimeout(() => {
            if (order) setOrder({ ...order, status: newStatus });
            setIsUpdating(false);
            alert(`Đã cập nhật trạng thái đơn hàng ${order?.id} thành ${newStatus}`);
        }, 1000);
    };

    if (loading) return <div className="p-6"><Spinner /></div>;
    if (!order) return <div className="p-6">Không tìm thấy đơn hàng.</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Chi tiết Đơn hàng: {order.id}</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Cột 1 & 2: Thông tin khách hàng & Sản phẩm */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Thông tin Khách hàng */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Thông tin Khách hàng</h2>
                        <p><strong>Khách hàng:</strong> {order.customerName}</p>
                        <p><strong>Email:</strong> {order.customerEmail}</p>
                        <p><strong>Điện thoại:</strong> {order.phone}</p>
                        <p><strong>Địa chỉ:</strong> {order.shippingAddress}</p>
                        <p><strong>Thanh toán:</strong> {order.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản'}</p>
                    </div>

                    {/* Danh sách Sản phẩm */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Sản phẩm trong Đơn hàng</h2>
                        <div className="space-y-4">
                            {order.items.map(item => (
                                <div key={item.productId} className="flex justify-between border-b pb-2">
                                    <p>{item.name} x {item.quantity}</p>
                                    <p className="font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-2xl font-bold mt-4 text-right">Tổng cộng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}</p>
                    </div>
                </div>
                
                {/* Cột 3: Quản lý Trạng thái */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md sticky top-4">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Cập nhật Trạng thái</h2>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Trạng thái hiện tại:</label>
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-gray-700 mb-1">Trạng thái Mới</label>
                            <select 
                                value={newStatus} 
                                onChange={(e) => setNewStatus(e.target.value as DetailedOrder['status'])}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="Pending">Chờ xử lý</option>
                                <option value="Shipped">Đang vận chuyển</option>
                                <option value="Delivered">Đã giao hàng</option>
                                <option value="Cancelled">Đã hủy</option>
                            </select>
                        </div>
                        
                        <Button 
                            onClick={handleStatusUpdate} 
                            variant="primary" 
                            className="w-full mt-4" 
                            disabled={isUpdating || newStatus === order.status}
                        >
                            {isUpdating ? 'Đang cập nhật...' : 'Lưu Trạng thái'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;