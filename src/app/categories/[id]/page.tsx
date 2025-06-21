'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CategoryProductList from '@/components/categories/CategoryProductList';
import { fetchCategories } from '@/services/api';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const [categoryName, setCategoryName] = useState('Category');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const categories = await fetchCategories();
        const category = categories.find(cat => cat._id === categoryId);

        if (category) {
          setCategoryName(category.name);
        }
      } catch (error) {
        console.error('Error loading category:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [categoryId]);

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 py-4 md:py-6">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <CategoryProductList categoryId={categoryId} categoryName={categoryName} />
        )}
      </div>
    </div>
  );
}
