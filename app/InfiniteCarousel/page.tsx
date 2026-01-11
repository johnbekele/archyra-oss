'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown, Quote } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import InfiniteCarousel, { InfiniteCarouselCard, TestimonialCarousel } from '../../InfiniteCarousel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

const sampleTestimonials = [
  { id: 1, quote: "This library has completely transformed how we build UIs. The animations are buttery smooth!", author: "Sarah Chen", role: "Frontend Lead", rating: 5 },
  { id: 2, quote: "Best animation library I've used. The documentation is excellent and components are production-ready.", author: "Marcus Johnson", role: "Senior Developer", rating: 5 },
  { id: 3, quote: "Our conversion rates increased by 23% after implementing these animated components.", author: "Emily Rodriguez", role: "Product Manager", rating: 5 },
  { id: 4, quote: "Finally, a library that understands both performance and aesthetics. Highly recommended!", author: "David Kim", role: "Tech Lead", rating: 5 },
];

const sampleLogos = [
  { id: 1, name: 'Vercel' },
  { id: 2, name: 'Next.js' },
  { id: 3, name: 'React' },
  { id: 4, name: 'Tailwind' },
  { id: 5, name: 'TypeScript' },
  { id: 6, name: 'Framer' },
];

export default function InfiniteCarouselPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [showFade, setShowFade] = useState(true);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { InfiniteCarousel, InfiniteCarouselCard, TestimonialCarousel } from 'archyra';

// Basic carousel with cards
const items = [
  { id: 1, content: <InfiniteCarouselCard>Card 1</InfiniteCarouselCard> },
  { id: 2, content: <InfiniteCarouselCard>Card 2</InfiniteCarouselCard> },
  { id: 3, content: <InfiniteCarouselCard>Card 3</InfiniteCarouselCard> },
];

<InfiniteCarousel
  items={items}
  direction="${direction}"
  speed="${speed}"
  pauseOnHover={${pauseOnHover}}
  showFade={${showFade}}
/>

// Or use the TestimonialCarousel preset
const testimonials = [
  { id: 1, quote: "Amazing!", author: "John", role: "CEO", rating: 5 },
];

<TestimonialCarousel
  testimonials={testimonials}
  speed="${speed}"
  direction="${direction}"
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="infinite-carousel">
  <div class="carousel-track">
    <div class="carousel-item">Card 1</div>
    <div class="carousel-item">Card 2</div>
    <div class="carousel-item">Card 3</div>
    <!-- Duplicate items for seamless loop -->
    <div class="carousel-item">Card 1</div>
    <div class="carousel-item">Card 2</div>
    <div class="carousel-item">Card 3</div>
  </div>
  ${showFade ? `<div class="carousel-fade-left"></div>
  <div class="carousel-fade-right"></div>` : ''}
</div>

<!-- CSS -->
<style>
.infinite-carousel {
  position: relative;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: 24px;
  animation: scroll ${speed === 'slow' ? '60s' : speed === 'normal' ? '40s' : '20s'} linear infinite;
  animation-direction: ${direction === 'right' ? 'reverse' : 'normal'};
}

${pauseOnHover ? `.carousel-track:hover {
  animation-play-state: paused;
}` : ''}

.carousel-item {
  flex-shrink: 0;
  padding: 24px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  min-width: 300px;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

${showFade ? `.carousel-fade-left,
.carousel-fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 10;
  pointer-events: none;
}

.carousel-fade-left {
  left: 0;
  background: linear-gradient(to right, white, transparent);
}

.carousel-fade-right {
  right: 0;
  background: linear-gradient(to left, white, transparent);
}` : ''}
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  const carouselItems = sampleLogos.map(logo => ({
    id: logo.id,
    content: (
      <InfiniteCarouselCard width={200} className="flex items-center justify-center h-20">
        <span className="text-lg font-bold text-muted-foreground">{logo.name}</span>
      </InfiniteCarouselCard>
    ),
  }));

  return (
    <DashboardLayout title="InfiniteCarousel" description="Seamlessly looping horizontal carousel">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Direction</h3>
            <div className="flex gap-2">
              {(['left', 'right'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDirection(d)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    direction === d ? 'bg-violet-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Speed</h3>
            <div className="flex gap-2">
              {(['slow', 'normal', 'fast'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    speed === s ? 'bg-violet-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pauseOnHover}
                  onChange={(e) => setPauseOnHover(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Pause on hover</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFade}
                  onChange={(e) => setShowFade(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Show edge fade</span>
              </label>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Logo Carousel</h2>
              <p className="text-amber-100 text-sm">Infinite scrolling brand logos</p>
            </div>
            <div className="py-8 bg-muted/30">
              <InfiniteCarousel
                items={carouselItems}
                direction={direction}
                speed={speed}
                pauseOnHover={pauseOnHover}
                showFade={showFade}
              />
            </div>
          </div>

          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Quote className="w-5 h-5" />
                Testimonial Carousel
              </h2>
              <p className="text-emerald-100 text-sm">Pre-built testimonial display</p>
            </div>
            <div className="py-8 bg-muted/30">
              <TestimonialCarousel
                testimonials={sampleTestimonials}
                direction={direction}
                speed={speed}
              />
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
