'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Trash2, ShoppingCart as CartIcon } from 'lucide-react';

// Define cart item type
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant: string;
}

// Sample cart data
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Piping nozzles for cake decoration',
    price: 160.00,
    image: '/images/product1.jpg',
    quantity: 1,
    variant: 'Standard Set'
  },
  {
    id: 2,
    name: 'Professional kitchen knife set',
    price: 3150.00,
    image: '/images/product2.jpg',
    quantity: 1,
    variant: 'Professional'
  }
];

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [couponCode, setCouponCode] = useState<string>('');

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Handle quantity change
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Handle item removal
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* Cart Header */}
      <div className="p-4 border-b flex items-center justify-center">
        <CartIcon className="h-6 w-6 text-black mr-2" strokeWidth={2} />
        <h1 className="text-xl font-extrabold text-black !text-black" style={{ color: 'black' }}>My Cart</h1>
      </div>

      {/* Cart Items */}
      <div className="divide-y">
        {cartItems.map((item) => (
          <div key={item.id} className="p-4 flex items-start relative">
            {/* Product Image */}
            <div className="w-24 h-24 relative rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>

            {/* Product Details */}
            <div className="ml-4 flex-grow pr-10">
              <div className="flex justify-between">
                <h3 className="font-extrabold text-black text-lg !text-black" style={{ color: 'black' }}>{item.name}</h3>
              </div>
              <p className="text-lg font-extrabold text-black mt-2 !text-black" style={{ color: 'black' }}>৳{item.price.toFixed(2)}</p>

              <div className="mt-3">
                <p className="text-sm text-black font-bold !text-black" style={{ color: 'black' }}>Variant: {item.variant}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center mt-4">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md"
                >
                  <span className="text-black text-xl font-extrabold !text-black" style={{ color: 'black' }}>−</span>
                </button>
                <div className="w-12 h-10 flex items-center justify-center bg-black text-white mx-2">
                  {item.quantity}
                </div>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md"
                >
                  <span className="text-black text-xl font-extrabold !text-black" style={{ color: 'black' }}>+</span>
                </button>
              </div>
            </div>

            {/* Delete Button - Positioned absolutely to avoid overlapping */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-700 hover:text-red-500 absolute top-4 right-4"
              aria-label="Remove item"
            >
              <Trash2 className="h-6 w-6" />
            </button>
          </div>
        ))}
      </div>

      {/* Coupon Section */}
      <div className="p-4 border-t">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter coupon code here"
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black font-bold placeholder:text-gray-500"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button className="bg-black text-white font-extrabold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors">
            Add Coupon
          </button>
        </div>
      </div>

      {/* Total & Checkout */}
      <div className="bg-black text-white p-4 flex items-center justify-between">
        <div className="font-extrabold text-lg">
          Total - ৳{totalPrice.toFixed(2)}
        </div>
        <button className="flex items-center space-x-2 font-extrabold group">
          <span>Next</span>
          <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
