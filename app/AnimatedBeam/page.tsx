'use client';

import { useState, useRef } from 'react';
import { Copy, Check, Code2, Package, ChevronDown, Zap, Database, Cloud, Server, Globe, Lock } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import AnimatedBeam, { AnimatedBeamContainer, AnimatedBeamNode } from '../../AnimatedBeam';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function AnimatedBeamPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [curvature, setCurvature] = useState(50);
  const [duration, setDuration] = useState(2);
  const [pathWidth, setPathWidth] = useState(2);
  const [framework, setFramework] = useState<Framework>('react');

  // Refs for the demo
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { AnimatedBeam, AnimatedBeamContainer, AnimatedBeamNode } from 'archyra';
import { useRef } from 'react';

function ConnectionDemo() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const node1Ref = useRef(null);
  const node2Ref = useRef(null);

  return (
    <AnimatedBeamContainer ref={containerRef} className="relative p-8">
      {/* Center node */}
      <div className="flex justify-center mb-8">
        <AnimatedBeamNode ref={centerRef} size="lg" variant="primary">
          <Zap className="w-8 h-8" />
        </AnimatedBeamNode>
      </div>

      {/* Surrounding nodes */}
      <div className="flex justify-around">
        <AnimatedBeamNode ref={node1Ref}>Node 1</AnimatedBeamNode>
        <AnimatedBeamNode ref={node2Ref}>Node 2</AnimatedBeamNode>
      </div>

      {/* Animated beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={node1Ref}
        curvature={${curvature}}
        duration={${duration}}
        pathWidth={${pathWidth}}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={node2Ref}
        curvature={${curvature}}
        duration={${duration}}
        pathWidth={${pathWidth}}
        delay={0.5}
      />
    </AnimatedBeamContainer>
  );
}`;

  const vanillaCode = `<!-- HTML -->
<div class="beam-container">
  <div class="beam-node center" id="center">
    <svg><!-- Icon --></svg>
  </div>
  <div class="beam-nodes">
    <div class="beam-node" id="node1">Node 1</div>
    <div class="beam-node" id="node2">Node 2</div>
  </div>
  <svg class="beam-svg">
    <defs>
      <linearGradient id="beam-gradient">
        <stop offset="0%" stop-color="#6366f1" />
        <stop offset="100%" stop-color="#a855f7" />
      </linearGradient>
    </defs>
    <path class="beam-path" id="beam1"></path>
    <path class="beam-path" id="beam2"></path>
  </svg>
</div>

<!-- CSS -->
<style>
.beam-container {
  position: relative;
  padding: 40px;
}

.beam-node {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-weight: 600;
}

.beam-node.center {
  width: 80px;
  height: 80px;
  margin: 0 auto 32px;
  background: #f5f3ff;
  border-color: #c4b5fd;
}

.beam-nodes {
  display: flex;
  justify-content: space-around;
}

.beam-svg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: visible;
}

.beam-path {
  fill: none;
  stroke: url(#beam-gradient);
  stroke-width: ${pathWidth};
  stroke-dasharray: 200;
  animation: beam-flow ${duration}s linear infinite;
}

@keyframes beam-flow {
  0% { stroke-dashoffset: 200; }
  100% { stroke-dashoffset: -200; }
}

.beam-path:nth-child(2) {
  animation-delay: 0.5s;
}
</style>

<!-- JavaScript -->
<script>
function calculateBeamPath(from, to, container, curvature) {
  const cr = container.getBoundingClientRect();
  const fr = from.getBoundingClientRect();
  const tr = to.getBoundingClientRect();

  const x1 = fr.left - cr.left + fr.width / 2;
  const y1 = fr.top - cr.top + fr.height / 2;
  const x2 = tr.left - cr.left + tr.width / 2;
  const y2 = tr.top - cr.top + tr.height / 2;

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx*dx + dy*dy);
  const cx = midX + (-dy/dist) * curvature;
  const cy = midY + (dx/dist) * curvature;

  return \`M \${x1} \${y1} Q \${cx} \${cy} \${x2} \${y2}\`;
}

// Set paths
const container = document.querySelector('.beam-container');
const center = document.getElementById('center');
document.getElementById('beam1').setAttribute('d',
  calculateBeamPath(center, document.getElementById('node1'), container, ${curvature}));
document.getElementById('beam2').setAttribute('d',
  calculateBeamPath(center, document.getElementById('node2'), container, ${curvature}));
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="AnimatedBeam" description="SVG beam connecting elements with flow animation">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Curvature: {curvature}px</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={curvature}
              onChange={(e) => setCurvature(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Straight</span>
              <span>Curved</span>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Duration: {duration}s</h3>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Fast</span>
              <span>Slow</span>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Path Width: {pathWidth}px</h3>
            <input
              type="range"
              min="1"
              max="4"
              value={pathWidth}
              onChange={(e) => setPathWidth(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Thin</span>
              <span>Thick</span>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-blue-100 text-sm">Animated connection beams between elements</p>
            </div>
            <AnimatedBeamContainer ref={containerRef} className="p-8 bg-muted/30" style={{ minHeight: '400px' }}>
              {/* Center node */}
              <div className="flex justify-center mb-12">
                <AnimatedBeamNode ref={centerRef} size="lg" variant="primary">
                  <Zap className="w-8 h-8 text-violet-600" />
                </AnimatedBeamNode>
              </div>

              {/* Top row */}
              <div className="flex justify-around mb-12">
                <AnimatedBeamNode ref={node1Ref} variant="secondary">
                  <Database className="w-5 h-5 text-blue-500 mr-2" />
                  Database
                </AnimatedBeamNode>
                <AnimatedBeamNode ref={node2Ref} variant="secondary">
                  <Cloud className="w-5 h-5 text-cyan-500 mr-2" />
                  Cloud
                </AnimatedBeamNode>
              </div>

              {/* Bottom row */}
              <div className="flex justify-center">
                <AnimatedBeamNode ref={node3Ref} variant="secondary">
                  <Server className="w-5 h-5 text-emerald-500 mr-2" />
                  Server
                </AnimatedBeamNode>
              </div>

              {/* Beams */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={node1Ref}
                curvature={curvature}
                duration={duration}
                pathWidth={pathWidth}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={node2Ref}
                curvature={curvature}
                duration={duration}
                pathWidth={pathWidth}
                delay={0.3}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={node3Ref}
                curvature={curvature}
                duration={duration}
                pathWidth={pathWidth}
                delay={0.6}
              />
            </AnimatedBeamContainer>
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
