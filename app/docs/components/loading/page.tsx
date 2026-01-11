'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, ArrowRight, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FrameworkCodeBlock } from '@/components/docs/FrameworkCodeBlock';

export default function LoadingComponentsPage() {
  const components = [
    {
      name: 'LoadingDots',
      description: 'Simple, elegant bouncing dots animation. Perfect for minimal loading states.',
      href: '/LoadingDots',
      props: [
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the dots' },
        { name: 'color', type: 'string', default: "'currentColor'", description: 'Color of the dots' },
      ],
      reactCode: `import { LoadingDots } from 'archyra';

<LoadingDots size="md" />
<LoadingDots size="lg" color="#8B5CF6" />`,
      vanillaCode: `<!-- HTML -->
<div class="loading-dots">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>

<!-- CSS -->
<style>
.loading-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.loading-dots .dot {
  width: 10px;
  height: 10px;
  background-color: #6366F1;
  border-radius: 50%;
  animation: bounce 0.6s ease-in-out infinite;
}

.loading-dots .dot:nth-child(2) { animation-delay: 0.15s; }
.loading-dots .dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Size variants */
.loading-dots.sm .dot { width: 6px; height: 6px; }
.loading-dots.lg .dot { width: 14px; height: 14px; }
</style>`,
    },
    {
      name: 'PulseCircle',
      description: 'Pulsing circular animation with expanding rings. Great for attention-grabbing loaders.',
      href: '/PulseCircle',
      props: [
        { name: 'isActive', type: 'boolean', default: 'true', description: 'Activates the animation' },
        { name: 'progress', type: 'number', default: '-', description: 'External progress value (0-100)' },
        { name: 'onComplete', type: '() => void', default: '-', description: 'Callback when progress reaches 100%' },
      ],
      reactCode: `import { PulseCircle } from 'archyra';

function MyComponent() {
  const [isActive, setIsActive] = useState(false);

  return (
    <PulseCircle
      isActive={isActive}
      onComplete={() => setIsActive(false)}
    />
  );
}`,
      vanillaCode: `<!-- HTML -->
<div class="pulse-circle">
  <div class="pulse-ring"></div>
  <div class="pulse-ring"></div>
  <div class="pulse-ring"></div>
  <svg class="progress-ring" viewBox="0 0 100 100">
    <circle class="progress-bg" cx="50" cy="50" r="45" />
    <circle class="progress-bar" cx="50" cy="50" r="45" />
  </svg>
  <div class="progress-text">0%</div>
</div>

<!-- CSS -->
<style>
.pulse-circle {
  position: relative;
  width: 128px;
  height: 128px;
}

.pulse-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid #60a5fa;
  animation: pulse-expand 2s ease-out infinite;
}

.pulse-ring:nth-child(2) { animation-delay: 0.6s; }
.pulse-ring:nth-child(3) { animation-delay: 1.2s; }

@keyframes pulse-expand {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}

.progress-ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-bg {
  fill: none;
  stroke: #e5e7eb;
  stroke-width: 6;
}

.progress-bar {
  fill: none;
  stroke: #3b82f6;
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  transition: stroke-dashoffset 0.3s ease;
}

.progress-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
}
</style>

<!-- JavaScript -->
<script>
class PulseCircle {
  constructor(element) {
    this.element = element;
    this.progressBar = element.querySelector('.progress-bar');
    this.progressText = element.querySelector('.progress-text');
    this.circumference = 2 * Math.PI * 45;
    this.progress = 0;
  }

  setProgress(value) {
    this.progress = Math.min(100, Math.max(0, value));
    const offset = this.circumference - (this.progress / 100) * this.circumference;
    this.progressBar.style.strokeDashoffset = offset;
    this.progressText.textContent = Math.round(this.progress) + '%';
  }

  start(onComplete) {
    const interval = setInterval(() => {
      this.setProgress(this.progress + Math.random() * 3 + 1);
      if (this.progress >= 100) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 100);
  }
}

// Usage:
const circle = new PulseCircle(document.querySelector('.pulse-circle'));
circle.start(() => console.log('Complete!'));
</script>`,
    },
    {
      name: 'ProgressBar',
      description: 'Animated progress bar with gradient, striped, and glow variants. Includes circular progress.',
      href: '/ProgressBar',
      props: [
        { name: 'value', type: 'number', default: '0', description: 'Progress value (0-100)' },
        { name: 'variant', type: "'default' | 'gradient' | 'striped' | 'glow'", default: "'default'", description: 'Visual style' },
        { name: 'color', type: "'blue' | 'green' | 'purple' | 'orange'", default: "'blue'", description: 'Color theme' },
        { name: 'showLabel', type: 'boolean', default: 'false', description: 'Show percentage label' },
        { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Show indeterminate animation' },
      ],
      reactCode: `import ProgressBar, { CircularProgress } from 'archyra';

<ProgressBar value={65} variant="gradient" showLabel />
<ProgressBar indeterminate />
<CircularProgress value={75} size={80} />`,
      vanillaCode: `<!-- HTML -->
<div class="progress-container">
  <div class="progress-bar gradient blue">
    <div class="progress-fill" style="width: 65%"></div>
    <div class="shimmer"></div>
  </div>
  <span class="progress-label">65%</span>
</div>

<!-- Indeterminate -->
<div class="progress-bar indeterminate blue">
  <div class="progress-fill"></div>
</div>

<!-- Circular -->
<div class="circular-progress" style="--value: 75">
  <svg viewBox="0 0 80 80">
    <circle class="bg" cx="40" cy="40" r="36"/>
    <circle class="fill" cx="40" cy="40" r="36"/>
  </svg>
  <span class="value">75%</span>
</div>

<!-- CSS -->
<style>
.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  position: relative;
  height: 12px;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
  flex: 1;
}

.progress-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.5s ease-out;
}

.progress-bar.blue .progress-fill { background: #3b82f6; }
.progress-bar.gradient.blue .progress-fill {
  background: linear-gradient(to right, #60a5fa, #2563eb);
}

/* Shimmer effect */
.shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite linear;
}

@keyframes shimmer {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

/* Indeterminate */
.progress-bar.indeterminate .progress-fill {
  width: 33%;
  animation: indeterminate 1.5s ease-in-out infinite;
}

@keyframes indeterminate {
  0% { left: -33%; }
  100% { left: 100%; }
}

/* Circular Progress */
.circular-progress {
  position: relative;
  width: 80px;
  height: 80px;
}

.circular-progress svg { transform: rotate(-90deg); }
.circular-progress circle { fill: transparent; stroke-width: 8; }
.circular-progress .bg { stroke: #e5e7eb; }
.circular-progress .fill {
  stroke: #3b82f6;
  stroke-linecap: round;
  stroke-dasharray: 226;
  stroke-dashoffset: calc(226 - (226 * var(--value, 0)) / 100);
  transition: stroke-dashoffset 0.5s ease-out;
}

.circular-progress .value {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
</style>`,
    },
    {
      name: 'Skeleton',
      description: 'Flexible skeleton loader with multiple variants for text, avatar, card, and image placeholders.',
      href: '/Skeleton',
      props: [
        { name: 'variant', type: "'text' | 'avatar' | 'card' | 'image' | 'button'", default: "'text'", description: 'Type of skeleton' },
        { name: 'animation', type: "'pulse' | 'shimmer' | 'wave'", default: "'shimmer'", description: 'Animation style' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant' },
        { name: 'lines', type: 'number', default: '1', description: 'Number of text lines' },
      ],
      reactCode: `import Skeleton, { SkeletonCard, SkeletonList } from 'archyra';

<Skeleton variant="text" lines={3} />
<Skeleton variant="avatar" size="lg" />
<SkeletonCard />
<SkeletonList count={5} />`,
      vanillaCode: `<!-- HTML -->
<!-- Text Skeleton -->
<div class="skeleton-text">
  <div class="skeleton-line shimmer"></div>
  <div class="skeleton-line shimmer"></div>
  <div class="skeleton-line shimmer short"></div>
</div>

<!-- Avatar Skeleton -->
<div class="skeleton-avatar shimmer lg"></div>

<!-- Card Skeleton -->
<div class="skeleton-card">
  <div class="skeleton-image shimmer"></div>
  <div class="skeleton-content">
    <div class="skeleton-line shimmer title"></div>
    <div class="skeleton-line shimmer"></div>
    <div class="skeleton-line shimmer short"></div>
  </div>
</div>

<!-- CSS -->
<style>
.skeleton-line,
.skeleton-avatar,
.skeleton-image {
  background: #e5e7eb;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

/* Shimmer animation */
.skeleton-line.shimmer::after,
.skeleton-avatar.shimmer::after,
.skeleton-image.shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: skeletonShimmer 1.5s infinite linear;
  transform: translateX(-100%);
}

@keyframes skeletonShimmer {
  to { transform: translateX(100%); }
}

/* Pulse animation */
.skeleton-line.pulse,
.skeleton-avatar.pulse {
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

@keyframes skeletonPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.skeleton-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-line { height: 16px; width: 100%; }
.skeleton-line.short { width: 75%; }
.skeleton-line.title { height: 20px; width: 70%; }

.skeleton-avatar { border-radius: 50%; width: 40px; height: 40px; }
.skeleton-avatar.sm { width: 32px; height: 32px; }
.skeleton-avatar.lg { width: 56px; height: 56px; }

.skeleton-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.skeleton-image { height: 160px; border-radius: 0; }

.skeleton-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>`,
    },
    {
      name: 'Shimmer',
      description: 'Beautiful shimmer animation wrapper with preset components for various layouts.',
      href: '/Shimmer',
      props: [
        { name: 'duration', type: 'number', default: '1.5', description: 'Animation duration in seconds' },
        { name: 'direction', type: "'left-right' | 'right-left' | 'diagonal'", default: "'left-right'", description: 'Shimmer direction' },
      ],
      reactCode: `import { ShimmerBlock, ShimmerText, ShimmerCard, ShimmerTable } from 'archyra';

<ShimmerBlock height={80} />
<ShimmerText lines={3} />
<ShimmerCard />
<ShimmerTable rows={5} cols={4} />`,
      vanillaCode: `<!-- HTML -->
<!-- Shimmer Block -->
<div class="shimmer-block" style="width: 200px; height: 100px;"></div>

<!-- Shimmer Text -->
<div class="shimmer-text">
  <div class="shimmer-line"></div>
  <div class="shimmer-line"></div>
  <div class="shimmer-line short"></div>
</div>

<!-- Shimmer Card -->
<div class="shimmer-card">
  <div class="shimmer-card-image"></div>
  <div class="shimmer-card-content">
    <div class="shimmer-line title"></div>
    <div class="shimmer-line"></div>
    <div class="shimmer-line short"></div>
  </div>
</div>

<!-- Shimmer Table -->
<div class="shimmer-table">
  <div class="shimmer-table-header">
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
  </div>
  <div class="shimmer-table-row">
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
  </div>
</div>

<!-- CSS -->
<style>
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

.shimmer-block,
.shimmer-line,
.shimmer-card-image,
.shimmer-table-cell {
  background: #e5e7eb;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.shimmer-block::after,
.shimmer-line::after,
.shimmer-card-image::after,
.shimmer-table-cell::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 1.5s infinite linear;
}

.shimmer-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.shimmer-line { height: 16px; width: 100%; }
.shimmer-line.short { width: 70%; }
.shimmer-line.title { height: 20px; width: 75%; }

.shimmer-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.shimmer-card-image { height: 160px; border-radius: 0; }

.shimmer-card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.shimmer-table {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.shimmer-table-header {
  background: #f3f4f6;
  padding: 12px;
  display: flex;
  gap: 16px;
}

.shimmer-table-row {
  padding: 12px;
  display: flex;
  gap: 16px;
  border-top: 1px solid #e5e7eb;
}

.shimmer-table-cell {
  flex: 1;
  height: 16px;
  border-radius: 4px;
}
</style>`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <Badge className="bg-yellow-500/10 text-yellow-600">Loading</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Loading Components
        </h1>
        <p className="text-xl text-muted-foreground">
          Elegant loading indicators and skeleton placeholders for content loading states.
        </p>
      </div>

      {/* Components */}
      <div className="space-y-16">
        {components.map((component, index) => (
          <div key={component.name} className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{component.name}</h2>
                <p className="text-muted-foreground mt-1">{component.description}</p>
              </div>
              <Link href={component.href}>
                <Button variant="outline" size="sm" className="gap-2">
                  Live Demo
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </Link>
            </div>

            <Tabs defaultValue="usage" className="w-full">
              <TabsList>
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="props">Props</TabsTrigger>
              </TabsList>
              <TabsContent value="usage" className="mt-4">
                <FrameworkCodeBlock
                  reactCode={component.reactCode}
                  vanillaCode={component.vanillaCode}
                  id={`${component.name}-usage`}
                />
              </TabsContent>
              <TabsContent value="props" className="mt-4">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prop</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {component.props.map((prop) => (
                        <TableRow key={prop.name}>
                          <TableCell className="font-mono text-sm">{prop.name}</TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">{prop.type}</TableCell>
                          <TableCell className="font-mono text-sm">{prop.default}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{prop.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
            </Tabs>

            {index < components.length - 1 && <hr className="border-border" />}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="border-t mt-12 pt-8">
        <div className="flex justify-between">
          <Link href="/docs/installation">
            <Button variant="outline" className="gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Installation
            </Button>
          </Link>
          <Link href="/docs/components/processing">
            <Button variant="outline" className="gap-2">
              Processing Components
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
