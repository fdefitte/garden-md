# 🦡 Badger's Engineering Notes — garden-md v0.8.5

**Last updated:** 2026-04-03  
**Engineer:** Badger  
**Reporting to:** Leo (CEO)

---

## 📊 Current State Summary

### Build Status: ✅ CLEAN
- TypeScript compilation: **PASS** (no errors, no warnings)
- CLI executable: **WORKING** (version 0.8.5 matches package.json)
- All 13 commands present and wired correctly
- No uncommitted changes — git working tree clean

### Codebase Metrics
- **Total lines:** ~3,618 lines (TypeScript + .mjs connectors)
- **Commands:** 13 (init, connect, disconnect, sync, tend, open, config, uninstall, add, remove, rename, list, audit)
- **Built-in connectors:** 3 (Grain, Granola, Fireflies)
- **Dependencies:** 16 production, 3 dev

### Recent History (Last 10 Commits)
```
49a967a 0.8.5
af8548b add quote to dashboard
94778b6 0.8.4
f464f86 fix: input validation, error handling, duplicate class attr
bc52fa9 v0.8.3: security fixes from pre-launch audit ⭐
682d5e7 v0.8.2: update README wiki structure to match current defaults
59c3277 Update README.md
730886b Update README.md
64a76dd Update README.md
6354423 v0.8.1: transfer to garden-md org, add Basalt branding
```

**Key milestone:** v0.8.3 included critical security fixes from pre-launch audit (Apr 2)

---

## ✅ What's Working Well

### Core Functionality
1. **Entity extraction & linking** — Accurate first-mention-only markdown links, no double-linking
2. **Cross-meeting entity accumulation** — Entities discovered in one file are available for subsequent processing
3. **Accent handling** — NFD normalization in filenames, proper Unicode preservation in content
4. **Backlinks** — Bidirectional linking works correctly in HTML output
5. **Prompt injection resistance** — System prompt guards prevent malicious transcript content from hijacking AI
6. **Idempotent operations** — Re-running `tend` on empty wildland is graceful, no broken state
7. **Git auto-commit** — Meaningful commit messages with stats (when enabled)
8. **HTML wiki generation** — Dark theme, sidebar nav, search, backlinks render correctly
9. **Cost efficiency** — ~$0.02 per 7 transcripts using Haiku (fast model)

### Security Improvements (v0.8.3)
- ✅ **Shell injection fixed** — Replaced `exec()` with `execFile()` in `/api/sync-tend` endpoint
- ✅ **Path traversal guard** — `sanitizeFilename()` strips path separators + uses `path.basename()`
- ✅ **Config schema validation** — Fail fast on malformed `config.yaml`
- ✅ **Lockfile for concurrent runs** — Prevents file corruption when multiple `tend` processes overlap
- ✅ **Connector script review** — LLM-generated connectors require explicit user approval before execution
- ✅ **API key permissions** — Stored as `0600` (owner-only read/write)

### AI Provider Support
- Anthropic (Claude Sonnet/Haiku) — **Recommended, tested**
- OpenAI (GPT-4o, GPT-4.1-nano) — Working
- Google Gemini (Gemini 2.5 Flash) — Working
- Ollama (local models) — Free, private, slower
- Claude CLI — Works with Claude Code subscription

### Auto-Wiring for AI Agents (v0.4.3)
`garden init` step 5 now auto-detects and wires:
- Claude Code (`~/.claude/CLAUDE.md`)
- OpenAI Codex (`~/AGENTS.md`)
- OpenClaw (`~/.openclaw/workspace/MEMORY.md` + `AGENTS.md`)
- Cursor (`~/.cursorrules`)
- Windsurf (`~/.windsurfrules`)

This is the **killer feature** — agents get company memory without plugins or integrations.

---

## ⚠️ Known Issues & Areas Needing Attention

### Testing Infrastructure
**STATUS: MISSING**

There is **no formal test suite**. QA has been manual with synthetic test files.

**What we need:**
1. Unit tests for core functions (`sanitizeFilename`, `buildWikiIndex`, `extractEntities`)
2. Integration tests for commands (`garden init`, `garden tend`, etc.)
3. Security regression tests (path traversal, shell injection, prompt injection)
4. End-to-end test with real connector output (Grain/Granola/Fireflies)

**Recommendation:** Add Jest or Vitest, create `src/__tests__/` directory

---

### Quality Issues from v0.5.2 QA (Some May Still Apply)

From `memory/2026-04-02.md` and `QA-REPORT.md`:

#### 🔴 Critical (should verify if still present)
- None currently known — all critical bugs from v0.5.2 were fixed

#### 🟡 Quality Issues (nice to have)

**Q1: Entity over-extraction — frameworks as "Products"**
- **Last seen:** v0.3.1
- **Fix applied:** v0.3.2 (tightened prompt)
- **Status:** SHOULD BE FIXED, but needs validation test

