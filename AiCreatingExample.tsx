'use client';

import { useState } from 'react';
import AiCreating from './AiCreating';

export default function AiCreatingExample() {
  const [isLoading, setIsLoading] = useState(true);

  const handleStartLoading = () => {
    setIsLoading(true);

    // Simulate an async operation (API call, data processing, etc.)
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Complete after 5 seconds
  };

  const handleComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Creating Animation</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Animation Demo</h2>

          <AiCreating isLoading={isLoading} onComplete={handleComplete} />

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleStartLoading}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Start Animation'}
            </button>

            <button
              onClick={() => setIsLoading(false)}
              disabled={!isLoading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Complete Now
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Usage</h2>
          <pre className="bg-gray-50 p-4 rounded overflow-x-auto">
            <code>{`import AiCreating from './animations/AiCreating';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);

  // Your async operation
  const fetchData = async () => {
    setIsLoading(true);
    await someAsyncOperation();
    setIsLoading(false);
  };

  return (
    <AiCreating
      isLoading={isLoading}
      onComplete={() => console.log('Done!')}
    />
  );
}`}</code>
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Animation Stages</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>1. Thinking (0-1.5s):</strong> Man appears with thought bubble and lightbulb idea</li>
            <li><strong>2. Writing (1.5-3.5s):</strong> Wall appears and man writes lines on it</li>
            <li><strong>3. Building (3.5s+):</strong> Blocks stack up one by one</li>
            <li><strong>4. Complete:</strong> Top block turns green with checkmark when isLoading = false</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
