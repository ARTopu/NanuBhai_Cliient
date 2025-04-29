'use client';

import React from 'react';
import { useParams } from 'next/navigation';

// Define the category data (same as in CategoryList.tsx)
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

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const categoryId = Number(params.id);
  
  // Find the category by ID
  const category = categories.find(cat => cat.id === categoryId);
  
  // Default category name if not found
  const categoryName = category ? category.name : 'Category';

  return (
    <div className="category-detail-layout">
      {children}
    </div>
  );
}
