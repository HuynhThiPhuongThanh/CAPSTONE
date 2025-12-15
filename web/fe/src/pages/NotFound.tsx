// src/pages/NotFound.tsx
import React from 'react';
import MainLayout from '../layouts/MainLayout.tsx';
import Button from '../components/common/Button.tsx';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <MainLayout>
      <div className="text-center py-20 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-9xl font-extrabold text-amber-500">404</h1>
        <h2 className="text-4xl font-semibold mt-4 mb-4 text-gray-800">Trang Không Tìm Thấy</h2>
        <p className="text-lg text-gray-600 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm có thể đã bị xóa hoặc địa chỉ không chính xác.
        </p>
        <Link to="/">
          <Button variant="primary" className="py-3 px-6 text-lg">
            Quay về Trang Chủ
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;