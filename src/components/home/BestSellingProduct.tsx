'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AddToCartButton from '../ui/AddToCartButton';
import axios from 'axios';

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
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/product/best-selling`);
        setProducts(res.data.data || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
        {loading ? (
          <div className="col-span-full text-center py-8">Loading...</div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-8">No best selling products found.</div>
        ) : products.map((product, index) => (
          <Link
            href={`/products/${product._id}`}
            key={product._id}
            className="block h-full cursor-pointer"
          >
            <article
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full animate-fadeIn"
              style={{ animation: `fadeIn 0.5s ease-out ${0.1 * index}s both` }}
            >
              {/* Product Image with Discount Badge */}
              <figure className="relative aspect-square">
                <Image
                  src={
                    product.imageUrl
                      ? product.imageUrl.startsWith('http')
                        ? product.imageUrl
                        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}${product.imageUrl}`
                      : '/images/product-placeholder.jpg'
                  }
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  className="object-cover"
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                    {product.discountPercentage}% off
                  </div>
                )}
              </figure>

              {/* Product Details */}
              <div className="p-2 flex flex-col flex-grow">
                <h3 className="text-sm font-bold mb-1 line-clamp-2 text-black !text-black" style={{ color: 'black' }} title={product.name}>
                  {product.name}
                </h3>

                {product.freeDelivery && (
                  <span className="text-[10px] text-green-600 font-medium mb-1">Free Shipping</span>
                )}

                <div className="mt-auto">
                  <div className="mb-2 text-center">
                    <span className="text-sm font-bold text-black !text-black" style={{ color: 'black' }}>৳{product.price?.toFixed(2)}</span>
                    {product.previousPrice && (
                      <span className="ml-2 text-xs text-gray-500 line-through">৳{product.previousPrice?.toFixed(2)}</span>
                    )}
                  </div>
                  <AddToCartButton
                    productId={product._id}
                    productName={product.name}
                    productPrice={product.price}
                    productImage={product.imageUrl}
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
