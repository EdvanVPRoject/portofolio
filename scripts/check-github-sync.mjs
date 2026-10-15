import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORTFOLIO_ROOT = path.resolve(__dirname, '..');
const PAGE_PATH = path.join(PORTFOLIO_ROOT, 'src', 'app', 'page.tsx');

const GITHUB_USERNAME = 'EdvanVPRoject';
const IGNORED_REPOS = new Set(['portofolio', '.github']);

async function checkSync() {
  console.log(`🔍 Memeriksa repositori GitHub untuk @${GITHUB_USERNAME}...`);

  // 1. Baca page.tsx untuk mengetahui proyek yang sudah terdaftar
  const pageContent = fs.readFileSync(PAGE_PATH, 'utf-8');
  
  // Ekstrak URL github yang sudah ada di page.tsx
  const registeredUrls = new Set();
  const urlMatches = pageContent.matchAll(/https:\/\/github\.com\/EdvanVPRoject\/([a-zA-Z0-9._-]+)/gi);
  for (const match of urlMatches) {
    registeredUrls.add(match[1].toLowerCase());
  }

  console.log(`📋 Proyek GitHub yang sudah terdaftar di portofolio (${registeredUrls.size}):`);
  for (const name of registeredUrls) {
    console.log(`   - ${name}`);
  }

  // 2. Fetch repositori dari GitHub API
  const apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`;
  const response = await fetch(apiUrl, {
    headers: {
      'User-Agent': 'Antigravity-Portfolio-Sync',
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    console.error(`❌ Gagal mengambil data GitHub API: ${response.status} ${response.statusText}`);
    process.exit(1);
  }

  const repos = await response.json();
  const unmappedRepos = [];

  for (const repo of repos) {
    const repoNameLower = repo.name.toLowerCase();
    
    // Lewati jika fork, repositori portofolio itu sendiri, atau sudah terdaftar
    if (repo.fork) continue;
    if (IGNORED_REPOS.has(repoNameLower)) continue;
    if (registeredUrls.has(repoNameLower)) continue;

    unmappedRepos.push({
      name: repo.name,
      description: repo.description || 'Tidak ada deskripsi',
      url: repo.html_url,
      language: repo.language || 'N/A',
      stars: repo.stargazers_count,
      updated_at: repo.updated_at,
    });
  }

  console.log('\n--------------------------------------------------');
  if (unmappedRepos.length === 0) {
    console.log('✅ Semua repositori publik terbaru sudah tersinkronisasi di portofolio!');
  } else {
    console.log(`✨ Ditemukan ${unmappedRepos.length} repositori baru yang belum terdaftar:`);
    for (const r of unmappedRepos) {
      console.log(`\n📌 [${r.name}] (${r.language})`);
      console.log(`   URL: ${r.url}`);
      console.log(`   Deskripsi: ${r.description}`);
      console.log(`   Pembaruan Terakhir: ${r.updated_at}`);
    }
  }
  console.log('--------------------------------------------------\n');
}

checkSync().catch((err) => {
  console.error('Error saat menjalankan check-sync:', err);
  process.exit(1);
});
