// src/components/Breadcrumb.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  path: string;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Hàm tạo tên hiển thị (viết hoa chữ cái đầu và thay '-' bằng ' ')
  const getName = (pathSegment: string) => {
    // Xử lý các segment đặc biệt như ID sản phẩm/đơn hàng
    if (pathSegment.match(/^[a-zA-Z0-9]+$/) && pathSegment.length > 3) {
      return `Chi tiết ${pathnames[pathnames.length - 2] || 'Mục'}`;
    }
    return pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1).replace(/-/g, ' ');
  };

  const breadcrumbs: BreadcrumbItem[] = [{ name: 'Trang Chủ', path: '/' }];

  // Xây dựng các item còn lại
  pathnames.forEach((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    breadcrumbs.push({
      name: getName(value),
      path: to,
    });
  });

  return (
    <nav className="text-sm text-gray-500 my-4" aria-label="breadcrumb">
      <ol className="list-none p-0 inline-flex space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index < breadcrumbs.length - 1 ? (
              <>
                <Link to={crumb.path} className="hover:text-amber-600 transition">
                  {crumb.name}
                </Link>
                <span className="mx-2 text-gray-400">/</span>
              </>
            ) : (
              <span className="font-semibold text-gray-700">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;