import { NextResponse } from 'next/server';

// This is a direct API route that specifically targets the confirmed endpoint
export async function GET() {
  try {
    // Use the confirmed correct endpoint
    const url = 'http://localhost:4000/api/Category/GetAll';
    console.log(`Fetching directly from: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add a timeout to avoid waiting too long
      signal: AbortSignal.timeout(5000),
    });
    
    if (!response.ok) {
      console.error(`Error response from ${url}: ${response.status}`);
      // If the direct request fails, try the mock API
      return fallbackToMock();
    }
    
    // Get the response data
    const text = await response.text();
    let data;
    
    try {
      data = JSON.parse(text);
      console.log('Successfully parsed JSON response');
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      console.log('Response text:', text);
      return fallbackToMock();
    }
    
    // Return the response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return fallbackToMock();
  }
}

// Fallback to mock data if the real API fails
async function fallbackToMock() {
  console.log('Falling back to mock data');
  
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

  // Return the mock data in the same format as the real API
  return NextResponse.json({
    success: true,
    data: categories,
    message: 'Categories retrieved successfully (MOCK DATA)'
  });
}
