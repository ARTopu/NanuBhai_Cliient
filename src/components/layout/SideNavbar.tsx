'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Grid,
  Star,
  Flag,
  MessageSquare,
  LogOut,
  X
} from 'lucide-react';

interface SideNavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside or pressing Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is on the hamburger menu button
      const target = event.target as Element;
      const isMenuButton = target.closest('button[aria-label="Close menu"]') ||
                          target.closest('button[aria-label="Open menu"]');

      // Only close if click is outside sidebar and not on the menu button
      if (sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node) &&
          !isMenuButton &&
          isOpen) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // We don't need to prevent scrolling when sidebar is open
  // This effect has been removed to allow scrolling while the sidebar is open

  const navItems = [
    { name: 'Home', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'Categories', icon: <Grid className="w-5 h-5" />, path: '/categories' },
    { name: 'Review', icon: <Star className="w-5 h-5" />, path: '/review' },
    { name: 'Report', icon: <Flag className="w-5 h-5" />, path: '/report' },
    { name: 'Feedback', icon: <MessageSquare className="w-5 h-5" />, path: '/feedback' },
    { name: 'Logout', icon: <LogOut className="w-5 h-5" />, path: '/logout' },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-1/2 left-0 -translate-y-1/2 h-auto max-h-[85vh] w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out rounded-r-lg overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-black !text-black" style={{ color: 'black' }}>Menu</h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 py-2 px-4 rounded-md transition-colors ${
                    pathname === item.path
                      ? 'bg-black text-white !text-white border-l-4 border-primary'
                      : 'text-black hover:bg-gray-100'
                  }`}
                  style={{
                    color: pathname === item.path ? 'white' : 'black'
                  }}
                  onClick={onClose}
                >
                  <span className={`${pathname === item.path ? 'text-white' : 'text-black'} flex items-center justify-center`} style={{ color: pathname === item.path ? 'white' : 'black' }}>
                    {item.icon}
                  </span>
                  <span className={`font-medium ${pathname === item.path ? 'text-white !text-white' : 'text-black !text-black'}`} style={{ color: pathname === item.path ? 'white' : 'black' }}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideNavbar;
