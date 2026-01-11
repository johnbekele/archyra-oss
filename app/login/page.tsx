'use client';

import { useState } from 'react';
import FloatingLogin, { LoginData } from '../../FloatingLogin';

export default function LoginDemoPage() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [primaryColor, setPrimaryColor] = useState('#6366F1');
  const [floatIntensity, setFloatIntensity] = useState(5);
  const [floatingEnabled, setFloatingEnabled] = useState(true);
  const [lastLogin, setLastLogin] = useState<LoginData | null>(null);

  const handleLogin = (data: LoginData) => {
    console.log('Login data:', data);
    setLastLogin(data);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    alert('Google OAuth would be triggered here');
  };

  const handleAppleLogin = () => {
    console.log('Apple login clicked');
    alert('Apple Sign-In would be triggered here');
  };

  const colorOptions = [
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Emerald', value: '#10B981' },
    { name: 'Rose', value: '#F43F5E' },
    { name: 'Amber', value: '#F59E0B' },
    { name: 'Violet', value: '#8B5CF6' },
    { name: 'Cyan', value: '#06B6D4' },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        mode === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-100 to-gray-200'
      }`}
    >
      {/* Controls Panel - Fixed at top */}
      <div
        className={`sticky top-0 z-50 backdrop-blur-md border-b ${
          mode === 'dark' ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1
              className={`text-xl font-bold ${
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              FloatingLogin Demo
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              {/* Theme Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMode('light')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    mode === 'light'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => setMode('dark')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    mode === 'dark'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Dark
                </button>
              </div>

              {/* Color Picker */}
              <div className="flex items-center gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setPrimaryColor(color.value)}
                    className={`w-8 h-8 rounded-full transition-all ${
                      primaryColor === color.value
                        ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>

              {/* Float Intensity */}
              <div className="flex items-center gap-2">
                <span className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Float:
                </span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={floatIntensity}
                  onChange={(e) => setFloatIntensity(Number(e.target.value))}
                  className="w-20"
                />
                <span className={`text-sm font-mono ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {floatIntensity}
                </span>
              </div>

              {/* Floating Toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={floatingEnabled}
                  onChange={(e) => setFloatingEnabled(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Float
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Floating Login */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
        <FloatingLogin
          mode={mode}
          primaryColor={primaryColor}
          floatIntensity={floatIntensity}
          floatingEnabled={floatingEnabled}
          onLogin={handleLogin}
          onGoogleLogin={handleGoogleLogin}
          onAppleLogin={handleAppleLogin}
        />
      </div>

      {/* Last Login Result - Fixed bottom */}
      {lastLogin && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-xl shadow-lg max-w-xs ${
            mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
        >
          <h3 className="font-semibold mb-2">Last Login</h3>
          <pre className={`text-xs overflow-auto ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {JSON.stringify(lastLogin, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
