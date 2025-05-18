'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
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
  quantity: initialQuantity = 1,
  className = ''
}) => {
  const { addToCart } = useCart();
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const [quantity, setQuantity] = useState(initialQuantity);
  const controlsRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close quantity controls
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (controlsRef.current && !controlsRef.current.contains(event.target as Node)) {
        setShowQuantityControls(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If Buy Now button is clicked, show quantity controls
    if (!showQuantityControls) {
      setShowQuantityControls(true);
    } else {
      // If Add button is clicked after selecting quantity
      addToCart({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity,
        variant: variant
      });

      // Reset and close after adding to cart
      setQuantity(1);
      setShowQuantityControls(false);
    }
  };

  const increaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="relative" ref={controlsRef}>
      {/* Buy Now button */}
      {!showQuantityControls ? (
        <button
          onClick={handleAddToCart}
          className={`w-full bg-black hover:bg-gray-800 text-white text-[10px] font-medium rounded-sm transition-all duration-300 py-1.5 ${className}`}
          aria-label="Buy Now"
        >
          Buy Now
        </button>
      ) : null}

      {/* Quantity Controls */}
      {showQuantityControls && (
        <div className="w-full flex items-center bg-white rounded-sm border border-gray-200 text-[10px]">
          <button
            onClick={decreaseQuantity}
            className="p-1.5 hover:bg-gray-100 rounded-l-sm flex-1"
          >
            <Minus className="w-2.5 h-2.5 text-black mx-auto" />
          </button>
          <span className="px-1.5 text-[10px] font-medium text-black flex-1 text-center">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="p-1.5 hover:bg-gray-100 flex-1"
          >
            <Plus className="w-2.5 h-2.5 text-black mx-auto" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-1.5 px-1.5 bg-black text-white text-[10px] rounded-r-sm flex-1"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
