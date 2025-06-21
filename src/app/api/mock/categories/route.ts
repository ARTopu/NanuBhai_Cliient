import { NextResponse } from 'next/server';

// This is a mock API that returns sample category data
// Use this for testing when your real backend is not available
export async function GET() {
  // Sample category data
  const categories = [
    {
      _id: '1',
      name: 'Cake Mold',
      description: 'Various cake molds for baking',
      image: '/images/categories/categoryimg.jpg'
    },
    {
      _id: '2',
      name: 'Fondants',
      description: 'Fondant supplies for cake decoration',
      image: '/images/categories/categoryimg.jpg'
    },
    {
      _id: '3',
      name: 'Nozzles',
      description: 'Piping nozzles for cake decoration',
      image: '/images/categories/categoryimg.jpg'
    },
    {
      _id: '4',
      name: 'Cake Board',
      description: 'Cake boards for presentation',
      image: '/images/categories/categoryimg.jpg'
    },
    {
      _id: '5',
      name: 'Baking Tools',
      description: 'Essential tools for baking',
      image: '/images/categories/categoryimg.jpg'
    },
    {
      _id: '6',
      name: 'Cake Toppers',
      description: 'Decorative toppers for cakes',
      image: '/images/categories/categoryimg.jpg'
    }
  ];

  // Return the mock data
  return NextResponse.json({
    success: true,
    data: categories,
    message: 'Categories retrieved successfully'
  });
}
