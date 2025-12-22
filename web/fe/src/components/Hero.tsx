// src/components/Hero.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './common/Button.tsx';

const Hero: React.FC = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[60vh] flex items-center justify-start rounded-xl shadow-lg"
      style={{ backgroundImage: 'url(/assets/hero-banner.jpg)' }}
    >
      {/* Image of modern nordic style living room */}
      <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
      
      <div className="relative text-white p-8 md:p-12 max-w-lg ml-0 md:ml-12">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
          Nâng Tầm Không Gian Sống Của Bạn
        </h1>
        <p className="text-xl mb-6">
          Khám phá bộ sưu tập nội thất Bắc Âu tối giản, hiện đại và tinh tế.
        </p>
        <Link to="/products">
          <Button variant="primary" className="py-3 px-8 text-lg">
            Khám Phá Ngay
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;