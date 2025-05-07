'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import CategoryProductList from '@/components/categories/CategoryProductList';

// Define the category data (same as in CategoryList.tsx)
const categories = [
  { id: 1, name: 'Cake Mold', image: '/images/categories/categoryimg.jpg' },
  { id: 2, name: 'Fondants and Tools', image: '/images/categories/categoryimg.jpg' },
  { id: 3, name: 'Nozzles and Piping bags', image: '/images/categories/categoryimg.jpg' },
  { id: 4, name: 'Cake Board and Boxes', image: '/images/categories/categoryimg.jpg' },
  { id: 5, name: 'Baking Tools', image: '/images/categories/categoryimg.jpg' },
  { id: 6, name: 'Cake Toppers', image: '/images/categories/categoryimg.jpg' },
  { id: 7, name: 'Cake Ingredients', image: '/images/categories/categoryimg.jpg' },
  { id: 8, name: 'Sprinkles and Decorations', image: '/images/categories/categoryimg.jpg' },
  { id: 9, name: 'Cake Flavors', image: '/images/categories/categoryimg.jpg' },
  { id: 10, name: 'Baking Pans', image: '/images/categories/categoryimg.jpg' },
  { id: 11, name: 'Measuring Tools', image: '/images/categories/categoryimg.jpg' },
  { id: 12, name: 'Cake Stands', image: '/images/categories/categoryimg.jpg' },
  { id: 13, name: 'Packaging Supplies', image: '/images/categories/categoryimg.jpg' },
  { id: 14, name: 'Edible Prints', image: '/images/categories/categoryimg.jpg' },
  { id: 15, name: 'Cake Decorating Kits', image: '/images/categories/categoryimg.jpg' },
  { id: 16, name: 'Baking Accessories', image: '/images/categories/categoryimg.jpg' },
];

export default function CategoryPage() {
  const params = useParams();
  const categoryId = Number(params.id);

  // Find the category by ID
  const category = categories.find(cat => cat.id === categoryId);

  // Default category name if not found
  const categoryName = category ? category.name : 'Category';

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 py-4 md:py-6">
        <CategoryProductList categoryId={categoryId} categoryName={categoryName} />
      </div>
    </div>
  );
}
