'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ApiTester from '@/components/debug/ApiTester';

interface ServerTestResult {
  success: boolean;
  results?: Array<{
    endpoint: string;
    status?: number;
    success: boolean;
    data?: unknown;
    error?: string;
  }>;
}

export default function DebugPage() {
  const [serverTest, setServerTest] = useState<ServerTestResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runServerTest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      setServerTest(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">API Debug Page</h1>
      <p className="mb-6 text-gray-600">
        This page helps diagnose issues with the API connection. Use the tools below to test your API endpoints.
      </p>

      <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Server-Side API Test</h2>
        <p className="mb-4 text-sm">
          This test runs from the Next.js server and bypasses CORS issues. It&apos;s useful to determine if the problem is with CORS or if the API is actually unreachable.
        </p>

        <button
          onClick={runServerTest}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:bg-blue-300 mb-4"
        >
          {loading ? 'Testing...' : 'Run Server-Side Test'}
        </button>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded mb-3">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {serverTest && (
          <div className="bg-gray-100 p-3 rounded">
            <p>Success: <span className={serverTest.success ? "text-green-600" : "text-red-600"}>
              {String(serverTest.success)}
            </span></p>

            {serverTest.results && serverTest.results.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Results:</p>
                <div className="bg-white border border-gray-200 rounded mt-1">
                  {serverTest.results.map((result, index: number) => (
                    <div key={index} className={`p-2 ${index > 0 ? 'border-t border-gray-200' : ''} ${result.success ? 'bg-green-50' : ''}`}>
                      <p className="font-medium">{result.endpoint}</p>
                      <p className="text-xs">Status: <span className={result.success ? "text-green-600" : "text-red-600"}>
                        {result.status || 'Failed'}
                      </span></p>

                      {result.error && (
                        <p className="text-xs text-red-600 mt-1">Error: {result.error}</p>
                      )}

                      {result.data && (
                        <details className="mt-1">
                          <summary className="text-xs cursor-pointer">Response Data</summary>
                          <pre className="bg-gray-800 text-white p-2 rounded text-xs mt-1 overflow-auto max-h-40">
                            {typeof result.data === 'string'
                              ? result.data
                              : JSON.stringify(result.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ApiTester />

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Direct API Test</h2>
        <p className="mb-4 text-sm">
          We&apos;ve created a direct endpoint that specifically targets your confirmed API endpoint: <code className="bg-gray-100 px-1">http://localhost:4000/api/Category/GetAll</code>
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            Go to Home Page (will try direct endpoint)
          </Link>
          <a
            href="/api/direct-categories"
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            Test Direct Endpoint
          </a>
          <a
            href="http://localhost:4000/api/Category/GetAll"
            target="_blank"
            className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700"
          >
            Open Backend API Directly
          </a>
        </div>
      </div>

      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Use Mock Data</h2>
        <p className="mb-4 text-sm">
          If you can&apos;t get your backend working right now, you can use our mock data to continue development.
        </p>
        <div className="flex gap-2">
          <a
            href="/api/mock/categories"
            target="_blank"
            className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
          >
            View Mock API Response
          </a>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Common Backend Issues</h2>
        <ul className="list-disc pl-5 text-sm space-y-2">
          <li><strong>Backend Not Running:</strong> Make sure your Node.js server is running with <code className="bg-gray-100 px-1">npm start</code> or similar command.</li>
          <li><strong>Wrong Port:</strong> Verify your server is listening on port 4000. Check your server logs for the actual port.</li>
          <li><strong>CORS Issues:</strong> Your backend needs to allow requests from your frontend. Add this to your Express app:
            <pre className="bg-gray-800 text-white p-2 rounded text-xs mt-1">
{`const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));`}
            </pre>
          </li>
          <li><strong>Different API Structure:</strong> Your API might use different endpoints or response format than expected.</li>
          <li><strong>Network/Firewall Issues:</strong> Check if any firewall or network settings are blocking the connection.</li>
        </ul>
      </div>
    </div>
  );
}
