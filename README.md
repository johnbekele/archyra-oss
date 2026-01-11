<p align="center">
  <img src="https://img.shields.io/npm/v/archyra?style=for-the-badge&color=6366f1" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/archyra?style=for-the-badge&color=22c55e" alt="downloads" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="license" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
</p>

<h1 align="center">Archyra</h1>

<p align="center">
  <strong>The Complete AI Coding Toolkit</strong><br/>
  Beautiful animated React components with MCP server integration for AI assistants
</p>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#components">Components</a> •
  <a href="#mcp-server">MCP Server</a> •
  <a href="#vanilla-htmlcss">Vanilla HTML/CSS</a> •
  <a href="#cli">CLI</a>
</p>

---

## Features

- **18+ Production-Ready Components** - Loading states, e-commerce, chat, auth, and more
- **MCP Server Integration** - Direct AI assistant access (Claude, Cursor, Windsurf)
- **Dual Format Support** - React/Framer Motion + Vanilla HTML/CSS/JS
- **TypeScript First** - Full type definitions included
- **Customizable** - Colors, sizes, animations, and themes
- **Dark/Light Mode** - Built-in theme support
- **Zero Config** - Works out of the box

---

## Installation

```bash
npm install archyra framer-motion lucide-react
```

---

## Components

### Loading Components

| Component | Description |
|-----------|-------------|
| `LoadingDots` | Animated bouncing dots |
| `Skeleton` | Content placeholder with pulse/wave animation |
| `Shimmer` | Shimmer loading effect |
| `ShimmerCard` | Pre-built card skeleton |
| `ShimmerTable` | Table loading skeleton |

### Processing Components

| Component | Description |
|-----------|-------------|
| `PulseCircle` | Circular progress with pulse rings |
| `ProgressBar` | Animated progress bar (default, gradient, striped, glow) |
| `CircularProgress` | Circular progress indicator |
| `StepProgress` | Multi-step progress tracker |
| `DataProcessing` | Data pipeline visualization |

### Creative / AI Components

| Component | Description |
|-----------|-------------|
| `AiCreating` | Multi-stage AI robot animation |
| `AiCreating2` | AI brain with rotating rings |
| `CodeTyping` | Terminal code typing effect |

### Auth Components

| Component | Description |
|-----------|-------------|
| `FloatingLogin` | Animated login form with OAuth support |

### Chat Components

| Component | Description |
|-----------|-------------|
| `ChatBubble` | Message bubble with status indicators |
| `ChatTyping` | Typing indicator (dots, pulse, wave) |
| `ChatMessage` | Full chat message with avatar |
| `ChatConversation` | Chat container component |
| `ChatInput` | Message input with send button |

### E-Commerce Components

| Component | Description |
|-----------|-------------|
| `ProductCard` | 3D product card with hover effects |
| `AddToCartButton` | Animated cart button with price |
| `WishlistHeart` | Heart with particle burst animation |
| `FlashSaleTimer` | Countdown timer with urgency styling |
| `CartNotification` | Flying product notification |

---

## Quick Start

```tsx
import { LoadingDots, ChatBubble, ProductCard } from 'archyra';

function App() {
  return (
    <div>
      {/* Loading indicator */}
      <LoadingDots size="md" color="#6366f1" />

      {/* Chat message */}
      <ChatBubble
        message="Hello!"
        variant="sender"
        color="blue"
      />

      {/* Product card */}
      <ProductCard
        name="Premium Headphones"
        price={299}
        rating={4.8}
        onAddToCart={() => console.log('Added!')}
      />
    </div>
  );
}
```

---

## Component Examples

### LoadingDots

```tsx
import { LoadingDots } from 'archyra';

<LoadingDots size="md" color="#6366f1" speed="normal" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the dots |
| `color` | `string` | `'#6366f1'` | Color of the dots |
| `speed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Animation speed |

### AiCreating2

```tsx
import { AiCreating2 } from 'archyra';

<AiCreating2
  isLoading={true}
  message="Creating your design..."
  primaryColor="#6366f1"
  backgroundColor="#0f172a"
  contained={true}
  onComplete={() => console.log('Done!')}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | `boolean` | required | Controls visibility |
| `message` | `string` | `'AI is creating...'` | Main message |
| `subMessage` | `string` | - | Secondary text |
| `primaryColor` | `string` | `'#6366f1'` | Accent color |
| `backgroundColor` | `string` | `'#0f172a'` | Background color |
| `contained` | `boolean` | `false` | Container vs overlay mode |
| `onComplete` | `() => void` | - | Completion callback |

### ChatBubble

```tsx
import { ChatBubble } from 'archyra';

