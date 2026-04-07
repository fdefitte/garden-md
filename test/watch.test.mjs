import { describe, it, expect } from 'vitest';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.join(__dirname, '..', 'src');

describe('garden watch — command wiring', () => {

  it('watch.ts exists and exports watchCommand', async () => {
    const watchPath = path.join(srcRoot, 'commands', 'watch.ts');
    expect(fs.existsSync(watchPath)).toBe(true);

    const src = fs.readFileSync(watchPath, 'utf-8');
    expect(src).toContain('export async function watchCommand');
  });

  it('cli.ts imports and registers the watch command', () => {
    const cliSrc = fs.readFileSync(path.join(srcRoot, 'cli.ts'), 'utf-8');
    expect(cliSrc).toContain("import { watchCommand } from './commands/watch.js'");
    expect(cliSrc).toContain(".command('watch')");
    expect(cliSrc).toContain("--interval");
    expect(cliSrc).toContain("--once");
  });

  it('watch command is available in compiled CLI', () => {
    const distCli = path.join(__dirname, '..', 'dist', 'cli.js');
    expect(fs.existsSync(distCli)).toBe(true);
    const compiled = fs.readFileSync(distCli, 'utf-8');
    expect(compiled).toContain("watch");
  });
});

describe('garden watch — implementation', () => {

  it('imports syncCommand and tendCommand', () => {
    const src = fs.readFileSync(path.join(srcRoot, 'commands', 'watch.ts'), 'utf-8');
    expect(src).toContain("import { syncCommand } from './sync.js'");
    expect(src).toContain("import { tendCommand } from './tend.js'");
  });

  it('defaults to 30 minute interval', () => {
    const src = fs.readFileSync(path.join(srcRoot, 'commands', 'watch.ts'), 'utf-8');
    expect(src).toContain("'30'");
  });

  it('validates interval is at least 1 minute', () => {
    const src = fs.readFileSync(path.join(srcRoot, 'commands', 'watch.ts'), 'utf-8');
    expect(src).toContain('intervalMin < 1');
  });

  it('checks wildland for .md files before running tend', () => {
    const src = fs.readFileSync(path.join(srcRoot, 'commands', 'watch.ts'), 'utf-8');
    expect(src).toContain(".endsWith('.md')");
    expect(src).toContain('itemCount === 0');
  });

  it('supports --once flag for single cycle', () => {
    const src = fs.readFileSync(path.join(srcRoot, 'commands', 'watch.ts'), 'utf-8');
    expect(src).toContain('options.once');
  });

  it('handles SIGINT and SIGTERM gracefully', () => {
    const src = fs.readFileSync(path.join(srcRoot, 'commands', 'watch.ts'), 'utf-8');
    expect(src).toContain("'SIGINT'");
    expect(src).toContain("'SIGTERM'");
  });

  it('runs cycle immediately on start before entering loop', () => {
    const src = fs.readFileSync(path.join(srcRoot, 'commands', 'watch.ts'), 'utf-8');
    // Should call runCycle before setInterval
    const runCycleIdx = src.indexOf('await runCycle(config)');
    const setIntervalIdx = src.indexOf('setInterval');
    expect(runCycleIdx).toBeLessThan(setIntervalIdx);
  });
});

describe('garden watch — help output', () => {

  it('garden watch --help works', async () => {
    const { execSync } = await import('child_process');
    const output = execSync('node dist/cli.js watch --help', {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf-8',
    });
    expect(output).toContain('Auto-sync and tend on a loop');
    expect(output).toContain('--interval');
    expect(output).toContain('--once');
  });
});
