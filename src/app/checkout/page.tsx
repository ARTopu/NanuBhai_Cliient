'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PaymentMethodIcon from '@/components/checkout/PaymentMethodIcon';

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems } = useCart();
  const [activeTab, setActiveTab] = useState('info'); // 'info' or 'payment'
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    altPhone: ''
  });

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 60; // Fixed shipping cost
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process checkout
    console.log('Checkout data:', { formData, paymentMethod, total });
    // In a real app, you would send this data to your backend
    alert('Order placed successfully!');
    router.push('/');
  };



  return (
    <div className="flex flex-col bg-gray-50 min-h-screen py-6">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link href="/cart" className="flex items-center text-gray-700 mb-6 hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to Cart</span>
        </Link>

        {/* Checkout Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black !text-black" style={{ color: 'black' }}>Checkout Info</h1>
          <div className="flex mt-4 border-b border-gray-300">
            <div
              className="py-2 px-4 font-bold cursor-pointer"
              style={{
                backgroundColor: activeTab === 'info' ? '#2563eb' : '#f3f4f6',
                color: activeTab === 'info' ? 'white' : 'black'
              }}
              onClick={() => setActiveTab('info')}
            >
              Cart Overview
            </div>
            <div
              className="py-2 px-4 font-bold cursor-pointer"
              style={{
                backgroundColor: activeTab === 'payment' ? '#2563eb' : '#f3f4f6',
                color: activeTab === 'payment' ? 'white' : 'black'
              }}
              onClick={() => setActiveTab('payment')}
            >
              Payment
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'info' ? (
            <>
              {/* Contact Info Section */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
                <h2 className="text-lg font-bold mb-4 text-black !text-black" style={{ color: 'black' }}>Contact Info</h2>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full p-3 rounded border border-gray-300 bg-white text-black !text-black"
                      style={{ color: 'black' }}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full p-3 rounded border border-gray-300 bg-white text-black !text-black"
                      style={{ color: 'black' }}
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full p-3 rounded border border-gray-300 bg-white text-black !text-black"
                      style={{ color: 'black' }}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Info Section */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
                <h2 className="text-lg font-bold mb-4 text-black !text-black" style={{ color: 'black' }}>Shipping Info</h2>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Detailed Address"
                      className="w-full p-3 rounded border border-gray-300 bg-white text-black !text-black"
                      style={{ color: 'black' }}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Select City"
                      className="w-full p-3 rounded border border-gray-300 bg-white text-black !text-black"
                      style={{ color: 'black' }}
                      required
                    />
                    <input
                      type="tel"
                      name="altPhone"
                      value={formData.altPhone}
                      onChange={handleInputChange}
                      placeholder="Alt. Phone (01XXXXX)"
                      className="w-full p-3 rounded border border-gray-300 bg-white text-black !text-black"
                      style={{ color: 'black' }}
                    />
                  </div>

                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
                <div className="text-center mb-4">
                  <p className="text-black font-medium">Your total payable amount is</p>
                  <h3 className="text-3xl font-bold text-primary !text-primary" style={{ color: '#2563eb' }}>৳{total}</h3>
                  <p className="text-black font-bold mt-2">Breakdown</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-black font-medium">Purpose</span>
                    <span className="text-black font-medium">Amount</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-black">Total</span>
                    <span className="text-primary font-bold !text-primary" style={{ color: '#2563eb' }}>৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">Shipping</span>
                    <span className="text-primary font-bold !text-primary" style={{ color: '#2563eb' }}>৳{shipping}</span>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="flex items-center space-x-2 font-bold group hover:bg-gray-800 transition-colors bg-black px-6 py-3 rounded-md shadow-md"
                  onClick={() => setActiveTab('payment')}
                  style={{ backgroundColor: 'black' }}
                >
                  <span className="!text-white" style={{ color: 'white' }}>Continue to Payment</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform text-white">→</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Order Summary for Payment Tab */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
                <div className="text-center mb-4">
                  <p className="text-black font-medium">Your total payable amount is</p>
                  <h3 className="text-3xl font-bold text-primary !text-primary" style={{ color: '#2563eb' }}>৳{total}</h3>
                  <p className="text-black font-bold mt-2">Breakdown</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-black font-medium">Purpose</span>
                    <span className="text-black font-medium">Amount</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-black">Total</span>
                    <span className="text-primary font-bold !text-primary" style={{ color: '#2563eb' }}>৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-black">Shipping</span>
                    <span className="text-primary font-bold !text-primary" style={{ color: '#2563eb' }}>৳{shipping}</span>
                  </div>
                  <p className="text-center text-black font-medium text-sm">
                    You will get the delivery <span className="text-primary font-bold !text-primary" style={{ color: '#2563eb' }}>within 2-3 Days</span> after confirmation.
                  </p>
                </div>
              </div>

              {/* Payment Options */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
                <h2 className="text-lg font-bold mb-4 text-black !text-black" style={{ color: 'black' }}>Payment Options</h2>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <label className="flex items-center justify-start border border-gray-300 rounded-md p-4 cursor-pointer hover:border-primary transition-colors shadow-sm h-16">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="mr-2"
                    />
                    <PaymentMethodIcon method="cash" />
                  </label>
                  <label className="flex items-center justify-start border border-gray-300 rounded-md p-4 cursor-pointer hover:border-primary transition-colors shadow-sm h-16">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mr-2"
                    />
                    <PaymentMethodIcon method="card" />
                  </label>
                  <label className="flex items-center justify-start border border-gray-300 rounded-md p-4 cursor-pointer hover:border-primary transition-colors shadow-sm h-16">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bkash"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                      className="mr-2"
                    />
                    <PaymentMethodIcon method="bkash" />
                  </label>
                </div>


              </div>

              {/* Submit Order Button */}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="flex items-center space-x-2 font-bold group hover:bg-gray-800 transition-colors bg-black px-6 py-3 rounded-md shadow-md"
                  onClick={() => setActiveTab('info')}
                  style={{ backgroundColor: 'black' }}
                >
                  <span className="text-xl group-hover:-translate-x-1 transition-transform text-white">←</span>
                  <span className="!text-white" style={{ color: 'white' }}>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 font-bold group hover:bg-gray-800 transition-colors bg-black px-6 py-3 rounded-md shadow-md"
                  style={{ backgroundColor: 'black' }}
                >
                  <span className="!text-white" style={{ color: 'white' }}>Place Order</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform text-white">→</span>
                </button>
              </div>
            </>
          )}
        </form>


      </div>
    </div>
  );
};

export default CheckoutPage;
