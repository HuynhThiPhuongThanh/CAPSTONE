// src/layouts/MainLayout.tsx
import NavBar from '../components/navigation/NavBar.tsx';
import Footer from '../components/footer/Footer.tsx';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Thanh điều hướng cố định ở trên cùng */}
      <NavBar />
      
      {/* Nội dung chính của trang, co giãn theo chiều dọc */}
      <main className="flex-grow container mx-auto p-4 md:p-6">
        {children}
      </main>
      
      {/* Footer ở cuối trang */}
      <Footer />
    </div>
  );
};

export default MainLayout;