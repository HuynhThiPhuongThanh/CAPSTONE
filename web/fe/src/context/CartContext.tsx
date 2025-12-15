// src/context/CartContext.tsx
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { CartItem, Product } from '../types/product.ts';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Khởi tạo trạng thái giỏ hàng (có thể đọc từ localStorage nếu cần)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Cập nhật số lượng
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // Thêm mới
        return [...prevItems, { ...product, quantity }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};