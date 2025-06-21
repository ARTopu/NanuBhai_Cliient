"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchCategories, getImageUrl, Category } from '@/services/api';

// No fallback categories needed

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        // Fetch categories directly
        const data = await fetchCategories();
        console.log('Categories data:', data);

        if (data && data.length > 0) {
          setCategories(data);
        } else {
          setError('No categories found in the response');
        }
      } catch (err) {
        setError(`Failed to load categories: ${err instanceof Error ? err.message : String(err)}`);
        console.error('Error loading categories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-black mb-6 !text-black" style={{ color: 'black' }}>All Categories</h2>

        {/* Search Bar - Same as in Navbar */}
        <div className="relative flex items-center mb-8">
          <input
            type="search"
            placeholder="Search For Categories"
            className="w-full px-4 py-3 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 text-base font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-3 bg-white">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state or empty categories */}
        {!loading && (error || categories.length === 0) && (
          <div className="text-center py-10">
            <p className="text-red-500 font-medium">Unable to load categories from the server.</p>
            <p className="text-gray-500 mt-2">{error || 'Please check your connection and try again.'}</p>
            <div className="mt-4 p-4 bg-gray-100 rounded text-left max-w-lg mx-auto text-xs overflow-auto">
              <p className="font-bold mb-2">Debug Information:</p>
              <p>API URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}</p>
              <p>Error: {error}</p>
              <p className="mt-2">Please make sure:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>Your backend server is running at http://localhost:4000</li>
                <li>The categories endpoint is available</li>
                <li>CORS is properly configured on your backend</li>
              </ul>
            </div>
          </div>
        )}

        {/* Category Grid */}
        {!loading && !error && categories.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCategories.map((category) => (
            <Link
              href={`/categories/${category._id}`}
              key={category._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-primary"
            >
              <figure className="relative aspect-square">
                {/* Fallback image if the actual image is not available */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-black text-sm font-bold !text-black" style={{ color: 'black' }}>{category.name}</span>
                </div>

                {/* Actual image */}
                <Image
                  src={getImageUrl(category.image || '')}
                  alt={`${category.name} category`}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </figure>
              <div className="p-3 bg-white">
                <h3 className="text-base font-extrabold text-black text-center !text-black" style={{ color: 'black' }}>{category.name}</h3>
              </div>
            </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryList;
