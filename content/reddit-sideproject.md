# Reddit Post — r/SideProject

**Subreddit culture:** Indie hackers, builders, supportive. Like hearing the story behind the build. Screenshots help.

---

**Title:** I open-sourced a CLI that turns meeting notes into a company wiki — here's what I learned building it

**Body:**

Hey r/SideProject! Wanted to share something I've been working on for the past month.

**The problem:** I run a small AI consultancy and we have 20+ meetings a week. Customer calls, standups, investor pitches — all recorded on Grain. Nobody rewatches them. All that context just... disappears.

Meanwhile, I'm using Claude Code and Cursor daily, and they keep asking me the same questions: "Who's the client?" "What was decided?" They have no company memory.

**The solution:** I built **garden-md**, a CLI that:
- Connects to your meeting transcript service (Grain, Granola, Fireflies)
- Syncs transcripts to a local folder
- Uses AI to extract people, companies, and products mentioned
- Generates a linked markdown wiki with entity pages and cross-references
- Serves a browsable HTML dashboard

The whole flow is 5 commands and takes about 2 minutes to set up.

**What makes it interesting:**
- It auto-wires AI coding agents (Claude Code, Cursor, Codex, Windsurf) to read the wiki. So your agents just... know your company now.
- Costs about $0.01 per run (7 transcripts for a penny using Claude Haiku)
- 100% local. No cloud, no accounts, just markdown files on your machine.
- MIT licensed, fully open source

**Some numbers from our own usage:**
- 419 transcripts processed
- 847 entities extracted
- 312 people pages, 89 company pages, 67 product pages
- Total cost: ~$6

**What I learned building it:**
1. Entity extraction is harder than it sounds. First version tagged "Express" and "Postgres" as products. Had to tighten the prompts significantly.
2. Markdown is the universal AI context format. Every agent reads it natively. No plugins needed.
3. The "auto-wire agents" feature during `garden init` is what people actually get excited about. The wiki itself is nice, but making agents smarter is the hook.

Would love feedback. What would make this useful for you?

GitHub: https://github.com/garden-md/garden-md

`npm install -g garden-md`
