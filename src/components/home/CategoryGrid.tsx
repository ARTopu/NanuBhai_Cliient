'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchCategories, getImageUrl, Category } from '@/services/api';

const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Show loading state
  if (loading) {
    return (
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="aspect-square rounded-lg bg-gray-200 animate-pulse border-2 border-gray-200"
          />
        ))}
      </div>
    );
  }

  // Show error state
  if (error || categories.length === 0) {
    return (
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        <div className="col-span-full text-center py-4">
          <p className="text-red-500">Unable to load categories from the server.</p>
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
      </div>
    );
  }

  // Show categories from API
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
      {categories.map((category) => (
        <Link
          href={`/categories/${category._id}`}
          key={category._id}
          className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary
            transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-lg"
        >
          <div className="relative w-full h-full">
            {/* Category image */}
            <Image
              src={getImageUrl(category.image || '')}
              alt={`${category.name} category`}
              fill
              className="object-cover"
            />

            {/* Category name overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-90 p-1">
              <span className="text-xs font-medium text-black !text-black text-center block" style={{ color: 'black' }}>
                {category.name}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;