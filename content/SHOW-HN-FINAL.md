# Show HN — FINAL DRAFT (for Tuesday April 8, 8 AM PT)

**Title:** Show HN: Garden – Turn meeting transcripts into memory for your AI coding agents

**Body (plain text, no markdown — HN doesn't render it):**

I built Garden because my AI coding agents (Claude Code, Cursor) kept asking the same questions: "Who's Sarah?" "What did we decide about pricing?" All that context was locked in meeting recordings nobody rewatches.

Garden is a CLI that syncs your transcripts from Grain, Granola, or Fireflies, extracts people/companies/topics, and builds a linked markdown wiki. The key: it auto-wires Claude Code, Codex, Cursor, Windsurf, and OpenClaw to read it. No plugins, no RAG pipeline — just markdown files agents already know how to read.

  npm install -g garden-md
  garden init        # pick AI provider (Claude, GPT, Gemini, Ollama)
  garden connect     # link transcript source  
  garden sync        # pull transcripts
  garden tend        # extract entities, build wiki
  garden open        # browse at localhost:4242

Processes 7 transcripts for ~$0.01 (BYOK). 100% local, no cloud, MIT licensed.

We've been running it on our own team's 400+ meetings for a month. Our agents now know every client, every decision, every relationship without us maintaining anything.

https://github.com/garden-md/garden-md

---

**Maker comment (post immediately after submitting):**

Hey HN! Happy to answer any questions.

A few things that might come up:

- "Why not RAG?" — Overkill for this use case. Vector DBs cost hundreds/month, and AI agents already read markdown natively. No embeddings needed when you have structured entity pages.

- "Privacy?" — Everything runs locally. The only external call is to your AI provider's API (same as any other API usage). Or use Ollama for fully local processing.

- "What about Obsidian/Notion?" — Both require manual curation. Garden auto-syncs and auto-extracts. Set a cron, never think about it again. Neither auto-wires AI agents.

The agent wiring during "garden init" is probably the most interesting part — it detects which agents you use and writes instructions for each one to reference the wiki. Claude Code, Cursor, Windsurf, Codex, and OpenClaw are supported out of the box.

Built at Basalt (https://getbasalt.ai) where we deploy AI agents for GTM teams. This started as an internal tool.
