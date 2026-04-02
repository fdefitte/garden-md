import { select, input, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import {
  configExists,
  saveConfig,
  defaultConfig,
  resolveWikiPath,
  resolveWildlandPath,
  DEFAULT_FOLDERS,
  GardenConfig,
} from '../lib/config.js';
import { detectProviders, defaultModelForProvider } from '../lib/detect.js';

export async function initCommand(): Promise<void> {
  console.log(chalk.green('\n🌱 Welcome to garden.md\n'));

  // Check if already initialized
  if (configExists()) {
    console.log(chalk.yellow('Garden is already initialized.'));
    console.log(chalk.dim('Run `garden uninstall` to start over, or `garden config` to update settings.\n'));
    process.exit(1);
  }

  const config = defaultConfig();

  // Step 1: AI Provider
  console.log(chalk.bold('Step 1: AI Provider\n'));
  const providers = detectProviders();
  const detectedCount = providers.filter(p => p.detected).length;

  if (detectedCount > 0) {
    console.log(chalk.dim('Detected providers:'));
    providers.forEach(p => {
      const icon = p.detected ? chalk.green('✓') : chalk.dim('✗');
      const label = p.recommended ? `${p.name} ${chalk.yellow('(recommended)')}` : p.name;
      console.log(`  ${icon} ${p.detected ? label : chalk.dim(p.name)}`);
    });
    console.log();
  }

  const providerId = await select({
    message: 'Which provider should garden use?',
    choices: providers.map(p => ({
      name: `${p.name}${p.detected ? ' ← detected' : ''}${p.recommended ? ' (recommended)' : ''}`,
      value: p.id,
    })),
  });

  config.ai.provider = providerId as GardenConfig['ai']['provider'];
  config.ai.model = defaultModelForProvider(providerId);

  // Get API key if needed
  if (providerId !== 'ollama' && providerId !== 'claude-cli') {
    const envKey = {
      anthropic: process.env.ANTHROPIC_API_KEY,
      openai: process.env.OPENAI_API_KEY,
      gemini: process.env.GEMINI_API_KEY,
    }[providerId];

    if (envKey) {
      const useEnv = await confirm({
        message: 'Use the API key from your environment?',
        default: true,
      });
      if (useEnv) {
        config.ai.apiKey = envKey;
      }
    }

    if (!config.ai.apiKey) {
      const key = await input({
        message: `Paste your ${providerId} API key:`,
        validate: (val) => val.length > 0 || 'API key is required',
      });
      config.ai.apiKey = key;
    }
  }

  console.log(chalk.green(`\n✓ Using ${providerId} (${config.ai.model})\n`));

  // Step 2: Wiki location
  console.log(chalk.bold('Step 2: Wiki Location\n'));

  const wikiPath = await input({
    message: 'Where should your wiki live?',
    default: '~/wiki',
  });
  config.wiki.path = wikiPath;
  config.wiki.wildland = wikiPath.replace(/\/?$/, '') + '-wildland';
  config.wiki.html = wikiPath.replace(/\/?$/, '') + '-html';

  // Step 3: Folder structure (fixed template, just show it)
  console.log(chalk.bold('\nStep 3: Wiki Structure\n'));
  console.log(chalk.dim('Default folder template:\n'));
  DEFAULT_FOLDERS.forEach(f => {
    console.log(`  ${chalk.cyan(f.name + '/')}  ${chalk.dim('— ' + f.desc)}`);
  });
  console.log(chalk.dim('\nYou can modify this anytime with `garden add`, `garden remove`, `garden rename`.\n'));

  // Step 4: Git tracking
  console.log(chalk.bold('Step 4: Git Tracking\n'));
  const enableGit = await confirm({
    message: 'Enable git tracking for your wiki? (every `garden tend` auto-commits changes)',
    default: true,
  });
  config.git.enabled = enableGit;
  config.git.autoCommit = enableGit;

  // Create directories
  const resolvedWiki = resolveWikiPath(config);
  const resolvedWildland = resolveWildlandPath(config);

  fs.mkdirSync(resolvedWiki, { recursive: true });
  fs.mkdirSync(resolvedWildland, { recursive: true });

  // Create folder structure
  for (const folder of config.folders) {
    fs.mkdirSync(path.join(resolvedWiki, folder.name), { recursive: true });
  }

  // Create Index.md
  const indexContent = `# 🌱 Your Garden

## Recent Activity

_No activity yet. Run \`garden connect\` to add a data source, then \`garden sync && garden tend\`._

## Folders

${config.folders.map(f => `- **${f.name}/** — ${f.desc}`).join('\n')}
`;
  fs.writeFileSync(path.join(resolvedWiki, 'Index.md'), indexContent, 'utf-8');

  // Initialize git if enabled
  if (enableGit) {
    try {
      execSync('git init', { cwd: resolvedWiki, stdio: 'ignore' });
      execSync('git add .', { cwd: resolvedWiki, stdio: 'ignore' });
      execSync('git commit -m "garden init"', { cwd: resolvedWiki, stdio: 'ignore' });
    } catch {
      console.log(chalk.yellow('⚠ Git init failed. Continuing without git tracking.'));
      config.git.enabled = false;
      config.git.autoCommit = false;
    }
  }

  // Wire CLAUDE.md
  const claudeMdPath = path.join(os.homedir(), '.claude', 'CLAUDE.md');
  const claudeSection = `
## Garden Wiki

Your company wiki is at ${config.wiki.path}. It contains structured knowledge extracted from meeting transcripts and other sources.

- Browse folders: ${config.folders.map(f => f.name).join(', ')}
- Read any .md file for context about people, companies, meetings, decisions, and products
- Manage structure with: \`garden add\`, \`garden remove\`, \`garden rename\`, \`garden list\`
- The wiki is auto-updated by \`garden tend\` — you don't need to maintain it manually
`;

  try {
    const claudeDir = path.dirname(claudeMdPath);
    fs.mkdirSync(claudeDir, { recursive: true });
    let existing = '';
    if (fs.existsSync(claudeMdPath)) {
      existing = fs.readFileSync(claudeMdPath, 'utf-8');
    }
    if (!existing.includes('## Garden Wiki')) {
      fs.appendFileSync(claudeMdPath, '\n' + claudeSection, 'utf-8');
    }
  } catch {
    console.log(chalk.dim('Could not wire ~/.claude/CLAUDE.md — you can add it manually.'));
  }

  // Save config
  saveConfig(config);

  console.log(chalk.green('\n✓ Garden initialized!\n'));
  console.log(`  Wiki:     ${chalk.cyan(config.wiki.path)}`);
  console.log(`  Wildland: ${chalk.cyan(config.wiki.wildland)}`);
  console.log(`  Provider: ${chalk.cyan(config.ai.provider)}`);
  console.log(`  Git:      ${chalk.cyan(enableGit ? 'enabled' : 'disabled')}`);
  console.log(`\n  Next: run ${chalk.bold('garden connect')} to add a data source.\n`);
}
