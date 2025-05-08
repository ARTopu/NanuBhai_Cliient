'use client';

import React from 'react';
import ShoppingCart from '@/components/cart/ShoppingCart';

export default function CartPage() {
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <ShoppingCart />
      </div>
    </div>
  );
}
