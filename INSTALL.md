# AI Animation Framework - Installation Guide

Complete setup guide for the AI Animation Framework with Next.js dashboard.

## Quick Start

### Prerequisites

Make sure you have the following installed:
- Node.js 18+ (check with `node --version`)
- npm, yarn, or pnpm package manager

### One-Command Setup

```bash
npm run setup && npm run dev
```

This will:
1. Install all dependencies
2. Start the development server at http://localhost:3000

## Manual Installation

### Step 1: Install Dependencies

Choose your preferred package manager:

**Using npm:**
```bash
npm install
```

**Using yarn:**
```bash
yarn install
```

**Using pnpm:**
```bash
pnpm install
```

### Step 2: Start Development Server

**Using npm:**
```bash
npm run dev
```

**Using yarn:**
```bash
yarn dev
```

**Using pnpm:**
```bash
pnpm dev
```

The application will be available at **http://localhost:3000**

## Project Structure

```
animations/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with CSS imports
│   └── page.tsx             # Main page rendering Dashboard
├── AiCreating.tsx           # Animation component
├── Dashboard.tsx            # Main dashboard component
├── AiCreatingExample.tsx    # Standalone example
├── globals.css              # Global styles with Tailwind
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── next.config.js           # Next.js configuration
├── README.md                # Component documentation
└── INSTALL.md              # This file
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |
| `npm run setup` | Install dependencies (alias for npm install) |

## Using the Animation Component

### In Your Own Project

1. Copy these files to your Next.js project:
   - `AiCreating.tsx`
   - Make sure Framer Motion is installed: `npm install framer-motion`

2. Import and use:

```tsx
'use client';

import { useState } from 'react';
import AiCreating from './path/to/AiCreating';

export default function MyPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleProcess = async () => {
    setIsLoading(true);

    // Your async operation
    await fetch('/api/generate');

    setIsLoading(false);
  };

  return (
    <div>
      <AiCreating
        isLoading={isLoading}
        onComplete={() => console.log('Done!')}
      />
      <button onClick={handleProcess}>Start</button>
    </div>
  );
}
```

### Standalone Example

To run just the animation example without the full dashboard:

1. Create a new page in `app/example/page.tsx`:
```tsx
import AiCreatingExample from '../../AiCreatingExample'

export default function ExamplePage() {
  return <AiCreatingExample />
}
```

2. Navigate to http://localhost:3000/example

## Customization

### Changing Animation Timing

Edit `AiCreating.tsx` and modify the timeout values:

```typescript
const thinkingTimer = setTimeout(() => setStage('writing'), 1500); // Think stage
const writingTimer = setTimeout(() => setStage('building'), 3500); // Write stage
```

### Changing Colors

The component uses Tailwind CSS classes. Modify colors in `AiCreating.tsx`:

```tsx
// Background gradient
className="bg-gradient-to-br from-blue-50 to-purple-50"

// Block colors
fill="#8B5CF6"  // Bottom block - purple
fill="#A78BFA"  // Middle block - light purple
fill="#10B981"  // Top block when complete - green
```

### Dashboard Customization

Edit `Dashboard.tsx` to:
- Change stats and metrics
- Add/remove task items
- Modify color scheme
- Update layout and spacing

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, run on a different port:

```bash
PORT=3001 npm run dev
```

### Module Not Found Errors

Make sure all dependencies are installed:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Clear Next.js cache and rebuild:

```bash
rm -rf .next
npm run dev
```

### Styling Not Working

Ensure Tailwind CSS is properly configured:
1. Check that `globals.css` contains Tailwind directives
2. Verify `tailwind.config.js` includes all component paths
3. Restart the dev server

## Production Build

### Create Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

The optimized production build will be available at http://localhost:3000

### Deploy to Vercel

The easiest way to deploy:

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Deploy with one click

Vercel automatically detects Next.js configuration.

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- iOS Safari: Latest 2 versions

## Dependencies

### Core Dependencies
- **react** (^18.3.1) - UI library
- **react-dom** (^18.3.1) - React DOM renderer
- **next** (^14.2.0) - React framework
- **framer-motion** (^11.0.0) - Animation library
- **lucide-react** (^0.344.0) - Icon library

### Dev Dependencies
- **typescript** (^5.3.3) - Type checking
- **tailwindcss** (^3.4.1) - Utility-first CSS
- **eslint** (^8.56.0) - Code linting
- **postcss** (^8.4.33) - CSS processing
- **autoprefixer** (^10.4.17) - CSS vendor prefixes

## Support

For issues or questions:
1. Check the README.md for component documentation
2. Review this installation guide
3. Check the example implementation in Dashboard.tsx

## License

MIT License - Free to use in your projects!

---

**Ready to start?** Run `npm run dev` and visit http://localhost:3000
