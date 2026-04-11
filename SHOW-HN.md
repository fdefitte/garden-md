# Show HN Draft

## Title (80 chars max)

**Show HN: Garden MD – Turn meeting transcripts into a company wiki your AI agents can read**

---

## Post

Hey HN,

We built Garden MD because our AI coding agents kept asking us the same questions: "Who's Sarah?" "What did we decide about pricing?" "Which client uses the enterprise plan?"

All that context existed — buried in meeting recordings nobody rewatches. So we wrote a CLI that extracts it.

**How it works:**

```
npm install -g garden-md
garden init          # pick your AI provider (Claude, GPT, Gemini, Ollama)
garden connect       # link Grain, Granola, or Fireflies
garden sync          # pull transcripts
garden tend          # AI extracts entities, builds linked wiki pages
garden open          # browse at localhost:4242
```

It reads your transcripts, identifies people, companies, and products, then generates structured markdown pages with cross-links and backlinks. The result is a wiki that grows automatically as you have more meetings.

**The real value is for AI agents.** During `garden init`, it auto-wires Claude Code, Codex, OpenClaw, Cursor, and Windsurf to read your wiki. No plugins, no vector databases — just markdown files on disk, which is what these agents already know how to read natively.

**What makes it different from Notion/Obsidian/RAG:**

- Zero manual curation — sync and tend on a cron, forget about it
- 100% local — no cloud, no accounts, your meeting data stays on your machine
- Cheap — processes 7 transcripts for ~$0.01 (BYOK)
- Agent-native — designed for AI agents to consume, not humans to browse (though the HTML dashboard is nice too)

We've been running it on our own team's meetings for the past month. Our agents now know every client relationship, every product decision, every team member — without us maintaining anything.

Open source, MIT licensed: https://github.com/garden-md/garden-md

Would love feedback, especially on what connectors to add next (Zoom? Otter? Gong?) and whether the entity extraction is useful outside of meeting notes.

---

## HN Comment Strategy

**Anticipate these questions/objections:**

1. **"Why not just use RAG?"** → RAG is overkill for this. Vector DBs cost $100s/month, need maintenance, and AI agents can't naturally browse them. Markdown is the universal context format — every agent already reads it. No embeddings, no retrieval pipeline, just `cat People/sarah.md`.

2. **"How is this different from Obsidian?"** → Obsidian requires manual curation. Garden MD is fully automated — connect your transcript source, set a cron, never think about it again. Also: Obsidian doesn't auto-wire AI agents.

3. **"Privacy concerns with sending meeting transcripts to AI?"** → Valid concern. That's why we support Ollama (fully local, no API calls). For cloud providers, transcripts are processed via standard API calls with the same privacy guarantees as any other API usage. Nothing is stored on our end — there is no "our end."

4. **"Does it work with X meeting tool?"** → We have built-in connectors for Grain, Granola, and Fireflies. The connector system is extensible — `garden connect` can generate a custom connector for any service with an API. PRs welcome.

5. **"What's the business model?"** → Open source core stays free forever. Future: paid hosted sync service (auto-sync without running the CLI), enterprise connectors (Gong, Salesforce), and team features.
