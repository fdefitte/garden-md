import chalk from 'chalk';
import express from 'express';
import { execFileSync, exec } from 'child_process';
import net from 'net';
import { loadConfig, resolveHtmlPath, resolveWikiPath } from '../lib/config.js';
import { generateHtml } from '../lib/html.js';

export async function openCommand(): Promise<void> {
  const config = loadConfig();
  const htmlPath = resolveHtmlPath(config);
  const wikiPath = resolveWikiPath(config);

  const fs = await import('fs');

  // Check if wiki has any content (markdown files in any folder)
  const hasWikiContent = config.folders.some((f: any) => {
    const folderPath = `${wikiPath}/${f.name}`;
    return fs.existsSync(folderPath) && fs.readdirSync(folderPath).some((file: string) => file.endsWith('.md'));
  });

  if (!hasWikiContent) {
    console.log(chalk.yellow('\nYour wiki is empty. Run `garden sync && garden tend` first.\n'));
    return;
  }

  // Only regenerate HTML if it's missing or stale (wiki changed since last gen)
  const htmlIndexPath = `${htmlPath}/index.html`;
  const needsRegen = !fs.existsSync(htmlIndexPath) || (() => {
    const htmlTime = fs.statSync(htmlIndexPath).mtime.getTime();
    // Check if any wiki md file is newer than the HTML
    for (const f of config.folders) {
      const fp = `${wikiPath}/${f.name}`;
      if (!fs.existsSync(fp)) continue;
      for (const file of fs.readdirSync(fp).filter((x: string) => x.endsWith('.md'))) {
        if (fs.statSync(`${fp}/${file}`).mtime.getTime() > htmlTime) return true;
      }
    }
    return false;
  })();

  fs.mkdirSync(htmlPath, { recursive: true });
  if (needsRegen) {
    console.log(chalk.dim('  Generating HTML...'));
    await generateHtml(wikiPath, htmlPath, config.folders);
  }

  let port = 4242;
  while (await isPortTaken(port)) {
    port++;
  }

  const app = express();

  // API: sync & tend, then regenerate HTML
  let isRunning = false;
  app.post('/api/sync-tend', async (_req, res) => {
    if (isRunning) {
      res.json({ ok: false, message: 'Already running…' });
      return;
    }
    isRunning = true;
    console.log(chalk.dim('  ⟳ Sync & Tend triggered from browser…'));

    const gardenBin = process.argv[1]; // path to garden CLI

    exec(`node ${gardenBin} sync 2>&1 && node ${gardenBin} tend 2>&1`, async (err, stdout, stderr) => {
      const output = (stdout || '') + (stderr || '');
      console.log(chalk.dim(output.trim().split('\n').map((l: string) => '    ' + l).join('\n')));

      // Regenerate HTML
      try {
        const freshConfig = loadConfig();
        await generateHtml(resolveWikiPath(freshConfig), resolveHtmlPath(freshConfig), freshConfig.folders);
      } catch (e: any) {
        console.log(chalk.yellow(`    HTML regen failed: ${e.message?.slice(0, 100)}`));
      }

      isRunning = false;
      res.json({ ok: !err, message: err ? 'Sync & Tend failed' : 'Done', output: output.trim() });
    });
  });

  app.use(express.static(htmlPath));

  app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(chalk.green(`\n🌱 Wiki running at ${chalk.bold(url)}\n`));
    console.log(chalk.dim('  Press Ctrl+C to stop.\n'));

    // Open in browser
    try {
      const platform = process.platform;
      if (platform === 'darwin') {
        execFileSync('open', [url]);
      } else if (platform === 'linux') {
        execFileSync('xdg-open', [url]);
      } else if (platform === 'win32') {
        execFileSync('cmd', ['/c', 'start', url]);
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
