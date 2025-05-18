'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '../ui/AddToCartButton';

// Define product type
interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  freeShipping: boolean;
}

// Define props type
interface CategoryProductListProps {
  categoryId: number;
  categoryName: string;
}

const CategoryProductList: React.FC<CategoryProductListProps> = ({ categoryId, categoryName }) => {
  // Sample product data - in a real app, this would be fetched based on the categoryId
  const products: Product[] = [
    {
      id: 1,
      title: 'Piping nozzles for cake decoration',
      image: '/images/product1.jpg', // Using placeholder image
      price: 649.00,
      originalPrice: 850.00,
      discount: 24,
      freeShipping: true,
    },
    {
      id: 2,
      title: 'Professional kitchen knife set',
      image: '/images/product2.jpg', // Using placeholder image
      price: 1299.00,
      originalPrice: 1699.00,
      discount: 23,
      freeShipping: true,
    },
    {
      id: 3,
      title: 'Non-stick frying pan',
      image: '/images/product3.jpg', // Using placeholder image
      price: 899.00,
      originalPrice: 1150.00,
      discount: 22,
      freeShipping: false,
    },
    {
      id: 4,
      title: 'Electric hand mixer',
      image: '/images/product4.jpg', // Using placeholder image
      price: 1499.00,
      originalPrice: 1899.00,
      discount: 21,
      freeShipping: true,
    },
    {
      id: 5,
      title: 'Silicone baking mat set',
      image: '/images/product5.jpg', // Using placeholder image
      price: 549.00,
      originalPrice: 699.00,
      discount: 21,
      freeShipping: true,
    },
    {
      id: 6,
      title: 'Digital kitchen scale',
      image: '/images/product6.jpg', // Using placeholder image
      price: 799.00,
      originalPrice: 999.00,
      discount: 20,
      freeShipping: false,
    },
    {
      id: 7,
      title: 'Stainless steel mixing bowls',
      image: '/images/product6.jpg', // Using placeholder image
      price: 899.00,
      originalPrice: 1099.00,
      discount: 18,
      freeShipping: true,
    },
    {
      id: 8,
      title: 'Ceramic dinner plate set',
      image: '/images/product5.jpg', // Using placeholder image
      price: 1299.00,
      originalPrice: 1599.00,
      discount: 19,
      freeShipping: true,
    },
    {
      id: 9,
      title: 'Glass food storage containers',
      image: '/images/product4.jpg', // Using placeholder image
      price: 749.00,
      originalPrice: 899.00,
      discount: 17,
      freeShipping: false,
    },
    {
      id: 10,
      title: 'Wooden cutting board',
      image: '/images/product3.jpg', // Using placeholder image
      price: 599.00,
      originalPrice: 699.00,
      discount: 14,
      freeShipping: true,
    },
    {
      id: 11,
      title: 'Silicone spatula set',
      image: '/images/product2.jpg', // Using placeholder image
      price: 349.00,
      originalPrice: 399.00,
      discount: 13,
      freeShipping: true,
    },
    {
      id: 12,
      title: 'Coffee grinder',
      image: '/images/product1.jpg', // Using placeholder image
      price: 1199.00,
      originalPrice: 1399.00,
      discount: 14,
      freeShipping: true,
    },
  ];

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-black mb-6 !text-black" style={{ color: 'black' }}>
          {categoryName}
        </h2>

        {/* Search Bar */}
        <div className="relative flex items-center mb-8">
          <input
            type="search"
            placeholder={`Search in ${categoryName}`}
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

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-2 sm:px-4">
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="block h-full"
            >
              <article
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 h-full cursor-pointer"
              >
              {/* Product Image with Discount Badge */}
              <figure className="relative aspect-square">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Product Image</span>
                </div>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                  {product.discount}% off
                </div>
              </figure>

              {/* Product Details */}
              <div className="p-2 flex flex-col flex-grow">
                <h3 className="text-sm font-bold mb-1 line-clamp-2" style={{ color: '#000000' }} title={product.title}>
                  {product.title}
                </h3>

                {product.freeShipping && (
                  <span className="text-[10px] text-green-600 font-medium mb-1">Free Shipping</span>
                )}

                <div className="mt-auto">
                  <div className="mb-2 text-center">
                    <span className="text-sm font-bold" style={{ color: '#000000' }}>৳{product.price.toFixed(2)}</span>
                    <span className="ml-2 text-xs text-gray-500 line-through">৳{product.originalPrice.toFixed(2)}</span>
                  </div>
                  <AddToCartButton
                    productId={product.id}
                    productName={product.title}
                    productPrice={product.price}
                    productImage={product.image}
                  />
                </div>
              </div>
            </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryProductList;
