'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FrameworkCodeBlock } from '@/components/docs/FrameworkCodeBlock';

export default function CreativeComponentsPage() {
  const components = [
    {
      name: 'AiCreating',
      description: 'Multi-stage animation visualizing AI creation process with thinking, writing, building, and completion phases.',
      href: '/AiCreating',
      props: [
        { name: 'isLoading', type: 'boolean', default: 'false', description: 'Whether the animation is active' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the animation' },
        { name: 'onComplete', type: '() => void', default: '-', description: 'Callback when animation completes' },
      ],
      reactCode: `import { AiCreating } from 'archyra';

function AIAssistant() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AiCreating
      isLoading={isLoading}
      size="md"
      onComplete={() => setIsLoading(false)}
    />
  );
}`,
      vanillaCode: `<!-- HTML -->
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

<!-- CSS -->
<style>
.ai-creating {
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

.stage-message {
  color: #4b5563;
  font-weight: 500;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<!-- JavaScript -->
<script>
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
    this.timeouts = [];
  }

  start(onComplete) {
    this.element.style.display = 'flex';
    this.setStage(0);

    this.timeouts.push(setTimeout(() => this.setStage(1), 2000));
    this.timeouts.push(setTimeout(() => this.setStage(2), 4000));
    this.timeouts.push(setTimeout(() => this.setStage(3), 6000));
    this.timeouts.push(setTimeout(() => {
      if (onComplete) onComplete();
    }, 7000));
  }

  setStage(index) {
    const stage = this.stages[index];
    this.stages.forEach(s => this.element.classList.remove(s));
    this.element.classList.add(stage);
    this.message.textContent = this.stageMessages[stage];
  }
}

// Usage:
const ai = new AiCreating(document.querySelector('.ai-creating'));
ai.start(() => console.log('Complete!'));
</script>`,
    },
    {
      name: 'AiCreating2',
      description: 'Full-screen AI brain animation with rotating rings, floating particles, and dynamic status messages.',
      href: '/AiCreating2',
      props: [
        { name: 'isLoading', type: 'boolean', default: 'false', description: 'Whether the animation is active' },
        { name: 'message', type: 'string', default: "'AI is creating...'", description: 'Main loading message' },
        { name: 'primaryColor', type: 'string', default: "'#6366F1'", description: 'Primary accent color' },
        { name: 'contained', type: 'boolean', default: 'false', description: 'Render in container vs full overlay' },
        { name: 'onComplete', type: '() => void', default: '-', description: 'Callback when animation completes' },
      ],
      reactCode: `import { AiCreating2 } from 'archyra';

function AIBrainAnimation() {
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
      vanillaCode: `<!-- HTML -->
<div class="ai-creating-2">
  <div class="content">
    <div class="brain-container">
      <div class="ring ring-1"></div>
      <div class="ring ring-2"></div>
      <div class="ring ring-3"></div>
      <div class="brain-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
        </svg>
      </div>
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

<!-- CSS -->
<style>
.ai-creating-2 {
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

.ai-creating-2.active { opacity: 1; }
.ai-creating-2.contained { position: relative; }

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

.ring-1 { animation: rotate 3s linear infinite; }
.ring-2 { animation: rotate 4s linear infinite; }
.ring-3 { animation: rotate 5s linear infinite; }

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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

.message {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
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
}
</style>

<!-- JavaScript -->
<script>
class AiCreating2 {
  constructor(element, options = {}) {
    this.element = element;
    this.progressBar = element.querySelector('.progress-bar');
    this.progress = 0;
    this.interval = null;

    if (options.primaryColor) {
      element.querySelectorAll('.ring').forEach(r => r.style.borderColor = options.primaryColor);
      this.progressBar.style.backgroundColor = options.primaryColor;
    }
  }

  show(onComplete) {
    this.element.classList.add('active');
    this.progress = 0;

    this.interval = setInterval(() => {
      this.progress = Math.min(100, this.progress + Math.random() * 2 + 0.5);
      this.progressBar.style.width = this.progress + '%';

      if (this.progress >= 100) {
        clearInterval(this.interval);
        setTimeout(() => onComplete?.(), 500);
      }
    }, 100);
  }

  hide() {
    clearInterval(this.interval);
    this.element.classList.remove('active');
  }
}

// Usage:
const loader = new AiCreating2(document.querySelector('.ai-creating-2'));
loader.show(() => loader.hide());
</script>`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <Badge className="bg-purple-500/10 text-purple-600">Creative</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Creative Components
        </h1>
        <p className="text-xl text-muted-foreground">
          AI-themed creative animations for engaging user experiences and dynamic content generation.
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
          <Link href="/docs/components/processing">
            <Button variant="outline" className="gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Processing Components
            </Button>
          </Link>
          <Link href="/docs/components/auth">
            <Button variant="outline" className="gap-2">
              Auth Components
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