<ChatBubble
  message="Hey, how are you?"
  variant="sender"
  color="blue"
  timestamp="2:30 PM"
  status="delivered"
  animated={true}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | required | Message content |
| `variant` | `'sender' \| 'receiver'` | `'sender'` | Message direction |
| `color` | `'blue' \| 'green' \| 'purple' \| 'gray' \| 'gradient'` | `'blue'` | Bubble color |
| `timestamp` | `string` | - | Time display |
| `status` | `'sending' \| 'sent' \| 'delivered' \| 'read'` | - | Message status |
| `animated` | `boolean` | `true` | Enable animations |

### ProductCard

```tsx
import { ProductCard } from 'archyra';

<ProductCard
  image="/product.jpg"
  name="Wireless Earbuds"
  price={149}
  originalPrice={199}
  rating={4.5}
  reviews={128}
  badge="Sale"
  onAddToCart={() => handleAdd()}
  onWishlist={() => handleWishlist()}
/>
```

### FlashSaleTimer

```tsx
import { FlashSaleTimer } from 'archyra';

<FlashSaleTimer
  endTime={new Date('2024-12-31')}
  title="Flash Sale Ends In"
  discount={50}
  variant="urgent"
  showBadge={true}
  onEnd={() => console.log('Sale ended!')}
/>
```

---

## MCP Server

Archyra includes an MCP (Model Context Protocol) server that enables AI assistants to help users add components to their projects.

### Quick Setup

```bash
# Interactive mode - select your AI tool
npx archyra init

# Or specify directly
npx archyra init --client claude
npx archyra init --client cursor
npx archyra init --client windsurf
```

### Supported AI Tools

| Tool | Config Location |
|------|-----------------|
| **Claude Code** | `~/.claude/claude_desktop_config.json` or `~/.mcp.json` |
| **Cursor** | `.cursor/mcp.json` or `~/.cursor/mcp.json` |
| **Windsurf** | `~/.codeium/windsurf/mcp_config.json` |

### Manual Configuration

**Claude Desktop** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "archyra": {
      "command": "npx",
      "args": ["-y", "archyra@latest", "serve"]
    }
  }
}
```

**Cursor** (`.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "archyra": {
      "command": "npx",
      "args": ["-y", "archyra@latest", "serve"]
    }
  }
}
```

### MCP Tools

| Tool | Description |
|------|-------------|
| `list_components` | List all available components with filtering |
| `get_component` | Get component details, props, and source code |
| `add_component` | Get instructions to add a component to your project |
| `get_install_command` | Get npm install command for dependencies |

### Usage Examples

Once configured, ask your AI assistant:

- *"List all animation components"*
- *"Add the LoadingDots component to my project"*
- *"Show me the AiCreating2 component in vanilla HTML"*
- *"What props does FlashSaleTimer accept?"*

---

## Vanilla HTML/CSS

Every component has a vanilla HTML/CSS/JS version - no React or npm required!

### Get Vanilla Version via MCP

```
"Show me the LoadingDots component in vanilla format"
```

### Example Output

**HTML:**
```html
<div class="loading-dots">
  <span></span>
  <span></span>
  <span></span>
</div>
```

**CSS:**
```css
.loading-dots {
  display: flex;
  gap: 8px;
}
.loading-dots span {
  width: 12px;
  height: 12px;
  background: #6366f1;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}
.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
```

---

## CLI

```bash
npx archyra --help              # Show help
npx archyra init                # Interactive MCP setup
npx archyra init --client X     # Direct setup for specific client
npx archyra serve               # Start MCP server manually
```

---

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  LoadingDotsProps,
  ChatBubbleProps,
  ProductCardProps,
  AiCreating2Props
} from 'archyra';
```

---

## License

MIT

---

## Author

**johnbekele**

## Links

- [npm Package](https://www.npmjs.com/package/archyra)
- [GitHub Repository](https://github.com/johnbekele/Archyra)
