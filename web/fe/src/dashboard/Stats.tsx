// src/components/dashboard/Stats.tsx
import React from 'react';

// Dữ liệu giả lập cho các thẻ thống kê
const mockStats = [
  { 
    title: 'Tổng Doanh thu (Tháng)', 
    value: '1.25 Tỷ VND', 
    trend: '+12%', 
    icon: '💰' 
  },
  { 
    title: 'Đơn hàng Mới (Hôm nay)', 
    value: '24', 
    trend: '-3%', 
    icon: '📦' 
  },
  { 
    title: 'Khách hàng Mới', 
    value: '158', 
    trend: '+25%', 
    icon: '👥' 
  },
  { 
    title: 'Sản phẩm Hết hàng', 
    value: '5', 
    trend: 'Cần nhập', 
    icon: '⚠️' 
  },
];

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {mockStats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white p-5 rounded-xl shadow-md border-l-4 border-amber-500 transition duration-300 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <div className="mt-1 flex justify-between items-end">
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <span className={`text-sm font-semibold ${stat.trend.includes('+') ? 'text-green-500' : stat.trend.includes('-') ? 'text-red-500' : 'text-gray-500'}`}>
              {stat.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;