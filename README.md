<p align="center">
  <img src="https://img.shields.io/npm/v/archyra?style=for-the-badge&color=6366f1" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/archyra?style=for-the-badge&color=22c55e" alt="downloads" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="license" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
</p>

<h1 align="center">Archyra</h1>

<p align="center">
  <strong>The Complete AI Coding Toolkit</strong><br/>
  Beautiful animated React components + AWS Architecture Designer with IaC generation
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#ui-components">UI Components</a> •
  <a href="#architecture-designer">Architecture Designer</a> •
  <a href="#mcp-server">MCP Server</a> •
  <a href="#cli">CLI</a>
</p>

---

## Features

| Feature | Count | Description |
|---------|-------|-------------|
| **UI Components** | 25 | Production-ready React components with Framer Motion |
| **AWS Services** | 20 | Drag-and-drop cloud architecture designer |
| **IaC Generators** | 3 | Terraform, Pulumi TypeScript, Pulumi Python |
| **MCP Integration** | 3 | Claude, Cursor, Windsurf support |
| **Output Formats** | 2 | React + Vanilla HTML/CSS/JS |

### Key Capabilities

- **25 Animated UI Components** - Loading states, e-commerce, chat, auth, visual effects
- **AWS Architecture Designer** - Visual drag-and-drop cloud infrastructure design
- **Infrastructure as Code** - Export to Terraform or Pulumi (TypeScript/Python)
- **MCP Server** - Direct AI assistant integration (Claude, Cursor, Windsurf)
- **Dual Format** - React/Framer Motion + Vanilla HTML/CSS/JS
- **TypeScript First** - Full type definitions included
- **VPC Support** - Design complete network architectures with subnets

---

## Installation

```bash
npm install archyra framer-motion lucide-react
```

---

## UI Components

### 25 Production-Ready Components

#### Loading (5 components)

| Component | Description |
|-----------|-------------|
| `LoadingDots` | Animated bouncing dots |
| `Skeleton` | Content placeholder (text, avatar, card, image) |
| `Shimmer` | Shimmer loading effect |
| `ProgressBar` | Animated progress (default, gradient, striped, glow) |
| `PulseCircle` | Circular progress with pulse rings |

#### Creative / AI (3 components)

| Component | Description |
|-----------|-------------|
| `AiCreating` | Multi-stage AI robot animation |
| `AiCreating2` | AI brain with rotating rings |
| `CodeTyping` | Terminal code typing effect |

#### Processing (1 component)

| Component | Description |
|-----------|-------------|
| `DataProcessing` | Data pipeline visualization |

#### Auth (1 component)

| Component | Description |
|-----------|-------------|
| `FloatingLogin` | Animated login form with OAuth |

#### Chat (3 components)

| Component | Description |
|-----------|-------------|
| `ChatBubble` | Message bubble with status indicators |
| `ChatTyping` | Typing indicator (dots, pulse, wave) |
| `ChatMessage` | Full chat message with avatar |

#### E-Commerce (5 components)

| Component | Description |
|-----------|-------------|
| `ProductCard` | 3D product card with hover effects |
| `AddToCartButton` | Animated cart button with price |
| `WishlistHeart` | Heart with particle burst animation |
| `FlashSaleTimer` | Countdown timer with urgency styling |
| `CartNotification` | Flying product notification |

#### Visual Effects (7 components)

| Component | Description |
|-----------|-------------|
| `GlowButton` | Button with animated glow effect |
| `SpotlightCard` | Card with mouse-following spotlight |
| `AuroraBackground` | Animated aurora gradient background |
| `AnimatedBeam` | Animated connecting beam between elements |
| `Card3D` | 3D tilt card with glare effect |
| `NeonGradientCard` | Card with rotating neon gradient border |
| `InfiniteCarousel` | Infinite scrolling carousel |

---

## Architecture Designer

### Visual AWS Infrastructure Design

Design cloud architectures visually and export production-ready Infrastructure as Code.

### 20 AWS Services Supported

| Category | Services |
|----------|----------|
| **Compute** | EC2, Lambda, ECS |
| **Storage** | S3 |
| **Database** | RDS, DynamoDB, ElastiCache |
| **Networking** | VPC, CloudFront, Route53, API Gateway, ALB, NLB, NAT Gateway |
| **Security** | IAM, Cognito |
| **Integration** | SNS, SQS |
| **VPC Components** | VPC Environment, Public Subnet, Private Subnet |

### Infrastructure as Code Export

| Format | Languages | Output Files |
|--------|-----------|--------------|
| **Terraform** | HCL | `main.tf`, `variables.tf`, `outputs.tf`, modules |
| **Pulumi** | TypeScript | `index.ts`, `Pulumi.yaml`, `package.json` |
| **Pulumi** | Python | `__main__.py`, `Pulumi.yaml`, `requirements.txt` |

### Architecture Features

- **Drag & Drop** - Visual service placement
- **Auto-connections** - Smart service linking
- **VPC Designer** - Complete network architecture with subnets
- **Property Editor** - Configure each service (instance types, runtimes, etc.)
- **Real-time Preview** - See IaC code as you design
- **ZIP Export** - Download complete project structure

---

## Quick Start

### UI Components

```tsx
import { LoadingDots, ChatBubble, ProductCard } from 'archyra';

function App() {
  return (
    <div>
      <LoadingDots size="md" color="#6366f1" />

      <ChatBubble
        message="Hello!"
        variant="sender"
        color="blue"
      />

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

### Architecture Designer

```tsx
// The Architecture Designer is a full-page application
// Access it at /designer in the gallery

// Export options:
// 1. Terraform HCL
// 2. Pulumi TypeScript
// 3. Pulumi Python
// 4. ZIP download with all files
```

---

## Component Examples

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

### ChatBubble

```tsx
import { ChatBubble } from 'archyra';

<ChatBubble
  message="Hey, how are you?"
  variant="sender"
  color="blue"
  timestamp="2:30 PM"
  status="delivered"
/>
```

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
  onEnd={() => console.log('Sale ended!')}
/>
```

---

## MCP Server

Archyra includes an MCP (Model Context Protocol) server for AI assistant integration.

### Quick Setup

```bash
# Interactive mode
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
| `list_components` | List all 25 components with filtering |
| `get_component` | Get component details, props, and source |
| `add_component` | Get instructions to add a component |
| `get_install_command` | Get npm install command |

### Usage Examples

- *"List all animation components"*
- *"Add the LoadingDots component to my project"*
- *"Show me the AiCreating2 component in vanilla HTML"*
- *"What props does FlashSaleTimer accept?"*

---

## Vanilla HTML/CSS

Every UI component has a vanilla HTML/CSS/JS version - no React or npm required!

```
"Show me the LoadingDots component in vanilla format"
```

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

## Summary

| Category | Details |
|----------|---------|
| **UI Components** | 25 animated React components |
| **Component Categories** | Loading, Creative/AI, Chat, E-Commerce, Auth, Visual Effects |
| **AWS Services** | 20 services across Compute, Storage, Database, Networking, Security, Integration |
| **IaC Output** | Terraform HCL, Pulumi TypeScript, Pulumi Python |
| **MCP Support** | Claude Code, Cursor, Windsurf |
| **Output Formats** | React/Framer Motion, Vanilla HTML/CSS/JS |

---

## License

MIT

---

## Author

**johnbekele**

## Links

- [npm Package](https://www.npmjs.com/package/archyra)
- [GitHub Repository](https://github.com/johnbekele/Archyra)
