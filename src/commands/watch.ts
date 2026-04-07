import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { loadConfig, resolveWildlandPath } from '../lib/config.js';
import { syncCommand } from './sync.js';
import { tendCommand } from './tend.js';

export interface WatchOptions {
  interval?: string;
  once?: boolean;
}

export async function watchCommand(options: WatchOptions): Promise<void> {
  const config = loadConfig();
  const intervalMin = parseInt(options.interval || '30', 10);

  if (isNaN(intervalMin) || intervalMin < 1) {
    console.error(chalk.red('\n✗ Interval must be at least 1 minute.\n'));
    process.exit(1);
  }

  if (options.once) {
    await runCycle(config);
    return;
  }

  console.log(chalk.green(`\n🌿 Garden watch started — sync + tend every ${intervalMin} minutes`));
  console.log(chalk.dim(`  Press Ctrl+C to stop.\n`));

  // Run immediately on start
  await runCycle(config);

  // Then loop
  const intervalMs = intervalMin * 60 * 1000;
  const timer = setInterval(async () => {
    await runCycle(config);
  }, intervalMs);

  // Graceful shutdown
  const shutdown = () => {
    clearInterval(timer);
    console.log(chalk.dim('\n\n  Garden watch stopped.\n'));
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  // Keep alive
  await new Promise(() => {});
}

async function runCycle(config: ReturnType<typeof loadConfig>): Promise<void> {
  const wildlandPath = resolveWildlandPath(config);
  const now = new Date().toLocaleTimeString();

  console.log(chalk.dim(`\n[${now}] Running sync...`));

  try {
    // Run sync (without schedule/unschedule flags)
    await syncCommand({});
  } catch (err: any) {
    console.log(chalk.red(`  Sync error: ${err.message?.slice(0, 200)}`));
    return;
  }

  // Check if wildland has new items
  const itemCount = fs.existsSync(wildlandPath)
    ? fs.readdirSync(wildlandPath).filter(f => f.endsWith('.md')).length
    : 0;

  if (itemCount === 0) {
    console.log(chalk.dim(`  No new items to tend.`));
    return;
  }

  console.log(chalk.dim(`[${now}] ${itemCount} items in wildland — running tend...`));

  try {
    await tendCommand();
  } catch (err: any) {
    console.log(chalk.red(`  Tend error: ${err.message?.slice(0, 200)}`));
  }
}
