# Reddit Post — r/ChatGPT (or r/ClaudeAI)

**Subreddit culture:** Broader audience, less technical. Like practical tips and "I didn't know you could do this" moments. Screenshots and demos land well.

---

**Title:** I gave Claude permanent memory of my entire company — here's how

**Body:**

Everyone complains about Claude/ChatGPT having no long-term memory. Every conversation starts from zero. 

I found a fix that's been a game changer, at least for people who use AI coding agents (Claude Code, Cursor, etc.)

**The trick:** AI agents read markdown files natively. If you put a file called `People/sarah-chen.md` in the right folder, Claude Code just... knows who Sarah is. No custom instructions, no copy-pasting, no plugins.

The problem is creating those files manually. Nobody's going to write a wiki page for every person and company they interact with.

**So I built a tool that does it automatically from your meeting recordings.**

It connects to Grain, Granola, or Fireflies, pulls your transcripts, and uses AI to extract every person, company, and product mentioned. Then it generates organized markdown pages with context and cross-links.

The result: Claude Code knows your entire company. Who's who, what was decided, which clients use which products. Without you maintaining anything.

**Setup takes 2 minutes:**
```
npm install -g garden-md
garden init
garden connect
garden sync
garden tend
```

It even auto-configures Claude Code, Cursor, and other agents to read the wiki during setup.

Cost: ~$0.01 per batch of transcripts. Everything runs locally, nothing goes to the cloud (beyond the AI API call itself).

Open source: https://github.com/garden-md/garden-md

The before/after difference in agent responses is night and day. Happy to answer questions.
