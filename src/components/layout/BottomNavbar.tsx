"use client";

import Link from 'next/link';
import { Home, Grid, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';

const BottomNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed md:right-4 md:top-1/2 md:-translate-y-1/2 bottom-3 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 z-50 bg-white rounded-full shadow-lg px-3 py-1.5 md:px-2 md:py-3 flex md:flex-col items-center justify-center space-x-5 md:space-x-0 md:space-y-6 border border-gray-200">
      <Link href="/" className="flex flex-col items-center p-1.5 rounded-full hover:bg-gray-200 transition-colors relative">
        {pathname === '/' && (
          <div className="absolute -top-1 md:-left-1 md:top-1/2 md:-translate-y-1/2 left-1/2 transform -translate-x-1/2 md:translate-x-0 w-5 md:w-1 h-1 md:h-5 rounded-full bg-primary"></div>
        )}
        <Home className="h-5 w-5 text-gray-800" strokeWidth={2} />
        <span className="text-[10px] font-bold text-gray-800">Home</span>
      </Link>

      <Link href="/categories" className="flex flex-col items-center p-1.5 rounded-full hover:bg-gray-200 transition-colors relative">
        {pathname === '/categories' && (
          <div className="absolute -top-1 md:-left-1 md:top-1/2 md:-translate-y-1/2 left-1/2 transform -translate-x-1/2 md:translate-x-0 w-5 md:w-1 h-1 md:h-5 rounded-full bg-primary"></div>
        )}
        <Grid className="h-5 w-5 text-gray-800" strokeWidth={2} />
        <span className="text-[10px] font-bold text-gray-800">Category</span>
      </Link>

      <Link href="/cart" className="flex flex-col items-center p-1.5 rounded-full hover:bg-gray-200 transition-colors relative">
        {pathname === '/cart' && (
          <div className="absolute -top-1 md:-left-1 md:top-1/2 md:-translate-y-1/2 left-1/2 transform -translate-x-1/2 md:translate-x-0 w-5 md:w-1 h-1 md:h-5 rounded-full bg-primary"></div>
        )}
        <ShoppingCart className="h-5 w-5 text-black" strokeWidth={2} />
        <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
        <span className="text-[10px] font-bold text-black">Cart</span>
      </Link>
    </div>
  );
};

export default BottomNavbar;
