"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define the category data
const categories = [
  { id: 1, name: 'Cake Mold', image: '/images/categories/placeholder.svg' },
  { id: 2, name: 'Fondants and Tools', image: '/images/categories/placeholder.svg' },
  { id: 3, name: 'Nozzles and Piping bags', image: '/images/categories/placeholder.svg' },
  { id: 4, name: 'Cake Board and Boxes', image: '/images/categories/placeholder.svg' },
  { id: 5, name: 'Baking Tools', image: '/images/categories/placeholder.svg' },
  { id: 6, name: 'Cake Toppers', image: '/images/categories/placeholder.svg' },
  { id: 7, name: 'Cake Ingredients', image: '/images/categories/placeholder.svg' },
  { id: 8, name: 'Sprinkles and Decorations', image: '/images/categories/placeholder.svg' },
  { id: 9, name: 'Cake Flavors', image: '/images/categories/placeholder.svg' },
  { id: 10, name: 'Baking Pans', image: '/images/categories/placeholder.svg' },
  { id: 11, name: 'Measuring Tools', image: '/images/categories/placeholder.svg' },
  { id: 12, name: 'Cake Stands', image: '/images/categories/placeholder.svg' },
  { id: 13, name: 'Packaging Supplies', image: '/images/categories/placeholder.svg' },
  { id: 14, name: 'Edible Prints', image: '/images/categories/placeholder.svg' },
  { id: 15, name: 'Cake Decorating Kits', image: '/images/categories/placeholder.svg' },
  { id: 16, name: 'Baking Accessories', image: '/images/categories/placeholder.svg' },
];

const CategoryList: React.FC = () => {
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

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.id}`}
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-primary"
            >
              <figure className="relative aspect-square">
                {/* Fallback image if the actual image is not available */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-black text-sm font-bold !text-black" style={{ color: 'black' }}>{category.name}</span>
                </div>

                {/* Actual image */}
                <Image
                  src={category.image}
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
      </div>
    </section>
  );
};

export default CategoryList;
