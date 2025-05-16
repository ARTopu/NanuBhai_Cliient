'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, User, Search, ShoppingCart, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import SideNavbar from './SideNavbar';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node) && showUserMenu) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <button
                  className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                  aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                >
                  <Menu className="h-7 w-7 text-black" strokeWidth={2} />
                </button>
                <Link href="/" className="ml-4 text-2xl font-extrabold tracking-tight">
                  <span className="text-gray-800">NanuBhai</span>
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <span className="hidden md:block font-medium text-black">Hi, {user?.fullName || user?.email}</span>
                ) : (
                  <div className="hidden md:flex space-x-2">
                    <Link href="/login" className="font-medium text-black hover:text-primary transition-colors">
                      Login
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link href="/register" className="font-medium text-black hover:text-primary transition-colors">
                      Register
                    </Link>
                  </div>
                )}
                <Link
                  href="/cart"
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors relative"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="h-7 w-7 text-black" strokeWidth={2} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm z-10">{cartCount}</span>
                  )}
                </Link>
                <div className="relative" ref={userMenuRef}>
                  <button
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="User menu"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <User className="h-7 w-7 text-black" strokeWidth={2} />
                  </button>

                  {/* User dropdown menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      {isAuthenticated ? (
                        <>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Profile
                          </Link>
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                              window.location.href = '/'; // Redirect to home page after logout
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <div className="flex items-center">
                              <LogOut className="h-4 w-4 mr-2" />
                              <span>Logout</span>
                            </div>
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Login
                          </Link>
                          <Link
                            href="/register"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Register
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="relative flex items-center">
              <input
                type="search"
                placeholder="Search For Products"
                className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800"
              />
              <Search className="absolute left-3 h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <SideNavbar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export default Navbar;