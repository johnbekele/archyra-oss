/**
 * Size Showcase - Demonstrates AiCreating in all sizes
 * Shows how the animation adapts to any container size
 */

'use client';

import { useState } from 'react';
import AiCreating from './AiCreating';

export default function SizeShowcase() {
  const [loadingStates, setLoadingStates] = useState({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    button1: false,
    button2: false,
    card: false,
  });

  const toggleLoading = (key: string) => {
    setLoadingStates(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));

    // Auto-stop after 4 seconds
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AiCreating - Flexible Sizes
          </h1>
          <p className="text-lg text-gray-600">
            Fits perfectly in buttons, cards, or any container size
          </p>
        </div>

        {/* Size Variants Grid */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Size Variants</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Extra Small */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Extra Small (xs)</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                <div style={{ width: '60px', height: '60px' }}>
                  <AiCreating isLoading={loadingStates.xs} size="xs" />
                </div>
              </div>
              <button
                onClick={() => toggleLoading('xs')}
                className="mt-3 w-full px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
              >
                {loadingStates.xs ? 'Running...' : 'Test XS'}
              </button>
              <p className="text-xs text-gray-500 mt-2">40px - 60px</p>
            </div>

            {/* Small */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Small (sm)</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                <div style={{ width: '100px', height: '100px' }}>
                  <AiCreating isLoading={loadingStates.sm} size="sm" />
                </div>
              </div>
              <button
                onClick={() => toggleLoading('sm')}
                className="mt-3 w-full px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
              >
                {loadingStates.sm ? 'Running...' : 'Test SM'}
              </button>
              <p className="text-xs text-gray-500 mt-2">80px - 120px</p>
            </div>

            {/* Medium */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Medium (md)</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                <div style={{ width: '200px', height: '150px' }}>
                  <AiCreating isLoading={loadingStates.md} size="md" />
                </div>
              </div>
              <button
                onClick={() => toggleLoading('md')}
                className="mt-3 w-full px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
              >
                {loadingStates.md ? 'Running...' : 'Test MD'}
              </button>
              <p className="text-xs text-gray-500 mt-2">150px - 200px</p>
            </div>

            {/* Large */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Large (lg)</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                <div style={{ width: '350px', height: '250px' }}>
                  <AiCreating isLoading={loadingStates.lg} size="lg" />
                </div>
              </div>
              <button
                onClick={() => toggleLoading('lg')}
                className="mt-3 w-full px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
              >
                {loadingStates.lg ? 'Running...' : 'Test LG'}
              </button>
              <p className="text-xs text-gray-500 mt-2">250px - 350px</p>
            </div>
          </div>
        </section>

        {/* Button Integration */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Button Integration</h2>

          <div className="space-y-6">
            {/* Inline Button with Animation */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Inline Loading Button</h3>
              <button
                onClick={() => toggleLoading('button1')}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
                disabled={loadingStates.button1}
              >
                {loadingStates.button1 ? (
                  <>
                    <div style={{ width: '40px', height: '40px' }}>
                      <AiCreating isLoading={true} size="xs" />
                    </div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Generate with AI</span>
                )}
              </button>
            </div>

            {/* Icon Button */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Icon Button (Square)</h3>
              <button
                onClick={() => toggleLoading('button2')}
                className="w-16 h-16 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all shadow-lg flex items-center justify-center"
                disabled={loadingStates.button2}
              >
                <div className="w-full h-full p-2">
                  <AiCreating isLoading={loadingStates.button2} size="xs" />
                </div>
              </button>
            </div>

            {/* Full Width Button */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Full Width Button</h3>
              <button
                onClick={() => toggleLoading('button2')}
                className="w-full h-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center gap-4"
                disabled={loadingStates.button2}
              >
                {loadingStates.button2 ? (
                  <>
                    <div style={{ width: '60px', height: '60px' }}>
                      <AiCreating isLoading={true} size="sm" />
                    </div>
                    <span className="text-lg font-semibold">AI is working...</span>
                  </>
                ) : (
                  <span className="text-lg font-semibold">Start AI Process</span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Card Integration */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Card Integration</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Small Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Small Card</h3>
              <div style={{ height: '120px' }}>
                <AiCreating isLoading={loadingStates.card} size="sm" />
              </div>
              <button
                onClick={() => toggleLoading('card')}
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {loadingStates.card ? 'Processing...' : 'Start'}
              </button>
            </div>

            {/* Medium Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medium Card</h3>
              <div style={{ height: '180px' }}>
                <AiCreating isLoading={loadingStates.card} size="md" />
              </div>
              <button
                onClick={() => toggleLoading('card')}
                className="mt-4 w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                {loadingStates.card ? 'Processing...' : 'Start'}
              </button>
            </div>

            {/* Large Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Large Card</h3>
              <div style={{ height: '250px' }}>
                <AiCreating isLoading={loadingStates.card} size="lg" />
              </div>
              <button
                onClick={() => toggleLoading('card')}
                className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                {loadingStates.card ? 'Processing...' : 'Start'}
              </button>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="bg-gray-900 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Usage Code</h2>

          <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-gray-100 font-mono">
              <code>{`// Button with animation
<button onClick={handleClick}>
  {isLoading ? (
    <div style={{ width: '40px', height: '40px' }}>
      <AiCreating isLoading={true} size="xs" />
    </div>
  ) : (
    'Click Me'
  )}
</button>

// Card with animation
<div style={{ height: '150px' }}>
  <AiCreating isLoading={isLoading} size="md" />
</div>

// All size options: 'xs' | 'sm' | 'md' | 'lg' | 'full'`}</code>
            </pre>
          </div>
        </section>

      </div>
    </div>
  );
}
