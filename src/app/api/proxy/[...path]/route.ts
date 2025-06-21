import { NextRequest, NextResponse } from 'next/server';

// This is a server-side API proxy that will forward requests to your backend
// It bypasses CORS issues since it runs on the server
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Get the path from the URL
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');

    // Special case for the confirmed endpoint
    if (path === 'Category/GetAll') {
      const backendUrl = `http://localhost:4000/api/Category/GetAll`;
      console.log(`Proxying request to confirmed endpoint: ${backendUrl}`);
      return proxyRequest(backendUrl);
    }

    // Forward the request to your backend
    const backendUrl = `http://localhost:4000/${path}`;
    console.log(`Proxying request to: ${backendUrl}`);
    return proxyRequest(backendUrl);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// Helper function to proxy a request to the given URL
async function proxyRequest(url: string) {
  try {

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add a timeout to avoid waiting too long
      signal: AbortSignal.timeout(5000),
    });

    // Get the response data
    let data;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Return the response
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Content-Type': contentType || 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy error for URL:', url, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
