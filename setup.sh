#!/bin/bash

# AI Animation Framework - Setup Script
# This script helps you get started quickly

echo "🎨 AI Animation Framework Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js version 18+ is recommended"
    echo "Current version: $(node -v)"
fi

echo "✅ Node.js detected: $(node -v)"
echo ""

# Check which package manager to use
if command -v pnpm &> /dev/null; then
    PKG_MANAGER="pnpm"
elif command -v yarn &> /dev/null; then
    PKG_MANAGER="yarn"
else
    PKG_MANAGER="npm"
fi

echo "📦 Using package manager: $PKG_MANAGER"
echo ""

# Install dependencies
echo "📥 Installing dependencies..."
if [ "$PKG_MANAGER" = "npm" ]; then
    npm install
elif [ "$PKG_MANAGER" = "yarn" ]; then
    yarn install
else
    pnpm install
fi

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🚀 Quick Start Commands:"
    echo "========================"
    echo ""
    if [ "$PKG_MANAGER" = "npm" ]; then
        echo "  Development:    npm run dev"
        echo "  Production:     npm run build && npm start"
        echo "  Linting:        npm run lint"
    elif [ "$PKG_MANAGER" = "yarn" ]; then
        echo "  Development:    yarn dev"
        echo "  Production:     yarn build && yarn start"
        echo "  Linting:        yarn lint"
    else
        echo "  Development:    pnpm dev"
        echo "  Production:     pnpm build && pnpm start"
        echo "  Linting:        pnpm lint"
    fi
    echo ""
    echo "📚 Documentation:"
    echo "  - README.md for component docs"
    echo "  - INSTALL.md for detailed setup"
    echo ""
    echo "🌐 After running dev server, visit:"
    echo "  http://localhost:3000"
    echo ""

    # Ask if user wants to start dev server
    read -p "Would you like to start the development server now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🚀 Starting development server..."
        if [ "$PKG_MANAGER" = "npm" ]; then
            npm run dev
        elif [ "$PKG_MANAGER" = "yarn" ]; then
            yarn dev
        else
            pnpm dev
        fi
    fi
else
    echo ""
    echo "❌ Installation failed!"
    echo "Please check the error messages above and try again."
    exit 1
fi
