'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AddToCartButton from '../ui/AddToCartButton';

// Sample product data
const products = [
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

// Hero slider data
const slides = [
  {
    id: 1,
    image: '/images/best_selling_hero_image.jpg',
    alt: 'Best selling products',
    title: 'Top Products of the Month',
    subtitle: 'Discover our most popular items',
  },
];

const BestSellingProduct = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="py-8 md:py-12"
    >
      {/* Section Header */}
      <div
        className="text-center mb-6 animate-fadeIn"
        style={{ animation: 'fadeIn 0.6s ease-out' }}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-black !text-black" style={{ color: 'black' }}>Best Selling Products</h2>
      </div>

      {/* Hero Banner */}
      <div
        className="relative w-full h-[200px] md:h-[300px] overflow-hidden rounded-2xl shadow-lg mx-auto mb-8 max-w-[95%]"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">{slide.title}</h2>
                <p className="text-lg md:text-xl text-white">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-2 sm:px-4"
      >
        {products.map((product, index) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="block h-full cursor-pointer"
          >
            <article
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full animate-fadeIn"
              style={{ animation: `fadeIn 0.5s ease-out ${0.1 * index}s both` }}
            >
              {/* Product Image with Discount Badge */}
              <figure className="relative aspect-square">
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
                <h3 className="text-sm font-bold mb-1 line-clamp-2 text-black !text-black" style={{ color: 'black' }} title={product.title}>
                  {product.title}
                </h3>

                {product.freeShipping && (
                  <span className="text-[10px] text-green-600 font-medium mb-1">Free Shipping</span>
                )}

                <div className="mt-auto">
                  <div className="mb-2 text-center">
                    <span className="text-sm font-bold text-black !text-black" style={{ color: 'black' }}>৳{product.price.toFixed(2)}</span>
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
    </section>
  );
};

export default BestSellingProduct;
