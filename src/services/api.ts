// API service for interacting with the backend

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:4000';
const CATEGORY_ENDPOINT = `${API_BASE_URL}/api/Category/GetAll`;

// For debugging
console.log('API_BASE_URL:', API_BASE_URL);
console.log('CATEGORY_ENDPOINT:', CATEGORY_ENDPOINT);

// Type definitions
export interface Category {
  _id: string;
  id?: string; // Some APIs might use id instead of _id
  name: string;
  description?: string;
  imageUrl?: string;
  image?: string;
  subCategories?: any[];
}

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    console.log('Fetching categories from:', CATEGORY_ENDPOINT);

    // Try direct API call first
    try {
      const response = await fetch(CATEGORY_ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add a timeout to avoid waiting too long
        signal: AbortSignal.timeout(5000),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const text = await response.text();
      console.log('Response text length:', text.length);

      if (!text) {
        throw new Error('Empty response from API');
      }

      try {
        const data = JSON.parse(text);
        console.log('Parsed data:', data);

        if (data && data.succeeded && Array.isArray(data.data)) {
          console.log('Successfully fetched categories from API');

          return data.data.map((item: any) => ({
            _id: item.id || item._id,
            name: item.name,
            description: item.description || '',
            image: item.imageUrl || item.image || ''
          }));
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error('Failed to parse API response');
      }
    } catch (directError) {
      console.error('Error fetching from direct API:', directError);

      // If direct API fails, try the proxy
      console.log('Trying proxy endpoint');
      const proxyUrl = '/api/proxy/api/Category/GetAll';

      try {
        const proxyResponse = await fetch(proxyUrl);
        const proxyData = await proxyResponse.json();

        if (proxyData && Array.isArray(proxyData.data)) {
          console.log('Successfully fetched categories from proxy');

          return proxyData.data.map((item: any) => ({
            _id: item.id || item._id,
            name: item.name,
            description: item.description || '',
            image: item.imageUrl || item.image || ''
          }));
        }
      } catch (proxyError) {
        console.error('Error fetching from proxy:', proxyError);
      }

      // If proxy fails, try the direct categories endpoint
      console.log('Trying direct categories endpoint');
      const directUrl = '/api/direct-categories';

      try {
        const directResponse = await fetch(directUrl);
        const directData = await directResponse.json();

        if (directData && Array.isArray(directData.data)) {
          console.log('Successfully fetched categories from direct endpoint');

          return directData.data.map((item: any) => ({
            _id: item.id || item._id,
            name: item.name,
            description: item.description || '',
            image: item.imageUrl || item.image || ''
          }));
        }
      } catch (directError) {
        console.error('Error fetching from direct endpoint:', directError);
      }

      // If all else fails, use mock data
      console.log('Using mock data');
      return getMockCategories();
    }
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    return getMockCategories();
  }
};

// Get full image URL
export const getImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '/images/categories/categoryimg.jpg'; // Fallback image

  // If the URL already includes the domain, return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // If the URL starts with a slash, append it to the API base URL
  if (imageUrl.startsWith('/')) {
    return `${API_BASE_URL}${imageUrl}`;
  }

  // Otherwise, assume it's a relative path and construct the URL
  return `${API_BASE_URL}/uploads/${imageUrl}`;
};

// Mock data for fallback
const getMockCategories = (): Category[] => {
  return [
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
};
