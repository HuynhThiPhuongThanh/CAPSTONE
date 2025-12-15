// src/dashboard/products/EditProduct.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.tsx';
import Spinner from '../../components/common/Spinner.tsx';
import { Product } from '../../types/product.ts';

// Định nghĩa trạng thái Form, bao gồm trường File cho hình ảnh mới
interface ProductFormState extends Omit<Product, 'id' | 'rating'> {
    imageFile: File | null;
}

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductFormState | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- LOGIC GỌI API: Lấy dữ liệu sản phẩm hiện tại ---
    useEffect(() => {
        setLoading(true);
        // Trong thực tế: GỌI API GET /products/{id}
        setTimeout(() => {
            // Giả lập dữ liệu sản phẩm lấy được
            const mockProduct: Product = {
                id: id || 'P01',
                name: 'Ghế Sofa Da Cao Cấp Nordic',
                description: 'Sofa 3 chỗ ngồi phong cách Bắc Âu...',
                price: 18500000,
                category: 'Sofa',
                stock: 15,
                imageUrl: '/assets/sofa-nordic.jpg',
                rating: 4.8,
            };
            setProduct({ ...mockProduct, imageFile: null });
            setLoading(false);
        }, 500);
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (product) {
            setProduct({
                ...product,
                [name]: type === 'number' ? parseFloat(value) : value,
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && product) {
            setProduct({
                ...product,
                imageFile: file,
                imageUrl: URL.createObjectURL(file), // Tạo URL tạm thời để preview
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;
        setIsSubmitting(true);

        // --- LOGIC GỌI API: Chuẩn bị FormData (nếu có ảnh) hoặc JSON (nếu không có ảnh) ---
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price.toString());
        formData.append('stock', product.stock.toString());
        if (product.imageFile) {
             formData.append('productImage', product.imageFile);
        } else {
             // Nếu không có file mới, có thể gửi các trường khác dưới dạng JSON hoặc FormData
        }
        
        console.log(`Đang cập nhật sản phẩm ${id} (GỌI API PUT/PATCH)`);

        // Trong thực tế: GỌI API PUT/PATCH
        setTimeout(() => {
            setIsSubmitting(false);
            alert(`Sản phẩm "${product.name}" đã được cập nhật thành công!`);
            navigate('/admin/products');
        }, 1500);
    };

    if (loading) return <div className="p-6"><Spinner /></div>;
    if (!product) return <div className="p-6">Không tìm thấy sản phẩm cần chỉnh sửa.</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Sửa Sản phẩm: {product.name} ({id})</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Thông tin cơ bản */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Tên Sản phẩm</label>
                            <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Danh mục</label>
                            <select name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded-lg" required>
                                <option value="Sofa">Sofa & Ghế</option>
                                <option value="Table">Bàn & Ghế</option>
                                {/* ... các options khác */}
                            </select>
                        </div>
                    </div>

                    {/* Giá và Tồn kho */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Giá (VND)</label>
                            <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-2 border rounded-lg" min="0" required />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Số lượng Tồn kho</label>
                            <input type="number" name="stock" value={product.stock} onChange={handleChange} className="w-full p-2 border rounded-lg" min="0" required />
                        </div>
                    </div>
                    
                    {/* Mô tả */}
                    <div>
                        <label className="block text-gray-700 mb-1">Mô tả</label>
                        <textarea name="description" value={product.description} onChange={handleChange} rows={4} className="w-full p-2 border rounded-lg"></textarea>
                    </div>

                    {/* Hình ảnh hiện tại và tải lên mới */}
                    <div>
                        <label className="block text-gray-700 mb-1">Hình ảnh hiện tại</label>
                        <img src={product.imageUrl} alt="Current Preview" className="mt-2 w-32 h-32 object-cover rounded-lg border" />
                        
                        <label className="block text-gray-700 mt-4 mb-1">Tải lên Hình ảnh MỚI (chỉ chọn khi muốn thay đổi)</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-lg" />
                    </div>

                    <Button type="submit" variant="primary" className="py-2 px-6" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang lưu...' : 'Lưu Thay Đổi Sản phẩm'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;