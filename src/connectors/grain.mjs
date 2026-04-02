// garden-md connector: Grain (https://grain.com)
// Syncs meeting transcripts from Grain's public API v2.
// API docs: https://developers.grain.com

import fs from 'fs';
import path from 'path';
import https from 'https';

const API_BASE = 'https://api.grain.com/_/public-api/v2';
const API_VERSION = '2025-10-31';

function request(endpoint, apiKey) {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}${endpoint}`;
    const req = https.request(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Public-Api-Version': API_VERSION,
        'Accept': 'application/json',
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`Grain API ${res.statusCode}: ${data.slice(0, 200)}`));
          return;
        }
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error(`Invalid JSON from Grain: ${data.slice(0, 200)}`)); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

export default async function sync({ apiKey, wildlandPath }) {
  fs.mkdirSync(wildlandPath, { recursive: true });

  // Load last sync timestamp
  const syncFile = path.join(wildlandPath, '.grain-last-sync');
  let lastSync = null;
  if (fs.existsSync(syncFile)) {
    lastSync = fs.readFileSync(syncFile, 'utf-8').trim();
  }

  // Fetch recordings list
  let endpoint = '/recordings?limit=50';
  if (lastSync) {
    endpoint += `&created_after=${lastSync}`;
  }

  const recordings = await request(endpoint, apiKey);
  const items = recordings.recordings || recordings.data || recordings;

  if (!Array.isArray(items) || items.length === 0) {
    console.log('  No new recordings from Grain.');
    return;
  }

  let synced = 0;
  for (const rec of items) {
    const id = rec.id;
    const title = rec.title || `Recording ${id}`;
    const date = rec.created_at || rec.start_time || new Date().toISOString();

    // Fetch transcript
    let transcript = '';
    try {
      const detail = await request(`/recordings/${id}/transcript`, apiKey);
      if (detail.transcript) {
        transcript = Array.isArray(detail.transcript)
          ? detail.transcript.map(t => `**${t.speaker || 'Speaker'}:** ${t.text}`).join('\n\n')
          : String(detail.transcript);
      } else if (detail.text) {
        transcript = detail.text;
      } else {
        transcript = JSON.stringify(detail, null, 2);
      }
    } catch {
      // Fall back to summary/notes if transcript unavailable
      transcript = rec.summary || rec.notes || `(No transcript available for ${title})`;
    }

    // Sanitize filename
    const safeName = title
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80);

    const filename = `${safeName}.md`;
    const filepath = path.join(wildlandPath, filename);

    // Skip if already exists
    if (fs.existsSync(filepath)) continue;

    const content = `---
source: grain
date: ${date}
title: "${title.replace(/"/g, '\\"')}"
type: transcript
grain_id: ${id}
---

# ${title}

${transcript}
`;

    fs.writeFileSync(filepath, content, 'utf-8');
    synced++;
  }

  // Update last sync timestamp
  fs.writeFileSync(syncFile, new Date().toISOString(), 'utf-8');

  if (synced > 0) {
    console.log(`  ${synced} new recordings synced from Grain.`);
  }
}
