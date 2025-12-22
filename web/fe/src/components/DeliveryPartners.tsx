import React from 'react';

const partners = [
  { name: 'Giao Hàng Nhanh', logo: '/logos/ghn.svg' },
  { name: 'Viettel Post', logo: '/logos/viettelpost.svg' },
  { name: 'MoMo', logo: '/logos/momo.svg' },
  { name: 'ZaloPay', logo: '/logos/zalopay.svg' },
];

const DeliveryPartners: React.FC = () => {
  return (
    <section className="py-8 bg-white border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Đối tác Vận chuyển & Thanh toán</h2>
        <div className="flex justify-center items-center space-x-8 flex-wrap">
          {partners.map(partner => (
            <div key={partner.name} className="p-2 opacity-80 hover:opacity-100 transition duration-300">
              {/* Giả định logo là hình ảnh, trong thực tế dùng thẻ <img> */}
              <p className="text-xs text-center text-gray-500">{partner.name}</p>
              {/*  */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryPartners;