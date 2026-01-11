# AI Coding Agents Guide

This document provides structured information specifically designed for AI coding agents to understand and implement the AI Animation Framework.

## Quick Facts

**Package Name:** `ai-animation-framework`
**Version:** 1.0.0
**License:** MIT
**Type:** React/Next.js Animation Component Library

## What This Package Does

This package provides a single, production-ready animation component (`AiCreating`) that visualizes a creative AI process through 4 sequential stages:

1. **Thinking** - Character with thought bubble and lightbulb (0-1.5s)
2. **Writing** - Character writing text on a wall (1.5-3.5s)
3. **Building** - Blocks stacking up (3.5s+)
4. **Complete** - Green checkmark when `isLoading` becomes `false`

## When to Use This Component

**Use cases:**
- Loading states for AI operations (content generation, image creation, etc.)
- Async process visualization (API calls, data processing)
- User feedback during long-running operations
- Creative/AI-themed loading indicators

**Don't use for:**
- Simple spinners (too elaborate)
- Non-AI/creative contexts (theme mismatch)
- Sub-second operations (animation needs time to display)

## Installation

```bash
npm install ai-animation-framework framer-motion
```

**Requirements:**
- React 18+
- Next.js 13+ with App Router
- Framer Motion 10+
- TypeScript (optional but included)

## Basic Implementation

### Step 1: Import
```typescript
import { AiCreating } from 'ai-animation-framework';
```

### Step 2: Add State
```typescript
const [isLoading, setIsLoading] = useState(false);
```

### Step 3: Render
```tsx
<AiCreating
  isLoading={isLoading}
  onComplete={() => console.log('Done!')}
/>
```

### Step 4: Control
```typescript
// Start animation
setIsLoading(true);

// Complete animation (after async operation)
setIsLoading(false);
```

## Component API

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isLoading` | `boolean` | ✅ Yes | - | Controls animation state. `true` = animating, `false` = complete |
| `onComplete` | `() => void` | ❌ No | `undefined` | Callback fired when animation completes (after `isLoading` becomes `false`) |

### TypeScript Interface

```typescript
export interface AiCreatingProps {
  isLoading: boolean;
  onComplete?: () => void;
}
```

## Complete Examples

### Example 1: Basic Loading State

```typescript
'use client';

import { useState } from 'react';
import { AiCreating } from 'ai-animation-framework';

export default function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    // Your async operation
    await someAsyncOperation();

    setIsLoading(false);
  };

  return (
    <div>
      <AiCreating isLoading={isLoading} />
      <button onClick={handleClick}>Start</button>
    </div>
  );
}
```

### Example 2: API Call with Error Handling

```typescript
'use client';

import { useState } from 'react';
import { AiCreating } from 'ai-animation-framework';

export default function ApiExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'Generate content' })
      });

      if (!response.ok) throw new Error('Failed to generate');

      const data = await response.json();
      console.log('Generated:', data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AiCreating
        isLoading={isLoading}
        onComplete={() => console.log('Generation complete!')}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={fetchData}>Generate</button>
    </div>
  );
}
```

### Example 3: Conditional Rendering

```typescript
'use client';

import { useState } from 'react';
import { AiCreating } from 'ai-animation-framework';

export default function ConditionalExample() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'complete'>('idle');

  const startProcess = async () => {
    setStatus('loading');
    await someOperation();
    setStatus('complete');
  };

  return (
    <div>
      {status === 'loading' && (
        <AiCreating
          isLoading={true}
          onComplete={() => setStatus('complete')}
        />
      )}

      {status === 'idle' && <button onClick={startProcess}>Start</button>}
      {status === 'complete' && <p>Process complete!</p>}
    </div>
  );
}
```

## Animation Behavior

### Timing
- **Total duration:** Variable (controlled by `isLoading` prop)
- **Stage 1 (Thinking):** 0-1.5 seconds
- **Stage 2 (Writing):** 1.5-3.5 seconds
- **Stage 3 (Building):** 3.5+ seconds
- **Stage 4 (Complete):** Triggered when `isLoading` becomes `false`

### State Machine
```
isLoading = true
  → Stage 1: Thinking (1.5s delay)
  → Stage 2: Writing (2s delay)
  → Stage 3: Building (waiting for isLoading = false)