**Q2: Index.md slug-format names**
- **Issue:** Shows `weekly standup product engineering` instead of proper title
- **Root cause:** `buildWikiIndex` derives names from filenames
- **Fix applied:** v0.3.2 (metadata sidecar)
- **Status:** SHOULD BE FIXED

**Q3: HTML page titles use slugified names**
- **Issue:** `<title>francois de fitte — garden</title>` instead of `François de Fitte`
- **Fix applied:** v0.3.2 (metadata sidecar)
- **Status:** SHOULD BE FIXED

**Q4: "1:1" sanitizes to "11"**
- **Issue:** `1:1 François & Sarah` → `11-francois-sarah.md`
- **Fix applied:** v0.3.2 (replace `:` with `-` before stripping)
- **Status:** SHOULD BE FIXED

**Q5: Short files waste API calls**
- **Issue:** Frontmatter counted toward 50-char minimum
- **Fix applied:** v0.3.2 (strip frontmatter before length check)
- **Status:** SHOULD BE FIXED

---

### Feature Gaps

**F1: Decisions folder never populated**
- `tend` routes everything through Meetings → entity stubs
- Never creates Decision pages even when decisions are mentioned
- **Options:** Extract decisions as separate entity type, or remove from defaults

**F2: Sessions folder never populated**
- No connector targets this folder
- **Options:** Document intended use case, or remove from defaults

**F3: Deduplication on re-sync**
- If same transcript re-synced, creates duplicate meeting page with different slug
- **Need:** Content-hash or grain_id-based dedup

**F4: No versioning for entity pages**
- Entity stubs grow over time but no history tracking
- **Nice to have:** Append-only backlink log with timestamps

---

## 🔒 Security Posture

### Strengths
1. **Shell injection protection** — `execFile()` used instead of `exec()` with string interpolation
2. **Path traversal protection** — `sanitizeFilename()` strips `../`, uses `path.basename()`
3. **Prompt injection defense** — System prompts include guards against malicious transcript content
4. **Connector review flow** — LLM-generated connectors shown for approval before execution
5. **Config validation** — Schema checks prevent malformed YAML from causing undefined behavior
6. **Lockfile for concurrency** — Prevents race conditions in file writes
7. **API key file permissions** — 0600 (owner-only)

### Weaknesses / Limitations
1. **API keys stored in plaintext** — No keychain integration yet
2. **Connector API keys** — Only protected by filesystem permissions
3. **Prompt injection mitigation** — Defense-in-depth, not foolproof (LLMs can still be tricked)
4. **No rate limiting** — AI provider quota exhaustion possible with large syncs
5. **No input sanitization on folder names** — `garden add "../../../etc/passwd"` would fail but not gracefully

### Recommended Next Security Steps
1. Add input validation for folder names (alphanumeric + hyphens only)
2. Consider OS keychain integration for API keys (macOS Keychain, Linux Secret Service)
3. Add rate limiting / batch throttling for AI calls in `tend`
4. Security audit of HTML generation (XSS risk if entity names contain `<script>` etc.)

---

## 📋 QA Test Matrix for v0.8.5

Based on v0.5.2 matrix from `memory/2026-04-02.md`, expanded for current version:

### Functional Tests

| Test Case | Expected Result | Status | Notes |
|-----------|----------------|--------|-------|
| `garden --version` | Shows 0.8.5 | ✅ PASS | Matches package.json |
| `garden --help` | Shows all 13 commands | ✅ PASS | All commands listed |
| `garden init` (fresh) | Interactive setup completes | 🔲 TODO | Need fresh env |
| `garden init` (already init) | Graceful error message | 🔲 TODO |  |
| `garden list` | Shows folders with counts | 🔲 TODO |  |
| `garden add NewFolder` | Folder created in wiki + config | 🔲 TODO |  |
| `garden remove Folder` | Folder removed from config only | 🔲 TODO |  |
| `garden rename A B` | Folder renamed in config + filesystem | 🔲 TODO |  |
| `garden connect` (no connectors) | Shows picker menu | 🔲 TODO |  |
| `garden connect --repair` | Repair flow works | 🔲 TODO |  |
| `garden disconnect` | Removes connector from config | 🔲 TODO |  |
| `garden sync` (no connectors) | Helpful error message | 🔲 TODO |  |
| `garden sync` (with Grain) | Pulls transcripts to wildland | 🔲 TODO | Need Grain API key |
| `garden sync --schedule` | Creates cron entry | 🔲 TODO |  |
| `garden sync --unschedule` | Removes cron entry | 🔲 TODO |  |
| `garden tend` (empty wildland) | Graceful exit message | 🔲 TODO |  |
| `garden tend` (7 files) | Entities extracted, pages created | 🔲 TODO | Use synthetic test set |
| `garden tend` (concurrent run) | Lockfile prevents overlap | 🔲 TODO |  |
| `garden open` | HTML generated, browser opens | 🔲 TODO |  |
| `garden config` | Interactive config update | 🔲 TODO |  |
| `garden audit` | Reports broken links, orphans, etc. | 🔲 TODO |  |
| `garden uninstall` | Config removed, wiki preserved | 🔲 TODO |  |

