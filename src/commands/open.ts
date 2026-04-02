import chalk from 'chalk';
import express from 'express';
import { execSync } from 'child_process';
import net from 'net';
import { loadConfig, resolveHtmlPath } from '../lib/config.js';

export async function openCommand(): Promise<void> {
  const config = loadConfig();
  const htmlPath = resolveHtmlPath(config);

  const fs = await import('fs');
  if (!fs.existsSync(htmlPath) || fs.readdirSync(htmlPath).length === 0) {
    console.log(chalk.yellow('\nYour wiki is empty. Run `garden sync && garden tend` first.\n'));
    return;
  }

  let port = 4242;
  while (await isPortTaken(port)) {
    port++;
  }

  const app = express();
  app.use(express.static(htmlPath));

  app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(chalk.green(`\n🌱 Wiki running at ${chalk.bold(url)}\n`));
    console.log(chalk.dim('  Press Ctrl+C to stop.\n'));

    // Open in browser
    try {
      const platform = process.platform;
      if (platform === 'darwin') {
        execSync(`open ${url}`);
      } else if (platform === 'linux') {
        execSync(`xdg-open ${url} 2>/dev/null || true`);
      } else if (platform === 'win32') {
        execSync(`start ${url}`);
      }
    } catch {
      // Can't open browser — that's fine, URL is printed
    }
  });
}

function isPortTaken(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(true));
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    server.listen(port);
  });
}