isLoading = false
  → Stage 4: Complete (green checkmark, calls onComplete)
```

## Common Patterns

### Pattern 1: Form Submission
```typescript
const handleSubmit = async (formData: FormData) => {
  setIsLoading(true);
  try {
    await submitForm(formData);
  } finally {
    setIsLoading(false);
  }
};
```

### Pattern 2: Data Fetching
```typescript
useEffect(() => {
  const loadData = async () => {
    setIsLoading(true);
    const data = await fetchData();
    setIsLoading(false);
  };
  loadData();
}, []);
```

### Pattern 3: Optimistic Updates
```typescript
const saveData = async () => {
  setIsLoading(true);

  // Update UI optimistically
  updateUI(newData);

  try {
    await api.save(newData);
  } catch (error) {
    // Revert on error
    revertUI();
  } finally {
    setIsLoading(false);
  }
};
```

## Next.js Specific Notes

### App Router
- ✅ Component uses `'use client'` directive
- ✅ Compatible with Server Components (import in Client Components only)
- ✅ No server-side rendering issues

### Pages Router
- ✅ Fully compatible
- ❌ No special configuration needed

## Styling

### Default Styling
The component comes with built-in Tailwind CSS classes and inline styles. No additional CSS required.

### Customization
To customize appearance, you can:
1. Fork the component file (`AiCreating.tsx`)
2. Modify the SVG elements and Tailwind classes
3. Adjust animation timing in the `useEffect` hook

## File Structure

```
node_modules/ai-animation-framework/
├── AiCreating.tsx          # Main animation component
├── Dashboard.tsx           # Demo dashboard (reference)
├── AiCreatingExample.tsx   # Standalone example
├── index.ts                # Main exports
├── README.md               # General documentation
└── AI-AGENTS.md           # This file
```

## Imports

```typescript
// Recommended: Named import
import { AiCreating } from 'ai-animation-framework';

// Alternative: Direct file import
import AiCreating from 'ai-animation-framework/AiCreating';

// TypeScript types
import type { AiCreatingProps } from 'ai-animation-framework';
```

## Troubleshooting for AI Agents

### Error: "Module not found"
**Solution:** Ensure `framer-motion` is installed:
```bash
npm install framer-motion
```

### Error: "Unexpected token 'export'"
**Solution:** Component uses `'use client'` directive. Only import in Client Components.

### Warning: "useEffect missing dependency"
**Solution:** This is expected. The component manages its own dependencies internally.

### Animation not visible
**Solution:** Ensure parent container has sufficient height (component needs ~300px height).

## Decision Tree for AI Agents

```
Need to show loading state?
├─ Yes → Is it for AI/creative operation?
│        ├─ Yes → Is operation > 2 seconds?
│        │        ├─ Yes → ✅ USE AiCreating
│        │        └─ No → Consider simpler spinner
│        └─ No → Consider different animation style
└─ No → Don't use this component
```

## Testing

```typescript
import { render, screen } from '@testing-library/react';
import { AiCreating } from 'ai-animation-framework';

test('shows animation when loading', () => {
  const { rerender } = render(<AiCreating isLoading={true} />);
  // Assert animation is visible

  rerender(<AiCreating isLoading={false} />);
  // Assert completion state
});
```

## Performance

- **Bundle size:** ~8KB (minified, not gzipped)
- **Dependencies:** Framer Motion (required)
- **Re-renders:** Minimal (optimized with React.memo patterns)
- **Animation performance:** GPU-accelerated (CSS transforms)

## Summary for AI Agents

**TL;DR:**
1. Install: `npm install ai-animation-framework framer-motion`
2. Import: `import { AiCreating } from 'ai-animation-framework'`
3. Use with state: `<AiCreating isLoading={isLoading} />`
4. Control with boolean: `setIsLoading(true/false)`
5. Perfect for AI/creative loading states lasting 2+ seconds

## Related Resources

- Full documentation: `README.md`
- Installation guide: `INSTALL.md`
- Quick start: `QUICKSTART.md`
- Live demo: Run `npm run dev` in package directory
