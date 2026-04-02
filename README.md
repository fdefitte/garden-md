# 🌱 garden-md

Turn your meeting transcripts into a Wikipedia for your company. One command.

## Install

```bash
npm install -g garden-md
```

## Quick Start

```bash
garden init              # set up AI provider + wiki structure
garden connect           # connect Grain, Notion, or any service
garden sync              # pull your last 30 days of data
garden tend              # process everything → linked wiki pages
garden open              # browse at localhost:4242
```

Five commands. Under 2 minutes. Your scattered transcripts become a structured, linked, browsable company wiki.

## What it does

- **Syncs** data from any service (Grain, Notion, Slack, etc.) on a cron schedule
- **Links** entities (people, companies, products) across all your documents — no summaries, no rewrites
- **Creates** stub pages that grow over time as more documents reference them
- **Renders** a Wikipedia-style HTML wiki with sidebar navigation, search, and backlinks

## What it doesn't do

- Rewrite or summarize your content (transcripts stay untouched)
- Store data in the cloud (everything is local markdown files)
- Require a subscription (BYOK — bring your own AI key)

## Commands

| Command | Description |
|---------|-------------|
| `garden init` | Interactive setup — AI provider, wiki location, git tracking |
| `garden connect` | Connect any data source (LLM figures out the API) |
| `garden sync` | Run all connectors now |
| `garden sync --schedule` | Set up cron for automatic sync |
| `garden tend` | Process wildland → wiki with entity linking |
| `garden open` | Start local server + open wiki in browser |
| `garden config` | Update AI provider, API key, schedule, etc. |
| `garden add <folder>` | Add a wiki folder |
| `garden remove <folder>` | Remove a wiki folder |
| `garden rename <a> <b>` | Rename a wiki folder |
| `garden list` | Show wiki folders with page counts |
| `garden uninstall` | Remove config + cron (wiki files kept) |

## How `tend` works

1. Reads raw documents from the wildland (staging area)
2. Extracts entities: **people**, **companies**, **products/tools**
3. Inserts markdown links into the original text (no content changes)
4. Creates stub pages for new entities with backlinks
5. Generates a browsable HTML wiki
6. Auto-commits to git (if enabled)

## Supported AI Providers

- Anthropic (recommended)
- OpenAI
- Google Gemini
- Ollama (local, free)
- Claude Code CLI

## License

MIT
