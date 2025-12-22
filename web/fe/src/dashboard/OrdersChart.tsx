// src/components/dashboard/OrdersChart.tsx
import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// --- GIẢ LẬP CONTEXT VÀ TYPES ---
interface Order {
  id: string;
  created_at: string; // Định dạng YYYY-MM-DD
  total: number;
}

interface DashboardContextType {
  orders: Order[];
}

// Giả lập DashboardContext
const DashboardContext = React.createContext<DashboardContextType>({
  orders: [
    { id: 'O001', created_at: '2025-12-10', total: 1000000 },
    { id: 'O002', created_at: '2025-12-10', total: 250000 },
    { id: 'O003', created_at: '2025-12-11', total: 500000 },
    { id: 'O004', created_at: '2025-12-11', total: 1200000 },
    { id: 'O005', created_at: '2025-12-12', total: 750000 },
    { id: 'O006', created_at: '2025-12-12', total: 400000 },
    { id: 'O007', created_at: '2025-12-13', total: 800000 },
    // Dữ liệu giả lập khác...
  ],
});
// ------------------------------------

const OrdersChart: React.FC = () => {
  // Lấy dữ liệu giả lập (hoặc thực tế) từ Context
  const { orders } = useContext(DashboardContext);

  const getChartData = () => {
    // 1. Nhóm và đếm số lượng đơn hàng theo ngày
    const orderMap = orders.reduce((acc, order) => {
      const date = order.created_at;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // 2. Chuyển đổi thành mảng dữ liệu chart
    return Object.entries(orderMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const chartData = getChartData();
  
  // Custom Tooltip để hiển thị thông tin thân thiện hơn
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border shadow-lg rounded-lg text-sm">
          <p className="font-bold text-gray-800">{`Ngày: ${label}`}</p>
          <p className="text-amber-600">{`Đơn hàng: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h5 className="font-bold text-lg text-center my-4 text-gray-800">Số đơn hàng theo ngày</h5>
      
      {/* Container của biểu đồ */}
      <div className="flex justify-center">
        {/*
          Đảm bảo responsive:
          width={900} có thể quá lớn, dùng responsive container
          Nhưng vì Recharts không có container built-in, ta giữ cố định và dùng margin: '0 auto' 
          hoặc wrap trong ResponsiveContainer (nếu cài đặt thư viện)
        */}
        <BarChart width={900} height={400} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Bar dataKey="count" name="Số Đơn hàng" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </div>
    </div>
  );
};

export default OrdersChart;