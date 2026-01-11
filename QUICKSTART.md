# Quick Start Guide

Get up and running in 2 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Start Development Server

```bash
npm run dev
```

## Step 3: Open Browser

Visit **http://localhost:3000** to see the dashboard with live animations!

---

## What You'll See

1. **Dashboard** with animated stats and metrics
2. **AI Creating Animation** showing:
   - Person thinking with lightbulb idea
   - Writing on a wall
   - Building blocks that stack up
   - Completion with green checkmark

3. **Interactive Controls** to start/stop the animation

---

## Using the Component in Your Project

### Copy the Component

Copy `AiCreating.tsx` to your Next.js project.

### Install Framer Motion

```bash
npm install framer-motion
```

### Use It

```tsx
'use client';

import { useState } from 'react';
import AiCreating from './AiCreating';

export default function MyPage() {
  const [loading, setLoading] = useState(false);

  return (
    <AiCreating
      isLoading={loading}
      onComplete={() => console.log('Done!')}
    />
  );
}
```

---

## Available Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Check code quality |

---

## Need More Help?

- **INSTALL.md** - Detailed installation guide
- **README.md** - Full documentation
- **Dashboard.tsx** - See implementation example

---

## Troubleshooting

### Port 3000 already in use?

```bash
PORT=3001 npm run dev
```

### Dependencies not installing?

```bash
rm -rf node_modules package-lock.json
npm install
```

### Styles not working?

Restart the dev server:
```bash
# Press Ctrl+C to stop, then:
npm run dev
```

---

**That's it! You're ready to build amazing animations!** 🎉
