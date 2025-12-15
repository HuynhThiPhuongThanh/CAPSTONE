// src/pages/About.tsx
import React from 'react';
import MainLayout from '../layouts/MainLayout.tsx';

const About: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-amber-700">Về Chúng Tôi</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <p className="text-lg text-gray-700 mb-6">
            Tại FurniShop, chúng tôi tin rằng nội thất không chỉ là vật dụng, mà là linh hồn của không gian sống. Chúng tôi cam kết mang đến những sản phẩm nội thất cao cấp, thiết kế tinh tế theo phong cách tối giản và hiện đại, giúp bạn kiến tạo nên ngôi nhà mơ ước.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">Sứ Mệnh Của Chúng Tôi</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Cung cấp nội thất chất lượng, bền vững với giá trị tốt nhất.</li>
            <li>Mang lại trải nghiệm mua sắm trực tuyến dễ dàng và tiện lợi.</li>
            <li>Thúc đẩy lối sống tối giản, thân thiện với môi trường.</li>
          </ul>

          <p className="mt-8 text-center text-gray-500 italic">
            "Mỗi món đồ nội thất đều kể một câu chuyện."
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;