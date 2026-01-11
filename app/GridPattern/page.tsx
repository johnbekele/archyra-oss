'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import GridPattern, { DotPattern, HexagonPattern, DiagonalLines } from '../../GridPattern';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';
type PatternType = 'grid' | 'dots' | 'hexagon' | 'diagonal';

export default function GridPatternPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [patternType, setPatternType] = useState<PatternType>('grid');
  const [cellSize, setCellSize] = useState(40);
  const [fadeEdges, setFadeEdges] = useState(true);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { GridPattern, DotPattern, HexagonPattern, DiagonalLines } from 'archyra';

// Line grid pattern
<GridPattern
  cellSize={${cellSize}}
  fadeEdges={${fadeEdges}}
  strokeColor="rgba(255, 255, 255, 0.1)"
  className="absolute inset-0 -z-10"
>
  <YourContent />
</GridPattern>

// Dot pattern
<DotPattern
  spacing={24}
  dotSize={1.5}
  fadeEdges={${fadeEdges}}
  animated
  className="absolute inset-0"
/>

// Hexagon pattern
<HexagonPattern
  size={30}
  fadeEdges={${fadeEdges}}
  className="absolute inset-0"
/>

// Diagonal lines
<DiagonalLines
  spacing={20}
  angle={45}
  fadeEdges={${fadeEdges}}
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="pattern-container">
  <svg class="grid-pattern">
    <defs>
      <pattern id="grid" width="${cellSize}" height="${cellSize}" patternUnits="userSpaceOnUse">
        <line x1="${cellSize}" y1="0" x2="${cellSize}" y2="${cellSize}" stroke="rgba(255,255,255,0.1)" />
        <line x1="0" y1="${cellSize}" x2="${cellSize}" y2="${cellSize}" stroke="rgba(255,255,255,0.1)" />
      </pattern>
      ${fadeEdges ? `<radialGradient id="fade" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="white" />
        <stop offset="100%" stop-color="black" />
      </radialGradient>
      <mask id="fade-mask">
        <rect width="100%" height="100%" fill="url(#fade)" />
      </mask>` : ''}
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" ${fadeEdges ? 'mask="url(#fade-mask)"' : ''} />
  </svg>
  <div class="content">Your Content Here</div>
</div>

<!-- CSS -->
<style>
.pattern-container {
  position: relative;
  overflow: hidden;
  background: #09090b;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.content {
  position: relative;
  z-index: 10;
}
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  const renderPattern = () => {
    const commonProps = {
      fadeEdges,
      backgroundColor: '#09090b',
      className: 'absolute inset-0',
    };

    switch (patternType) {
      case 'dots':
        return <DotPattern spacing={cellSize * 0.6} {...commonProps} />;
      case 'hexagon':
        return <HexagonPattern size={cellSize * 0.75} {...commonProps} />;
      case 'diagonal':
        return <DiagonalLines spacing={cellSize * 0.5} {...commonProps} />;
      default:
        return <GridPattern cellSize={cellSize} {...commonProps} />;
    }
  };

  return (
    <DashboardLayout title="GridPattern" description="Versatile background pattern components">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Pattern Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {(['grid', 'dots', 'hexagon', 'diagonal'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setPatternType(type)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize ${
                    patternType === type
                      ? 'bg-violet-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Cell Size: {cellSize}px</h3>
            <input
              type="range"
              min="20"
              max="80"
              value={cellSize}
              onChange={(e) => setCellSize(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={fadeEdges}
                onChange={(e) => setFadeEdges(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Fade edges</span>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-zinc-700 to-zinc-800 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-zinc-300 text-sm capitalize">{patternType} pattern background</p>
            </div>
            <div className="relative" style={{ height: '400px' }}>
              {renderPattern()}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Beautiful Patterns
                </h1>
                <p className="text-lg text-white/70 max-w-md">
                  Versatile background patterns for modern web design
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3">
                <h3 className="font-semibold text-white">Dot Pattern</h3>
              </div>
              <div className="relative h-40">
                <DotPattern
                  spacing={20}
                  fadeEdges
                  backgroundColor="#09090b"
                  className="absolute inset-0"
                />
                <div className="relative z-10 flex items-center justify-center h-full">
                  <span className="text-white font-medium">Animated Dots</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-4 py-3">
                <h3 className="font-semibold text-white">Hexagon Pattern</h3>
              </div>
              <div className="relative h-40">
                <HexagonPattern
                  size={25}
                  fadeEdges
                  backgroundColor="#09090b"
                  className="absolute inset-0"
                />
                <div className="relative z-10 flex items-center justify-center h-full">
                  <span className="text-white font-medium">Honeycomb</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Usage</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1 ml-2">
                        {framework === 'react' ? 'React' : 'Vanilla'}
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => setFramework('react')}>
                        React + Framer Motion
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFramework('vanilla')}>
                        Vanilla HTML/CSS/JS
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <button onClick={() => copyToClipboard(usageCode, 'usage')} className="flex items-center gap-1 px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors">
                  {copied === 'usage' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === 'usage' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-zinc-950 overflow-x-auto max-h-[300px]">
                <pre className="text-xs text-zinc-100 font-mono"><code>{usageCode}</code></pre>
              </div>
            </div>

            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Installation</span>
                </div>
                <button onClick={() => copyToClipboard(installCode, 'install')} className="flex items-center gap-1 px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors">
                  {copied === 'install' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === 'install' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-zinc-950">
                <pre className="text-xs text-zinc-100 font-mono"><code>{installCode}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
