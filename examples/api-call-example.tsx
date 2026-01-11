/**
 * Example 2: API Call with Animation
 *
 * This example shows how to use the AiCreating component
 * with a real API call, including error handling.
 */

'use client';

import { useState } from 'react';
import { AiCreating } from '../index';

interface GeneratedContent {
  text: string;
  timestamp: number;
}

export default function ApiCallExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async () => {
    // Reset states
    setIsLoading(true);
    setError(null);
    setContent(null);

    try {
      // Make API call
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Generate creative content',
          model: 'gpt-4',
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      // Stop animation
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Call Example</h1>

      {/* Show animation during loading */}
      {isLoading && (
        <div className="mb-6">
          <AiCreating
            isLoading={isLoading}
            onComplete={() => console.log('Content generated!')}
          />
        </div>
      )}

      {/* Show error if any */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Show generated content */}
      {content && !isLoading && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-semibold">Generated Content:</p>
          <p>{content.text}</p>
          <p className="text-sm mt-2">Generated at: {new Date(content.timestamp).toLocaleString()}</p>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={generateContent}
        disabled={isLoading}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating...' : 'Generate Content'}
      </button>
    </div>
  );
}
