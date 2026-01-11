'use client';

import Link from 'next/link';
import { Activity, ArrowRight, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FrameworkCodeBlock } from '@/components/docs/FrameworkCodeBlock';

export default function ProcessingComponentsPage() {
  const components = [
    {
      name: 'CodeTyping',
      description: 'Realistic code typing effect with syntax highlighting and terminal-style presentation.',
      href: '/CodeTyping',
      props: [
        { name: 'isTyping', type: 'boolean', default: 'false', description: 'Controls the typing animation' },
        { name: 'onComplete', type: '() => void', default: '-', description: 'Callback when typing completes' },
      ],
      reactCode: `import { CodeTyping } from 'archyra';

function MyComponent() {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <CodeTyping
      isTyping={isTyping}
      onComplete={() => setIsTyping(false)}
    />
  );
}`,
      vanillaCode: `<!-- HTML -->
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

<!-- CSS -->
<style>
.code-typing {
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

/* Syntax highlighting */
.code-typing .keyword { color: #c678dd; }
.code-typing .variable { color: #e06c75; }
.code-typing .function { color: #61afef; }
.code-typing .string { color: #e5c07b; }
</style>

<!-- JavaScript -->
<script>
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
  }

  start(onComplete) {
    this.currentIndex = 0;
    this.codeContent.innerHTML = '';
    this.typeNext(onComplete);
  }

  typeNext(onComplete) {
    if (this.currentIndex >= this.tokens.length) {
      this.cursor.style.display = 'none';
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
}

// Usage:
const typing = new CodeTyping(document.querySelector('.code-typing'));
typing.start(() => console.log('Complete!'));
</script>`,
    },
    {
      name: 'DataProcessing',
      description: 'Data pipeline visualization showing input, processing, and output stages with flowing cards.',
      href: '/DataProcessing',
      props: [
        { name: 'isProcessing', type: 'boolean', default: 'false', description: 'Whether processing is active' },
        { name: 'onComplete', type: '() => void', default: '-', description: 'Callback when processing completes' },
      ],
      reactCode: `import { DataProcessing } from 'archyra';

function DataPipeline() {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <DataProcessing
      isProcessing={isProcessing}
      onComplete={() => setIsProcessing(false)}
    />
  );
}`,
      vanillaCode: `<!-- HTML -->
<div class="data-processing">
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
</div>

<!-- CSS -->
<style>
.data-processing {
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

.status { text-align: center; }
.status-text {
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
}
.progress-text {
  font-size: 0.875rem;
  color: #6b7280;
}
</style>

<!-- JavaScript -->
<script>
class DataProcessing {
  constructor(element) {
    this.element = element;
    this.stages = element.querySelectorAll('.stage');
    this.statusText = element.querySelector('.status-text');
    this.progressText = element.querySelector('.progress-text');
    this.progress = 0;
  }

  start(onComplete) {
    this.progress = 0;
    this.setStage('input');

    this.progressInterval = setInterval(() => {
      this.progress = Math.min(this.progress + 4, 100);
      this.progressText.textContent = this.progress + '% complete';
    }, 100);

    setTimeout(() => this.setStage('process'), 800);
    setTimeout(() => this.setStage('output'), 1700);
    setTimeout(() => {
      this.setStage('complete');
      clearInterval(this.progressInterval);
      if (onComplete) onComplete();
    }, 2500);
  }

  setStage(stage) {
    this.statusText.textContent = stage === 'idle' ? 'Ready' : stage;
    const stageOrder = ['input', 'process', 'output'];
    const currentIndex = stageOrder.indexOf(stage);

    this.stages.forEach((el, i) => {
      el.classList.toggle('active', i <= currentIndex || stage === 'complete');
    });
  }
}

// Usage:
const processing = new DataProcessing(document.querySelector('.data-processing'));
processing.start(() => console.log('Complete!'));
</script>`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <Badge className="bg-blue-500/10 text-blue-600">Processing</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Processing Components
        </h1>
        <p className="text-xl text-muted-foreground">
          Progress indicators and processing visualizations for background tasks and data operations.
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
          <Link href="/docs/components/loading">
            <Button variant="outline" className="gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Loading Components
            </Button>
          </Link>
          <Link href="/docs/components/creative">
            <Button variant="outline" className="gap-2">
              Creative Components
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
