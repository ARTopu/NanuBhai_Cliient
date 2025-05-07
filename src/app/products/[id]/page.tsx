'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ProductDetailCard from '@/components/products/ProductDetailCard';

// Sample product data
const products = [
  {
    id: 1,
    title: 'Piping nozzles for cake decoration',
    images: [
      { id: 1, src: '/images/product1.jpg', alt: 'Piping nozzles front view' },
      { id: 2, src: '/images/product1-2.jpg', alt: 'Piping nozzles side view' },
      { id: 3, src: '/images/product1-3.jpg', alt: 'Piping nozzles in use' },
    ],
    price: 649.00,
    originalPrice: 850.00,
    discount: 24,
    freeShipping: true,
    description: "Professional-grade piping nozzles for cake decoration, perfect for creating beautiful designs on cakes, cupcakes, and pastries. This set includes various nozzle shapes for different patterns and textures. Made from high-quality stainless steel that is durable and easy to clean. Ideal for both beginners and experienced bakers looking to elevate their cake decorating skills.",
  },
  {
    id: 2,
    title: 'Professional kitchen knife set',
    images: [
      { id: 1, src: '/images/product2.jpg', alt: 'Kitchen knife set' },
      { id: 2, src: '/images/product2-2.jpg', alt: 'Kitchen knife set open view' },
      { id: 3, src: '/images/product2-3.jpg', alt: 'Kitchen knife detail' },
    ],
    price: 1299.00,
    originalPrice: 1699.00,
    discount: 23,
    freeShipping: true,
    description: "Premium professional kitchen knife set featuring high-carbon stainless steel blades for precision cutting. The ergonomic handles provide comfort and control during food preparation. This comprehensive set includes chef's knife, bread knife, utility knife, paring knife, and kitchen shears. Perfect for home cooks and professional chefs who value quality and performance in their kitchen tools.",
  },
  {
    id: 3,
    title: 'Non-stick frying pan',
    images: [
      { id: 1, src: '/images/product3.jpg', alt: 'Non-stick frying pan' },
      { id: 2, src: '/images/product3-2.jpg', alt: 'Non-stick frying pan side view' },
      { id: 3, src: '/images/product3-3.jpg', alt: 'Non-stick frying pan in use' },
    ],
    price: 899.00,
    originalPrice: 1150.00,
    discount: 22,
    freeShipping: false,
    description: "High-quality non-stick frying pan with advanced coating for effortless cooking and cleaning. The heavy-duty construction ensures even heat distribution for perfect cooking results every time. Features a comfortable, heat-resistant handle and is suitable for all stovetops including induction. Ideal for everyday cooking, from perfect omelets to searing meats and sautéing vegetables.",
  },
  {
    id: 4,
    title: 'Electric hand mixer',
    images: [
      { id: 1, src: '/images/product4.jpg', alt: 'Electric hand mixer' },
      { id: 2, src: '/images/product4-2.jpg', alt: 'Electric hand mixer with attachments' },
      { id: 3, src: '/images/product4-3.jpg', alt: 'Electric hand mixer in use' },
    ],
    price: 1499.00,
    originalPrice: 1899.00,
    discount: 21,
    freeShipping: true,
    description: "Powerful electric hand mixer with multiple speed settings for versatile mixing capabilities. This lightweight yet durable mixer comes with various attachments including beaters, dough hooks, and a whisk for all your baking needs. The ergonomic design reduces hand fatigue during extended use. Perfect for whipping cream, beating eggs, mixing cake batters, and kneading dough with professional results.",
  },
  {
    id: 5,
    title: 'Silicone baking mat set',
    images: [
      { id: 1, src: '/images/product5.jpg', alt: 'Silicone baking mat set' },
      { id: 2, src: '/images/product5-2.jpg', alt: 'Silicone baking mat in use' },
      { id: 3, src: '/images/product5-3.jpg', alt: 'Silicone baking mat with measurements' },
    ],
    price: 549.00,
    originalPrice: 699.00,
    discount: 21,
    freeShipping: true,
    description: "Premium silicone baking mat set that provides a non-stick surface for all your baking needs. These reusable mats eliminate the need for parchment paper or cooking sprays, making them eco-friendly and cost-effective. Heat resistant up to 480°F, they're perfect for baking cookies, pastries, and bread. The mats feature helpful measurement markings and are dishwasher safe for easy cleaning.",
  },
];

export default function ProductPage() {
  const params = useParams();
  const productId = Number(params.id);

  // Find the product by ID
  const product = products.find(p => p.id === productId);

  // Fallback product if not found
  const fallbackProduct = {
    id: 0,
    title: 'Product Not Found',
    images: [
      { id: 1, src: '/images/categories/categoryimg.jpg', alt: 'Product not found' },
      { id: 2, src: '/images/categories/categoryimg.jpg', alt: 'Product not found' },
      { id: 3, src: '/images/categories/categoryimg.jpg', alt: 'Product not found' },
    ],
    price: 0,
    originalPrice: 0,
    discount: 0,
    freeShipping: false,
    description: "The requested product could not be found.",
  };

  return (
    <div className="flex flex-col bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <ProductDetailCard product={product || fallbackProduct} />
      </div>
    </div>
  );
}
