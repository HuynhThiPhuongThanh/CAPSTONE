// src/components/ServicesSection.tsx
import React from 'react';

const services = [
  { icon: '🚚', title: 'Miễn phí Vận chuyển', description: 'Cho đơn hàng trên 5 triệu đồng.' },
  { icon: '🛡️', title: 'Bảo hành 5 Năm', description: 'Cam kết chất lượng vật liệu và độ bền.' },
  { icon: '🔄', title: 'Đổi trả Dễ dàng', description: 'Trong vòng 30 ngày nếu sản phẩm lỗi.' },
  { icon: '📞', title: 'Hỗ trợ 24/7', description: 'Đội ngũ tư vấn sẵn sàng phục vụ.' },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {services.map(service => (
            <div key={service.title} className="p-4 border rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <span className="text-5xl mb-3 block">{service.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{service.title}</h3>
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;