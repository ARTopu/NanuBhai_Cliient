'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductDetailCard from '@/components/products/ProductDetailCard';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

interface ProductDetail {
  id: number;
  title: string;
  images: ProductImage[];
  price: number;
  originalPrice: number;
  discount: number;
  freeShipping: boolean;
  description: string;
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${apiUrl}/api/product/${productId}`);
        const data = await res.json();
        if (!data.success && !data.succeeded) {
          setError('Product not found');
          setProduct(null);
        } else {
          const prod = data.product || data.data;
          if (!prod) {
            setError('Product not found');
            setProduct(null);
            return;
          }
          // Debug: log the product data
          console.log('Fetched product:', prod);

          // Prefer images array, fallback to imageUrl
          let images: ProductImage[] = [];
          if (prod.images && Array.isArray(prod.images) && prod.images.length > 0) {
            images = prod.images.map((img: any, idx: number) => ({
              id: typeof img._id === 'number' ? img._id : typeof img.id === 'number' ? img.id : idx,
              src: img.image && !img.image.startsWith('http')
                ? `${apiUrl}${img.image}`
                : img.image || '/images/product-placeholder.jpg',
              alt: prod.name || prod.title || 'Product image',
            }));
          } else if (prod.imageUrl) {
            images = [{
              id: 1,
              src: prod.imageUrl.startsWith('http')
                ? prod.imageUrl
                : `${apiUrl}${prod.imageUrl}`,
              alt: prod.name || prod.title || 'Product image',
            }];
          } else {
            images = [{
              id: 1,
              src: '/images/product-placeholder.jpg',
              alt: 'Product image',
            }];
          }

          setProduct({
            id: typeof prod._id === 'number' ? prod._id : typeof prod.id === 'number' ? prod.id : (typeof prod._id === 'string' && !isNaN(Number(prod._id)) ? Number(prod._id) : (typeof prod.id === 'string' && !isNaN(Number(prod.id)) ? Number(prod.id) : 0)),
            title: prod.name || prod.title,
            images,
            price: prod.price || 0,
            originalPrice: prod.previousPrice || prod.price || 0,
            discount:
              prod.discountPercentage ||
              (prod.previousPrice && prod.price
                ? Math.round(
                    ((prod.previousPrice - prod.price) / prod.previousPrice) * 100
                  )
                : 0),
            freeShipping:
              prod.freeDelivery === 'yes' || prod.freeDelivery === true,
            description: prod.description || '',
          });
        }
      } catch (err) {
        setError('Failed to fetch product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }
  if (error || !product) {
    return (
      <div className="flex flex-col justify-center items-center h-96 text-red-600">
        {error || 'Product not found'}
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <ProductDetailCard product={product} />
      </div>
    </div>
  );
}
