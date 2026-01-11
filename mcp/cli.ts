/**
 * Archyra - MCP CLI
 *
 * Initialize MCP configuration for different AI coding tools.
 *
 * Usage:
 *   npx archyra init --client claude
 *   npx archyra init --client cursor
 *   npx archyra init --client windsurf
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as readline from 'readline';
import { spawn } from 'child_process';

const PACKAGE_NAME = 'archyra';

// Client configurations
const CLIENT_CONFIGS: Record<string, {
  name: string;
  configPaths: string[];
  description: string;
}> = {
  claude: {
    name: 'Claude Code',
    configPaths: [
      path.join(os.homedir(), '.claude', 'claude_desktop_config.json'),
      path.join(os.homedir(), '.mcp.json'),
    ],
    description: 'Anthropic Claude Code CLI',
  },
  cursor: {
    name: 'Cursor',
    configPaths: [
      path.join(process.cwd(), '.cursor', 'mcp.json'),
      path.join(os.homedir(), '.cursor', 'mcp.json'),
    ],
    description: 'Cursor AI Editor',
  },
  windsurf: {
    name: 'Windsurf',
    configPaths: [
      path.join(os.homedir(), '.codeium', 'windsurf', 'mcp_config.json'),
    ],
    description: 'Codeium Windsurf Editor',
  },
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function log(message: string) {
  console.log(message);
}

function success(message: string) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function info(message: string) {
  console.log(`${colors.blue}ℹ${colors.reset} ${message}`);
}

function warn(message: string) {
  console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
}

function error(message: string) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function printBanner() {
  console.log(`
${colors.magenta}╔═══════════════════════════════════════════════════╗
║                                                   ║
║   ${colors.bright}Archyra${colors.reset}${colors.magenta}                                        ║
║   ${colors.dim}MCP Server Configuration${colors.reset}${colors.magenta}                       ║
║                                                   ║
╚═══════════════════════════════════════════════════╝${colors.reset}
`);
}

function getMcpConfig() {
  // Use npx with explicit package name to run the server
  // The @latest tag ensures we always get the current version
  return {
    command: 'npx',
    args: ['-y', 'archyra@latest', 'serve'],
  };
}

function findExistingConfig(configPaths: string[]): string | null {
  for (const configPath of configPaths) {
    if (fs.existsSync(configPath)) {
      return configPath;
    }
  }
  return null;
}

function ensureDirectoryExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readJsonFile(filePath: string): Record<string, any> {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function writeJsonFile(filePath: string, data: Record<string, any>) {
  ensureDirectoryExists(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function selectClient(): Promise<string> {
  log('\nSelect your AI coding tool:\n');

  const clients = Object.entries(CLIENT_CONFIGS);
  clients.forEach(([key, config], index) => {
    log(`  ${colors.cyan}${index + 1}${colors.reset}) ${config.name} ${colors.dim}(${config.description})${colors.reset}`);
  });

  log('');
  const answer = await prompt(`Enter choice (1-${clients.length}): `);
  const index = parseInt(answer) - 1;

  if (index >= 0 && index < clients.length) {
    return clients[index][0];
  }

  error('Invalid selection. Please try again.');
  return selectClient();
}

async function initMcp(clientKey: string) {
  const client = CLIENT_CONFIGS[clientKey];

  if (!client) {
    error(`Unknown client: ${clientKey}`);
    log(`\nSupported clients: ${Object.keys(CLIENT_CONFIGS).join(', ')}`);
    process.exit(1);
  }

  info(`Configuring MCP for ${colors.bright}${client.name}${colors.reset}...`);
  log('');

  // Find existing config or use first path
  let configPath = findExistingConfig(client.configPaths);

  if (!configPath) {
    // Use the first config path as default
    configPath = client.configPaths[0];
    info(`Creating new config at: ${colors.dim}${configPath}${colors.reset}`);
  } else {
    info(`Found existing config at: ${colors.dim}${configPath}${colors.reset}`);
  }

  // Read existing config
  const config = readJsonFile(configPath);

  // Initialize mcpServers if not present
  if (!config.mcpServers) {
    config.mcpServers = {};
  }

  // Check if already configured
  if (config.mcpServers[PACKAGE_NAME]) {
    warn(`${PACKAGE_NAME} is already configured.`);
    const answer = await prompt('Overwrite existing configuration? (y/N): ');
    if (answer.toLowerCase() !== 'y') {
      info('Skipping configuration.');
      return;
    }
  }

  // Add our MCP config
  config.mcpServers[PACKAGE_NAME] = getMcpConfig();

  // Write config
  writeJsonFile(configPath, config);

  log('');
  success(`Successfully configured ${colors.bright}${PACKAGE_NAME}${colors.reset} for ${client.name}!`);
  log('');

  // Print next steps
  log(`${colors.bright}Next steps:${colors.reset}`);
  log('');
  log(`  1. Restart ${client.name} to load the MCP server`);
  log('');
  log(`  2. Ask your AI assistant:`);
  log(`     ${colors.cyan}"List all animation components"${colors.reset}`);
  log(`     ${colors.cyan}"Add LoadingDots to my project"${colors.reset}`);
  log(`     ${colors.cyan}"Show me the AiCreating2 source code"${colors.reset}`);
  log('');
  log(`${colors.dim}Config location: ${configPath}${colors.reset}`);
  log('');
}

function serveMcp() {
  // Get the path to the server.js file
  const serverPath = path.join(__dirname, 'server.js');

  if (!fs.existsSync(serverPath)) {
    error('MCP server not found. Please reinstall the package.');
    process.exit(1);
  }

  // Run the server
  const child = spawn('node', [serverPath], {
    stdio: 'inherit',
    env: process.env,
  });

  child.on('error', (err) => {
    error(`Failed to start MCP server: ${err.message}`);
    process.exit(1);
  });

  child.on('exit', (code) => {
    process.exit(code || 0);
  });
}

function showHelp() {
  printBanner();

  log(`${colors.bright}Usage:${colors.reset}`);
  log('');
  log(`  npx ${PACKAGE_NAME} init [--client <name>]    Configure MCP for an AI tool`);
  log(`  npx ${PACKAGE_NAME} serve                     Start the MCP server`);
  log(`  npx ${PACKAGE_NAME} --help                    Show this help message`);
  log('');
  log(`${colors.bright}Supported clients:${colors.reset}`);
  log('');
  Object.entries(CLIENT_CONFIGS).forEach(([key, config]) => {
    log(`  ${colors.cyan}${key.padEnd(12)}${colors.reset} ${config.name} (${config.description})`);
  });
  log('');
  log(`${colors.bright}Examples:${colors.reset}`);
  log('');
  log(`  ${colors.dim}# Interactive mode - select your AI tool${colors.reset}`);
  log(`  npx ${PACKAGE_NAME} init`);
  log('');
  log(`  ${colors.dim}# Direct configuration for Claude Code${colors.reset}`);
  log(`  npx ${PACKAGE_NAME} init --client claude`);
  log('');
  log(`  ${colors.dim}# Direct configuration for Cursor${colors.reset}`);
  log(`  npx ${PACKAGE_NAME} init --client cursor`);
  log('');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  if (command === 'serve') {
    serveMcp();
    return;
  }

  if (command === 'init') {
    printBanner();

    // Check for --client flag
    const clientIndex = args.indexOf('--client');
    let clientKey: string;

    if (clientIndex !== -1 && args[clientIndex + 1]) {
      clientKey = args[clientIndex + 1].toLowerCase();
    } else {
      clientKey = await selectClient();
    }

    await initMcp(clientKey);
    return;
  }

  error(`Unknown command: ${command}`);
  log('');
  log(`Run ${colors.cyan}npx ${PACKAGE_NAME} --help${colors.reset} for usage information.`);
  process.exit(1);
}

main().catch((err) => {
  error(err.message);
  process.exit(1);
});
