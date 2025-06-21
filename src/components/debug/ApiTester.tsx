'use client';

import React, { useState, useEffect } from 'react';
import { fetchCategories } from '@/services/api';

const ApiTester: React.FC = () => {
  const [testResults, setTestResults] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [manualUrl, setManualUrl] = useState('http://localhost:4000/api/categories');
  const [manualResponse, setManualResponse] = useState<any>(null);
  const [manualLoading, setManualLoading] = useState(false);
  const [manualError, setManualError] = useState<string | null>(null);

  useEffect(() => {
    const runTests = async () => {
      setLoading(true);
      const results: any = {};

      // Test 1: API Connection
      try {
        // Test direct connection to the API
        const response = await fetch('http://localhost:4000/api/Category/GetAll');
        results.connectionTest = {
          success: response.ok,
          status: response.status,
          statusText: response.statusText
        };
      } catch (error) {
        results.connectionTest = { success: false, error: String(error) };
      }

      // Test 2: Fetch Categories
      try {
        const categories = await fetchCategories();
        results.categoriesTest = {
          success: categories && categories.length > 0,
          count: categories.length,
          data: categories.slice(0, 3) // Just show first 3 for brevity
        };
      } catch (error) {
        results.categoriesTest = { success: false, error: String(error) };
      }

      setTestResults(results);
      setLoading(false);
    };

    runTests();
  }, []);

  const handleManualFetch = async () => {
    setManualLoading(true);
    setManualError(null);
    setManualResponse(null);

    try {
      const response = await fetch(manualUrl);
      const text = await response.text();

      try {
        // Try to parse as JSON
        const json = JSON.parse(text);
        setManualResponse({
          status: response.status,
          ok: response.ok,
          data: json
        });
      } catch (e) {
        // If not JSON, show as text
        setManualResponse({
          status: response.status,
          ok: response.ok,
          text: text
        });
      }
    } catch (error) {
      setManualError(String(error));
    } finally {
      setManualLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">API Connection Tester</h2>

      {loading ? (
        <div className="text-center py-4">
          <p>Running API tests...</p>
        </div>
      ) : (
        <div>
          <h3 className="font-bold mt-4 mb-2">1. API Connection Test</h3>
          <div className="bg-gray-100 p-3 rounded">
            <p>Success: <span className={testResults.connectionTest?.success ? "text-green-600" : "text-red-600"}>
              {String(testResults.connectionTest?.success)}
            </span></p>
            {testResults.connectionTest?.status && (
              <p>Status: {testResults.connectionTest.status} {testResults.connectionTest.statusText}</p>
            )}
            {testResults.connectionTest?.error && (
              <p className="text-red-600">Error: {testResults.connectionTest.error}</p>
            )}
          </div>

          <h3 className="font-bold mt-4 mb-2">2. Categories Fetch Test</h3>
          <div className="bg-gray-100 p-3 rounded">
            <p>Success: <span className={testResults.categoriesTest?.success ? "text-green-600" : "text-red-600"}>
              {String(testResults.categoriesTest?.success)}
            </span></p>
            {testResults.categoriesTest?.count !== undefined && (
              <p>Categories Count: {testResults.categoriesTest.count}</p>
            )}
            {testResults.categoriesTest?.error && (
              <p className="text-red-600">Error: {testResults.categoriesTest.error}</p>
            )}
            {testResults.categoriesTest?.data && (
              <div className="mt-2">
                <p className="font-semibold">Sample Data:</p>
                <pre className="bg-gray-800 text-white p-2 rounded text-xs mt-1 overflow-auto max-h-40">
                  {JSON.stringify(testResults.categoriesTest.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <h3 className="font-bold mt-4 mb-2">3. Manual API Test</h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Enter API URL to test"
            />
            <button
              onClick={handleManualFetch}
              disabled={manualLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:bg-blue-300"
            >
              {manualLoading ? 'Testing...' : 'Test'}
            </button>
          </div>

          {manualError && (
            <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded mb-3">
              <p className="font-semibold">Error:</p>
              <p>{manualError}</p>
            </div>
          )}

          {manualResponse && (
            <div className="bg-gray-100 p-3 rounded">
              <p>Status: <span className={manualResponse.ok ? "text-green-600" : "text-red-600"}>
                {manualResponse.status} {manualResponse.ok ? '(OK)' : '(Failed)'}
              </span></p>

              {manualResponse.data && (
                <div className="mt-2">
                  <p className="font-semibold">Response Data:</p>
                  <pre className="bg-gray-800 text-white p-2 rounded text-xs mt-1 overflow-auto max-h-40">
                    {JSON.stringify(manualResponse.data, null, 2)}
                  </pre>
                </div>
              )}

              {manualResponse.text && (
                <div className="mt-2">
                  <p className="font-semibold">Response Text:</p>
                  <pre className="bg-gray-800 text-white p-2 rounded text-xs mt-1 overflow-auto max-h-40">
                    {manualResponse.text}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-bold mb-2">Troubleshooting Tips</h3>
        <ul className="list-disc pl-5 text-sm">
          <li>Make sure your backend server is running at <code className="bg-gray-100 px-1">http://localhost:4000</code></li>
          <li>Check that CORS is properly configured on your backend to allow requests from <code className="bg-gray-100 px-1">http://localhost:3000</code></li>
          <li>Verify that the categories endpoint is available and returns data in the expected format</li>
          <li>Check your browser's developer console for any network errors</li>
          <li>Try accessing the API directly in your browser or using a tool like Postman</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiTester;
