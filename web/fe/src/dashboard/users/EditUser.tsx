// src/dashboard/users/EditUser.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.tsx';
import Spinner from '../../components/common/Spinner.tsx';
import { User, UserRole } from '../../types/user.ts';

const EditUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- LOGIC GỌI API: Lấy dữ liệu người dùng hiện tại ---
    useEffect(() => {
        setLoading(true);
        // Trong thực tế: GỌI API GET /users/{id}
        setTimeout(() => {
            // Giả lập dữ liệu người dùng
            const mockUser: User = {
                id: id || 'U001',
                username: 'john_customer',
                email: 'john@example.com',
                role: 'customer',
            };
            setUser(mockUser);
            setLoading(false);
        }, 500);
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (user) {
            setUser({
                ...user,
                [name]: value,
            } as User); // Ép kiểu an toàn vì ta biết các trường khớp với User
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsSubmitting(true);

        const updatedData = { ...user };
        console.log(`Đang cập nhật người dùng ${id} (GỌI API PUT/PATCH):`, updatedData);

        // Trong thực tế: GỌI API PUT/PATCH
        setTimeout(() => {
            setIsSubmitting(false);
            alert(`Người dùng "${user.username}" đã được cập nhật thành công!`);
            navigate('/admin/users');
        }, 1000);
    };

    if (loading) return <div className="p-6"><Spinner /></div>;
    if (!user) return <div className="p-6">Không tìm thấy người dùng cần chỉnh sửa.</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Sửa Người dùng: {user.username} ({id})</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <input type="text" name="username" placeholder="Tên đăng nhập" value={user.username} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                    <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                    {/* Admin có thể thêm trường để đặt lại mật khẩu thủ công ở đây */}
                    
                    <div>
                        <label className="block text-gray-700 mb-1">Quyền hạn</label>
                        <select 
                            name="role" 
                            value={user.role} 
                            onChange={handleChange} 
                            className="w-full p-3 border rounded-lg"
                        >
                            <option value="customer">Customer (Khách hàng)</option>
                            <option value="admin">Admin (Quản trị viên)</option>
                        </select>
                    </div>

                    <Button type="submit" variant="primary" className="w-full py-3" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang lưu...' : 'Lưu Thay Đổi Người dùng'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;