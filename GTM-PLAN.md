# Garden MD — GTM Launch Plan
**Owner:** Fox 🦊  
**Status:** Draft v1  
**Last Updated:** 2026-04-03  

---

## Executive Summary

**Garden MD** is a CLI tool that turns meeting transcripts into a linked markdown wiki for company memory. Target: developers and AI-first teams who want their agents (Claude Code, Cursor, etc.) to remember everything without cloud dependencies or expensive RAG infrastructure.

**Core insight:** AI agents are smart but amnesiac. Garden MD gives them institutional memory using the format they already understand — markdown files on disk.

**Launch strategy:** Developer-first, open-source credibility, Product Hunt + Show HN simultaneous launch, then expand to GTM/ops teams via use case positioning.

**Revenue model (future):** Open-source core, paid connectors/sync-as-a-service for enterprise (Gong, Zoom, Slack).

---

## 1. Competitive Landscape

### Direct Competitors
| Tool | Positioning | Weakness | Garden MD Advantage |
|------|-------------|----------|---------------------|
| **Notion** | All-in-one workspace | Cloud lock-in, not AI-native, no agent wiring | Local-first, markdown, auto-wires agents |
| **Obsidian** | Personal knowledge graph | Manual curation, no meeting sync | Auto-sync, auto-entity-extraction |
| **Roam Research** | Networked thought | Expensive ($15/mo), manual | Free/BYOK, automated |
| **Mem.ai / Reflect** | AI-powered notes | Closed, proprietary, cloud | Open source, local, transparent |
| **RAG solutions** | Vector DB + embeddings | Complex, expensive, overkill | Simple markdown, $0.01/run |

### Adjacent Players (Not Direct Competitors)
- **Grain / Fireflies / Granola** — Meeting recorders. Garden MD *complements* them (pulls from their APIs). They don't do entity extraction or agent wiring.
- **Zapier / Make** — Automation tools. Could replicate Garden MD workflows, but require manual setup and don't have AI entity extraction.
- **Pinecone / Weaviate** — Vector databases. Over-engineered for this use case. Garden MD uses structured markdown, not embeddings.

### Blue Ocean Positioning
**Garden MD isn't competing on features — it's competing on simplicity and agent-native design.**

Most knowledge tools are built for *humans browsing UIs*. Garden MD is built for *AI agents reading files*. Markdown is the universal agent context format. No plugins, no integrations, no API calls — just files on disk that Claude Code / Cursor / Codex already know how to read.

**Tagline:** *"Turn meeting transcripts into a Wikipedia for your company."*

**Differentiation:**
1. **Agent-first design** — auto-wires 5 AI coding agents out of the box
2. **Local-first** — zero cloud dependencies, your data stays on your machine
3. **Cost transparency** — $0.01 per transcript, BYOK (bring your own AI key)
4. **Zero maintenance** — auto-sync on cron, no manual curation
5. **Open source** — MIT license, fork it and make it yours

---

## 2. Target Audience

### Primary (Launch Focus)
**Developers & AI-first teams (500-5k users)**
- Use Claude Code, Cursor, or Windsurf daily
- Run 5-20 meetings/week (standups, client calls, investor pitches)
- Currently: screenshots, scattered notes, no system
- Pain: AI agents have zero company memory, keep asking same questions
- Motivation: Make their agents smarter without learning new tools

**Psychographics:**
- Open-source friendly
- Distrust cloud tools / SaaS lock-in
- Value simplicity over feature bloat
- Active on Hacker News, Twitter dev community, Indie Hackers

**Where they hang out:**
- Hacker News (Show HN)
- Twitter (AI agent community)
- Discord (AI dev servers: OpenAI, Anthropic, Cursor)
- Reddit (r/LocalLLaMA, r/ChatGPT, r/OpenAI)
- Indie Hackers

### Secondary (Post-Launch Expansion)
**GTM / Ops teams at AI-native startups (2k-10k users)**
- Use Grain/Fireflies for customer calls
- Struggle to organize customer insights
- Currently: spreadsheets, Notion databases, manual tagging
- Pain: Sales/CS context scattered, onboarding takes weeks
- Motivation: Centralize customer intel, make AI agents useful for GTM work

