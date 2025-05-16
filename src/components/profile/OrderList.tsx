'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Package, Truck, Check, Clock, Search } from 'lucide-react';

// Define order status type
type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Define order interface
interface OrderItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
}

const OrderList: React.FC = () => {
  // Sample orders data (in a real app, this would come from an API)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-2023-1001',
      date: '2023-11-15T10:30:00',
      status: 'delivered',
      total: 129.95,
      items: [
        {
          id: 1,
          productId: 101,
          name: 'Professional Kitchen Knife Set',
          price: 89.95,
          quantity: 1,
          image: '/images/products/knife-set.jpg'
        },
        {
          id: 2,
          productId: 203,
          name: 'Silicone Baking Mat',
          price: 19.99,
          quantity: 2,
          image: '/images/products/baking-mat.jpg'
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      paymentMethod: 'Credit Card (ending in 4242)',
      trackingNumber: 'TRK928374651'
    },
    {
      id: 'ORD-2023-0892',
      date: '2023-10-28T14:45:00',
      status: 'shipped',
      total: 75.50,
      items: [
        {
          id: 3,
          productId: 305,
          name: 'Electric Hand Mixer',
          price: 45.50,
          quantity: 1,
          image: '/images/products/hand-mixer.jpg'
        },
        {
          id: 4,
          productId: 407,
          name: 'Measuring Cups Set',
          price: 15.00,
          quantity: 2,
          image: '/images/products/measuring-cups.jpg'
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      paymentMethod: 'PayPal',
      trackingNumber: 'TRK736459821'
    },
    {
      id: 'ORD-2023-0764',
      date: '2023-09-15T09:20:00',
      status: 'processing',
      total: 34.99,
      items: [
        {
          id: 5,
          productId: 512,
          name: 'Piping Nozzles Set',
          price: 34.99,
          quantity: 1,
          image: '/images/products/piping-nozzles.jpg'
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      paymentMethod: 'Credit Card (ending in 4242)'
    }
  ]);

  // State for expanded order details
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  // Toggle order details expansion
  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'processing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Truck className="w-3 h-3 mr-1" />
            Shipped
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="w-3 h-3 mr-1" />
            Delivered
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-black p-6 text-white">
        <h2 className="text-2xl font-bold">My Orders</h2>
        <p className="text-gray-300">View and track your order history</p>
      </div>
      
      {/* Filters */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders by ID or product name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"
            />
          </div>
          
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'all')}
              className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black py-2 px-3"
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Orders List */}
      <div className="divide-y divide-gray-200">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
              {/* Order Summary */}
              <div 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="flex flex-col mb-2 sm:mb-0">
                  <div className="flex items-center">
                    <span className="font-bold text-black">{order.id}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{formatDate(order.date)}</span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <Package className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="font-medium text-black">৳{order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {getStatusBadge(order.status)}
                  <button className="ml-4 text-gray-500 focus:outline-none">
                    {expandedOrderId === order.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {/* Order Details (Expanded) */}
              {expandedOrderId === order.id && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  {/* Order Items */}
                  <h3 className="text-lg font-medium text-black mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center p-3 border border-gray-200 rounded-md">
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <Image
                            src={item.image || '/images/product-placeholder.jpg'}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <Link href={`/products/${item.productId}`} className="text-black font-medium hover:text-primary">
                            {item.name}
                          </Link>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                            <span className="font-medium text-black">৳{item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Shipping & Payment Info */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-black mb-2">Shipping Information</h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium text-black">{order.shippingAddress.name}</p>
                        <p className="text-gray-600">{order.shippingAddress.street}</p>
                        <p className="text-gray-600">
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                        </p>
                        <p className="text-gray-600">{order.shippingAddress.country}</p>
                        
                        {order.trackingNumber && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm font-medium text-black">Tracking Number:</p>
                            <p className="text-blue-600">{order.trackingNumber}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-black mb-2">Payment Information</h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-gray-600">Payment Method:</p>
                        <p className="font-medium text-black">{order.paymentMethod}</p>
                        
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="text-black">৳{(order.total * 0.9).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="text-black">৳{(order.total * 0.1).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mt-2 pt-2 border-t border-gray-200 font-bold">
                            <span>Total:</span>
                            <span>৳{order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-end">
                    <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                      Contact Support
                    </button>
                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none">
                        Write a Review
                      </button>
                    )}
                    {(order.status === 'processing' || order.status === 'shipped') && (
                      <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none">
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-1">No orders found</h3>
            <p className="text-gray-500">
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'You haven\'t placed any orders yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
