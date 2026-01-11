# Archyra

Beautiful animated components for React/Next.js. Production-ready components for AI interfaces with MCP (Model Context Protocol) server support.

[![npm version](https://badge.fury.io/js/archyra.svg)](https://www.npmjs.com/package/archyra)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 7 production-ready animation components
- TypeScript support
- Framer Motion animations
- MCP Server for AI assistants (Claude, etc.)
- Customizable colors and sizes
- Dark/Light mode support
- Responsive design

## Installation

```bash
npm install archyra framer-motion lucide-react
```

## Available Components

| Component | Category | Description |
|-----------|----------|-------------|
| `LoadingDots` | Loading | Simple bouncing dots animation |
| `PulseCircle` | Processing | Circular progress with pulse rings |
| `CodeTyping` | Creative | Code typing effect with syntax colors |
| `DataProcessing` | Processing | Data pipeline visualization |
| `AiCreating` | Creative | Multi-stage AI robot animation |
| `AiCreating2` | Creative | AI brain with rotating rings |
| `FloatingLogin` | Auth | Floating login form with OAuth |

## Quick Start

```tsx
import { LoadingDots } from 'archyra';

function MyComponent() {
  return <LoadingDots size="md" color="#6366F1" />;
}
```

## Component Examples

### LoadingDots

```tsx
import { LoadingDots } from 'archyra';

<LoadingDots size="md" color="#6366F1" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the dots |
| `color` | `string` | `'#6366F1'` | Color of the dots |

### PulseCircle

```tsx
import { PulseCircle } from 'archyra';

const [isActive, setIsActive] = useState(false);

<PulseCircle
  isActive={isActive}
  onComplete={() => setIsActive(false)}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isActive` | `boolean` | required | Activates the animation |
| `progress` | `number` | - | External progress (0-100) |
| `onComplete` | `() => void` | - | Callback at 100% |

### AiCreating2

```tsx
import { AiCreating2 } from 'archyra';

<AiCreating2
  isLoading={isLoading}
  message="Creating your plan..."
  primaryColor="#6366F1"
  backgroundColor="#0f172a"
  contained={true}
  onComplete={() => setIsLoading(false)}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | `boolean` | required | Controls visibility |
| `message` | `string` | `'AI is creating...'` | Main message |
| `subMessage` | `string` | - | Secondary text |
| `primaryColor` | `string` | `'#6366F1'` | Accent color |
| `backgroundColor` | `string` | `'#0f172a'` | Background color |
| `textColor` | `string` | `'#ffffff'` | Text color |
| `contained` | `boolean` | `false` | Render in container vs overlay |
| `onComplete` | `() => void` | - | Completion callback |

### FloatingLogin

```tsx
import { FloatingLogin } from 'archyra';

<FloatingLogin
  mode="dark"
  primaryColor="#6366F1"
  floatIntensity={5}
  onLogin={(data) => console.log(data)}
  onGoogleLogin={() => signInWithGoogle()}
  onAppleLogin={() => signInWithApple()}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'light' \| 'dark'` | `'light'` | Theme mode |
| `primaryColor` | `string` | `'#6366F1'` | Accent color |
| `floatingEnabled` | `boolean` | `true` | Enable floating animation |
| `floatIntensity` | `number` | `5` | Float intensity (1-10) |
| `onLogin` | `(data) => void` | - | Login callback |
| `onGoogleLogin` | `() => void` | - | Google OAuth callback |
| `onAppleLogin` | `() => void` | - | Apple Sign-In callback |

---

## MCP Server (For AI Assistants)

This package includes an MCP (Model Context Protocol) server that allows AI assistants like Claude, Cursor, and Windsurf to help users add animation components to their projects.

### Quick Setup

Run one command to configure MCP for your AI coding tool:

```bash
# Interactive mode - select your tool
npx archyra init

# Or specify directly
npx archyra init --client claude
npx archyra init --client cursor
npx archyra init --client windsurf
```

Then restart your AI tool to load the MCP server.

### Supported AI Tools

| Tool | Config Location |
|------|-----------------|
| Claude Code | `~/.claude/claude_desktop_config.json` or `~/.mcp.json` |
| Cursor | `.cursor/mcp.json` or `~/.cursor/mcp.json` |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |

### Available MCP Tools

| Tool | Description |
|------|-------------|
| `list_components` | List all available components |
| `get_component` | Get component details and source code |
| `add_component` | Get instructions to add a component |
| `get_install_command` | Get npm install command |

### Usage with AI Assistants

Once configured, you can ask:
- "List all animation components"
- "Add the LoadingDots component to my project"
- "Show me the PulseCircle component details"
- "What dependencies do I need for FloatingLogin?"

### CLI Commands

```bash
npx archyra --help          # Show help
npx archyra init            # Interactive setup
npx archyra init --client X # Direct setup for client
npx archyra serve           # Start MCP server manually
```

---

## License

MIT

## Author

johnbekele

## Links

- [npm package](https://www.npmjs.com/package/archyra)
- [GitHub repository](https://github.com/johnbekele/archyra)
