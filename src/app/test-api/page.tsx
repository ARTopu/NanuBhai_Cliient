"use client";

import React, { useEffect, useState } from 'react';
import { fetchCategories } from '@/services/api';

export default function TestApiPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testApi = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data);
        console.log('API Test - Categories loaded:', data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        console.error('API Test - Error:', err);
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">API Connection Test</h1>
      
      {loading && (
        <div className="bg-blue-100 p-4 rounded">
          <p>Loading categories from API...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 p-4 rounded mb-4">
          <h2 className="font-bold text-red-800">Error:</h2>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-green-100 p-4 rounded mb-4">
          <h2 className="font-bold text-green-800">Success!</h2>
          <p className="text-green-700">
            Connected to API successfully. Found {categories.length} categories.
          </p>
        </div>
      )}

      {categories.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Categories from API:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div key={category._id} className="border p-4 rounded">
                <h3 className="font-bold">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
                {category.subCategories && category.subCategories.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold">Sub-categories:</p>
                    <ul className="text-xs text-gray-500">
                      {category.subCategories.map((sub: any) => (
                        <li key={sub._id}>• {sub.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">API Information:</h3>
        <ul className="text-sm space-y-1">
          <li>• API Base URL: http://localhost:4000</li>
          <li>• Categories Endpoint: /api/category/GetAll</li>
          <li>• Full URL: http://localhost:4000/api/category/GetAll</li>
        </ul>
      </div>
    </div>
  );
} 