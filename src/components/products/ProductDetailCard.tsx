'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

// Define product type
interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

interface Product {
  id: number;
  title: string;
  images: ProductImage[];
  price: number;
  originalPrice: number;
  discount: number;
  freeShipping: boolean;
  description: string;
}

interface ProductDetailCardProps {
  product: Product;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Calculate savings
  const savedAmount = product.originalPrice - product.price;
  const discountPercentage = Math.round((savedAmount / product.originalPrice) * 100);

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 md:p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image Section */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
            <Image
              src={product.images[currentImageIndex].src}
              alt={product.images[currentImageIndex].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Image Slider */}
          <div className="flex justify-center space-x-2">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  index === currentImageIndex ? 'border-primary scale-110' : 'border-gray-200'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="text-2xl font-extrabold text-black mb-2 !text-black" style={{ color: 'black' }}>{product.title}</h1>

          {/* Price Section */}
          <div className="flex items-center mb-2">
            <span className="text-xl font-bold text-black">৳{product.price.toFixed(2)}</span>
            <span className="ml-2 text-sm text-gray-500 line-through">৳{product.originalPrice.toFixed(2)}</span>
          </div>

          {/* Savings */}
          <div className="mb-4">
            <span className="text-sm font-medium text-green-600">
              Save ৳{savedAmount.toFixed(2)} ({discountPercentage}% OFF)
            </span>
          </div>

          {/* Free Shipping Tag */}
          {product.freeShipping && (
            <div className="mb-6">
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                Free Shipping
              </span>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="mb-4">
            <h3 className="text-base font-extrabold text-black mb-2 !text-black" style={{ color: 'black' }}>Quantity</h3>
            <div className="flex items-center mb-4">
              <button
                onClick={decreaseQuantity}
                className="w-8 h-8 flex items-center justify-center rounded-l-md bg-gray-200 hover:bg-gray-300 transition-colors border border-gray-300"
              >
                <span className="text-lg font-bold text-black">-</span>
              </button>
              <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                <span className="text-sm font-bold text-black">{quantity}</span>
              </div>
              <button
                onClick={increaseQuantity}
                className="w-8 h-8 flex items-center justify-center rounded-r-md bg-gray-200 hover:bg-gray-300 transition-colors border border-gray-300"
              >
                <span className="text-lg font-bold text-black">+</span>
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => addToCart({
                id: product.id,
                name: product.title,
                price: product.price,
                image: product.images[0].src,
                quantity: quantity,
                variant: 'Standard'
              })}
              className="w-3/5 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 text-xs shadow-md hover:shadow-xl flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
              <span className="bg-white rounded-full w-4 h-4 flex items-center justify-center ml-1.5 font-bold text-[9px] text-black">
                {quantity}
              </span>
            </button>
          </div>

          {/* Product Description */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-base font-extrabold text-black mb-3 !text-black" style={{ color: 'black' }}>Product Description</h3>
            <p className="text-sm font-medium text-black !text-black" style={{ color: 'black', lineHeight: '1.6' }}>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
