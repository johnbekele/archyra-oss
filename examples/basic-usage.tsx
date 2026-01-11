/**
 * Example 1: Basic Usage
 *
 * This example demonstrates the simplest way to use the AiCreating component
 * with a button to start and stop the animation.
 */

'use client';

import { useState } from 'react';
import { AiCreating } from '../index';

export default function BasicUsageExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setIsLoading(true);

    // Simulate a 5-second process
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Basic Usage Example</h1>

      {/* Animation Component */}
      <AiCreating
        isLoading={isLoading}
        onComplete={() => console.log('Animation completed!')}
      />

      {/* Control Button */}
      <button
        onClick={handleStart}
        disabled={isLoading}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
      >
        {isLoading ? 'Processing...' : 'Start Animation'}
      </button>
    </div>
  );
}