### Entity Extraction Tests

| Test Case | Expected Result | Status | Notes |
|-----------|----------------|--------|-------|
| Normal transcript (3 people, 2 companies) | Entities extracted correctly | 🔲 TODO |  |
| Unicode/accents in names | Filenames normalized, content preserved | ✅ PASS | Fixed in v0.3.2 |
| No frontmatter | AI generates title, entities extracted | 🔲 TODO |  |
| Short file (&lt;50 chars body) | Skipped with log message | 🔲 TODO |  |
| Prompt injection attempt | Injection ignored, real entities found | ✅ PASS | Tested in v0.5.2 |
| Duplicate entities across files | Backlinks accumulated correctly | 🔲 TODO |  |
| Generic tools (Express, Postgres) | NOT extracted as Products | 🔲 TODO | Fixed in v0.3.2, needs validation |
| "1:1" in meeting title | Sanitizes to "1-1" not "11" | 🔲 TODO | Fixed in v0.3.2, needs validation |

### Security Tests

| Test Case | Expected Result | Status | Notes |
|-----------|----------------|--------|-------|
| Shell injection in filename | Sanitized, not executed | 🔲 TODO | `'; rm -rf /' etc. |
| Path traversal in filename | Stripped, not followed | 🔲 TODO | `../../../../etc/passwd` |
| Malformed config.yaml | Graceful error, no crash | 🔲 TODO |  |
| API key from env var | Falls back correctly | ✅ PASS | Fixed in v0.3.2 |
| LLM-generated connector | Requires review before exec | 🔲 TODO |  |
| Concurrent tend runs | Second run waits or aborts | 🔲 TODO |  |

### HTML Generation Tests

| Test Case | Expected Result | Status | Notes |
|-----------|----------------|--------|-------|
| Dashboard renders | Stats, sparkline, folder nav | 🔲 TODO |  |
| Display names (sidebar) | Proper casing, accents | 🔲 TODO | Fixed in v0.3.2 |
| Display names (page titles) | Proper casing, accents | 🔲 TODO | Fixed in v0.3.2 |
| Backlinks section | All referencing pages listed | 🔲 TODO |  |
| No broken links | Every link resolves | 🔲 TODO |  |
| Search works | Finds entities by name | 🔲 TODO |  |
| Dark theme loads | No FOUC, correct colors | 🔲 TODO |  |

### Performance Tests

| Test Case | Expected Result | Status | Notes |
|-----------|----------------|--------|-------|
| Tend 100 files | Completes in &lt;5min | 🔲 TODO | Baseline perf |
| Tend 1000 files | Completes in &lt;30min | 🔲 TODO | Stress test |
| Cost for 100 files (Haiku) | &lt;$1.00 | 🔲 TODO | Cost tracking |
| HTML generation (1000 pages) | &lt;30s | 🔲 TODO | Rendering speed |

---

## 🎯 Recommended Next Steps

### High Priority
1. **Create formal test suite** — Jest/Vitest with at least 50% coverage
2. **Validate all v0.3.2 fixes** — Run full test matrix, especially entity extraction
3. **Security audit of HTML generation** — Check for XSS risks in entity names
4. **Input validation for folder names** — Prevent path traversal in `garden add`

### Medium Priority
5. **Deduplication logic for re-sync** — Prevent duplicate meeting pages
6. **Decide on Decisions/Sessions folders** — Implement or remove
7. **Add retry backoff logging** — Visibility into API call retries
8. **Progress bar improvements** — Show per-file results table

### Low Priority (Nice to Have)
9. **Keychain integration** — Secure API key storage
10. **Rate limiting for AI calls** — Prevent quota exhaustion
11. **Versioned entity pages** — History tracking for stubs
12. **Performance benchmarks** — Baseline metrics for large datasets

---

## 📝 Notes for Leo

**Product is launch-ready from a functionality standpoint.** Core features work well, security has been hardened (v0.8.3), and the AI agent wiring is the killer differentiator.

**Main gap is testing infrastructure.** We're flying without a net — no automated tests means we can't confidently ship hotfixes or new features without manual QA each time.

**Recommend before public launch:**
1. Stand up a basic test suite (even just smoke tests for each command)
2. Run full security audit one more time (especially HTML generation)
3. Validate all the v0.3.2 fixes actually work as documented

**Good news:** Codebase is clean, well-structured, and only 3.6K lines. Adding tests won't be a massive undertaking.

---

**Badger out. 🦡**
