# Reddit Post — r/LocalLLaMA

**Subreddit culture:** Technical, privacy-focused, local-first enthusiasts. Hate cloud lock-in. Love Ollama. Skeptical of anything that phones home.

---

**Title:** I built an open-source tool that turns meeting transcripts into structured context files for local LLMs

**Body:**

I've been running Ollama locally for coding and day-to-day work, and the biggest pain point wasn't model quality — it was context. My local models had zero idea about my company, my clients, or any decisions we've made.

All that knowledge existed in meeting recordings. But feeding raw transcripts into a context window is wasteful and messy.

So I built **garden-md** — a CLI that:

1. Syncs transcripts from Grain, Granola, Fireflies (or any API)
2. Uses an LLM to extract entities (people, companies, products)
3. Generates structured markdown pages with cross-links
4. Builds a browsable wiki you can serve locally

The result is a folder of clean, organized `.md` files that any local model can read as context. No vector DB, no embeddings, no RAG pipeline. Just markdown.

**Why this matters for local LLM users:**

- Works with Ollama out of the box — pick any local model during setup
- Zero cloud dependencies. Your meeting data never leaves your machine.
- The output is just files. Point any tool at the folder.
- Costs nothing if you use a local model (otherwise ~$0.01/run with Claude Haiku)

**How it works with your local setup:**

```
garden init          # select Ollama as provider, pick your model
garden connect       # link your transcript source
garden sync          # pull transcripts locally
garden tend          # extract entities, build wiki
```

The wiki pages look like:

```
# Sarah Chen
**Role:** VP Engineering at Acme Corp
**First seen:** 2026-01-15 (Q1 Planning)

## Context
- Leading the API migration project
- Main technical contact for our integration
- Reports to David Kim (CTO)

## Mentioned in
- [[2026-01-15 Q1 Planning]]
- [[2026-02-03 Acme Integration Kickoff]]
- [[2026-03-10 Weekly Standup]]
```

Your local model can now answer "Who's our contact at Acme?" without you ever explaining it.

Open source, MIT licensed: https://github.com/garden-md/garden-md

Would love feedback from this community especially on Ollama model recommendations for entity extraction. Currently defaults to whatever you pick during init, but I'm curious what models people find best for structured extraction tasks.
