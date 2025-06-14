'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { User, Package, Heart, CreditCard, LogOut, Settings, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import UserProfile from './UserProfile';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';

// Define tab types
type TabType = 'profile' | 'orders' | 'orderDetail' | 'wishlist' | 'payment' | 'settings';

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { logout } = useAuth();

  // Sample user data (in a real app, this would come from an API or context)
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: '/images/avatar-placeholder.jpg',
    orderCount: 5,
    wishlistCount: 12
  };

  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab !== 'orderDetail') {
      setSelectedOrderId(null);
    }
  };

  // Handle order selection
  const handleOrderSelect = (orderId: string) => {
    setSelectedOrderId(orderId);
    setActiveTab('orderDetail');
  };

  // Handle back from order detail
  const handleBackFromOrderDetail = () => {
    setActiveTab('orders');
    setSelectedOrderId(null);
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'orders':
        return <OrderList />;
      case 'orderDetail':
        return selectedOrderId ? (
          <OrderDetail orderId={selectedOrderId} onBack={handleBackFromOrderDetail} />
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No order selected</p>
          </div>
        );
      case 'wishlist':
        return (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">Wishlist Coming Soon</h3>
            <p className="text-gray-500">
              We're working on this feature. Check back soon!
            </p>
          </div>
        );
      case 'payment':
        return (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">Payment Methods Coming Soon</h3>
            <p className="text-gray-500">
              We're working on this feature. Check back soon!
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">Account Settings Coming Soon</h3>
            <p className="text-gray-500">
              We're working on this feature. Check back soon!
            </p>
          </div>
        );
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-8">My Account</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* User Info */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={userData.profileImage}
                      alt={userData.name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-bold text-black">{userData.name}</h2>
                    <p className="text-sm text-gray-600">{userData.email}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => handleTabChange('profile')}
                      className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                        activeTab === 'profile'
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <User className={`h-5 w-5 ${activeTab === 'profile' ? 'text-white' : 'text-gray-500'} mr-3`} />
                      <span>My Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleTabChange('orders')}
                      className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                        activeTab === 'orders' || activeTab === 'orderDetail'
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Package className={`h-5 w-5 ${activeTab === 'orders' || activeTab === 'orderDetail' ? 'text-white' : 'text-gray-500'} mr-3`} />
                      <span>My Orders</span>
                      <span className="ml-auto bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {userData.orderCount}
                      </span>
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => handleTabChange('wishlist')}
                      className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                        activeTab === 'wishlist'
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${activeTab === 'wishlist' ? 'text-white' : 'text-gray-500'} mr-3`} />
                      <span>Wishlist</span>
                      <span className="ml-auto bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {userData.wishlistCount}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleTabChange('payment')}
                      className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                        activeTab === 'payment'
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <CreditCard className={`h-5 w-5 ${activeTab === 'payment' ? 'text-white' : 'text-gray-500'} mr-3`} />
                      <span>Payment Methods</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleTabChange('settings')}
                      className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                        activeTab === 'settings'
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Settings className={`h-5 w-5 ${activeTab === 'settings' ? 'text-white' : 'text-gray-500'} mr-3`} />
                      <span>Account Settings</span>
                    </button>
                  </li>
                </ul>

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      logout();
                      window.location.href = '/'; // Redirect to home page after logout
                    }}
                    className="w-full flex items-center px-4 py-3 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-black mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <ShoppingBag className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-black">{userData.orderCount}</p>
                  <p className="text-sm text-gray-600">Orders</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-black">{userData.wishlistCount}</p>
                  <p className="text-sm text-gray-600">Wishlist</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
