// src/pages/Wishlist.tsx
import React from 'react';
import MainLayout from '../layouts/MainLayout.tsx';
import Button from '../components/common/Button.tsx';
import WishlistContent from '../components/wishlist/WishlistContent.tsx'; // Giả định component nội dung
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
  // Trong thực tế, bạn sẽ lấy dữ liệu wishlist từ WishlistContext
  const mockWishlistItems = [
      // Giả lập một vài sản phẩm
  ]; 

  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3">Danh sách Yêu thích (Wishlist)</h1>
        
        {mockWishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500 mb-6">Bạn chưa có sản phẩm nào trong danh sách yêu thích.</p>
            <Link to="/products">
              <Button variant="primary">Khám phá Sản phẩm</Button>
            </Link>
          </div>
        ) : (
          <WishlistContent items={mockWishlistItems} />
          // WishlistContent sẽ chứa logic hiển thị từng item
        )}
      </div>
    </MainLayout>
  );
};

export default Wishlist;