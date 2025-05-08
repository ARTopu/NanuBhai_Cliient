'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  productPrice: number;
  productImage: string;
  variant?: string;
  quantity?: number;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  productName,
  productPrice,
  productImage,
  variant = 'Standard',
  quantity = 1,
  className = ''
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity,
      variant: variant
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`flex items-center justify-center gap-1 bg-primary hover:bg-primary-dark text-white rounded-full transition-all duration-300 relative p-2 ${className}`}
      aria-label="Add to cart"
    >
      <ShoppingCart className="w-5 h-5" />
    </button>
  );
};

export default AddToCartButton;
