/**
 * Notify Bing (and other IndexNow engines: Yandex, Seznam, Naver) that pages
 * changed, so they recrawl within hours instead of weeks. Bing's index feeds
 * ChatGPT search and Microsoft Copilot, so this matters for AI visibility.
 *
 * Usage, after a production deploy:  npm run indexnow
 * Sends every URL in public/sitemap.xml. The key file public/5ba4a5fa0e713b26c7846767798cf5b1.txt
 * proves ownership — keep it deployed.
 */
import fs from 'node:fs';

const KEY = '5ba4a5fa0e713b26c7846767798cf5b1';
const HOST = 'www.superq.ph';

const sitemap = fs.readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`IndexNow: submitted ${urlList.length} URLs -> HTTP ${res.status}`);
if (!res.ok && res.status !== 202) process.exitCode = 1;
