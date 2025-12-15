// src/dashboard/users/Users.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, UserRole } from '../../types/user.ts'; // Tái sử dụng type User
import Button from '../../components/common/Button.tsx';

const mockUsers: User[] = [
  { id: 'U001', username: 'john_customer', email: 'john@example.com', role: 'customer' },
  { id: 'U002', username: 'admin_boss', email: 'admin@furni.com', role: 'admin' },
  { id: 'U003', username: 'lisa_shopper', email: 'lisa@example.com', role: 'customer' },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  
  const handleDelete = (id: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng ${id}?`)) {
      console.log(`Đang xóa người dùng ${id} (GỌI API)`);
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const getRoleColor = (role: UserRole) => {
    return role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý Người dùng</h2>
        <Link to="/admin/users/add">
          <Button variant="primary">➕ Thêm Người dùng Mới</Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Đăng nhập</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quyền hạn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {/* Chưa tạo EditUser, nên tạm thời dùng link rỗng */}
                  <Link to={`/admin/users/edit/${user.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Sửa</Link>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;