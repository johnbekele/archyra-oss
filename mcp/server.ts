/**
 * Archyra - MCP Server
 *
 * Model Context Protocol server that allows AI assistants to:
 * - List available animation components
 * - Get component details and documentation
 * - Add components to user projects
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { components, getComponent, listComponents, getCategories, ComponentInfo } from './registry.js';
import * as fs from 'fs';
import * as path from 'path';

const server = new Server(
  {
    name: 'archyra',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'list_components',
        description: 'List all available AI animation components. Optionally filter by category.',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Filter by category: loading, processing, creative, auth, chat, ecommerce, or all',
              enum: ['all', 'loading', 'processing', 'creative', 'auth', 'chat', 'ecommerce'],
            },
          },
        },
      },
      {
        name: 'get_component',
        description: 'Get detailed information about a specific component including props, usage example, and source code. Supports React and vanilla HTML/CSS formats.',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Component name or ID (e.g., "LoadingDots", "loading-dots", "PulseCircle")',
            },
            format: {
              type: 'string',
              description: 'Output format: "react" for React/Framer Motion, "vanilla" for plain HTML/CSS/JS',
              enum: ['react', 'vanilla'],
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'add_component',
        description: 'Add an animation component to the user\'s project. Supports React (.tsx) and vanilla HTML/CSS/JS formats.',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Component name or ID to add',
            },
            directory: {
              type: 'string',
              description: 'Directory path where to create the component (default: ./components)',
            },
            format: {
              type: 'string',
              description: 'Output format: "react" (default) or "vanilla" for plain HTML/CSS/JS',
              enum: ['react', 'vanilla'],
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_install_command',
        description: 'Get the npm install command for required dependencies of a component.',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Component name or ID',
            },
          },
          required: ['name'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'list_components': {
      const category = (args as { category?: string })?.category || 'all';
      const filtered = listComponents(category);

      const summary = filtered.map(c => ({
        name: c.name,
        id: c.id,
        category: c.category,
        description: c.description,
        formats: {
          react: true,
          vanilla: !!c.vanilla,
        },
      }));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              total: filtered.length,
              categories: getCategories(),
              components: summary,
              note: 'Components with vanilla: true support plain HTML/CSS/JS (no React/npm required). Use format: "vanilla" in get_component or add_component.',
            }, null, 2),
          },
        ],
      };
    }

    case 'get_component': {
      const componentName = (args as { name: string; format?: string }).name;
      const format = (args as { format?: string }).format || 'react';
      const component = getComponent(componentName);

      if (!component) {
        return {
          content: [
            {
              type: 'text',
              text: `Component "${componentName}" not found. Use list_components to see available components.`,
            },
          ],
          isError: true,
        };
      }

      // Return vanilla format if requested
      if (format === 'vanilla') {
        if (!component.vanilla) {
          return {
            content: [
              {
                type: 'text',
                text: `Vanilla HTML/CSS version not available for "${componentName}". Use format: "react" for the React version.`,
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                name: component.name,
                id: component.id,
                description: component.description,
                category: component.category,
                format: 'vanilla',
                html: component.vanilla.html,
                css: component.vanilla.css,
                js: component.vanilla.js || null,
                usage: component.vanilla.usage,
                note: 'No npm dependencies required. Just add the HTML, CSS, and optional JS to your project.',
              }, null, 2),
            },
          ],
        };
      }

      // Default: React format
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              name: component.name,
              id: component.id,
              description: component.description,
              category: component.category,
              format: 'react',
              dependencies: component.dependencies,
              props: component.props,
              usage: component.usage,
              source: component.source,
              vanillaAvailable: !!component.vanilla,
            }, null, 2),
          },
        ],
      };
    }

    case 'add_component': {
      const componentName = (args as { name: string; directory?: string; format?: string }).name;
      const directory = (args as { directory?: string }).directory || './components';
      const format = (args as { format?: string }).format || 'react';
      const component = getComponent(componentName);

      if (!component) {
        return {
          content: [
            {
              type: 'text',
              text: `Component "${componentName}" not found. Use list_components to see available components.`,
            },
          ],
          isError: true,
        };
      }

      // Handle vanilla format
      if (format === 'vanilla') {
        if (!component.vanilla) {
          return {
            content: [
              {
                type: 'text',
                text: `Vanilla HTML/CSS version not available for "${componentName}". Use format: "react" instead.`,
              },
            ],
            isError: true,
          };
        }

        const htmlPath = path.join(directory, `${component.id}.html`);
        const cssPath = path.join(directory, `${component.id}.css`);
        const jsPath = component.vanilla.js ? path.join(directory, `${component.id}.js`) : null;

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                component: component.name,
                format: 'vanilla',
                files: {
                  html: { path: htmlPath, content: component.vanilla.html },
                  css: { path: cssPath, content: component.vanilla.css },
                  js: jsPath ? { path: jsPath, content: component.vanilla.js } : null,
                },
                usage: component.vanilla.usage,
                instructions: `
1. Create the HTML file at: ${htmlPath}
2. Create the CSS file at: ${cssPath}
${jsPath ? `3. Create the JS file at: ${jsPath}` : ''}
${jsPath ? '4' : '3'}. Link the CSS in your HTML <head> and JS before </body>
${jsPath ? '5' : '4'}. No npm dependencies required!

Example HTML setup:
<link rel="stylesheet" href="${component.id}.css">
${jsPath ? `<script src="${component.id}.js"></script>` : ''}
                `.trim(),
              }, null, 2),
            },
          ],
        };
      }

      // Default: React format
      const filePath = path.join(directory, `${component.name}.tsx`);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              component: component.name,
              format: 'react',
              filePath: filePath,
              source: component.source,
              dependencies: component.dependencies,
              installCommand: `npm install ${component.dependencies.join(' ')}`,
              usage: component.usage,
              vanillaAvailable: !!component.vanilla,
              instructions: `
1. Create the file at: ${filePath}
2. Install dependencies: npm install ${component.dependencies.join(' ')}
3. Import and use the component as shown in the usage example.

Note: Make sure you have 'use client' directive if using Next.js App Router.
${component.vanilla ? '\nTip: Vanilla HTML/CSS version also available. Use format: "vanilla" to get it.' : ''}
              `.trim(),
            }, null, 2),
          },
        ],
      };
    }

    case 'get_install_command': {
      const componentName = (args as { name: string }).name;
      const component = getComponent(componentName);

      if (!component) {
        return {
          content: [
            {
              type: 'text',
              text: `Component "${componentName}" not found.`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: `npm install ${component.dependencies.join(' ')}`,
          },
        ],
      };
    }

    default:
      return {
        content: [
          {
            type: 'text',
            text: `Unknown tool: ${name}`,
          },
        ],
        isError: true,
      };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Archyra MCP Server running on stdio');
}

main().catch(console.error);