**Where they hang out:**
- LinkedIn (GTM operators, RevOps community)
- SaaStr community
- Modern Sales Pros Slack

### Tertiary (Future Opportunity)
**Consultants & fractional teams** — need company memory across clients
**Remote-first companies** — heavy meeting culture, need better async context

---

## 3. Positioning & Messaging

### Core Message
**"AI agents with company memory — no cloud, no setup, just markdown."**

### Positioning Angles (Ranked by Strength)

#### 🥇 Angle 1: **Agent-Native Memory** (STRONGEST)
- **Hook:** "Your AI agents are smart but amnesiac. Garden MD gives them memory."
- **Audience:** Developers using Claude Code, Cursor, Codex
- **Proof:** Auto-wires 5 agents, demo of before/after agent responses
- **Why it works:** Solves a real, felt pain — agents asking the same questions every session

#### 🥈 Angle 2: **Local-First, No Cloud Lock-In**
- **Hook:** "Meeting notes are private. Keep them local."
- **Audience:** Privacy-conscious devs, open-source advocates
- **Proof:** Zero cloud dependencies, MIT license, 100% local storage
- **Why it works:** Taps into anti-SaaS sentiment, Notion fatigue

#### 🥉 Angle 3: **Stupid Cheap** ($0.01 per run)
- **Hook:** "Process 7 transcripts for a penny. No subscription, BYOK."
- **Audience:** Indie hackers, bootstrappers, cost-conscious teams
- **Proof:** Show cost breakdown vs. RAG infrastructure ($100s/month)
- **Why it works:** Price transparency is rare in AI tooling

#### Angle 4: **Zero Maintenance**
- **Hook:** "Set it and forget it. Auto-sync on cron, no manual curation."
- **Audience:** Busy founders, small teams without ops bandwidth
- **Proof:** One-time setup, runs in background forever
- **Why it works:** Reduces friction to adoption

### Messaging Framework
| Audience | Pain | Solution | Proof |
|----------|------|----------|-------|
| **Developers** | AI agents have no company memory | Auto-wires agents to read markdown wiki | Demo: agent knows Sarah from `People/sarah.md` |
| **Privacy-conscious** | Cloud tools leak sensitive meeting data | 100% local, no cloud dependencies | MIT license, inspect the code yourself |
| **Bootstrappers** | RAG infrastructure costs $100s/month | $0.01 per transcript, BYOK | Process 400 transcripts for ~$5 |
| **Busy teams** | Manual note organization takes hours | Auto-sync, auto-entity-extraction | Set cron once, never touch it again |

---

## 4. Launch Strategy

### Timeline: **2-Week Sprint to Launch**

#### Week 1: Pre-Launch Prep
**Day 1-3: Assets & Content**
- [ ] Logo (Nano Banana prompt already written)
- [ ] 6 gallery screenshots (1270x760)
- [ ] GIF demo (terminal flow: `init → connect → sync → tend → open`)
- [ ] Video (optional, 30-60s, Loom walkthrough)
- [ ] Landing page (GitHub README is solid, optionally deploy to garden-md.dev)
- [ ] Twitter teaser thread (see Section 5)

**Day 4-5: Community Seeding**
- [ ] Post in AI dev Discords (OpenAI, Anthropic, Cursor) — *not as promo, as genuine share*
- [ ] DM 10-20 devs who've complained about agent context issues on Twitter
- [ ] Seed GitHub Discussions with 2-3 prompts ("How do you organize meeting notes?", "What connectors should we add next?")

