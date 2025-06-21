import { NextResponse } from 'next/server';

// This is a server-side API route that will test the connection to your backend
// It bypasses CORS issues since it runs on the server
export async function GET() {
  try {
    // Try different possible endpoints, prioritizing the confirmed correct one
    const endpoints = [
      'http://localhost:4000/api/Category/GetAll', // This is the confirmed correct endpoint
      'http://localhost:4000/api/categories',
      'http://localhost:4000/categories',
      'http://localhost:4000/Category/GetAll',
      'http://localhost:4000/api/category',
      'http://localhost:4000/api/Category'
    ];

    const results = [];

    for (const endpoint of endpoints) {
      try {
        console.log(`Testing endpoint: ${endpoint}`);
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add a short timeout to avoid waiting too long
          signal: AbortSignal.timeout(3000),
        });

        const status = response.status;
        let data;

        try {
          // Try to parse as JSON
          data = await response.json();
        } catch {
          // If not JSON, get as text
          data = await response.text();
        }

        results.push({
          endpoint,
          status,
          success: response.ok,
          data: typeof data === 'string' ? (data.length > 500 ? data.substring(0, 500) + '...' : data) : data
        });

        if (response.ok) {
          // If we got a successful response, we can stop testing
          break;
        }
      } catch (error) {
        results.push({
          endpoint,
          success: false,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    return NextResponse.json({
      success: results.some(r => r.success),
      results
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
