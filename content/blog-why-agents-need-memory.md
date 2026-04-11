# Blog Post: Why AI Agents Need Memory (And Why RAG Is Overkill)

*Target: Dev blog, Indie Hackers, Medium, or GitHub Pages*
*SEO keywords: AI agent memory, Claude Code context, AI coding agent company knowledge, local AI tools*

---

## Your AI Agent Is Smart But Amnesiac

You're using Claude Code or Cursor. It writes great code. It understands your codebase. But ask it "Who's our main contact at Acme?" and you get silence.

Every session starts from zero. No institutional knowledge. No memory of who your clients are, what was decided last week, or which team member owns what.

The irony: all that information exists. It's locked inside meeting recordings you'll never rewatch.

## The Obvious Fix: RAG

The industry answer is Retrieval-Augmented Generation. Set up a vector database, generate embeddings from your documents, build a retrieval pipeline, wire it into your agent.

Cost: $100-500/month for infrastructure. Complexity: significant. Time to set up: days to weeks. And the results? Decent, but agents still hallucinate because they're searching semantically rather than reading structured knowledge.

For a 5-person startup that just wants Claude Code to know who Sarah is, this is absurd.

## The Simpler Answer: Markdown

Here's what most people don't realize: **every AI coding agent already knows how to read markdown files.**

Claude Code reads `~/.claude/CLAUDE.md` on startup. Cursor reads `.cursorrules`. Windsurf reads `.windsurfrules`. OpenClaw reads `MEMORY.md`. Codex reads `AGENTS.md`.

These aren't plugins or integrations. They're built-in behaviors. The agents look for these files and load them as context, automatically.

So the question becomes: what if your company knowledge was structured as markdown files in the right places?

## From Meeting Recordings to Agent Memory

That's what we built with [garden-md](https://github.com/garden-md/garden-md).

The flow:

1. **Connect** your meeting transcript service (Grain, Granola, Fireflies, or anything with an API)
2. **Sync** your transcripts to a local folder
3. **Tend** — AI reads each transcript, extracts entities (people, companies, products), and generates structured wiki pages
4. **Auto-wire** — during setup, garden-md configures your AI agents to read the wiki

The result is a folder structure like:

```
wiki/
├── People/
│   ├── sarah-chen.md        # VP Eng at Acme, leads API migration
│   ├── david-kim.md         # CTO at Acme, Sarah's boss
│   └── Index.md
├── Companies/
│   ├── acme-corp.md         # Enterprise client, using our API
│   └── Index.md
├── Meetings/
│   ├── 2026-01-15-q1-planning.md
│   └── ...
└── Index.md
```

Each entity page has context extracted from every meeting where they were mentioned, with cross-links and backlinks. It's a Wikipedia for your company that grows automatically.

## Why Markdown Beats RAG for This Use Case

| | RAG | Markdown Wiki |
|---|---|---|
| Setup time | Days to weeks | 2 minutes |
| Monthly cost | $100-500 | $0 (BYOK, ~$0.01/run) |
| Agent integration | Custom code per agent | Built-in (agents already read .md) |
| Transparency | Black box embeddings | Human-readable files you can edit |
| Maintenance | Database ops, reindexing | Zero (auto-sync on cron) |
| Privacy | Data in cloud DB | 100% local files |
| Portability | Vendor lock-in | Plain text, works everywhere |

The key insight: AI agents don't need semantic search over your entire document corpus. They need **structured, curated knowledge** — the same kind a new hire would get in their first week. Who are the key people? What are the important projects? What was decided?

That's exactly what entity extraction produces.

## The Numbers

From our own usage at [Basalt](https://getbasalt.ai):
- 419 meeting transcripts processed
- 847 entities extracted automatically
- 312 people pages, 89 company pages, 67 product pages
- Total processing cost: ~$6
- Time to set up: 2 minutes
- Time to maintain: 0 (runs on a cron)

Our agents went from "I don't know who that is" to "Sarah Chen is VP Engineering at Acme Corp, she's leading the API migration and reports to David Kim. Based on the March 10 standup, the migration is 60% complete."

## Try It

```bash
npm install -g garden-md
garden init
garden connect
garden sync
garden tend
garden open
```

Open source, MIT licensed. Your data stays on your machine.

[GitHub](https://github.com/garden-md/garden-md)

---

*Built by the team at [Basalt](https://getbasalt.ai). We help companies deploy AI agents across their GTM stack.*
