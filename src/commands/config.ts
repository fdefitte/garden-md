import { select, input } from '@inquirer/prompts';
import chalk from 'chalk';
import { loadConfig, saveConfig } from '../lib/config.js';
import { detectProviders, defaultModelForProvider } from '../lib/detect.js';

export async function configCommand(): Promise<void> {
  const config = loadConfig();

  console.log(chalk.green('\n⚙️  Garden Configuration\n'));

  const setting = await select({
    message: 'What do you want to update?',
    choices: [
      { name: `AI provider (current: ${config.ai.provider})`, value: 'ai' },
      { name: `AI model (current: ${config.ai.model})`, value: 'model' },
      { name: `API key`, value: 'key' },
      { name: `Sync schedule (current: ${config.schedule.sync})`, value: 'schedule' },
      { name: `Wiki path (current: ${config.wiki.path})`, value: 'path' },
    ],
  });

  if (setting === 'ai') {
    const providers = detectProviders();
    const providerId = await select({
      message: 'Which provider?',
      choices: providers.map(p => ({
        name: `${p.name}${p.detected ? ' ← detected' : ''}${p.recommended ? ' (recommended)' : ''}`,
        value: p.id,
      })),
    });
    config.ai.provider = providerId as typeof config.ai.provider;
    config.ai.model = defaultModelForProvider(providerId);
    console.log(chalk.green(`\n✓ Provider updated to ${providerId} (${config.ai.model})\n`));
  }

  if (setting === 'model') {
    const model = await input({
      message: 'Model name:',
      default: config.ai.model,
    });
    config.ai.model = model;
    console.log(chalk.green(`\n✓ Model updated to ${model}\n`));
  }

  if (setting === 'key') {
    const key = await input({
      message: 'New API key:',
      validate: (val) => val.length > 0 || 'API key is required',
    });
    config.ai.apiKey = key;
    console.log(chalk.green('\n✓ API key updated\n'));
  }

  if (setting === 'schedule') {
    const schedule = await input({
      message: 'Cron schedule for sync:',
      default: config.schedule.sync,
    });
    config.schedule.sync = schedule;
    console.log(chalk.green(`\n✓ Schedule updated to ${schedule}\n`));
  }

  if (setting === 'path') {
    const wikiPath = await input({
      message: 'Wiki path:',
      default: config.wiki.path,
    });
    config.wiki.path = wikiPath;
    config.wiki.wildland = wikiPath.replace(/\/?$/, '') + '-wildland';
    config.wiki.html = wikiPath.replace(/\/?$/, '') + '-html';
    console.log(chalk.green(`\n✓ Wiki path updated to ${wikiPath}\n`));
  }

  saveConfig(config);
}
