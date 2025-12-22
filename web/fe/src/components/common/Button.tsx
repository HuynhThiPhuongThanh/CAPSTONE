// src/components/common/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const getStyles = (variant: ButtonProps['variant'], size: ButtonProps['size']) => {
  let base = 'font-semibold rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeMap = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const variantMap = {
    primary: 'bg-amber-600 text-white hover:bg-amber-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return `${base} ${variantMap[variant || 'primary']} ${sizeMap[size || 'md']}`;
};

const Button: React.FC<ButtonProps> = ({ children, variant, size, className = '', ...props }) => {
  return (
    <button className={`${getStyles(variant, size)} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;