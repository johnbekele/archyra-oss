'use client';

import { useState } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Framework = 'react' | 'vanilla';

interface FrameworkCodeBlockProps {
  reactCode: string;
  vanillaCode: string;
  id: string;
}

const frameworkLabels: Record<Framework, string> = {
  react: 'React + Framer Motion',
  vanilla: 'Vanilla HTML/CSS/JS',
};

export function FrameworkCodeBlock({ reactCode, vanillaCode, id }: FrameworkCodeBlockProps) {
  const [framework, setFramework] = useState<Framework>('react');
  const [copied, setCopied] = useState(false);

  const code = framework === 'react' ? reactCode : vanillaCode;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {/* Framework Selector */}
      <div className="flex items-center justify-between mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 h-8">
              {frameworkLabels[framework]}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setFramework('react')}>
              <span className={framework === 'react' ? 'font-medium' : ''}>
                React + Framer Motion
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFramework('vanilla')}>
              <span className={framework === 'vanilla' ? 'font-medium' : ''}>
                Vanilla HTML/CSS/JS
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-400 hover:text-zinc-100"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>

      {/* Code Block */}
      <pre className="bg-zinc-950 text-zinc-100 rounded-lg p-4 overflow-x-auto text-sm max-h-[500px]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
