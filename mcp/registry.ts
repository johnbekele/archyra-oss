/**
 * Archyra - Component Registry
 * Contains metadata and source code for all animation components
 */

export interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  category: 'loading' | 'processing' | 'creative' | 'auth' | 'chat' | 'ecommerce' | 'effects' | 'cards';
  dependencies: string[];
  props: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
    default?: string;
  }>;
  usage: string;
  source: string;
  // Vanilla HTML/CSS/JS version
  vanilla?: {
    html: string;
    css: string;
    js?: string;
    usage: string;
  };
}

export const components: ComponentInfo[] = [
  {
    id: 'loading-dots',
    name: 'LoadingDots',
    description: 'Simple, elegant bouncing dots animation. Perfect for minimal loading states and inline indicators.',
    category: 'loading',
    dependencies: ['framer-motion'],
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", required: false, description: 'Size of the dots', default: "'md'" },
      { name: 'color', type: 'string', required: false, description: 'Color of the dots (hex or CSS color)', default: "'#6366F1'" },
    ],
    usage: `import { LoadingDots } from '@/components/LoadingDots';

function MyComponent() {
  return <LoadingDots size="md" color="#6366F1" />;
}`,
    source: `'use client';

import { motion } from 'framer-motion';

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const sizeMap = {
  sm: { dot: 6, gap: 4 },
  md: { dot: 10, gap: 6 },
  lg: { dot: 14, gap: 8 },
};

export default function LoadingDots({ size = 'md', color = '#6366F1' }: LoadingDotsProps) {
  const { dot, gap } = sizeMap[size];

  return (
    <div className="flex items-center justify-center" style={{ gap }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: dot,
            height: dot,
            backgroundColor: color,
            borderRadius: '50%',
          }}
          animate={{ y: [0, -dot, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}`,
    vanilla: {
      html: `<div class="loading-dots">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>`,
      css: `.loading-dots {
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

.loading-dots .dot:nth-child(2) {
  animation-delay: 0.15s;
}

.loading-dots .dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Size variants */
.loading-dots.sm .dot { width: 6px; height: 6px; }
.loading-dots.sm { gap: 4px; }
.loading-dots.lg .dot { width: 14px; height: 14px; }
.loading-dots.lg { gap: 8px; }`,
      usage: `<!-- Basic usage -->
<div class="loading-dots">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>

<!-- Small size -->
<div class="loading-dots sm">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>

<!-- Custom color (inline style) -->
<div class="loading-dots">
  <div class="dot" style="background-color: #10B981;"></div>
  <div class="dot" style="background-color: #10B981;"></div>
  <div class="dot" style="background-color: #10B981;"></div>
</div>`,
    },
  },
  {
    id: 'pulse-circle',
    name: 'PulseCircle',
    description: 'Circular progress indicator with expanding pulse rings and percentage display. Shows completion checkmark at 100%.',
    category: 'loading',
    dependencies: ['framer-motion'],
    props: [
      { name: 'isActive', type: 'boolean', required: true, description: 'Activates the animation' },
      { name: 'progress', type: 'number', required: false, description: 'External progress value (0-100)' },
      { name: 'onComplete', type: '() => void', required: false, description: 'Callback when progress reaches 100%' },
    ],
    usage: `import { PulseCircle } from '@/components/PulseCircle';

function MyComponent() {
  const [isActive, setIsActive] = useState(false);

  return (
    <PulseCircle
      isActive={isActive}
      onComplete={() => setIsActive(false)}
    />
  );
}`,
    source: `'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PulseCircleProps {
  isActive: boolean;
  progress?: number;
  onComplete?: () => void;
}

export default function PulseCircle({ isActive, progress: externalProgress, onComplete }: PulseCircleProps) {
  const [internalProgress, setInternalProgress] = useState(0);
  const progress = externalProgress ?? internalProgress;

  useEffect(() => {
    if (!isActive || externalProgress !== undefined) {
      if (!isActive) setInternalProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, externalProgress, onComplete]);

  const isComplete = progress >= 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(progress, 100) / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      {/* Pulse rings */}
      <AnimatePresence>
        {isActive && !isComplete && [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-blue-400"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Progress circle */}
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="6" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={isComplete ? '#10b981' : '#3b82f6'}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.3 }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.svg
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </motion.svg>
          ) : (
            <motion.span
              key="progress"
              className="text-2xl font-bold text-gray-700"
            >
              {Math.round(progress)}%
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}`,
    vanilla: {
      html: `<div class="pulse-circle">
  <div class="pulse-ring"></div>
  <div class="pulse-ring"></div>
  <div class="pulse-ring"></div>
  <svg class="progress-ring" viewBox="0 0 100 100">
    <circle class="progress-bg" cx="50" cy="50" r="45" />
    <circle class="progress-bar" cx="50" cy="50" r="45" />
  </svg>
  <div class="progress-text">0%</div>
</div>`,
      css: `.pulse-circle {
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

.pulse-circle.complete .progress-bar {
  stroke: #10b981;
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

/* Hide pulse rings when complete */
.pulse-circle.complete .pulse-ring {
  display: none;
}`,
      js: `// PulseCircle controller
class PulseCircle {
  constructor(element) {
    this.element = element;
    this.progressBar = element.querySelector('.progress-bar');
    this.progressText = element.querySelector('.progress-text');
    this.circumference = 2 * Math.PI * 45; // radius = 45
    this.progress = 0;
  }

  setProgress(value) {
    this.progress = Math.min(100, Math.max(0, value));
    const offset = this.circumference - (this.progress / 100) * this.circumference;
    this.progressBar.style.strokeDashoffset = offset;
    this.progressText.textContent = Math.round(this.progress) + '%';

    if (this.progress >= 100) {
      this.element.classList.add('complete');
      this.progressText.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>';
    }
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

  reset() {
    this.progress = 0;
    this.element.classList.remove('complete');
    this.progressBar.style.strokeDashoffset = this.circumference;
    this.progressText.textContent = '0%';
  }
}

// Usage:
// const circle = new PulseCircle(document.querySelector('.pulse-circle'));
// circle.start(() => console.log('Complete!'));`,
      usage: `<!-- Basic usage -->
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

<script>
  const circle = new PulseCircle(document.querySelector('.pulse-circle'));
  circle.start(() => console.log('Processing complete!'));
</script>`,
    },
  },
  {
    id: 'code-typing',
    name: 'CodeTyping',
    description: 'Realistic code typing effect with syntax highlighting and terminal-style presentation.',
    category: 'processing',
    dependencies: ['framer-motion'],
    props: [
      { name: 'isTyping', type: 'boolean', required: true, description: 'Controls the typing animation' },
      { name: 'onComplete', type: '() => void', required: false, description: 'Callback when typing completes' },
    ],
    usage: `import { CodeTyping } from '@/components/CodeTyping';

function MyComponent() {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <CodeTyping
      isTyping={isTyping}
      onComplete={() => setIsTyping(false)}
    />
  );
}`,
    source: `'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CodeTypingProps {
  isTyping: boolean;
  onComplete?: () => void;
}

const codeLines = [
  { text: 'const', color: '#c678dd' },
  { text: ' ai', color: '#e06c75' },
  { text: ' = ', color: '#abb2bf' },
  { text: 'await', color: '#c678dd' },
  { text: ' generateResponse', color: '#61afef' },
  { text: '(', color: '#abb2bf' },
  { text: 'prompt', color: '#e5c07b' },
  { text: ');', color: '#abb2bf' },
];

export default function CodeTyping({ isTyping, onComplete }: CodeTypingProps) {
  const [displayedCode, setDisplayedCode] = useState<typeof codeLines>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isTyping) {
      setDisplayedCode([]);
      setCurrentIndex(0);
      return;
    }

    if (currentIndex >= codeLines.length) {
      onComplete?.();
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedCode((prev) => [...prev, codeLines[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }, 150);

    return () => clearTimeout(timeout);
  }, [isTyping, currentIndex, onComplete]);

  return (
    <div className="bg-[#282c34] rounded-lg p-4 font-mono text-sm min-w-[300px]">
      <div className="flex gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="flex items-center">
        <span className="text-gray-500 mr-2">1</span>
        {displayedCode.map((token, i) => (
          <span key={i} style={{ color: token.color }}>{token.text}</span>
        ))}
        {isTyping && currentIndex < codeLines.length && (
          <motion.span
            className="w-2 h-5 bg-white ml-0.5"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}`,
    vanilla: {
      html: `<div class="code-typing">
  <div class="terminal-dots">
    <div class="dot red"></div>
    <div class="dot yellow"></div>
    <div class="dot green"></div>
  </div>
  <div class="code-line">
    <span class="line-number">1</span>
    <span class="code-content"></span>
    <span class="cursor"></span>
  </div>
</div>`,
      css: `.code-typing {
  background-color: #282c34;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  min-width: 300px;
}

.terminal-dots {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.terminal-dots .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dots .dot.red { background-color: #ff5f56; }
.terminal-dots .dot.yellow { background-color: #ffbd2e; }
.terminal-dots .dot.green { background-color: #27c93f; }

.code-line {
  display: flex;
  align-items: center;
}

.line-number {
  color: #5c6370;
  margin-right: 8px;
}

.code-content {
  color: #abb2bf;
}

.cursor {
  width: 8px;
  height: 20px;
  background-color: white;
  margin-left: 2px;
  animation: blink 0.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Syntax highlighting colors */
.code-typing .keyword { color: #c678dd; }
.code-typing .variable { color: #e06c75; }
.code-typing .operator { color: #abb2bf; }
.code-typing .function { color: #61afef; }
.code-typing .string { color: #e5c07b; }`,
      js: `// CodeTyping controller
class CodeTyping {
  constructor(element) {
    this.element = element;
    this.codeContent = element.querySelector('.code-content');
    this.cursor = element.querySelector('.cursor');
    this.tokens = [
      { text: 'const', className: 'keyword' },
      { text: ' ai', className: 'variable' },
      { text: ' = ', className: 'operator' },
      { text: 'await', className: 'keyword' },
      { text: ' generateResponse', className: 'function' },
      { text: '(', className: 'operator' },
      { text: 'prompt', className: 'string' },
      { text: ');', className: 'operator' },
    ];
    this.currentIndex = 0;
    this.isTyping = false;
  }

  start(onComplete) {
    if (this.isTyping) return;
    this.isTyping = true;
    this.currentIndex = 0;
    this.codeContent.innerHTML = '';
    this.cursor.style.display = 'block';
    this.typeNext(onComplete);
  }

  typeNext(onComplete) {
    if (this.currentIndex >= this.tokens.length) {
      this.cursor.style.display = 'none';
      this.isTyping = false;
      if (onComplete) onComplete();
      return;
    }

    const token = this.tokens[this.currentIndex];
    const span = document.createElement('span');
    span.className = token.className;
    span.textContent = token.text;
    this.codeContent.appendChild(span);
    this.currentIndex++;

    setTimeout(() => this.typeNext(onComplete), 150);
  }

  reset() {
    this.codeContent.innerHTML = '';
    this.currentIndex = 0;
    this.isTyping = false;
    this.cursor.style.display = 'block';
  }
}

// Usage:
// const typing = new CodeTyping(document.querySelector('.code-typing'));
// typing.start(() => console.log('Typing complete!'));`,
      usage: `<!-- Basic usage -->
<div class="code-typing">
  <div class="terminal-dots">
    <div class="dot red"></div>
    <div class="dot yellow"></div>
    <div class="dot green"></div>
  </div>
  <div class="code-line">
    <span class="line-number">1</span>
    <span class="code-content"></span>
    <span class="cursor"></span>
  </div>
</div>

<script>
  const typing = new CodeTyping(document.querySelector('.code-typing'));
  typing.start(() => console.log('Code typed!'));
</script>`,
    },
  },
  {
    id: 'data-processing',
    name: 'DataProcessing',
    description: 'Data pipeline visualization showing input, processing, and output stages with flowing data cards.',
    category: 'processing',
    dependencies: ['framer-motion', 'lucide-react'],
    props: [
      { name: 'isProcessing', type: 'boolean', required: true, description: 'Controls the processing animation' },
      { name: 'onComplete', type: '() => void', required: false, description: 'Callback when processing completes' },
    ],
    usage: `import { DataProcessing } from '@/components/DataProcessing';

function MyComponent() {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <DataProcessing
      isProcessing={isProcessing}
      onComplete={() => setIsProcessing(false)}
    />
  );
}`,
    source: `'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, CheckCircle } from 'lucide-react';

interface DataProcessingProps {
  isProcessing: boolean;
  onComplete?: () => void;
}

export default function DataProcessing({ isProcessing, onComplete }: DataProcessingProps) {
  const [stage, setStage] = useState<'idle' | 'input' | 'process' | 'output' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isProcessing) {
      setStage('idle');
      setProgress(0);
      return;
    }

    setStage('input');
    const stages = [
      { stage: 'process' as const, delay: 800 },
      { stage: 'output' as const, delay: 1700 },
      { stage: 'complete' as const, delay: 2500 },
    ];

    const timeouts = stages.map(({ stage, delay }) =>
      setTimeout(() => setStage(stage), delay)
    );

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 4, 100));
    }, 100);

    const completeTimeout = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
      clearInterval(progressInterval);
    };
  }, [isProcessing, onComplete]);

  const stages = [
    { id: 'input', icon: Database, label: 'Input', active: ['input', 'process', 'output', 'complete'].includes(stage) },
    { id: 'process', icon: Cpu, label: 'Processing', active: ['process', 'output', 'complete'].includes(stage) },
    { id: 'output', icon: CheckCircle, label: 'Output', active: ['output', 'complete'].includes(stage) },
  ];

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="flex items-center gap-4">
        {stages.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <motion.div
              className={\`w-16 h-16 rounded-xl flex items-center justify-center \${
                s.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
              }\`}
              animate={{ scale: stage === s.id ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <s.icon className="w-8 h-8" />
            </motion.div>
            {i < stages.length - 1 && (
              <div className="w-12 h-1 mx-2 bg-gray-200 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: s.active ? '100%' : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700 capitalize">{stage === 'idle' ? 'Ready' : stage}</p>
        <p className="text-sm text-gray-500">{progress}% complete</p>
      </div>
    </div>
  );
}`,
    vanilla: {
      html: `<div class="data-processing">
  <div class="stages">
    <div class="stage" data-stage="input">
      <div class="stage-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      </div>
      <div class="connector"><div class="connector-fill"></div></div>
    </div>
    <div class="stage" data-stage="process">
      <div class="stage-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="4" y="4" width="16" height="16" rx="2"/>
          <rect x="9" y="9" width="6" height="6"/>
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
        </svg>
      </div>
      <div class="connector"><div class="connector-fill"></div></div>
    </div>
    <div class="stage" data-stage="output">
      <div class="stage-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
    </div>
  </div>
  <div class="status">
    <p class="status-text">Ready</p>
    <p class="progress-text">0% complete</p>
  </div>
</div>`,
      css: `.data-processing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
}

.stages {
  display: flex;
  align-items: center;
}

.stage {
  display: flex;
  align-items: center;
}

.stage-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e7eb;
  color: #9ca3af;
  transition: all 0.3s ease;
}

.stage-icon svg {
  width: 32px;
  height: 32px;
}

.stage.active .stage-icon {
  background-color: #3b82f6;
  color: white;
}

.stage.current .stage-icon {
  animation: pulse-stage 0.3s ease;
}

@keyframes pulse-stage {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.connector {
  width: 48px;
  height: 4px;
  margin: 0 8px;
  background-color: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.connector-fill {
  height: 100%;
  width: 0;
  background-color: #3b82f6;
  transition: width 0.5s ease;
}

.stage.active .connector .connector-fill {
  width: 100%;
}

.status {
  text-align: center;
}

.status-text {
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
  text-transform: capitalize;
}

.progress-text {
  font-size: 0.875rem;
  color: #6b7280;
}`,
      js: `// DataProcessing controller
class DataProcessing {
  constructor(element) {
    this.element = element;
    this.stages = element.querySelectorAll('.stage');
    this.statusText = element.querySelector('.status-text');
    this.progressText = element.querySelector('.progress-text');
    this.progress = 0;
    this.currentStage = 'idle';
  }

  start(onComplete) {
    this.progress = 0;
    this.setStage('input');

    // Progress interval
    this.progressInterval = setInterval(() => {
      this.progress = Math.min(this.progress + 4, 100);
      this.progressText.textContent = this.progress + '% complete';
    }, 100);

    // Stage transitions
    setTimeout(() => this.setStage('process'), 800);
    setTimeout(() => this.setStage('output'), 1700);
    setTimeout(() => {
      this.setStage('complete');
      clearInterval(this.progressInterval);
      if (onComplete) onComplete();
    }, 2500);
  }

  setStage(stage) {
    this.currentStage = stage;
    this.statusText.textContent = stage === 'idle' ? 'Ready' : stage;

    const stageOrder = ['input', 'process', 'output'];
    const currentIndex = stageOrder.indexOf(stage);

    this.stages.forEach((el, i) => {
      el.classList.remove('active', 'current');
      if (i <= currentIndex || stage === 'complete') {
        el.classList.add('active');
      }
      if (stageOrder[i] === stage) {
        el.classList.add('current');
      }
    });
  }

  reset() {
    clearInterval(this.progressInterval);
    this.progress = 0;
    this.currentStage = 'idle';
    this.statusText.textContent = 'Ready';
    this.progressText.textContent = '0% complete';
    this.stages.forEach(el => el.classList.remove('active', 'current'));
  }
}

// Usage:
// const processing = new DataProcessing(document.querySelector('.data-processing'));
// processing.start(() => console.log('Processing complete!'));`,
      usage: `<!-- Basic usage -->
<div class="data-processing">
  <div class="stages">
    <div class="stage" data-stage="input">
      <div class="stage-icon"><!-- Database SVG --></div>
      <div class="connector"><div class="connector-fill"></div></div>
    </div>
    <div class="stage" data-stage="process">
      <div class="stage-icon"><!-- CPU SVG --></div>
      <div class="connector"><div class="connector-fill"></div></div>
    </div>
    <div class="stage" data-stage="output">
      <div class="stage-icon"><!-- Check SVG --></div>
    </div>
  </div>
  <div class="status">
    <p class="status-text">Ready</p>
    <p class="progress-text">0% complete</p>
  </div>
</div>

<script>
  const processing = new DataProcessing(document.querySelector('.data-processing'));
  processing.start(() => console.log('Done!'));
</script>`,
    },
  },
  {
    id: 'ai-creating',
    name: 'AiCreating',
    description: 'Multi-stage animation visualizing AI creation process with thinking, writing, building, and completion phases.',
    category: 'creative',
    dependencies: ['framer-motion'],
    props: [
      { name: 'isLoading', type: 'boolean', required: true, description: 'Controls the animation state' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", required: false, description: 'Size of the animation', default: "'md'" },
      { name: 'onComplete', type: '() => void', required: false, description: 'Callback when animation completes' },
    ],
    usage: `import { AiCreating } from '@/components/AiCreating';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AiCreating
      isLoading={isLoading}
      size="md"
      onComplete={() => setIsLoading(false)}
    />
  );
}`,
    source: `'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AiCreating.css';

interface AiCreatingProps {
  isLoading: boolean;
  size?: 'sm' | 'md' | 'lg';
  onComplete?: () => void;
}

const stages = ['thinking', 'writing', 'building', 'complete'] as const;
type Stage = typeof stages[number];

const stageMessages: Record<Stage, string> = {
  thinking: 'Thinking...',
  writing: 'Writing...',
  building: 'Building...',
  complete: 'Done!',
};

export default function AiCreating({ isLoading, size = 'md', onComplete }: AiCreatingProps) {
  const [stage, setStage] = useState<Stage>('thinking');

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  useEffect(() => {
    if (!isLoading) {
      setStage('thinking');
      return;
    }

    const timings = [2000, 4000, 6000];
    const timeouts = timings.map((delay, i) =>
      setTimeout(() => setStage(stages[i + 1]), delay)
    );

    const completeTimeout = setTimeout(() => onComplete?.(), 7000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
    };
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={\`relative \${sizeClasses[size]}\`}>
        <motion.div
          className="ai-robot w-full h-full"
          animate={{
            y: stage === 'thinking' ? [0, -5, 0] : 0,
            rotate: stage === 'building' ? [0, 5, -5, 0] : 0,
          }}
          transition={{ duration: 1, repeat: stage !== 'complete' ? Infinity : 0 }}
        >
          {/* Robot SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="25" y="30" width="50" height="45" rx="8" fill="#6366f1" />
            <rect x="35" y="45" width="10" height="10" rx="2" fill="white" />
            <rect x="55" y="45" width="10" height="10" rx="2" fill="white" />
            <rect x="40" y="62" width="20" height="5" rx="2" fill="white" />
            <rect x="42" y="20" width="16" height="15" rx="3" fill="#6366f1" />
            <circle cx="50" cy="12" r="4" fill="#fbbf24" />
          </svg>
        </motion.div>
      </div>
      <motion.p
        key={stage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-600 font-medium"
      >
        {stageMessages[stage]}
      </motion.p>
    </div>
  );
}`,
    vanilla: {
      html: `<div class="ai-creating">
  <div class="robot">
    <svg viewBox="0 0 100 100">
      <rect x="25" y="30" width="50" height="45" rx="8" fill="#6366f1" />
      <rect x="35" y="45" width="10" height="10" rx="2" fill="white" />
      <rect x="55" y="45" width="10" height="10" rx="2" fill="white" />
      <rect x="40" y="62" width="20" height="5" rx="2" fill="white" />
      <rect x="42" y="20" width="16" height="15" rx="3" fill="#6366f1" />
      <circle cx="50" cy="12" r="4" fill="#fbbf24" />
    </svg>
  </div>
  <p class="stage-message">Thinking...</p>
</div>`,
      css: `.ai-creating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.ai-creating .robot {
  width: 96px;
  height: 96px;
}

.ai-creating.sm .robot { width: 64px; height: 64px; }
.ai-creating.lg .robot { width: 128px; height: 128px; }

.ai-creating .robot svg {
  width: 100%;
  height: 100%;
}

/* Thinking animation */
.ai-creating.thinking .robot {
  animation: bob 1s ease-in-out infinite;
}

@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Building animation */
.ai-creating.building .robot {
  animation: shake 1s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
}

/* Writing animation */
.ai-creating.writing .robot {
  animation: pulse-robot 1s ease-in-out infinite;
}

@keyframes pulse-robot {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.stage-message {
  color: #4b5563;
  font-weight: 500;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}`,
      js: `// AiCreating controller
class AiCreating {
  constructor(element) {
    this.element = element;
    this.message = element.querySelector('.stage-message');
    this.stages = ['thinking', 'writing', 'building', 'complete'];
    this.stageMessages = {
      thinking: 'Thinking...',
      writing: 'Writing...',
      building: 'Building...',
      complete: 'Done!'
    };
    this.currentStage = 0;
    this.timeouts = [];
  }

  start(onComplete) {
    this.element.style.display = 'flex';
    this.setStage(0);

    // Stage transitions at 2s, 4s, 6s
    this.timeouts.push(setTimeout(() => this.setStage(1), 2000));
    this.timeouts.push(setTimeout(() => this.setStage(2), 4000));
    this.timeouts.push(setTimeout(() => this.setStage(3), 6000));
    this.timeouts.push(setTimeout(() => {
      if (onComplete) onComplete();
    }, 7000));
  }

  setStage(index) {
    this.currentStage = index;
    const stage = this.stages[index];

    // Remove all stage classes
    this.stages.forEach(s => this.element.classList.remove(s));
    this.element.classList.add(stage);

    // Update message
    this.message.textContent = this.stageMessages[stage];
  }

  stop() {
    this.timeouts.forEach(clearTimeout);
    this.element.style.display = 'none';
    this.setStage(0);
  }
}

// Usage:
// const ai = new AiCreating(document.querySelector('.ai-creating'));
// ai.start(() => console.log('Complete!'));`,
      usage: `<!-- Basic usage -->
<div class="ai-creating">
  <div class="robot">
    <svg viewBox="0 0 100 100">
      <rect x="25" y="30" width="50" height="45" rx="8" fill="#6366f1" />
      <rect x="35" y="45" width="10" height="10" rx="2" fill="white" />
      <rect x="55" y="45" width="10" height="10" rx="2" fill="white" />
      <rect x="40" y="62" width="20" height="5" rx="2" fill="white" />
      <rect x="42" y="20" width="16" height="15" rx="3" fill="#6366f1" />
      <circle cx="50" cy="12" r="4" fill="#fbbf24" />
    </svg>
  </div>
  <p class="stage-message">Thinking...</p>
</div>

<script>
  const ai = new AiCreating(document.querySelector('.ai-creating'));
  ai.start(() => console.log('AI finished!'));
</script>`,
    },
  },
  {
    id: 'ai-creating-2',
    name: 'AiCreating2',
    description: 'Full-screen AI brain animation with rotating rings, floating particles, and dynamic status messages.',
    category: 'creative',
    dependencies: ['framer-motion', 'lucide-react'],
    props: [
      { name: 'isLoading', type: 'boolean', required: true, description: 'Controls animation visibility' },
      { name: 'message', type: 'string', required: false, description: 'Main loading message' },
      { name: 'subMessage', type: 'string', required: false, description: 'Secondary description text' },
      { name: 'primaryColor', type: 'string', required: false, description: 'Primary color (hex)', default: "'#6366F1'" },
      { name: 'backgroundColor', type: 'string', required: false, description: 'Background color (hex)', default: "'#0f172a'" },
      { name: 'textColor', type: 'string', required: false, description: 'Text color (hex)', default: "'#ffffff'" },
      { name: 'contained', type: 'boolean', required: false, description: 'Render in container vs full overlay', default: 'false' },
      { name: 'onComplete', type: '() => void', required: false, description: 'Callback when complete' },
    ],
    usage: `import { AiCreating2 } from '@/components/AiCreating2';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AiCreating2
      isLoading={isLoading}
      message="Creating your plan..."
      primaryColor="#6366F1"
      onComplete={() => setIsLoading(false)}
    />
  );
}`,
    source: `'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

interface AiCreating2Props {
  isLoading: boolean;
  message?: string;
  subMessage?: string;
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  contained?: boolean;
  onComplete?: () => void;
}

export default function AiCreating2({
  isLoading,
  message = 'AI is creating...',
  subMessage = 'This may take a moment',
  primaryColor = '#6366F1',
  backgroundColor = '#0f172a',
  textColor = '#ffffff',
  contained = false,
  onComplete,
}: AiCreating2Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return p + Math.random() * 2 + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, onComplete]);

  const containerClass = contained
    ? 'w-full h-full flex items-center justify-center'
    : 'fixed inset-0 z-50 flex items-center justify-center';

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={containerClass}
          style={{ backgroundColor }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Brain with rings */}
            <div className="relative w-32 h-32">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: primaryColor }}
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{
                    rotate: { duration: 3 + i, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity, delay: i * 0.3 },
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-12 h-12" style={{ color: primaryColor }} />
              </div>
            </div>

            {/* Messages */}
            <div className="text-center">
              <motion.h2
                className="text-xl font-semibold mb-2 flex items-center gap-2 justify-center"
                style={{ color: textColor }}
              >
                <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
                {message}
              </motion.h2>
              <p className="text-sm opacity-70" style={{ color: textColor }}>{subMessage}</p>
            </div>

            {/* Progress bar */}
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: primaryColor }}
                initial={{ width: 0 }}
                animate={{ width: \`\${progress}%\` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}`,
    vanilla: {
      html: `<div class="ai-creating-2">
  <div class="content">
    <div class="brain-container">
      <div class="ring ring-1"></div>
      <div class="ring ring-2"></div>
      <div class="ring ring-3"></div>
      <div class="brain-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
          <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
          <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
          <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
          <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
          <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
          <path d="M6 18a4 4 0 0 1-1.967-.516"/>
          <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
        </svg>
      </div>
    </div>
    <div class="messages">
      <h2 class="message">
        <span class="sparkle">✨</span>
        AI is creating...
      </h2>
      <p class="sub-message">This may take a moment</p>
    </div>
    <div class="progress-container">
      <div class="progress-bar"></div>
    </div>
  </div>
</div>`,
      css: `.ai-creating-2 {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f172a;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ai-creating-2.active {
  opacity: 1;
}

.ai-creating-2.contained {
  position: relative;
  width: 100%;
  height: 100%;
}

.ai-creating-2 .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.brain-container {
  position: relative;
  width: 128px;
  height: 128px;
}

.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid #6366F1;
}

.ring-1 {
  animation: rotate 3s linear infinite, pulse-ring 2s ease-in-out infinite;
}

.ring-2 {
  animation: rotate 4s linear infinite, pulse-ring 2s ease-in-out 0.3s infinite;
}

.ring-3 {
  animation: rotate 5s linear infinite, pulse-ring 2s ease-in-out 0.6s infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-ring {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(180deg); }
}

.brain-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brain-icon svg {
  width: 48px;
  height: 48px;
  color: #6366F1;
}

.messages {
  text-align: center;
}

.message {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.sparkle {
  color: #6366F1;
}

.sub-message {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.progress-container {
  width: 256px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  width: 0;
  background-color: #6366F1;
  border-radius: 9999px;
  transition: width 0.1s ease;
}`,
      js: `// AiCreating2 controller
class AiCreating2 {
  constructor(element, options = {}) {
    this.element = element;
    this.progressBar = element.querySelector('.progress-bar');
    this.messageEl = element.querySelector('.message');
    this.subMessageEl = element.querySelector('.sub-message');
    this.progress = 0;
    this.interval = null;

    // Apply options
    if (options.message) this.messageEl.innerHTML = '<span class="sparkle">✨</span>' + options.message;
    if (options.subMessage) this.subMessageEl.textContent = options.subMessage;
    if (options.primaryColor) {
      element.querySelectorAll('.ring').forEach(r => r.style.borderColor = options.primaryColor);
      element.querySelector('.brain-icon svg').style.color = options.primaryColor;
      this.progressBar.style.backgroundColor = options.primaryColor;
    }
    if (options.backgroundColor) element.style.backgroundColor = options.backgroundColor;
    if (options.contained) element.classList.add('contained');
  }

  show(onComplete) {
    this.element.classList.add('active');
    this.progress = 0;

    this.interval = setInterval(() => {
      this.progress = Math.min(100, this.progress + Math.random() * 2 + 0.5);
      this.progressBar.style.width = this.progress + '%';

      if (this.progress >= 100) {
        clearInterval(this.interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 500);
      }
    }, 100);
  }

  hide() {
    clearInterval(this.interval);
    this.element.classList.remove('active');
    this.progress = 0;
    this.progressBar.style.width = '0%';
  }
}

// Usage:
// const loader = new AiCreating2(document.querySelector('.ai-creating-2'), {
//   message: 'Creating your content...',
//   primaryColor: '#8B5CF6'
// });
// loader.show(() => console.log('Complete!'));`,
      usage: `<!-- Full-screen overlay usage -->
<div class="ai-creating-2">
  <div class="content">
    <div class="brain-container">
      <div class="ring ring-1"></div>
      <div class="ring ring-2"></div>
      <div class="ring ring-3"></div>
      <div class="brain-icon"><!-- Brain SVG --></div>
    </div>
    <div class="messages">
      <h2 class="message"><span class="sparkle">✨</span>AI is creating...</h2>
      <p class="sub-message">This may take a moment</p>
    </div>
    <div class="progress-container">
      <div class="progress-bar"></div>
    </div>
  </div>
</div>

<script>
  const loader = new AiCreating2(document.querySelector('.ai-creating-2'), {
    message: 'Generating response...',
    primaryColor: '#6366F1'
  });
  loader.show(() => loader.hide());
</script>`,
    },
  },
  {
    id: 'floating-login',
    name: 'FloatingLogin',
    description: 'Animated floating login form with smooth bobbing motion, supporting local and OAuth authentication.',
    category: 'auth',
    dependencies: ['framer-motion', 'lucide-react'],
    props: [
      { name: 'mode', type: "'light' | 'dark'", required: false, description: 'Theme mode', default: "'light'" },
      { name: 'primaryColor', type: 'string', required: false, description: 'Accent color (hex)', default: "'#6366F1'" },
      { name: 'floatingEnabled', type: 'boolean', required: false, description: 'Enable floating animation', default: 'true' },
      { name: 'floatIntensity', type: 'number', required: false, description: 'Float intensity (1-10)', default: '5' },
      { name: 'onLogin', type: '(data: LoginData) => void', required: false, description: 'Login callback with email/password' },
      { name: 'onGoogleLogin', type: '() => void', required: false, description: 'Google OAuth callback' },
      { name: 'onAppleLogin', type: '() => void', required: false, description: 'Apple Sign-In callback' },
    ],
    usage: `import { FloatingLogin } from '@/components/FloatingLogin';

function MyComponent() {
  return (
    <FloatingLogin
      mode="dark"
      primaryColor="#6366F1"
      floatIntensity={5}
      onLogin={(data) => console.log(data)}
      onGoogleLogin={() => signInWithGoogle()}
      onAppleLogin={() => signInWithApple()}
    />
  );
}`,
    source: `'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginData {
  email: string;
  password: string;
}

interface FloatingLoginProps {
  mode?: 'light' | 'dark';
  primaryColor?: string;
  floatingEnabled?: boolean;
  floatIntensity?: number;
  onLogin?: (data: LoginData) => void | Promise<void>;
  onGoogleLogin?: () => void | Promise<void>;
  onAppleLogin?: () => void | Promise<void>;
}

export default function FloatingLogin({
  mode = 'light',
  primaryColor = '#6366F1',
  floatingEnabled = true,
  floatIntensity = 5,
  onLogin,
  onGoogleLogin,
  onAppleLogin,
}: FloatingLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isDark = mode === 'dark';
  const intensity = Math.max(1, Math.min(10, floatIntensity));
  const yOffset = intensity * 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin) return;
    setIsLoading(true);
    try {
      await onLogin({ email, password });
    } finally {
      setIsLoading(false);
    }
  };

  const cardBg = isDark ? 'bg-gray-900' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const inputBg = isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200';

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={floatingEnabled ? {
          y: [0, -yOffset, 0],
          rotate: [0, 1, -1, 0],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={\`\${cardBg} rounded-2xl shadow-2xl p-8 w-full max-w-md\`}
      >
        <h2 className={\`text-2xl font-bold \${textColor} mb-6 text-center\`}>Welcome back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={\`w-full pl-10 pr-4 py-3 rounded-lg border \${inputBg} \${textColor} focus:outline-none focus:ring-2\`}
              style={{ '--tw-ring-color': primaryColor } as any}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={\`w-full pl-10 pr-12 py-3 rounded-lg border \${inputBg} \${textColor} focus:outline-none focus:ring-2\`}
              style={{ '--tw-ring-color': primaryColor } as any}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg text-white font-medium transition-opacity disabled:opacity-50"
            style={{ backgroundColor: primaryColor }}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div className="mt-6 space-y-3">
          {onGoogleLogin && (
            <button
              onClick={onGoogleLogin}
              className={\`w-full py-3 rounded-lg border \${inputBg} \${textColor} font-medium flex items-center justify-center gap-2\`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          )}

          {onAppleLogin && (
            <button
              onClick={onAppleLogin}
              className={\`w-full py-3 rounded-lg \${isDark ? 'bg-white text-black' : 'bg-black text-white'} font-medium flex items-center justify-center gap-2\`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Continue with Apple
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}`,
    vanilla: {
      html: `<div class="floating-login-wrapper">
  <div class="floating-login">
    <h2 class="title">Welcome back</h2>

    <form class="login-form">
      <div class="input-group">
        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
        <input type="email" placeholder="Email" class="input" />
      </div>

      <div class="input-group">
        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <input type="password" placeholder="Password" class="input password-input" />
        <button type="button" class="toggle-password">
          <svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </div>

      <button type="submit" class="submit-btn">Sign in</button>
    </form>

    <div class="divider">
      <span>or</span>
    </div>

    <div class="oauth-buttons">
      <button class="oauth-btn google-btn">
        <svg class="oauth-icon" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>
      <button class="oauth-btn apple-btn">
        <svg class="oauth-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
        Continue with Apple
      </button>
    </div>
  </div>
</div>`,
      css: `.floating-login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.floating-login {
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 32px;
  width: 100%;
  max-width: 400px;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  75% { transform: translateY(-10px) rotate(-1deg); }
}

.floating-login.no-float {
  animation: none;
}

/* Dark mode */
.floating-login.dark {
  background: #111827;
  color: white;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
  color: inherit;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
}

.input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.input:focus {
  border-color: #6366F1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.dark .input {
  background: #1f2937;
  border-color: #374151;
  color: white;
}

.password-input {
  padding-right: 48px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 4px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #6366F1;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.submit-btn:hover {
  opacity: 0.9;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #d1d5db;
}

.divider span {
  color: #6b7280;
  font-size: 0.875rem;
}

.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.oauth-btn {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.2s;
}

.oauth-btn:hover {
  opacity: 0.9;
}

.oauth-icon {
  width: 20px;
  height: 20px;
}

.google-btn {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  color: #374151;
}

.dark .google-btn {
  background: #1f2937;
  border-color: #374151;
  color: white;
}

.apple-btn {
  background: #000;
  border: none;
  color: white;
}

.dark .apple-btn {
  background: white;
  color: black;
}`,
      js: `// FloatingLogin controller
class FloatingLogin {
  constructor(element, options = {}) {
    this.element = element;
    this.form = element.querySelector('.login-form');
    this.emailInput = element.querySelector('input[type="email"]');
    this.passwordInput = element.querySelector('.password-input');
    this.toggleBtn = element.querySelector('.toggle-password');
    this.submitBtn = element.querySelector('.submit-btn');
    this.showPassword = false;

    // Apply options
    if (options.mode === 'dark') element.classList.add('dark');
    if (options.floatingEnabled === false) element.classList.add('no-float');
    if (options.primaryColor) {
      this.submitBtn.style.backgroundColor = options.primaryColor;
    }

    // Event listeners
    this.toggleBtn?.addEventListener('click', () => this.togglePassword());
    this.form?.addEventListener('submit', (e) => this.handleSubmit(e, options.onLogin));

    element.querySelector('.google-btn')?.addEventListener('click', options.onGoogleLogin);
    element.querySelector('.apple-btn')?.addEventListener('click', options.onAppleLogin);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  async handleSubmit(e, callback) {
    e.preventDefault();
    if (!callback) return;

    this.submitBtn.disabled = true;
    this.submitBtn.textContent = 'Signing in...';

    try {
      await callback({
        email: this.emailInput.value,
        password: this.passwordInput.value
      });
    } finally {
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = 'Sign in';
    }
  }
}

// Usage:
// const login = new FloatingLogin(document.querySelector('.floating-login'), {
//   mode: 'dark',
//   primaryColor: '#8B5CF6',
//   onLogin: async (data) => console.log(data),
//   onGoogleLogin: () => console.log('Google'),
//   onAppleLogin: () => console.log('Apple')
// });`,
      usage: `<!-- Basic usage -->
<div class="floating-login-wrapper">
  <div class="floating-login">
    <h2 class="title">Welcome back</h2>
    <form class="login-form">
      <div class="input-group">
        <svg class="input-icon"><!-- Mail icon --></svg>
        <input type="email" placeholder="Email" class="input" />
      </div>
      <div class="input-group">
        <svg class="input-icon"><!-- Lock icon --></svg>
        <input type="password" placeholder="Password" class="input password-input" />
        <button type="button" class="toggle-password"><!-- Eye icon --></button>
      </div>
      <button type="submit" class="submit-btn">Sign in</button>
    </form>
    <div class="divider"><span>or</span></div>
    <div class="oauth-buttons">
      <button class="oauth-btn google-btn">Continue with Google</button>
      <button class="oauth-btn apple-btn">Continue with Apple</button>
    </div>
  </div>
</div>

<script>
  const login = new FloatingLogin(document.querySelector('.floating-login'), {
    mode: 'light',
    onLogin: async (data) => {
      console.log('Login:', data.email, data.password);
    }
  });
</script>`,
    },
  },
  // E-Commerce Components
  {
    id: 'product-card',
    name: 'ProductCard',
    description: 'Stunning 3D product card with mouse-tracking tilt effects, quick view overlay, and animated add to cart.',
    category: 'ecommerce',
    dependencies: ['framer-motion', 'lucide-react'],
    props: [
      { name: 'image', type: 'string', required: false, description: 'Product image URL' },
      { name: 'name', type: 'string', required: false, description: 'Product name', default: "'Premium Product'" },
      { name: 'price', type: 'number', required: false, description: 'Product price', default: '299.99' },
      { name: 'originalPrice', type: 'number', required: false, description: 'Original price for discount' },
      { name: 'rating', type: 'number', required: false, description: 'Product rating (0-5)', default: '4.8' },
      { name: 'reviews', type: 'number', required: false, description: 'Number of reviews', default: '256' },
      { name: 'badge', type: 'string', required: false, description: 'Badge text (e.g., "Best Seller")' },
      { name: 'onAddToCart', type: '() => void', required: false, description: 'Add to cart callback' },
      { name: 'onWishlist', type: '() => void', required: false, description: 'Wishlist callback' },
      { name: 'onQuickView', type: '() => void', required: false, description: 'Quick view callback' },
    ],
    usage: `import { ProductCard } from 'archyra';

<ProductCard
  image="https://example.com/product.jpg"
  name="Premium Wireless Headphones"
  price={299.99}
  originalPrice={399.99}
  rating={4.8}
  reviews={256}
  badge="Best Seller"
  onAddToCart={() => handleAddToCart()}
/>`,
    source: `// ProductCard component - see full source at:
// https://github.com/johnbekele/archyra/blob/main/ProductCard.tsx
// Install: npm install archyra framer-motion lucide-react`,
    vanilla: {
      html: `<div class="product-card">
  <div class="product-image">
    <span class="badge">Best Seller</span>
    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" alt="Product">
    <div class="quick-view">
      <button class="quick-view-btn">Quick View</button>
    </div>
    <button class="wishlist-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  </div>
  <div class="product-info">
    <h3 class="product-name">Premium Wireless Headphones</h3>
    <div class="product-rating">
      <div class="stars">★★★★★</div>
      <span class="reviews">(256 reviews)</span>
    </div>
    <div class="product-price">
      <span class="current-price">$299.99</span>
      <span class="original-price">$399.99</span>
    </div>
    <button class="add-to-cart-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      Add to Cart
    </button>
  </div>
</div>`,
      css: `.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 300px;
}

.product-card:hover {
  transform: translateY(-8px) rotateX(2deg);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.product-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  z-index: 10;
}

.wishlist-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, background 0.2s;
  z-index: 10;
}

.wishlist-btn:hover {
  transform: scale(1.1);
}

.wishlist-btn.active {
  background: #f43f5e;
}

.wishlist-btn.active svg {
  fill: white;
  stroke: white;
}

.wishlist-btn svg {
  width: 18px;
  height: 18px;
  color: #6b7280;
}

.quick-view {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .quick-view {
  opacity: 1;
}

.quick-view-btn {
  background: white;
  color: #111;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.product-card:hover .quick-view-btn {
  transform: translateY(0);
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #111;
  margin: 0 0 8px 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.stars {
  color: #fbbf24;
  font-size: 14px;
}

.reviews {
  color: #6b7280;
  font-size: 12px;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.current-price {
  font-size: 20px;
  font-weight: 700;
  color: #111;
}

.original-price {
  font-size: 14px;
  color: #9ca3af;
  text-decoration: line-through;
}

.add-to-cart-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.add-to-cart-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.add-to-cart-btn svg {
  width: 18px;
  height: 18px;
}`,
      js: `// ProductCard controller
class ProductCard {
  constructor(element) {
    this.element = element;
    this.wishlistBtn = element.querySelector('.wishlist-btn');
    this.addToCartBtn = element.querySelector('.add-to-cart-btn');
    this.quickViewBtn = element.querySelector('.quick-view-btn');
    this.isWishlisted = false;

    this.wishlistBtn?.addEventListener('click', () => this.toggleWishlist());
    this.addToCartBtn?.addEventListener('click', () => this.addToCart());
    this.quickViewBtn?.addEventListener('click', () => this.quickView());

    // 3D tilt effect on mouse move
    this.element.addEventListener('mousemove', (e) => this.handleTilt(e));
    this.element.addEventListener('mouseleave', () => this.resetTilt());
  }

  handleTilt(e) {
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    this.element.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) translateY(-8px)\`;
  }

  resetTilt() {
    this.element.style.transform = '';
  }

  toggleWishlist() {
    this.isWishlisted = !this.isWishlisted;
    this.wishlistBtn.classList.toggle('active', this.isWishlisted);
    if (this.onWishlist) this.onWishlist(this.isWishlisted);
  }

  addToCart() {
    this.addToCartBtn.textContent = 'Added!';
    this.addToCartBtn.style.background = '#10b981';
    if (this.onAddToCart) this.onAddToCart();
    setTimeout(() => {
      this.addToCartBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Add to Cart';
      this.addToCartBtn.style.background = '';
    }, 2000);
  }

  quickView() {
    if (this.onQuickView) this.onQuickView();
  }
}

// Usage:
// const card = new ProductCard(document.querySelector('.product-card'));
// card.onAddToCart = () => console.log('Added to cart!');
// card.onWishlist = (active) => console.log('Wishlisted:', active);`,
      usage: `<!-- Product Card -->
<div class="product-card">
  <div class="product-image">
    <span class="badge">Best Seller</span>
    <img src="product.jpg" alt="Product">
    <div class="quick-view">
      <button class="quick-view-btn">Quick View</button>
    </div>
    <button class="wishlist-btn"><!-- Heart SVG --></button>
  </div>
  <div class="product-info">
    <h3 class="product-name">Product Name</h3>
    <div class="product-rating">
      <div class="stars">★★★★★</div>
      <span class="reviews">(256 reviews)</span>
    </div>
    <div class="product-price">
      <span class="current-price">$299.99</span>
      <span class="original-price">$399.99</span>
    </div>
    <button class="add-to-cart-btn">Add to Cart</button>
  </div>
</div>

<script>
  const card = new ProductCard(document.querySelector('.product-card'));
  card.onAddToCart = () => alert('Added to cart!');
</script>`,
    },
  },
  {
    id: 'add-to-cart-button',
    name: 'AddToCartButton',
    description: 'Multi-state button with particle burst, loading animation, and success state transformation.',
    category: 'ecommerce',
    dependencies: ['framer-motion', 'lucide-react'],
    props: [
      { name: 'onClick', type: '() => Promise<void> | void', required: false, description: 'Click callback' },
      { name: 'text', type: 'string', required: false, description: 'Button text', default: "'Add to Cart'" },
      { name: 'successText', type: 'string', required: false, description: 'Success state text', default: "'Added!'" },
      { name: 'price', type: 'number', required: false, description: 'Price to display' },
      { name: 'variant', type: "'violet' | 'emerald' | 'rose' | 'amber'", required: false, description: 'Color variant', default: "'violet'" },
      { name: 'size', type: "'sm' | 'md' | 'lg'", required: false, description: 'Button size', default: "'md'" },
      { name: 'disabled', type: 'boolean', required: false, description: 'Disabled state', default: 'false' },
    ],
    usage: `import { AddToCartButton } from 'archyra';

<AddToCartButton
  text="Add to Cart"
  price={99.99}
  variant="violet"
  onClick={async () => {
    await api.addToCart(productId);
  }}
/>`,
    source: `// AddToCartButton component - see full source at:
// https://github.com/johnbekele/archyra/blob/main/AddToCartButton.tsx
// Install: npm install archyra framer-motion lucide-react`,
    vanilla: {
      html: `<button class="add-to-cart-button violet">
  <span class="button-content">
    <svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
    <span class="button-text">Add to Cart</span>
    <span class="price">$99.99</span>
  </span>
  <span class="success-content">
    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>Added!</span>
  </span>
  <div class="particles"></div>
</button>`,
      css: `.add-to-cart-button {
  position: relative;
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

/* Color variants */
.add-to-cart-button.violet {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
}

.add-to-cart-button.emerald {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.add-to-cart-button.rose {
  background: linear-gradient(135deg, #f43f5e, #e11d48);
  color: white;
}

.add-to-cart-button.amber {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

/* Size variants */
.add-to-cart-button.sm { padding: 10px 20px; font-size: 14px; }
.add-to-cart-button.lg { padding: 18px 36px; font-size: 18px; }

.add-to-cart-button:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
}

.add-to-cart-button:active {
  transform: scale(0.98);
}

.add-to-cart-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.3s, transform 0.3s;
}

.success-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.3s, transform 0.3s;
}

.add-to-cart-button.success .button-content {
  opacity: 0;
  transform: scale(0.8);
}

.add-to-cart-button.success .success-content {
  opacity: 1;
  transform: scale(1);
}

.add-to-cart-button.success {
  background: linear-gradient(135deg, #10b981, #059669);
}

.cart-icon, .check-icon {
  width: 20px;
  height: 20px;
}

.price {
  padding-left: 8px;
  margin-left: 8px;
  border-left: 1px solid rgba(255,255,255,0.3);
}

/* Loading state */
.add-to-cart-button.loading .button-content {
  opacity: 0;
}

.add-to-cart-button.loading::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Particle burst */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  opacity: 0;
}

.add-to-cart-button.burst .particle {
  animation: burst 0.6s ease-out forwards;
}

@keyframes burst {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--x), var(--y)) scale(0); opacity: 0; }
}`,
      js: `// AddToCartButton controller
class AddToCartButton {
  constructor(element, options = {}) {
    this.element = element;
    this.isLoading = false;
    this.onClick = options.onClick;

    element.addEventListener('click', () => this.handleClick());
  }

  async handleClick() {
    if (this.isLoading || this.element.classList.contains('success')) return;

    this.isLoading = true;
    this.element.classList.add('loading');

    try {
      if (this.onClick) await this.onClick();

      // Simulate delay if no callback
      if (!this.onClick) await new Promise(r => setTimeout(r, 1000));

      this.element.classList.remove('loading');
      this.createParticles();
      this.element.classList.add('burst', 'success');

      setTimeout(() => {
        this.element.classList.remove('burst', 'success');
        this.isLoading = false;
      }, 2000);
    } catch (e) {
      this.element.classList.remove('loading');
      this.isLoading = false;
    }
  }

  createParticles() {
    const container = this.element.querySelector('.particles');
    container.innerHTML = '';

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const angle = (i / 12) * Math.PI * 2;
      const distance = 40 + Math.random() * 30;
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
      particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
      container.appendChild(particle);
    }
  }
}

// Usage:
// const btn = new AddToCartButton(document.querySelector('.add-to-cart-button'), {
//   onClick: async () => { await api.addToCart(id); }
// });`,
      usage: `<!-- Add to Cart Button -->
<button class="add-to-cart-button violet">
  <span class="button-content">
    <svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
    <span class="button-text">Add to Cart</span>
    <span class="price">$99.99</span>
  </span>
  <span class="success-content">
    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>Added!</span>
  </span>
  <div class="particles"></div>
</button>

<script>
  const btn = new AddToCartButton(document.querySelector('.add-to-cart-button'));
</script>`,
    },
  },
  {
    id: 'wishlist-heart',
    name: 'WishlistHeart',
    description: 'Animated heart button with expanding rings, particle burst effects, and multiple size variants.',
    category: 'ecommerce',
    dependencies: ['framer-motion', 'lucide-react'],
    props: [
      { name: 'isActive', type: 'boolean', required: false, description: 'Initial active state', default: 'false' },
      { name: 'onToggle', type: '(isActive: boolean) => void', required: false, description: 'Toggle callback' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", required: false, description: 'Heart size', default: "'md'" },
      { name: 'showBackground', type: 'boolean', required: false, description: 'Show background circle', default: 'true' },
      { name: 'activeColor', type: 'string', required: false, description: 'Active state color', default: "'#F43F5E'" },
    ],
    usage: `import { WishlistHeart } from 'archyra';

<WishlistHeart
  size="lg"
  activeColor="#F43F5E"
  onToggle={(active) => toggleWishlist(active)}
/>`,
    source: `// WishlistHeart component - see full source at:
// https://github.com/johnbekele/archyra/blob/main/WishlistHeart.tsx
// Install: npm install archyra framer-motion lucide-react`,
    vanilla: {
      html: `<button class="wishlist-heart md">
  <div class="heart-bg"></div>
  <div class="rings">
    <div class="ring"></div>
    <div class="ring"></div>
  </div>
  <svg class="heart-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
  <div class="particles"></div>
</button>`,
      css: `.wishlist-heart {
  position: relative;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
}

/* Size variants */
.wishlist-heart.sm { width: 32px; height: 32px; }
.wishlist-heart.md { width: 44px; height: 44px; }
.wishlist-heart.lg { width: 56px; height: 56px; }
.wishlist-heart.xl { width: 72px; height: 72px; }

.heart-bg {
  position: absolute;
  inset: 0;
  background: #f3f4f6;
  border-radius: 50%;
  transition: background 0.3s, transform 0.2s;
}

.wishlist-heart:hover .heart-bg {
  transform: scale(1.1);
}

.wishlist-heart.active .heart-bg {
  background: rgba(244, 63, 94, 0.1);
}

.heart-icon {
  position: relative;
  width: 50%;
  height: 50%;
  color: #9ca3af;
  fill: none;
  transition: color 0.3s, fill 0.3s, transform 0.2s;
  z-index: 2;
}

.wishlist-heart:hover .heart-icon {
  color: #f43f5e;
}

.wishlist-heart.active .heart-icon {
  color: #f43f5e;
  fill: #f43f5e;
  animation: heartPop 0.3s ease;
}

@keyframes heartPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

/* Expanding rings */
.rings {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.ring {
  position: absolute;
  inset: 0;
  border: 2px solid #f43f5e;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.8);
}

.wishlist-heart.active .ring {
  animation: ringExpand 0.6s ease-out forwards;
}

.wishlist-heart.active .ring:nth-child(2) {
  animation-delay: 0.1s;
}

@keyframes ringExpand {
  0% { transform: scale(0.8); opacity: 0.8; }
  100% { transform: scale(1.6); opacity: 0; }
}

/* Particle burst */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.heart-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #f43f5e;
  border-radius: 50%;
  left: 50%;
  top: 50%;
}

.wishlist-heart.burst .heart-particle {
  animation: particleBurst 0.5s ease-out forwards;
}

@keyframes particleBurst {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(0); opacity: 0; }
}`,
      js: `// WishlistHeart controller
class WishlistHeart {
  constructor(element, options = {}) {
    this.element = element;
    this.isActive = options.isActive || false;
    this.onToggle = options.onToggle;
    this.activeColor = options.activeColor || '#f43f5e';

    if (this.isActive) element.classList.add('active');
    element.addEventListener('click', () => this.toggle());
  }

  toggle() {
    this.isActive = !this.isActive;
    this.element.classList.toggle('active', this.isActive);

    if (this.isActive) {
      this.createParticles();
      this.element.classList.add('burst');
      setTimeout(() => this.element.classList.remove('burst'), 600);
    }

    if (this.onToggle) this.onToggle(this.isActive);
  }

  createParticles() {
    const container = this.element.querySelector('.particles');
    container.innerHTML = '';

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'heart-particle';
      const angle = (i / 8) * Math.PI * 2;
      const distance = 25 + Math.random() * 15;
      particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
      particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
      particle.style.background = this.activeColor;
      container.appendChild(particle);
    }
  }

  setActive(active) {
    this.isActive = active;
    this.element.classList.toggle('active', active);
  }
}

// Usage:
// const heart = new WishlistHeart(document.querySelector('.wishlist-heart'), {
//   onToggle: (active) => console.log('Wishlisted:', active)
// });`,
      usage: `<!-- Wishlist Heart Button -->
<button class="wishlist-heart md">
  <div class="heart-bg"></div>
  <div class="rings">
    <div class="ring"></div>
    <div class="ring"></div>
  </div>
  <svg class="heart-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
  <div class="particles"></div>
</button>

<script>
  const heart = new WishlistHeart(document.querySelector('.wishlist-heart'), {
    onToggle: (active) => console.log('Wishlisted:', active)
  });
</script>`,
    },
  },
  {
    id: 'flash-sale-timer',
    name: 'FlashSaleTimer',
    description: 'Eye-catching countdown timer with flip transitions, urgency animations, and pulsing effects.',
    category: 'ecommerce',
    dependencies: ['framer-motion', 'lucide-react'],
    props: [
      { name: 'endTime', type: 'Date | number', required: true, description: 'End time as Date or timestamp' },
      { name: 'title', type: 'string', required: false, description: 'Timer title', default: "'Flash Sale Ends In'" },
      { name: 'onEnd', type: '() => void', required: false, description: 'Callback when timer ends' },
      { name: 'variant', type: "'default' | 'urgent' | 'minimal'", required: false, description: 'Style variant', default: "'default'" },
      { name: 'showBadge', type: 'boolean', required: false, description: 'Show discount badge', default: 'true' },
      { name: 'discount', type: 'number', required: false, description: 'Discount percentage', default: '50' },
    ],
    usage: `import { FlashSaleTimer } from 'archyra';

<FlashSaleTimer
  endTime={Date.now() + 2 * 60 * 60 * 1000}
  title="Flash Sale Ends In"
  discount={70}
  onEnd={() => console.log('Sale ended!')}
/>`,
    source: `// FlashSaleTimer component - see full source at:
// https://github.com/johnbekele/archyra/blob/main/FlashSaleTimer.tsx
// Install: npm install archyra framer-motion lucide-react`,
    vanilla: {
      html: `<div class="flash-sale-timer">
  <div class="timer-header">
    <div class="badge">
      <svg class="zap-icon" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
      <span>50% OFF</span>
    </div>
    <h3 class="timer-title">Flash Sale Ends In</h3>
  </div>
  <div class="countdown">
    <div class="time-unit">
      <div class="time-value" data-unit="hours">00</div>
      <div class="time-label">Hours</div>
    </div>
    <div class="time-separator">:</div>
    <div class="time-unit">
      <div class="time-value" data-unit="minutes">00</div>
      <div class="time-label">Minutes</div>
    </div>
    <div class="time-separator">:</div>
    <div class="time-unit">
      <div class="time-value" data-unit="seconds">00</div>
      <div class="time-label">Seconds</div>
    </div>
  </div>
</div>`,
      css: `.flash-sale-timer {
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  border-radius: 16px;
  padding: 24px;
  color: white;
  text-align: center;
  min-width: 320px;
}

.timer-header {
  margin-bottom: 20px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;
  animation: pulse-badge 2s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.zap-icon {
  width: 16px;
  height: 16px;
}

.timer-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  opacity: 0.9;
}

.countdown {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-value {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 32px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  min-width: 72px;
  position: relative;
  overflow: hidden;
}

.time-value.flip {
  animation: flip 0.3s ease;
}

@keyframes flip {
  0% { transform: perspective(200px) rotateX(0); }
  50% { transform: perspective(200px) rotateX(-10deg); }
  100% { transform: perspective(200px) rotateX(0); }
}

.time-label {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.time-separator {
  font-size: 32px;
  font-weight: 700;
  opacity: 0.5;
  animation: blink-sep 1s ease-in-out infinite;
}

@keyframes blink-sep {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Urgent variant (under 1 hour) */
.flash-sale-timer.urgent {
  background: linear-gradient(135deg, #7f1d1d, #991b1b);
  animation: urgent-pulse 1s ease-in-out infinite;
}

@keyframes urgent-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
}

/* Minimal variant */
.flash-sale-timer.minimal {
  background: white;
  color: #111;
  border: 1px solid #e5e7eb;
}

.flash-sale-timer.minimal .time-value {
  background: #f3f4f6;
}

.flash-sale-timer.minimal .badge {
  background: #ef4444;
}`,
      js: `// FlashSaleTimer controller
class FlashSaleTimer {
  constructor(element, options = {}) {
    this.element = element;
    this.endTime = options.endTime || Date.now() + 2 * 60 * 60 * 1000;
    this.onEnd = options.onEnd;
    this.discount = options.discount || 50;

    // Set discount badge
    const badge = element.querySelector('.badge span');
    if (badge) badge.textContent = this.discount + '% OFF';

    this.hoursEl = element.querySelector('[data-unit="hours"]');
    this.minutesEl = element.querySelector('[data-unit="minutes"]');
    this.secondsEl = element.querySelector('[data-unit="seconds"]');

    this.lastValues = { hours: '', minutes: '', seconds: '' };
    this.start();
  }

  start() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = Date.now();
    const diff = Math.max(0, this.endTime - now);

    if (diff === 0) {
      clearInterval(this.interval);
      if (this.onEnd) this.onEnd();
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Check if less than 1 hour for urgent mode
    if (hours === 0) {
      this.element.classList.add('urgent');
    }

    this.setValue(this.hoursEl, 'hours', String(hours).padStart(2, '0'));
    this.setValue(this.minutesEl, 'minutes', String(minutes).padStart(2, '0'));
    this.setValue(this.secondsEl, 'seconds', String(seconds).padStart(2, '0'));
  }

  setValue(el, unit, value) {
    if (this.lastValues[unit] !== value) {
      el.textContent = value;
      el.classList.add('flip');
      setTimeout(() => el.classList.remove('flip'), 300);
      this.lastValues[unit] = value;
    }
  }

  stop() {
    clearInterval(this.interval);
  }
}

// Usage:
// const timer = new FlashSaleTimer(document.querySelector('.flash-sale-timer'), {
//   endTime: Date.now() + 2 * 60 * 60 * 1000,
//   discount: 70,
//   onEnd: () => console.log('Sale ended!')
// });`,
      usage: `<!-- Flash Sale Timer -->
<div class="flash-sale-timer">
  <div class="timer-header">
    <div class="badge">
      <svg class="zap-icon" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
      <span>50% OFF</span>
    </div>
    <h3 class="timer-title">Flash Sale Ends In</h3>
  </div>
  <div class="countdown">
    <div class="time-unit">
      <div class="time-value" data-unit="hours">00</div>
      <div class="time-label">Hours</div>
    </div>
    <div class="time-separator">:</div>
    <div class="time-unit">
      <div class="time-value" data-unit="minutes">00</div>
      <div class="time-label">Minutes</div>
    </div>
    <div class="time-separator">:</div>
    <div class="time-unit">
      <div class="time-value" data-unit="seconds">00</div>
      <div class="time-label">Seconds</div>
    </div>
  </div>
</div>

<script>
  const timer = new FlashSaleTimer(document.querySelector('.flash-sale-timer'), {
    endTime: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
    discount: 70,
    onEnd: () => alert('Sale ended!')
  });
</script>`,
    },
  },
  {
    id: 'cart-notification',
    name: 'CartNotification',
    description: 'Animated notification showing product flying to cart with success animations and progress bar.',
    category: 'ecommerce',
    dependencies: ['framer-motion', 'lucide-react'],
    props: [
      { name: 'isVisible', type: 'boolean', required: true, description: 'Show notification' },
      { name: 'productImage', type: 'string', required: false, description: 'Product image URL' },
      { name: 'productName', type: 'string', required: false, description: 'Product name', default: "'Product Added'" },
      { name: 'productPrice', type: 'number', required: false, description: 'Product price', default: '99.99' },
      { name: 'cartCount', type: 'number', required: false, description: 'Current cart count', default: '1' },
      { name: 'autoHideDuration', type: 'number', required: false, description: 'Auto hide after ms', default: '4000' },
      { name: 'onDismiss', type: '() => void', required: false, description: 'Dismiss callback' },
      { name: 'onViewCart', type: '() => void', required: false, description: 'View cart callback' },
      { name: 'position', type: "'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'", required: false, description: 'Position', default: "'top-right'" },
    ],
    usage: `import { CartNotification } from 'archyra';

const [showNotification, setShowNotification] = useState(false);

<CartNotification
  isVisible={showNotification}
  productName="Premium Headphones"
  productPrice={299.99}
  cartCount={cartCount}
  onDismiss={() => setShowNotification(false)}
  onViewCart={() => router.push('/cart')}
/>`,
    source: `// CartNotification component - see full source at:
// https://github.com/johnbekele/archyra/blob/main/CartNotification.tsx
// Install: npm install archyra framer-motion lucide-react`,
    vanilla: {
      html: `<div class="cart-notification top-right">
  <div class="notification-content">
    <div class="product-info">
      <div class="product-image">
        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop" alt="Product">
      </div>
      <div class="product-details">
        <div class="success-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Added to Cart
        </div>
        <h4 class="product-name">Premium Headphones</h4>
        <p class="product-price">$299.99</p>
      </div>
    </div>
    <div class="notification-actions">
      <button class="view-cart-btn">View Cart (3)</button>
      <button class="dismiss-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
  </div>
</div>`,
      css: `.cart-notification {
  position: fixed;
  z-index: 100;
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.3s, transform 0.3s;
  pointer-events: none;
}

.cart-notification.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* Position variants */
.cart-notification.top-right { top: 20px; right: 20px; }
.cart-notification.top-center { top: 20px; left: 50%; transform: translateX(-50%) translateY(-20px); }
.cart-notification.bottom-right { bottom: 20px; right: 20px; }
.cart-notification.bottom-center { bottom: 20px; left: 50%; transform: translateX(-50%) translateY(20px); }

.cart-notification.visible.top-center,
.cart-notification.visible.bottom-center {
  transform: translateX(-50%) translateY(0);
}

.notification-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 16px;
  min-width: 320px;
  max-width: 400px;
  overflow: hidden;
}

.product-info {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.product-image {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  animation: flyIn 0.5s ease-out;
}

@keyframes flyIn {
  0% { transform: scale(0.5) translateX(-50px); opacity: 0; }
  100% { transform: scale(1) translateX(0); opacity: 1; }
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  flex: 1;
}

.success-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #10b981;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
}

.success-badge svg {
  width: 14px;
  height: 14px;
  animation: checkPop 0.3s ease 0.2s both;
}

@keyframes checkPop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #111;
  margin: 0 0 4px 0;
}

.product-price {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.notification-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.view-cart-btn {
  flex: 1;
  padding: 10px 16px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.view-cart-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.dismiss-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.dismiss-btn:hover {
  background: #f3f4f6;
}

.dismiss-btn svg {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #e5e7eb;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  width: 100%;
  animation: progress 4s linear forwards;
}

@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}`,
      js: `// CartNotification controller
class CartNotification {
  constructor(element, options = {}) {
    this.element = element;
    this.autoHideDuration = options.autoHideDuration || 4000;
    this.onDismiss = options.onDismiss;
    this.onViewCart = options.onViewCart;
    this.timeout = null;

    // Set product info
    if (options.productImage) {
      element.querySelector('.product-image img').src = options.productImage;
    }
    if (options.productName) {
      element.querySelector('.product-name').textContent = options.productName;
    }
    if (options.productPrice) {
      element.querySelector('.product-price').textContent = '$' + options.productPrice.toFixed(2);
    }
    if (options.cartCount) {
      element.querySelector('.view-cart-btn').textContent = 'View Cart (' + options.cartCount + ')';
    }

    // Event listeners
    element.querySelector('.dismiss-btn')?.addEventListener('click', () => this.hide());
    element.querySelector('.view-cart-btn')?.addEventListener('click', () => {
      if (this.onViewCart) this.onViewCart();
      this.hide();
    });
  }

  show() {
    this.element.classList.add('visible');

    // Reset progress animation
    const fill = this.element.querySelector('.progress-fill');
    fill.style.animation = 'none';
    fill.offsetHeight; // Trigger reflow
    fill.style.animation = 'progress ' + (this.autoHideDuration / 1000) + 's linear forwards';

    // Auto hide
    this.timeout = setTimeout(() => this.hide(), this.autoHideDuration);
  }

  hide() {
    clearTimeout(this.timeout);
    this.element.classList.remove('visible');
    if (this.onDismiss) this.onDismiss();
  }
}

// Usage:
// const notification = new CartNotification(document.querySelector('.cart-notification'), {
//   productName: 'Premium Headphones',
//   productPrice: 299.99,
//   cartCount: 3,
//   onViewCart: () => window.location = '/cart',
//   onDismiss: () => console.log('Dismissed')
// });
// notification.show();`,
      usage: `<!-- Cart Notification -->
<div class="cart-notification top-right">
  <div class="notification-content">
    <div class="product-info">
      <div class="product-image">
        <img src="product.jpg" alt="Product">
      </div>
      <div class="product-details">
        <div class="success-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Added to Cart
        </div>
        <h4 class="product-name">Product Name</h4>
        <p class="product-price">$99.99</p>
      </div>
    </div>
    <div class="notification-actions">
      <button class="view-cart-btn">View Cart (1)</button>
      <button class="dismiss-btn"><!-- X icon --></button>
    </div>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
  </div>
</div>

<script>
  const notification = new CartNotification(document.querySelector('.cart-notification'), {
    productName: 'Premium Headphones',
    productPrice: 299.99,
    cartCount: 3,
    onViewCart: () => window.location = '/cart'
  });

  // Show notification when product is added
  notification.show();
</script>`,
    },
  },
  // Chat Components
  {
    id: 'chat-bubble',
    name: 'ChatBubble',
    description: 'Animated chat message bubble with smooth entrance animations. Supports sender/receiver variants, colors, and message status.',
    category: 'chat',
    dependencies: ['framer-motion', 'lucide-react'],
    props: [
      { name: 'message', type: 'string', required: true, description: 'The text content of the message' },
      { name: 'variant', type: "'sender' | 'receiver'", required: false, description: 'Bubble alignment', default: "'sender'" },
      { name: 'color', type: "'blue' | 'green' | 'purple' | 'gray' | 'gradient'", required: false, description: 'Color theme', default: "'blue'" },
      { name: 'timestamp', type: 'string', required: false, description: 'Optional timestamp to display' },
      { name: 'status', type: "'sending' | 'sent' | 'delivered' | 'read'", required: false, description: 'Message status (sender only)' },
      { name: 'animate', type: 'boolean', required: false, description: 'Enable entrance animation', default: 'true' },
      { name: 'delay', type: 'number', required: false, description: 'Animation delay in seconds', default: '0' },
    ],
    usage: `import ChatBubble from '@/components/ChatBubble';

// Sender message
<ChatBubble
  message="Hello! How are you?"
  variant="sender"
  color="blue"
  timestamp="2:30 PM"
  status="read"
/>

// Receiver message
<ChatBubble
  message="I'm doing great, thanks!"
  variant="receiver"
  color="blue"
  timestamp="2:31 PM"
/>`,
    source: `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck, Clock } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  variant?: 'sender' | 'receiver';
  color?: 'blue' | 'green' | 'purple' | 'gray' | 'gradient';
  animate?: boolean;
  timestamp?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  delay?: number;
}

const colorStyles = {
  blue: { sender: 'bg-blue-500 text-white', receiver: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' },
  green: { sender: 'bg-green-500 text-white', receiver: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' },
  purple: { sender: 'bg-purple-500 text-white', receiver: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' },
  gray: { sender: 'bg-gray-600 text-white', receiver: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' },
  gradient: { sender: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white', receiver: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' },
};

const StatusIcon = ({ status }: { status: ChatBubbleProps['status'] }) => {
  switch (status) {
    case 'sending': return <Clock className="w-3 h-3 text-white/60" />;
    case 'sent': return <Check className="w-3 h-3 text-white/60" />;
    case 'delivered': return <CheckCheck className="w-3 h-3 text-white/60" />;
    case 'read': return <CheckCheck className="w-3 h-3 text-blue-300" />;
    default: return null;
  }
};

export default function ChatBubble({
  message,
  variant = 'sender',
  color = 'blue',
  animate = true,
  timestamp,
  status,
  delay = 0,
}: ChatBubbleProps) {
  const isSender = variant === 'sender';
  const colorClass = colorStyles[color][variant];

  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.8, x: isSender ? 20 : -20, y: 10 },
    visible: {
      opacity: 1, scale: 1, x: 0, y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 25, delay }
    },
  };

  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? { initial: 'hidden', animate: 'visible', variants: bubbleVariants } : {};

  return (
    <Wrapper {...wrapperProps} className={\`flex \${isSender ? 'justify-end' : 'justify-start'}\`}>
      <div className={\`relative max-w-[80%] px-4 py-2.5 rounded-2xl \${colorClass} \${isSender ? 'rounded-br-md' : 'rounded-bl-md'} shadow-sm\`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        {(timestamp || status) && (
          <div className={\`flex items-center gap-1 mt-1 \${isSender ? 'justify-end' : 'justify-start'}\`}>
            {timestamp && <span className={\`text-[10px] \${isSender ? 'text-white/60' : 'text-gray-400'}\`}>{timestamp}</span>}
            {status && isSender && <StatusIcon status={status} />}
          </div>
        )}
      </div>
    </Wrapper>
  );
}`,
    vanilla: {
      html: `<div class="chat-bubble-container sender">
  <div class="chat-bubble blue">
    <p class="message">Hello! How are you?</p>
    <div class="meta">
      <span class="timestamp">2:30 PM</span>
      <span class="status read">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 7l-8.5 8.5-4-4M22 7l-8.5 8.5"/>
        </svg>
      </span>
    </div>
  </div>
</div>`,
      css: `.chat-bubble-container {
  display: flex;
  margin-bottom: 8px;
  animation: bubbleIn 0.3s ease-out;
}

.chat-bubble-container.sender {
  justify-content: flex-end;
}

.chat-bubble-container.receiver {
  justify-content: flex-start;
}

@keyframes bubbleIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.chat-bubble {
  max-width: 80%;
  padding: 10px 16px;
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  position: relative;
}

.chat-bubble-container.sender .chat-bubble {
  border-bottom-right-radius: 4px;
}

.chat-bubble-container.receiver .chat-bubble {
  border-bottom-left-radius: 4px;
}

/* Colors */
.chat-bubble.blue { background: #3b82f6; color: white; }
.chat-bubble.green { background: #22c55e; color: white; }
.chat-bubble.purple { background: #a855f7; color: white; }
.chat-bubble.gray { background: #4b5563; color: white; }
.chat-bubble.gradient { background: linear-gradient(to right, #3b82f6, #8b5cf6); color: white; }

.chat-bubble-container.receiver .chat-bubble {
  background: #f3f4f6;
  color: #1f2937;
}

.chat-bubble .message {
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  white-space: pre-wrap;
}

.chat-bubble .meta {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  justify-content: flex-end;
}

.chat-bubble .timestamp {
  font-size: 10px;
  opacity: 0.6;
}

.chat-bubble .status svg {
  width: 14px;
  height: 14px;
  opacity: 0.6;
}

.chat-bubble .status.read svg {
  color: #93c5fd;
  opacity: 1;
}`,
      js: `// ChatBubble helper
class ChatBubble {
  static create(options = {}) {
    const {
      message = '',
      variant = 'sender',
      color = 'blue',
      timestamp = '',
      status = ''
    } = options;

    const container = document.createElement('div');
    container.className = \`chat-bubble-container \${variant}\`;

    const bubble = document.createElement('div');
    bubble.className = \`chat-bubble \${variant === 'sender' ? color : ''}\`;

    const messageEl = document.createElement('p');
    messageEl.className = 'message';
    messageEl.textContent = message;
    bubble.appendChild(messageEl);

    if (timestamp || status) {
      const meta = document.createElement('div');
      meta.className = 'meta';

      if (timestamp) {
        const ts = document.createElement('span');
        ts.className = 'timestamp';
        ts.textContent = timestamp;
        meta.appendChild(ts);
      }

      if (status && variant === 'sender') {
        const statusEl = document.createElement('span');
        statusEl.className = \`status \${status}\`;
        statusEl.innerHTML = status === 'read' || status === 'delivered'
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 7l-8.5 8.5-4-4M22 7l-8.5 8.5"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
        meta.appendChild(statusEl);
      }

      bubble.appendChild(meta);
    }

    container.appendChild(bubble);
    return container;
  }
}

// Usage:
// const bubble = ChatBubble.create({
//   message: 'Hello!',
//   variant: 'sender',
//   color: 'blue',
//   timestamp: '2:30 PM',
//   status: 'read'
// });
// document.querySelector('.chat-container').appendChild(bubble);`,
      usage: `<!-- Chat Bubbles -->
<div class="chat-container">
  <!-- Sender message -->
  <div class="chat-bubble-container sender">
    <div class="chat-bubble blue">
      <p class="message">Hello! How are you?</p>
      <div class="meta">
        <span class="timestamp">2:30 PM</span>
        <span class="status read">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 7l-8.5 8.5-4-4M22 7l-8.5 8.5"/>
          </svg>
        </span>
      </div>
    </div>
  </div>

  <!-- Receiver message -->
  <div class="chat-bubble-container receiver">
    <div class="chat-bubble">
      <p class="message">I'm doing great, thanks!</p>
      <div class="meta">
        <span class="timestamp">2:31 PM</span>
      </div>
    </div>
  </div>
</div>

<script>
  // Or create dynamically
  const bubble = ChatBubble.create({
    message: 'New message!',
    variant: 'sender',
    color: 'gradient',
    timestamp: '2:32 PM',
    status: 'sent'
  });
  document.querySelector('.chat-container').appendChild(bubble);
</script>`,
    },
  },
  {
    id: 'chat-typing',
    name: 'ChatTyping',
    description: 'Animated typing indicator with bouncing dots. Multiple animation variants for showing typing status in chat interfaces.',
    category: 'chat',
    dependencies: ['framer-motion'],
    props: [
      { name: 'isTyping', type: 'boolean', required: false, description: 'Show/hide the indicator', default: 'true' },
      { name: 'variant', type: "'dots' | 'pulse' | 'wave'", required: false, description: 'Animation style', default: "'dots'" },
      { name: 'color', type: "'gray' | 'blue' | 'green' | 'purple'", required: false, description: 'Dot color', default: "'gray'" },
      { name: 'size', type: "'sm' | 'md' | 'lg'", required: false, description: 'Indicator size', default: "'md'" },
      { name: 'showAvatar', type: 'boolean', required: false, description: 'Show user avatar', default: 'false' },
      { name: 'userName', type: 'string', required: false, description: 'Username to display' },
    ],
    usage: `import ChatTyping from '@/components/ChatTyping';

// Basic indicator
<ChatTyping isTyping={true} variant="dots" />

// With avatar
<ChatTyping
  isTyping={true}
  showAvatar
  userName="Alice"
  variant="pulse"
  color="blue"
/>`,
    source: `'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatTypingProps {
  isTyping?: boolean;
  variant?: 'dots' | 'pulse' | 'wave';
  color?: 'gray' | 'blue' | 'green' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  showAvatar?: boolean;
  userName?: string;
}

const colorMap = {
  gray: 'bg-gray-400',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
};

const sizeMap = {
  sm: { dot: 'w-1.5 h-1.5', container: 'px-3 py-2', gap: 'gap-1' },
  md: { dot: 'w-2 h-2', container: 'px-4 py-3', gap: 'gap-1.5' },
  lg: { dot: 'w-2.5 h-2.5', container: 'px-5 py-4', gap: 'gap-2' },
};

export default function ChatTyping({
  isTyping = true,
  variant = 'dots',
  color = 'gray',
  size = 'md',
  showAvatar = false,
  userName,
}: ChatTypingProps) {
  const dotClass = \`\${sizeMap[size].dot} \${colorMap[color]} rounded-full\`;

  const animations = {
    dots: { y: [0, -6, 0] },
    pulse: { scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] },
    wave: { y: [0, -4, 0, 4, 0], scale: [1, 1.1, 1, 0.9, 1] },
  };

  return (
    <AnimatePresence>
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-end gap-2"
        >
          {showAvatar && (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
              {userName?.[0]?.toUpperCase() || '?'}
            </div>
          )}
          <div className={\`bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md \${sizeMap[size].container}\`}>
            <div className={\`flex items-center \${sizeMap[size].gap}\`}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={dotClass}
                  animate={animations[variant]}
                  transition={{
                    duration: variant === 'wave' ? 1.2 : variant === 'pulse' ? 1 : 0.6,
                    repeat: Infinity,
                    delay: i * (variant === 'wave' ? 0.1 : variant === 'pulse' ? 0.2 : 0.15),
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}`,
    vanilla: {
      html: `<div class="chat-typing">
  <div class="typing-avatar">A</div>
  <div class="typing-bubble">
    <div class="typing-dots dots">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
  <span class="typing-text">Alice is typing...</span>
</div>`,
      css: `.chat-typing {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.typing-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
}

.typing-bubble {
  background: #f3f4f6;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  padding: 12px 16px;
}

.typing-dots {
  display: flex;
  align-items: center;
  gap: 6px;
}

.typing-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
}

/* Dots variant - bouncing */
.typing-dots.dots .dot {
  animation: bounce 0.6s ease-in-out infinite;
}
.typing-dots.dots .dot:nth-child(2) { animation-delay: 0.15s; }
.typing-dots.dots .dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* Pulse variant */
.typing-dots.pulse .dot {
  animation: pulse 1s ease-in-out infinite;
}
.typing-dots.pulse .dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dots.pulse .dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.3); opacity: 1; }
}

/* Wave variant */
.typing-dots.wave .dot {
  animation: wave 1.2s ease-in-out infinite;
}
.typing-dots.wave .dot:nth-child(2) { animation-delay: 0.1s; }
.typing-dots.wave .dot:nth-child(3) { animation-delay: 0.2s; }

@keyframes wave {
  0%, 100% { transform: translateY(0) scale(1); }
  25% { transform: translateY(-4px) scale(1.1); }
  75% { transform: translateY(4px) scale(0.9); }
}

/* Colors */
.typing-dots.blue .dot { background: #3b82f6; }
.typing-dots.green .dot { background: #22c55e; }
.typing-dots.purple .dot { background: #a855f7; }

.typing-text {
  font-size: 12px;
  color: #9ca3af;
  font-style: italic;
}

/* Sizes */
.typing-dots.sm .dot { width: 6px; height: 6px; }
.typing-dots.sm { gap: 4px; }
.typing-bubble.sm { padding: 8px 12px; }

.typing-dots.lg .dot { width: 10px; height: 10px; }
.typing-dots.lg { gap: 8px; }
.typing-bubble.lg { padding: 16px 20px; }`,
      js: `// ChatTyping controller
class ChatTyping {
  constructor(element, options = {}) {
    this.element = element;
    this.options = options;

    // Set variant
    const dots = element.querySelector('.typing-dots');
    dots.className = 'typing-dots ' + (options.variant || 'dots');
    if (options.color) dots.classList.add(options.color);
    if (options.size) {
      dots.classList.add(options.size);
      element.querySelector('.typing-bubble')?.classList.add(options.size);
    }

    // Set avatar
    if (options.userName) {
      const avatar = element.querySelector('.typing-avatar');
      if (avatar) avatar.textContent = options.userName[0].toUpperCase();
      const text = element.querySelector('.typing-text');
      if (text) text.textContent = options.userName + ' is typing...';
    }

    // Hide avatar if not needed
    if (!options.showAvatar) {
      const avatar = element.querySelector('.typing-avatar');
      if (avatar) avatar.style.display = 'none';
    }
  }

  show() {
    this.element.style.display = 'flex';
  }

  hide() {
    this.element.style.display = 'none';
  }
}

// Usage:
// const typing = new ChatTyping(document.querySelector('.chat-typing'), {
//   variant: 'dots', // 'dots', 'pulse', 'wave'
//   color: 'blue',
//   size: 'md',
//   showAvatar: true,
//   userName: 'Alice'
// });
// typing.show();`,
      usage: `<!-- Chat Typing Indicator -->
<div class="chat-typing">
  <div class="typing-avatar">A</div>
  <div class="typing-bubble">
    <div class="typing-dots dots blue">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
  <span class="typing-text">Alice is typing...</span>
</div>

<script>
  const typing = new ChatTyping(document.querySelector('.chat-typing'), {
    variant: 'pulse',
    color: 'purple',
    showAvatar: true,
    userName: 'Alice'
  });
</script>`,
    },
  },
  {
    id: 'chat-message',
    name: 'ChatMessage',
    description: 'Complete chat message component with avatar, name, bubble, and animations. Supports text, image, and system messages.',
    category: 'chat',
    dependencies: ['framer-motion', 'lucide-react'],
    props: [
      { name: 'user', type: '{ name: string; avatar?: string; isOnline?: boolean }', required: true, description: 'User information' },
      { name: 'message', type: 'string', required: true, description: 'Message content' },
      { name: 'variant', type: "'sender' | 'receiver'", required: false, description: 'Message alignment', default: "'receiver'" },
      { name: 'timestamp', type: 'string', required: false, description: 'Message timestamp' },
      { name: 'status', type: "'sending' | 'sent' | 'delivered' | 'read'", required: false, description: 'Message status' },
      { name: 'type', type: "'text' | 'image' | 'system'", required: false, description: 'Message type', default: "'text'" },
      { name: 'color', type: "'blue' | 'green' | 'purple' | 'gray' | 'gradient'", required: false, description: 'Bubble color', default: "'blue'" },
      { name: 'showAvatar', type: 'boolean', required: false, description: 'Show user avatar', default: 'true' },
      { name: 'showName', type: 'boolean', required: false, description: 'Show user name', default: 'true' },
    ],
    usage: `import ChatMessage from '@/components/ChatMessage';

<ChatMessage
  user={{ name: 'Alice', avatar: '/alice.jpg', isOnline: true }}
  message="Hello! How are you?"
  variant="receiver"
  timestamp="2:30 PM"
/>

<ChatMessage
  user={{ name: 'You' }}
  message="I'm doing great!"
  variant="sender"
  status="read"
  timestamp="2:31 PM"
/>`,
    source: `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck, Clock } from 'lucide-react';

interface ChatUser {
  name: string;
  avatar?: string;
  isOnline?: boolean;
}

interface ChatMessageProps {
  user: ChatUser;
  message: string;
  variant?: 'sender' | 'receiver';
  timestamp?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'system';
  imageUrl?: string;
  color?: 'blue' | 'green' | 'purple' | 'gray' | 'gradient';
  showAvatar?: boolean;
  showName?: boolean;
  delay?: number;
}

const colorStyles = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  gray: 'bg-gray-600',
  gradient: 'bg-gradient-to-r from-blue-500 to-purple-600',
};

export default function ChatMessage({
  user,
  message,
  variant = 'receiver',
  timestamp,
  status,
  type = 'text',
  color = 'blue',
  showAvatar = true,
  showName = true,
  delay = 0,
}: ChatMessageProps) {
  const isSender = variant === 'sender';

  if (type === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center my-4"
      >
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
          <p className="text-xs text-gray-500">{message}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: isSender ? 30 : -30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, delay }}
      className={\`flex gap-2 mt-3 \${isSender ? 'flex-row-reverse' : 'flex-row'}\`}
    >
      {showAvatar && (
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 font-medium">{user.name[0]?.toUpperCase()}</span>
            )}
          </div>
          {user.isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>
      )}

      <div className={\`flex flex-col \${isSender ? 'items-end' : 'items-start'} max-w-[75%]\`}>
        {showName && !isSender && (
          <span className="text-xs text-gray-500 mb-1 ml-1">{user.name}</span>
        )}
        <div className={\`relative px-4 py-2.5 rounded-2xl shadow-sm \${
          isSender
            ? \`\${colorStyles[color]} text-white rounded-br-md\`
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
        }\`}>
          <p className="text-sm leading-relaxed">{message}</p>
          {(timestamp || status) && (
            <div className={\`flex items-center gap-1 mt-1 \${isSender ? 'justify-end' : 'justify-start'}\`}>
              {timestamp && <span className={\`text-[10px] \${isSender ? 'text-white/60' : 'text-gray-400'}\`}>{timestamp}</span>}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}`,
    vanilla: {
      html: `<div class="chat-message receiver">
  <div class="message-avatar">
    <img src="avatar.jpg" alt="Alice">
    <span class="online-indicator"></span>
  </div>
  <div class="message-content">
    <span class="message-name">Alice</span>
    <div class="message-bubble">
      <p class="message-text">Hello! How are you?</p>
      <div class="message-meta">
        <span class="message-time">2:30 PM</span>
      </div>
    </div>
  </div>
</div>`,
      css: `.chat-message {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  animation: messageIn 0.3s ease-out;
}

.chat-message.sender {
  flex-direction: row-reverse;
}

@keyframes messageIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateX(var(--slide-dir, -30px));
  }
  to {
    opacity: 1;
    transform: scale(1) translateX(0);
  }
}

.chat-message.sender {
  --slide-dir: 30px;
}

.message-avatar {
  position: relative;
  flex-shrink: 0;
}

.message-avatar img,
.message-avatar .avatar-placeholder {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #6b7280;
}

.online-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: #22c55e;
  border: 2px solid white;
  border-radius: 50%;
}

.message-content {
  display: flex;
  flex-direction: column;
  max-width: 75%;
}

.chat-message.sender .message-content {
  align-items: flex-end;
}

.message-name {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
  margin-left: 4px;
}

.chat-message.sender .message-name {
  display: none;
}

.message-bubble {
  padding: 10px 16px;
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.chat-message.receiver .message-bubble {
  background: #f3f4f6;
  color: #1f2937;
  border-bottom-left-radius: 4px;
}

.chat-message.sender .message-bubble {
  background: #3b82f6;
  color: white;
  border-bottom-right-radius: 4px;
}

.chat-message.sender .message-bubble.green { background: #22c55e; }
.chat-message.sender .message-bubble.purple { background: #a855f7; }
.chat-message.sender .message-bubble.gradient { background: linear-gradient(to right, #3b82f6, #8b5cf6); }

.message-text {
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  justify-content: flex-end;
}

.message-time {
  font-size: 10px;
  opacity: 0.6;
}

.message-status svg {
  width: 14px;
  height: 14px;
}

/* System message */
.chat-message.system {
  justify-content: center;
  margin: 16px 0;
}

.chat-message.system .message-bubble {
  background: #f3f4f6;
  border-radius: 9999px;
  padding: 8px 16px;
}

.chat-message.system .message-text {
  font-size: 12px;
  color: #6b7280;
}`,
      js: `// ChatMessage helper
class ChatMessage {
  static create(options = {}) {
    const {
      user = { name: 'User' },
      message = '',
      variant = 'receiver',
      timestamp = '',
      color = 'blue',
      showAvatar = true,
      showName = true,
      type = 'text'
    } = options;

    const container = document.createElement('div');
    container.className = \`chat-message \${variant}\`;

    if (type === 'system') {
      container.className = 'chat-message system';
      container.innerHTML = \`<div class="message-bubble"><p class="message-text">\${message}</p></div>\`;
      return container;
    }

    let html = '';

    if (showAvatar) {
      html += \`
        <div class="message-avatar">
          \${user.avatar
            ? \`<img src="\${user.avatar}" alt="\${user.name}">\`
            : \`<div class="avatar-placeholder">\${user.name[0]?.toUpperCase() || '?'}</div>\`
          }
          \${user.isOnline ? '<span class="online-indicator"></span>' : ''}
        </div>
      \`;
    }

    html += \`
      <div class="message-content">
        \${showName && variant === 'receiver' ? \`<span class="message-name">\${user.name}</span>\` : ''}
        <div class="message-bubble \${variant === 'sender' ? color : ''}">
          <p class="message-text">\${message}</p>
          \${timestamp ? \`<div class="message-meta"><span class="message-time">\${timestamp}</span></div>\` : ''}
        </div>
      </div>
    \`;

    container.innerHTML = html;
    return container;
  }
}

// Usage:
// const msg = ChatMessage.create({
//   user: { name: 'Alice', avatar: 'alice.jpg', isOnline: true },
//   message: 'Hello!',
//   variant: 'receiver',
//   timestamp: '2:30 PM'
// });
// chatContainer.appendChild(msg);`,
      usage: `<!-- Chat Messages -->
<div class="chat-container">
  <!-- System message -->
  <div class="chat-message system">
    <div class="message-bubble">
      <p class="message-text">Chat started</p>
    </div>
  </div>

  <!-- Receiver message -->
  <div class="chat-message receiver">
    <div class="message-avatar">
      <img src="alice.jpg" alt="Alice">
      <span class="online-indicator"></span>
    </div>
    <div class="message-content">
      <span class="message-name">Alice</span>
      <div class="message-bubble">
        <p class="message-text">Hello! How are you?</p>
        <div class="message-meta">
          <span class="message-time">2:30 PM</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Sender message -->
  <div class="chat-message sender">
    <div class="message-content">
      <div class="message-bubble gradient">
        <p class="message-text">I'm doing great!</p>
        <div class="message-meta">
          <span class="message-time">2:31 PM</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
    },
  },
  // Loading Components
  {
    id: 'progress-bar',
    name: 'ProgressBar',
    description: 'Animated progress bar with multiple styles (gradient, striped, glow), circular variant, and step progress indicator.',
    category: 'loading',
    dependencies: ['framer-motion'],
    props: [
      { name: 'value', type: 'number', required: false, description: 'Progress value (0-100)', default: '0' },
      { name: 'indeterminate', type: 'boolean', required: false, description: 'Show indeterminate animation', default: 'false' },
      { name: 'variant', type: "'default' | 'gradient' | 'striped' | 'glow'", required: false, description: 'Visual style', default: "'default'" },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", required: false, description: 'Bar height', default: "'md'" },
      { name: 'color', type: "'blue' | 'green' | 'purple' | 'orange' | 'red'", required: false, description: 'Color theme', default: "'blue'" },
      { name: 'showLabel', type: 'boolean', required: false, description: 'Show percentage label', default: 'false' },
      { name: 'onComplete', type: '() => void', required: false, description: 'Callback when reaching 100%' },
    ],
    usage: `import ProgressBar, { CircularProgress, StepProgress } from '@/components/ProgressBar';

// Basic progress bar
<ProgressBar value={65} variant="gradient" color="blue" showLabel />

// Indeterminate loading
<ProgressBar indeterminate />

// Circular progress
<CircularProgress value={75} size={80} color="purple" />

// Step progress
<StepProgress steps={['Start', 'Process', 'Review', 'Complete']} currentStep={2} />`,
    source: `'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  value?: number;
  indeterminate?: boolean;
  variant?: 'default' | 'gradient' | 'striped' | 'glow';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  showLabel?: boolean;
  onComplete?: () => void;
}

const sizeMap = { xs: 4, sm: 8, md: 12, lg: 20 };
const colorMap = {
  blue: { bg: 'bg-blue-500', gradient: 'from-blue-400 to-blue-600' },
  green: { bg: 'bg-green-500', gradient: 'from-green-400 to-green-600' },
  purple: { bg: 'bg-purple-500', gradient: 'from-purple-400 to-purple-600' },
  orange: { bg: 'bg-orange-500', gradient: 'from-orange-400 to-orange-600' },
  red: { bg: 'bg-red-500', gradient: 'from-red-400 to-red-600' },
};

export default function ProgressBar({
  value = 0,
  indeterminate = false,
  variant = 'default',
  size = 'md',
  color = 'blue',
  showLabel = false,
  onComplete,
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const springValue = useSpring(0, { duration: 500 });
  const width = useTransform(springValue, (v) => \`\${Math.min(100, Math.max(0, v))}%\`);

  useEffect(() => {
    springValue.set(value);
    const unsubscribe = springValue.on('change', (v) => setDisplayValue(Math.round(v)));
    if (value >= 100 && onComplete) setTimeout(onComplete, 500);
    return unsubscribe;
  }, [value, springValue, onComplete]);

  const height = sizeMap[size];
  const colors = colorMap[color];

  const barClasses = variant === 'gradient'
    ? \`bg-gradient-to-r \${colors.gradient}\`
    : colors.bg;

  if (indeterminate) {
    return (
      <div className="relative overflow-hidden bg-gray-200 rounded-full" style={{ height }}>
        <motion.div
          className={\`absolute h-full w-1/3 rounded-full \${barClasses}\`}
          animate={{ left: ['-33%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1 overflow-hidden bg-gray-200 rounded-full" style={{ height }}>
        <motion.div className={\`h-full rounded-full \${barClasses}\`} style={{ width }} />
      </div>
      {showLabel && <span className="text-sm font-medium">{displayValue}%</span>}
    </div>
  );
}`,
    vanilla: {
      html: `<div class="progress-container">
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
<div class="circular-progress" data-value="75">
  <svg viewBox="0 0 80 80">
    <circle class="bg" cx="40" cy="40" r="36"/>
    <circle class="fill" cx="40" cy="40" r="36"/>
  </svg>
  <span class="value">75%</span>
</div>`,
      css: `.progress-container {
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
  position: relative;
}

/* Colors */
.progress-bar.blue .progress-fill { background: #3b82f6; }
.progress-bar.green .progress-fill { background: #22c55e; }
.progress-bar.purple .progress-fill { background: #a855f7; }
.progress-bar.orange .progress-fill { background: #f97316; }

/* Gradient variant */
.progress-bar.gradient.blue .progress-fill { background: linear-gradient(to right, #60a5fa, #2563eb); }
.progress-bar.gradient.green .progress-fill { background: linear-gradient(to right, #4ade80, #16a34a); }
.progress-bar.gradient.purple .progress-fill { background: linear-gradient(to right, #c084fc, #7c3aed); }

/* Shimmer effect */
.progress-fill .shimmer,
.progress-bar .shimmer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite linear;
}

@keyframes shimmer {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

/* Striped variant */
.progress-bar.striped .progress-fill {
  background-image: linear-gradient(
    45deg,
    rgba(255,255,255,0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255,255,255,0.15) 50%,
    rgba(255,255,255,0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 40px 40px;
  animation: stripes 1s linear infinite;
}

@keyframes stripes {
  from { background-position: 0 0; }
  to { background-position: 40px 0; }
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

.progress-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  min-width: 40px;
}

/* Circular Progress */
.circular-progress {
  position: relative;
  width: 80px;
  height: 80px;
}

.circular-progress svg {
  transform: rotate(-90deg);
}

.circular-progress circle {
  fill: transparent;
  stroke-width: 8;
}

.circular-progress .bg {
  stroke: #e5e7eb;
}

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
  font-size: 18px;
  font-weight: 600;
  color: #374151;
}

/* Sizes */
.progress-bar.xs { height: 4px; }
.progress-bar.sm { height: 8px; }
.progress-bar.lg { height: 20px; }`,
      js: `// ProgressBar controller
class ProgressBar {
  constructor(element, options = {}) {
    this.element = element;
    this.fill = element.querySelector('.progress-fill');
    this.label = element.parentElement?.querySelector('.progress-label');
    this.value = options.value || 0;
    this.onComplete = options.onComplete;

    this.setValue(this.value);
  }

  setValue(value) {
    this.value = Math.min(100, Math.max(0, value));
    this.fill.style.width = this.value + '%';
    if (this.label) this.label.textContent = Math.round(this.value) + '%';

    if (this.value >= 100 && this.onComplete) {
      setTimeout(() => this.onComplete(), 500);
    }
  }

  animate(targetValue, duration = 1000) {
    const start = this.value;
    const startTime = Date.now();

    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      this.setValue(start + (targetValue - start) * eased);

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
}

// CircularProgress controller
class CircularProgress {
  constructor(element, options = {}) {
    this.element = element;
    this.fill = element.querySelector('.fill');
    this.valueEl = element.querySelector('.value');
    this.setValue(options.value || 0);
  }

  setValue(value) {
    this.value = Math.min(100, Math.max(0, value));
    this.element.style.setProperty('--value', this.value);
    if (this.valueEl) this.valueEl.textContent = Math.round(this.value) + '%';
  }
}

// Usage:
// const progress = new ProgressBar(document.querySelector('.progress-bar'), {
//   value: 0,
//   onComplete: () => console.log('Done!')
// });
// progress.animate(100, 2000);`,
      usage: `<!-- Linear Progress Bar -->
<div class="progress-container">
  <div class="progress-bar gradient blue">
    <div class="progress-fill" style="width: 0%"></div>
    <div class="shimmer"></div>
  </div>
  <span class="progress-label">0%</span>
</div>

<!-- Circular Progress -->
<div class="circular-progress" style="--value: 75">
  <svg viewBox="0 0 80 80">
    <circle class="bg" cx="40" cy="40" r="36"/>
    <circle class="fill" cx="40" cy="40" r="36"/>
  </svg>
  <span class="value">75%</span>
</div>

<script>
  // Animate progress bar
  const progressBar = new ProgressBar(document.querySelector('.progress-bar'), {
    onComplete: () => alert('Complete!')
  });
  progressBar.animate(100, 3000);

  // Set circular progress
  const circular = new CircularProgress(document.querySelector('.circular-progress'));
  circular.setValue(75);
</script>`,
    },
  },
  {
    id: 'shimmer',
    name: 'Shimmer',
    description: 'Animated shimmer/shine loading effect. Includes presets for blocks, text, avatars, cards, and tables.',
    category: 'loading',
    dependencies: ['framer-motion'],
    props: [
      { name: 'duration', type: 'number', required: false, description: 'Animation duration in seconds', default: '1.5' },
      { name: 'color', type: "'light' | 'dark' | 'colored'", required: false, description: 'Shimmer color theme', default: "'light'" },
      { name: 'direction', type: "'left-right' | 'right-left' | 'diagonal'", required: false, description: 'Animation direction', default: "'left-right'" },
    ],
    usage: `import { ShimmerBlock, ShimmerText, ShimmerAvatar, ShimmerCard, ShimmerTable } from '@/components/Shimmer';

// Basic shapes
<ShimmerBlock width={200} height={100} />
<ShimmerText lines={3} />
<ShimmerAvatar size={60} />

// Complex layouts
<ShimmerCard />
<ShimmerTable rows={5} cols={4} />`,
    source: `'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ShimmerProps {
  children?: ReactNode;
  duration?: number;
  color?: 'light' | 'dark' | 'colored';
  direction?: 'left-right' | 'right-left' | 'diagonal';
}

const gradientMap = {
  light: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
  dark: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
  colored: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.2) 50%, transparent 100%)',
};

export default function Shimmer({ children, duration = 1.5, color = 'light', direction = 'left-right' }: ShimmerProps) {
  return (
    <div className="relative overflow-hidden">
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: gradientMap[color] }}
        animate={{ x: direction === 'left-right' ? ['-100%', '100%'] : ['100%', '-100%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export function ShimmerBlock({ width = '100%', height = 100, rounded = 'lg', duration = 1.5 }) {
  return (
    <Shimmer duration={duration}>
      <div className={\`bg-gray-200 dark:bg-gray-700 rounded-\${rounded}\`} style={{ width, height }} />
    </Shimmer>
  );
}

export function ShimmerText({ lines = 3, duration = 1.5 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer key={i} duration={duration + i * 0.1}>
          <div className="bg-gray-200 dark:bg-gray-700 rounded h-4" style={{ width: i === lines - 1 ? '70%' : '100%' }} />
        </Shimmer>
      ))}
    </div>
  );
}

export function ShimmerAvatar({ size = 48, duration = 1.5 }) {
  return (
    <Shimmer duration={duration}>
      <div className="bg-gray-200 dark:bg-gray-700 rounded-full" style={{ width: size, height: size }} />
    </Shimmer>
  );
}

export function ShimmerCard({ duration = 1.5 }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <Shimmer duration={duration}><div className="bg-gray-200 h-40" /></Shimmer>
      <div className="p-4 space-y-3">
        <Shimmer duration={duration}><div className="h-5 bg-gray-200 rounded w-3/4" /></Shimmer>
        <Shimmer duration={duration + 0.1}><div className="h-4 bg-gray-200 rounded" /></Shimmer>
        <Shimmer duration={duration + 0.2}><div className="h-4 bg-gray-200 rounded w-5/6" /></Shimmer>
      </div>
    </div>
  );
}

export function ShimmerTable({ rows = 5, cols = 4, duration = 1.5 }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Shimmer key={i} duration={duration} className="flex-1">
            <div className="h-4 bg-gray-300 rounded" />
          </Shimmer>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-3 flex gap-4 border-t border-gray-200">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Shimmer key={colIndex} duration={duration + rowIndex * 0.05} className="flex-1">
              <div className="h-4 bg-gray-200 rounded" />
            </Shimmer>
          ))}
        </div>
      ))}
    </div>
  );
}`,
    vanilla: {
      html: `<!-- Shimmer Block -->
<div class="shimmer-block" style="width: 200px; height: 100px;"></div>

<!-- Shimmer Text -->
<div class="shimmer-text">
  <div class="shimmer-line"></div>
  <div class="shimmer-line"></div>
  <div class="shimmer-line short"></div>
</div>

<!-- Shimmer Avatar -->
<div class="shimmer-avatar"></div>

<!-- Shimmer Card -->
<div class="shimmer-card">
  <div class="shimmer-card-image"></div>
  <div class="shimmer-card-content">
    <div class="shimmer-line title"></div>
    <div class="shimmer-line"></div>
    <div class="shimmer-line short"></div>
  </div>
</div>`,
      css: `/* Shimmer base animation */
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

.shimmer-block,
.shimmer-line,
.shimmer-avatar,
.shimmer-card-image {
  background: #e5e7eb;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.shimmer-block::after,
.shimmer-line::after,
.shimmer-avatar::after,
.shimmer-card-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 1.5s infinite linear;
}

/* Block */
.shimmer-block {
  min-height: 100px;
}

/* Text lines */
.shimmer-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.shimmer-line {
  height: 16px;
  width: 100%;
}

.shimmer-line.short { width: 70%; }
.shimmer-line.title { height: 20px; width: 75%; }

/* Avatar */
.shimmer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.shimmer-avatar.sm { width: 32px; height: 32px; }
.shimmer-avatar.lg { width: 64px; height: 64px; }
.shimmer-avatar.xl { width: 80px; height: 80px; }

/* Card */
.shimmer-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.shimmer-card-image {
  height: 160px;
  border-radius: 0;
}

.shimmer-card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Table */
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
  background: #e5e7eb;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.shimmer-table-cell::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 1.5s infinite linear;
}

/* Dark mode */
.dark .shimmer-block,
.dark .shimmer-line,
.dark .shimmer-avatar,
.dark .shimmer-card-image,
.dark .shimmer-table-cell {
  background: #374151;
}`,
      usage: `<!-- Shimmer Loading States -->
<style>
  /* Include the CSS above */
</style>

<!-- Basic shapes -->
<div class="shimmer-block" style="width: 300px; height: 150px;"></div>

<div class="shimmer-text">
  <div class="shimmer-line"></div>
  <div class="shimmer-line"></div>
  <div class="shimmer-line short"></div>
</div>

<div class="shimmer-avatar lg"></div>

<!-- Card skeleton -->
<div class="shimmer-card" style="max-width: 300px;">
  <div class="shimmer-card-image"></div>
  <div class="shimmer-card-content">
    <div class="shimmer-line title"></div>
    <div class="shimmer-line"></div>
    <div class="shimmer-line short"></div>
  </div>
</div>

<!-- Table skeleton -->
<div class="shimmer-table">
  <div class="shimmer-table-header">
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
  </div>
  <div class="shimmer-table-row">
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
  </div>
  <div class="shimmer-table-row">
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
    <div class="shimmer-table-cell"></div>
  </div>
</div>`,
    },
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    description: 'Flexible skeleton loader with multiple variants (text, avatar, card, image, button) and animation styles (pulse, shimmer, wave).',
    category: 'loading',
    dependencies: ['framer-motion'],
    props: [
      { name: 'variant', type: "'text' | 'avatar' | 'card' | 'image' | 'button'", required: false, description: 'Skeleton type', default: "'text'" },
      { name: 'lines', type: 'number', required: false, description: 'Number of text lines', default: '1' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", required: false, description: 'Size preset', default: "'md'" },
      { name: 'width', type: 'string | number', required: false, description: 'Custom width' },
      { name: 'height', type: 'string | number', required: false, description: 'Custom height' },
      { name: 'animation', type: "'pulse' | 'shimmer' | 'wave'", required: false, description: 'Animation style', default: "'shimmer'" },
      { name: 'rounded', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", required: false, description: 'Border radius', default: "'md'" },
    ],
    usage: `import Skeleton, { SkeletonCard, SkeletonList } from '@/components/Skeleton';

// Text skeleton
<Skeleton variant="text" lines={3} />

// Avatar skeleton
<Skeleton variant="avatar" size="lg" />

// Card skeleton
<SkeletonCard />

// List skeleton
<SkeletonList count={5} />`,
    source: `'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  variant?: 'text' | 'avatar' | 'card' | 'image' | 'button';
  lines?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  animation?: 'pulse' | 'shimmer' | 'wave';
}

const sizeMap = {
  sm: { avatar: 32, text: 12, button: 32 },
  md: { avatar: 40, text: 16, button: 40 },
  lg: { avatar: 56, text: 20, button: 48 },
  xl: { avatar: 80, text: 24, button: 56 },
};

export default function Skeleton({
  variant = 'text',
  lines = 1,
  size = 'md',
  width,
  height,
  rounded = 'md',
  animation = 'shimmer',
}: SkeletonProps) {
  const baseClasses = \`bg-gray-200 dark:bg-gray-700 rounded-\${rounded}\`;
  const animationClass = animation === 'pulse' ? 'animate-pulse' : '';

  const ShimmerOverlay = () => (
    <motion.div
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
      animate={{ translateX: ['calc(-100%)', 'calc(100%)'] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
    />
  );

  if (variant === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={\`\${baseClasses} \${animationClass} overflow-hidden relative\`}
            style={{ width: i === lines - 1 && lines > 1 ? '75%' : width || '100%', height: height || sizeMap[size].text }}
          >
            {animation === 'shimmer' && <ShimmerOverlay />}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div
        className={\`\${baseClasses} \${animationClass} overflow-hidden relative rounded-full\`}
        style={{ width: width || sizeMap[size].avatar, height: height || sizeMap[size].avatar }}
      >
        {animation === 'shimmer' && <ShimmerOverlay />}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
        <div className={\`\${baseClasses} \${animationClass} overflow-hidden relative w-full\`} style={{ height: 160 }}>
          {animation === 'shimmer' && <ShimmerOverlay />}
        </div>
        <div className={\`\${baseClasses} \${animationClass} overflow-hidden relative\`} style={{ width: '70%', height: 20 }}>
          {animation === 'shimmer' && <ShimmerOverlay />}
        </div>
        <div className="space-y-2">
          <div className={\`\${baseClasses} \${animationClass} overflow-hidden relative\`} style={{ height: 14 }}>
            {animation === 'shimmer' && <ShimmerOverlay />}
          </div>
          <div className={\`\${baseClasses} \${animationClass} overflow-hidden relative\`} style={{ width: '85%', height: 14 }}>
            {animation === 'shimmer' && <ShimmerOverlay />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={\`\${baseClasses} \${animationClass} overflow-hidden relative\`}
      style={{ width: width || '100%', height: height || 40 }}
    >
      {animation === 'shimmer' && <ShimmerOverlay />}
    </div>
  );
}

export function SkeletonCard(props: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="card" {...props} />;
}

export function SkeletonList({ count = 3, ...props }: Omit<SkeletonProps, 'variant'> & { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="avatar" size="md" {...props} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" height={16} {...props} />
            <Skeleton variant="text" width="40%" height={12} {...props} />
          </div>
        </div>
      ))}
    </div>
  );
}`,
    vanilla: {
      html: `<!-- Text Skeleton -->
<div class="skeleton-text">
  <div class="skeleton-line shimmer"></div>
  <div class="skeleton-line shimmer"></div>
  <div class="skeleton-line shimmer short"></div>
</div>

<!-- Avatar Skeleton -->
<div class="skeleton-avatar shimmer md"></div>

<!-- Card Skeleton -->
<div class="skeleton-card">
  <div class="skeleton-image shimmer"></div>
  <div class="skeleton-content">
    <div class="skeleton-line shimmer title"></div>
    <div class="skeleton-line shimmer"></div>
    <div class="skeleton-line shimmer short"></div>
  </div>
</div>

<!-- List Skeleton -->
<div class="skeleton-list">
  <div class="skeleton-list-item">
    <div class="skeleton-avatar shimmer"></div>
    <div class="skeleton-text">
      <div class="skeleton-line shimmer" style="width: 60%;"></div>
      <div class="skeleton-line shimmer sm" style="width: 40%;"></div>
    </div>
  </div>
</div>`,
      css: `/* Skeleton base */
.skeleton-line,
.skeleton-avatar,
.skeleton-image {
  background: #e5e7eb;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

/* Pulse animation */
.skeleton-line.pulse,
.skeleton-avatar.pulse,
.skeleton-image.pulse {
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

@keyframes skeletonPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
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

/* Wave animation */
.skeleton-line.wave::after,
.skeleton-avatar.wave::after,
.skeleton-image.wave::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.3);
  animation: skeletonWave 1.5s ease-in-out infinite;
}

@keyframes skeletonWave {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.02); }
}

/* Text skeleton */
.skeleton-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-line {
  height: 16px;
  width: 100%;
}

.skeleton-line.sm { height: 12px; }
.skeleton-line.lg { height: 20px; }
.skeleton-line.short { width: 75%; }
.skeleton-line.title { height: 20px; width: 70%; }

/* Avatar skeleton */
.skeleton-avatar {
  border-radius: 50%;
}

.skeleton-avatar.sm { width: 32px; height: 32px; }
.skeleton-avatar.md { width: 40px; height: 40px; }
.skeleton-avatar.lg { width: 56px; height: 56px; }
.skeleton-avatar.xl { width: 80px; height: 80px; }

/* Card skeleton */
.skeleton-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.skeleton-image {
  height: 160px;
  border-radius: 0;
}

.skeleton-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* List skeleton */
.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skeleton-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.skeleton-list-item .skeleton-text {
  flex: 1;
}

/* Button skeleton */
.skeleton-button {
  height: 40px;
  width: 120px;
  border-radius: 8px;
}

.skeleton-button.sm { height: 32px; width: 80px; }
.skeleton-button.lg { height: 48px; width: 160px; }

/* Dark mode */
.dark .skeleton-line,
.dark .skeleton-avatar,
.dark .skeleton-image {
  background: #374151;
}`,
      usage: `<!-- Skeleton Loading States -->
<style>
  /* Include the CSS above */
</style>

<!-- Text skeleton with shimmer -->
<div class="skeleton-text">
  <div class="skeleton-line shimmer"></div>
  <div class="skeleton-line shimmer"></div>
  <div class="skeleton-line shimmer short"></div>
</div>

<!-- Avatar with pulse -->
<div class="skeleton-avatar pulse lg"></div>

<!-- Card skeleton -->
<div class="skeleton-card" style="max-width: 300px;">
  <div class="skeleton-image shimmer"></div>
  <div class="skeleton-content">
    <div class="skeleton-line shimmer title"></div>
    <div class="skeleton-line shimmer"></div>
    <div class="skeleton-line shimmer short"></div>
  </div>
</div>

<!-- List skeleton -->
<div class="skeleton-list">
  <div class="skeleton-list-item">
    <div class="skeleton-avatar shimmer md"></div>
    <div class="skeleton-text">
      <div class="skeleton-line shimmer" style="width: 60%;"></div>
      <div class="skeleton-line shimmer sm" style="width: 40%;"></div>
    </div>
  </div>
  <div class="skeleton-list-item">
    <div class="skeleton-avatar shimmer md"></div>
    <div class="skeleton-text">
      <div class="skeleton-line shimmer" style="width: 50%;"></div>
      <div class="skeleton-line shimmer sm" style="width: 35%;"></div>
    </div>
  </div>
</div>`,
    },
  },
  // ==========================================================================
  // VISUAL EFFECTS COMPONENTS
  // ==========================================================================
  {
    id: 'glow-button',
    name: 'GlowButton',
    description: 'Animated CTA button with shimmer/glow sweep effect. Perfect for drawing attention to important actions.',
    category: 'effects',
    dependencies: ['framer-motion'],
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Button content' },
      { name: 'glowColor', type: 'string', required: false, description: 'Color of the glow effect', default: "'rgba(255,255,255,0.3)'" },
      { name: 'size', type: "'sm' | 'md' | 'lg'", required: false, description: 'Button size', default: "'md'" },
      { name: 'variant', type: "'default' | 'outline' | 'ghost'", required: false, description: 'Button style variant', default: "'default'" },
      { name: 'glowOnHover', type: 'boolean', required: false, description: 'Only animate on hover', default: 'false' },
      { name: 'disabled', type: 'boolean', required: false, description: 'Disabled state', default: 'false' },
    ],
    usage: `import { GlowButton } from 'archyra';

function MyComponent() {
  return <GlowButton size="lg" onClick={() => alert('Clicked!')}>Get Started</GlowButton>;
}`,
    source: `// See GlowButton.tsx for full source`,
    vanilla: {
      html: `<button class="glow-button">Get Started</button>`,
      css: `.glow-button {
  position: relative;
  overflow: hidden;
  padding: 12px 24px;
  font-weight: 600;
  color: white;
  background: #6366f1;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}
.glow-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}
@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}`,
      usage: `<button class="glow-button">Get Started</button>`,
    },
  },
  {
    id: 'spotlight-card',
    name: 'SpotlightCard',
    description: 'Interactive card with mouse-tracking spotlight gradient effect. Creates engaging hover interactions.',
    category: 'effects',
    dependencies: ['framer-motion'],
    props: [
      { name: 'children', type: 'ReactNode', required: false, description: 'Card content' },
      { name: 'spotlightColor', type: 'string', required: false, description: 'Spotlight color', default: "'rgba(99,102,241,0.15)'" },
      { name: 'spotlightSize', type: 'number', required: false, description: 'Spotlight radius in px', default: '350' },
      { name: 'borderGlow', type: 'boolean', required: false, description: 'Show border glow on hover', default: 'true' },
    ],
    usage: `import { SpotlightCard, SpotlightCardContent } from 'archyra';

function MyComponent() {
  return (
    <SpotlightCard>
      <SpotlightCardContent>
        <h3>Feature Title</h3>
        <p>Description text here.</p>
      </SpotlightCardContent>
    </SpotlightCard>
  );
}`,
    source: `// See SpotlightCard.tsx for full source`,
    vanilla: {
      html: `<div class="spotlight-card"><div class="spotlight-card-content"><h3>Feature</h3></div></div>`,
      css: `.spotlight-card { position: relative; overflow: hidden; border-radius: 16px; background: white; border: 1px solid #e5e7eb; }
.spotlight-card::before { content: ''; position: absolute; top: var(--y, 50%); left: var(--x, 50%); width: 350px; height: 350px; background: radial-gradient(circle, rgba(99,102,241,0.15), transparent); transform: translate(-50%, -50%); opacity: 0; transition: opacity 0.3s; }
.spotlight-card:hover::before { opacity: 1; }
.spotlight-card-content { position: relative; padding: 24px; }`,
      js: `document.querySelectorAll('.spotlight-card').forEach(c => c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(); c.style.setProperty('--x', (e.clientX-r.left)+'px'); c.style.setProperty('--y', (e.clientY-r.top)+'px'); }));`,
      usage: `<div class="spotlight-card"><div class="spotlight-card-content">Content</div></div>`,
    },
  },
  {
    id: 'aurora-background',
    name: 'AuroraBackground',
    description: 'Mesmerizing animated aurora borealis background with flowing gradient layers. Perfect for hero sections.',
    category: 'effects',
    dependencies: ['framer-motion'],
    props: [
      { name: 'children', type: 'ReactNode', required: false, description: 'Content to render over aurora' },
      { name: 'colors', type: 'string[]', required: false, description: 'Aurora gradient colors', default: "['#6366f1', '#a855f7', '#ec4899', '#06b6d4']" },
      { name: 'speed', type: 'number', required: false, description: 'Animation speed multiplier', default: '1' },
      { name: 'blur', type: "'sm' | 'md' | 'lg' | 'xl'", required: false, description: 'Blur intensity', default: "'lg'" },
    ],
    usage: `import { AuroraBackground } from 'archyra';

function HeroSection() {
  return (
    <AuroraBackground className="min-h-screen">
      <div className="relative z-10 text-center">
        <h1>Welcome</h1>
      </div>
    </AuroraBackground>
  );
}`,
    source: `// See AuroraBackground.tsx for full source`,
    vanilla: {
      html: `<div class="aurora-background"><div class="aurora-layer"></div><div class="aurora-layer"></div><div class="aurora-content"><h1>Welcome</h1></div></div>`,
      css: `.aurora-background { position: relative; overflow: hidden; min-height: 100vh; background: #09090b; }
.aurora-layer { position: absolute; inset: -50%; width: 200%; height: 200%; filter: blur(80px); animation: aurora 20s ease-in-out infinite; }
.aurora-layer:nth-child(1) { background: radial-gradient(ellipse 80% 50%, rgba(99,102,241,0.4), transparent 70%); }
.aurora-layer:nth-child(2) { background: radial-gradient(ellipse 80% 50%, rgba(168,85,247,0.4), transparent 70%); animation-delay: -5s; }
@keyframes aurora { 0%, 100% { transform: translate(30%, -20%) scale(1); } 50% { transform: translate(-30%, 20%) scale(1.1); } }
.aurora-content { position: relative; z-index: 10; color: white; text-align: center; padding: 100px 20px; }`,
      usage: `<div class="aurora-background"><div class="aurora-layer"></div><div class="aurora-content">Content</div></div>`,
    },
  },
  {
    id: 'animated-beam',
    name: 'AnimatedBeam',
    description: 'SVG beam that animates between two elements. Perfect for showing data flow and connections.',
    category: 'effects',
    dependencies: ['framer-motion'],
    props: [
      { name: 'containerRef', type: 'RefObject<HTMLElement>', required: true, description: 'Container element reference' },
      { name: 'fromRef', type: 'RefObject<HTMLElement>', required: true, description: 'Starting element reference' },
      { name: 'toRef', type: 'RefObject<HTMLElement>', required: true, description: 'Ending element reference' },
      { name: 'gradientColors', type: '[string, string]', required: false, description: 'Beam gradient colors', default: "['#6366f1', '#a855f7']" },
      { name: 'duration', type: 'number', required: false, description: 'Animation duration in seconds', default: '2' },
    ],
    usage: `import { AnimatedBeam, AnimatedBeamContainer, AnimatedBeamNode } from 'archyra';
import { useRef } from 'react';

function Demo() {
  const containerRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  return (
    <AnimatedBeamContainer ref={containerRef}>
      <AnimatedBeamNode ref={fromRef}>Source</AnimatedBeamNode>
      <AnimatedBeamNode ref={toRef}>Target</AnimatedBeamNode>
      <AnimatedBeam containerRef={containerRef} fromRef={fromRef} toRef={toRef} />
    </AnimatedBeamContainer>
  );
}`,
    source: `// See AnimatedBeam.tsx for full source`,
    vanilla: {
      html: `<div class="beam-container"><div class="beam-node" id="from">Source</div><div class="beam-node" id="to">Target</div><svg class="beam-svg"><path class="beam-path"></path></svg></div>`,
      css: `.beam-container { position: relative; padding: 40px; display: flex; justify-content: space-between; }
.beam-node { padding: 16px; background: white; border: 2px solid #e5e7eb; border-radius: 12px; }
.beam-svg { position: absolute; inset: 0; pointer-events: none; }
.beam-path { fill: none; stroke: #6366f1; stroke-width: 2; stroke-dasharray: 200; animation: beam-flow 2s linear infinite; }
@keyframes beam-flow { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: -200; } }`,
      js: `// Calculate path between elements and set path d attribute`,
      usage: `<div class="beam-container">...</div>`,
    },
  },
  // ==========================================================================
  // INTERACTIVE CARDS COMPONENTS
  // ==========================================================================
  {
    id: 'card-3d',
    name: 'Card3D',
    description: 'Interactive card with 3D perspective tilt effect following mouse position. Includes optional glare.',
    category: 'cards',
    dependencies: ['framer-motion'],
    props: [
      { name: 'children', type: 'ReactNode', required: false, description: 'Card content' },
      { name: 'tiltIntensity', type: 'number', required: false, description: 'Maximum tilt angle in degrees', default: '10' },
      { name: 'glareEnabled', type: 'boolean', required: false, description: 'Show glare effect on hover', default: 'false' },
      { name: 'scale', type: 'number', required: false, description: 'Hover scale factor', default: '1.02' },
    ],
    usage: `import { Card3D, Card3DContent } from 'archyra';

function MyComponent() {
  return (
    <Card3D glareEnabled>
      <Card3DContent>
        <h3>3D Card</h3>
        <p>Hover to see the tilt effect!</p>
      </Card3DContent>
    </Card3D>
  );
}`,
    source: `// See Card3D.tsx for full source`,
    vanilla: {
      html: `<div class="card-3d-container"><div class="card-3d"><div class="card-3d-content"><h3>3D Card</h3></div></div></div>`,
      css: `.card-3d-container { perspective: 1000px; }
.card-3d { position: relative; background: white; border-radius: 16px; border: 1px solid #e5e7eb; transform-style: preserve-3d; transition: transform 0.1s; }
.card-3d-content { padding: 24px; }`,
      js: `document.querySelectorAll('.card-3d').forEach(c => { c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(); const x = (e.clientX-r.left)/r.width; const y = (e.clientY-r.top)/r.height; c.style.transform = 'rotateX('+(-(y-0.5)*20)+'deg) rotateY('+((x-0.5)*20)+'deg) scale(1.02)'; }); c.addEventListener('mouseleave', () => c.style.transform = ''); });`,
      usage: `<div class="card-3d-container"><div class="card-3d">...</div></div>`,
    },
  },
  {
    id: 'neon-gradient-card',
    name: 'NeonGradientCard',
    description: 'Card with animated rotating neon gradient border and glow effect. Creates a cyberpunk aesthetic.',
    category: 'cards',
    dependencies: ['framer-motion'],
    props: [
      { name: 'children', type: 'ReactNode', required: false, description: 'Card content' },
      { name: 'colors', type: 'string[]', required: false, description: 'Gradient colors', default: "['#6366f1', '#a855f7', '#ec4899']" },
      { name: 'borderWidth', type: 'number', required: false, description: 'Border width in px', default: '2' },
      { name: 'glowIntensity', type: "'none' | 'sm' | 'md' | 'lg'", required: false, description: 'Glow intensity', default: "'md'" },
      { name: 'speed', type: 'number', required: false, description: 'Rotation speed in seconds', default: '4' },
    ],
    usage: `import { NeonGradientCard, NeonGradientCardContent } from 'archyra';

function MyComponent() {
  return (
    <NeonGradientCard glowIntensity="lg">
      <NeonGradientCardContent>
        <h3>Premium Feature</h3>
      </NeonGradientCardContent>
    </NeonGradientCard>
  );
}`,
    source: `// See NeonGradientCard.tsx for full source`,
    vanilla: {
      html: `<div class="neon-card"><div class="neon-card-border"></div><div class="neon-card-glow"></div><div class="neon-card-content"><h3>Premium</h3></div></div>`,
      css: `@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
.neon-card { position: relative; padding: 2px; border-radius: 16px; }
.neon-card-border { position: absolute; inset: 0; border-radius: 16px; background: conic-gradient(from var(--angle), #6366f1, #a855f7, #ec4899, #6366f1); animation: rotate 4s linear infinite; }
.neon-card-glow { position: absolute; inset: -10px; border-radius: 20px; background: conic-gradient(from var(--angle), #6366f1, #a855f7, #ec4899, #6366f1); filter: blur(20px); opacity: 0.5; animation: rotate 4s linear infinite; }
.neon-card-content { position: relative; z-index: 1; background: white; border-radius: 14px; padding: 24px; }
@keyframes rotate { to { --angle: 360deg; } }`,
      usage: `<div class="neon-card">...</div>`,
    },
  },
  {
    id: 'infinite-carousel',
    name: 'InfiniteCarousel',
    description: 'Seamlessly looping horizontal scroll carousel. Perfect for testimonials, logos, and feature showcases.',
    category: 'cards',
    dependencies: ['framer-motion'],
    props: [
      { name: 'items', type: 'Array<{ id: string | number; content: ReactNode }>', required: true, description: 'Items to display' },
      { name: 'direction', type: "'left' | 'right'", required: false, description: 'Scroll direction', default: "'left'" },
      { name: 'speed', type: "'slow' | 'normal' | 'fast'", required: false, description: 'Animation speed', default: "'normal'" },
      { name: 'pauseOnHover', type: 'boolean', required: false, description: 'Pause on hover', default: 'true' },
      { name: 'gap', type: 'number', required: false, description: 'Gap between items in px', default: '24' },
    ],
    usage: `import { InfiniteCarousel, InfiniteCarouselCard } from 'archyra';

const items = [
  { id: 1, content: <InfiniteCarouselCard>Card 1</InfiniteCarouselCard> },
  { id: 2, content: <InfiniteCarouselCard>Card 2</InfiniteCarouselCard> },
];

function MyComponent() {
  return <InfiniteCarousel items={items} speed="slow" pauseOnHover />;
}`,
    source: `// See InfiniteCarousel.tsx for full source`,
    vanilla: {
      html: `<div class="infinite-carousel"><div class="carousel-track"><div class="carousel-item">Item 1</div><div class="carousel-item">Item 2</div><div class="carousel-item">Item 1</div><div class="carousel-item">Item 2</div></div></div>`,
      css: `.infinite-carousel { position: relative; overflow: hidden; }
.carousel-track { display: flex; gap: 24px; animation: scroll 40s linear infinite; }
.carousel-track:hover { animation-play-state: paused; }
.carousel-item { flex-shrink: 0; padding: 24px; background: white; border: 1px solid #e5e7eb; border-radius: 12px; min-width: 300px; }
@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`,
      usage: `<div class="infinite-carousel"><div class="carousel-track"><!-- Items x2 for seamless loop --></div></div>`,
    },
  },
];

export function getComponent(id: string): ComponentInfo | undefined {
  return components.find(c => c.id === id || c.name.toLowerCase() === id.toLowerCase());
}

export function listComponents(category?: string): ComponentInfo[] {
  if (!category || category === 'all') return components;
  return components.filter(c => c.category === category);
}

export function getCategories(): string[] {
  return ['all', ...new Set(components.map(c => c.category))];
}
