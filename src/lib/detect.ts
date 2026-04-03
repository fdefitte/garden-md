import { execSync } from 'child_process';
import os from 'os';

export interface DetectedProvider {
  id: 'anthropic' | 'openai' | 'gemini' | 'ollama' | 'claude-cli';
  name: string;
  detected: boolean;
  recommended?: boolean;
}

export function detectProviders(): DetectedProvider[] {
  const providers: DetectedProvider[] = [
    {
      id: 'anthropic',
      name: 'Anthropic API key',
      detected: !!process.env.ANTHROPIC_API_KEY,
      recommended: true,
    },
    {
      id: 'openai',
      name: 'OpenAI API key',
      detected: !!process.env.OPENAI_API_KEY,
    },
    {
      id: 'gemini',
      name: 'Google Gemini API key',
      detected: !!process.env.GEMINI_API_KEY,
    },
    {
      id: 'ollama',
      name: 'Ollama (local, free)',
      detected: isOllamaRunning(),
    },
    {
      id: 'claude-cli',
      name: 'Claude Code CLI',
      detected: isClaudeInstalled(),
    },
  ];

  return providers;
}

function isOllamaRunning(): boolean {
  try {
    execSync('curl -s http://localhost:11434/api/tags', { timeout: 2000 });
    return true;
  } catch {
    return false;
  }
}

function isClaudeInstalled(): boolean {
  try {
    execSync('which claude', { timeout: 2000 });
    return true;
  } catch {
    return false;
  }
}

export function defaultModelForProvider(provider: string): string {
  switch (provider) {
    case 'anthropic': return 'claude-sonnet-4-20250514';
    case 'openai': return 'gpt-4.1-mini';
    case 'gemini': return 'gemini-2.5-flash';
    case 'ollama': return 'llama3';
    case 'claude-cli': return 'default';
    default: return 'claude-sonnet-4-20250514';
  }
}