**Day 6-7: Launch Materials**
- [ ] Product Hunt draft (use existing PRODUCT-HUNT-GARDEN.md)
- [ ] Show HN draft (see Section 6)
- [ ] Notify supporters (email/DM 30-50 devs who've shown interest)

#### Week 2: Launch Execution
**Launch Day: Tuesday or Wednesday, 12:01 AM PT**
- [ ] Product Hunt publish (12:01 AM PT)
- [ ] Show HN publish (same time)
- [ ] Twitter launch thread (7:00 AM PT)
- [ ] Cross-post to Indie Hackers, Reddit (r/SideProject, r/OpenAI, r/LocalLLaMA)
- [ ] Reply to every PH comment within 1 hour
- [ ] Reply to every HN comment within 30 minutes

**Launch Day +1:**
- [ ] Round up coverage (PH ranking, HN front page, Twitter engagement)
- [ ] Thank voters/commenters
- [ ] Ship quick fixes based on feedback

**Launch Day +3:**
- [ ] "Lessons learned" post (Indie Hackers, personal blog)
- [ ] Add PH badge to README
- [ ] Update roadmap based on feedback

---

## 5. Distribution Channels

### Tier 1: Developer Communities (Launch Focus)
| Channel | Audience | Tactic | Timing |
|---------|----------|--------|--------|
| **Hacker News** | 500k+ devs | Show HN post | Launch day, 12:01 AM PT |
| **Product Hunt** | 50k+ devs | Full launch page | Launch day, 12:01 AM PT |
| **Twitter** | AI dev community | Launch thread + replies | Launch day, 7:00 AM PT |
| **GitHub** | Open-source community | README optimization, trending repos | Ongoing |

### Tier 2: AI Dev Communities
| Channel | Audience | Tactic | Timing |
|---------|----------|--------|--------|
| **Cursor Discord** | 10k+ devs | Share in #show-and-tell | Pre-launch seed |
| **Anthropic Discord** | 5k+ devs | Share in #claude-code | Pre-launch seed |
| **OpenAI Discord** | 20k+ devs | Share in #codex | Pre-launch seed |
| **r/LocalLLaMA** | 100k+ devs | Post as "local-first AI memory" | Launch day +1 |

### Tier 3: GTM Communities (Post-Launch)
| Channel | Audience | Tactic | Timing |
|---------|----------|--------|--------|
| **LinkedIn** | GTM operators | "How we organize 400+ customer calls" | Week 2 |
| **SaaStr Community** | SaaS founders | Use case: customer intel wiki | Month 2 |
| **Modern Sales Pros** | Sales ops | Use case: onboarding new reps | Month 2 |

### Content Strategy
**Blog posts (on Basalt blog or Medium):**
1. *"Why AI agents need memory (and how we solved it)"* — technical deep dive
2. *"We processed 400 meeting transcripts for $5"* — cost transparency
3. *"Local-first AI tooling is the future"* — positioning piece
4. *"How Garden MD makes Claude Code 10x smarter"* — use case walkthrough

**Twitter strategy:**
- Launch thread (see Section 6)
- Daily tips (entity extraction, connector setup, agent wiring)
- User showcases (retweet people sharing their wikis)
- Memes (agent amnesia jokes, "Claude, who's Sarah?" screenshots)

---

## 6. Launch Copy

### Show HN Draft
```
Show HN: Garden MD — Turn meeting transcripts into a wiki for your AI agents

Hi HN!

We built garden-md to solve a problem we had at Basalt: our AI agents (Claude Code, Cursor) had zero company memory. Every session started blank. "Who's the main contact at Acme?" "What did we decide about pricing last week?" — nothing.

All that context was locked inside meeting recordings nobody rewatches.

The fix turned out to be embarrassingly simple: turn those recordings into structured markdown. AI agents already know how to read .md files natively. No plugins, no vector databases, no RAG pipeline. Just well-organized folders of linked markdown.

Five commands, two minutes:
→ garden init (pick your AI provider)
→ garden connect (link Grain/Granola/Fireflies)
→ garden sync (pull transcripts)
→ garden tend (extract entities, build wiki)
→ garden open (browse it)

What makes it different:
• Agent-native — auto-wires Claude Code, Cursor, Windsurf, Codex to read your wiki
• Local-first — your data stays on your machine, no cloud
• Costs $0.01 per run — processes 7 transcripts for a penny
• Zero maintenance — auto-sync on cron, no manual curation

Open source, MIT licensed. `npm install -g garden-md` and you're running.

Repo: https://github.com/fdefitte/garden-md
Demo: [link to video/GIF]

We'd love your feedback on where to take this next.
```

### Twitter Launch Thread
```
🌱 Launching garden-md — turn meeting transcripts into a Wikipedia for your company

Your AI agents are smart but amnesiac. Every session starts blank.

"Who's Sarah?" "What did we decide about pricing?"

They have zero institutional knowledge.

Here's the fix 🧵

[1/12]

---

The problem: all your company context is locked inside meeting recordings nobody rewatches.

Your agents (Claude Code, Cursor, etc.) could be 10x more useful if they knew your people, your deals, your decisions.

But they don't. Because they have no memory.

[2/12]

---

The obvious fix? RAG infrastructure. Vector databases, embeddings, semantic search.

Cost: $100s/month. Complexity: high. Results: mediocre (agents still hallucinate, still ask basic questions).

There's a simpler way.

[3/12]

---

Markdown.

Every AI agent — Claude Code, Cursor, Windsurf, Codex — reads .md files natively.

No plugins. No integrations. No API calls.

Just files on disk that agents already understand.

So we built garden-md to turn your meetings into organized markdown.

[4/12]

---

How it works:

→ garden init (pick AI provider: Claude, GPT, Gemini, Ollama)
→ garden connect (link Grain, Granola, or Fireflies)
→ garden sync (pull transcripts)
→ garden tend (extract entities, build wiki)
→ garden open (browse it)

Five commands. Two minutes. Done.

[5/12]

---

What "garden tend" does:

Reads your transcripts → extracts people, companies, products → creates stub pages with context → links mentions across documents → generates a Wikipedia-style wiki.

Cost: $0.01 per run. Processes 7 transcripts for a penny.

[6/12]

---

The magic: agent wiring.

garden-md auto-configures 5 AI coding agents to read your wiki:
• Claude Code
• OpenAI Codex
• Cursor
• Windsurf
• OpenClaw

Now when you ask "who's Sarah?", your agent reads People/sarah.md and actually knows.

[7/12]

---

At Basalt, we process all our calls automatically.

Our agents now know:
• Every client relationship
• Every product decision
• Every investor conversation

Without us maintaining anything. It just works.

[8/12]

---

What makes garden-md different:

✅ Agent-native design (built for AI memory, not human browsing)
✅ Local-first (zero cloud dependencies)
✅ Cost-transparent ($0.01/run, BYOK)
✅ Zero maintenance (auto-sync on cron)
✅ Open source (MIT, fork it)

[9/12]

---

Some numbers:

• 400+ transcripts processed for ~$5
• 312 people, 89 companies, 67 products extracted
• 847 entities linked across documents
• 5 AI agents auto-wired
• 100% local, zero cloud lock-in

[10/12]

---

This is v0.8.5. Open source, MIT licensed.

We're launching on Product Hunt today + Show HN.

Install: `npm install -g garden-md`
Repo: https://github.com/fdefitte/garden-md

Feedback welcome. What connectors should we add next?

[11/12]

---

If you're tired of your AI agents forgetting everything, try garden-md.

Five commands. Two minutes. Your agents get company memory.

🌱 https://github.com/fdefitte/garden-md

[12/12]
```

---

## 7. Success Metrics

### Launch Day (24 hours)
- [ ] Product Hunt: Top 5 daily ranking
- [ ] Hacker News: Front page (top 10)
- [ ] Twitter: 10k+ impressions on launch thread
- [ ] GitHub: 200+ stars
- [ ] npm installs: 100+

### Week 1
- [ ] GitHub: 500+ stars
- [ ] npm installs: 500+
- [ ] Contributors: 3-5 PRs merged
- [ ] Community: 50+ GitHub Discussions participants

### Month 1
- [ ] GitHub: 1,500+ stars
- [ ] npm installs: 2,000+
- [ ] Blog posts: 3 technical deep dives published
- [ ] User showcases: 10+ teams sharing their wikis on Twitter

### Month 3 (Validation for Paid Pivot)
- [ ] Active users: 1,000+
- [ ] Recurring usage: 30% weekly retention
- [ ] Enterprise inquiries: 5+ companies asking about Gong/Zoom/Slack connectors
- [ ] Decision: Validate paid tier (sync-as-a-service for enterprise connectors)

---

## 8. Risks & Mitigation

### Risk 1: "Just use Notion"
**Mitigation:** Positioning clarity — Garden MD isn't a Notion replacement. It's agent memory infrastructure. Show demo of agent reading `People/sarah.md` vs. agent with no context.

### Risk 2: Low adoption (devs don't see the value)
**Mitigation:** Focus on **agent wiring** as the hook. Devs already use Claude Code / Cursor — show them it's 2 minutes to make those agents 10x smarter.

### Risk 3: "RAG is better"
**Mitigation:** Cost transparency ($0.01 vs. $100s/month) + simplicity (markdown vs. vector DB setup). RAG is overkill for this use case.

### Risk 4: Open-source = no revenue
**Mitigation:** Open-source *core*, paid *connectors* (Gong, Zoom, Slack) + sync-as-a-service for enterprise. Validate demand first, then build paid tier.

### Risk 5: Meeting tool APIs break
**Mitigation:** Built-in repair (`garden connect --repair`), community contributions for new connectors, "Other" option for LLM-generated connectors.

---

## 9. Post-Launch Roadmap

### Month 1-2: Community-Driven Features
- [ ] More connectors (Gong, Zoom, Loom, Slack)
- [ ] Custom entity types (Projects, Decisions, Goals)
- [ ] Export formats (Obsidian vault, Notion import)
- [ ] Agent wiring for more tools (Cody, Replit Ghostwriter)

### Month 3-4: Enterprise Features (Validation Phase)
- [ ] Team sync (shared wiki across team members)
- [ ] SSO / access control
- [ ] Audit logs
- [ ] Slack notifications for new entities

### Month 5-6: Paid Pivot (If Validated)
- [ ] Launch sync-as-a-service (hosted connectors, no local CLI needed)
- [ ] Pricing: $29/mo for team sync + enterprise connectors
- [ ] Self-hosted option remains free (MIT license)

---

## 10. STRONGEST POSITIONING ANGLE

**Agent-Native Memory** is the winner. Here's why:

1. **Clear pain:** Developers using Claude Code / Cursor feel this daily — agents ask the same questions every session.
2. **Unique solution:** No competitor auto-wires agents to read a company wiki. This is genuinely novel.
3. **Instant proof:** Demo of before/after agent responses is visceral. "Who's Sarah?" → blank vs. "Sarah Chen, product engineer, context from 3 meetings."
4. **Developer-first:** Speaks directly to the launch audience (HN, PH, Twitter AI devs).
5. **Scalable messaging:** Works for developers (agent memory), GTM teams (customer intel), consultants (client context).

**Tagline:** *"AI agents with company memory."*

**Hook:** *"Your AI agents are smart but amnesiac. Garden MD gives them memory — using the format they already understand: markdown."*

**CTA:** *"`npm install -g garden-md` and make your agents 10x smarter in 2 minutes."*

---

## Next Steps for Leo

1. **Review & approve** this GTM plan (edit as needed)
2. **Assign asset creation** (logo, screenshots, GIF demo)
3. **Set launch date** (recommend Tues/Wed, 2 weeks from now)
4. **Delegate:**
   - Design → Nano Banana for logo
   - Screenshots → Terminal recordings + wiki HTML
   - Copy → Finalize Show HN + PH drafts
   - Seeding → DM devs on Twitter, post in Discord
5. **Execute launch** (I'll monitor and reply to comments real-time)

---

**Questions for Leo:**
- Do you want to add a landing page (garden-md.dev) or keep it GitHub-first?
- Should we create a demo video (30-60s Loom walkthrough)?
- Who should handle Product Hunt submission? (needs maker account with history)
- Any partnerships/integrations to prioritize? (e.g., Claude Code team shoutout, Cursor feature request)

---

**Fox 🦊 — GTM Lead, Garden MD**
