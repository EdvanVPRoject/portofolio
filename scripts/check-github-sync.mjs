import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORTFOLIO_ROOT = path.resolve(__dirname, '..');
const PAGE_PATH = path.join(PORTFOLIO_ROOT, 'src', 'app', 'page.tsx');

const GITHUB_USERNAME = 'EdvanVPRoject';
const IGNORED_REPOS = new Set(['portofolio', '.github']);

const ENINFORMASI_DATA_FILES = [
  'tutorials-1.ts',
  'tutorials-2.ts',
  'tutorials-3.ts',
  'gaming-1.ts',
  'articles-1.ts',
  'articles-2.ts',
  'articles-3.ts',
  'gaming-2.ts',
  'upcoming-trends.ts',
  'future-tech.ts',
  'daily-news.ts'
];

async function syncEnInformasiStats(shouldApply = false) {
  console.log('\n📊 [1/2] Memeriksa pembaruan katalog harian EnInformasi Hub...');
  let total = 0;
  let tutorials = 0;
  let artikels = 0;
  let latestArticle = null;

  for (const file of ENINFORMASI_DATA_FILES) {
    try {
      const url = `https://raw.githubusercontent.com/EdvanVPRoject/eninformasi-hub/main/lib/data/${file}`;
      const res = await fetch(url, { headers: { 'User-Agent': 'Portfolio-Sync' } });
      if (!res.ok) continue;
      const text = await res.text();
      const slugMatches = text.match(/"slug"\s*:/g) || [];
      const count = slugMatches.length;
      total += count;

      if (file.startsWith('tutorials-') || file.startsWith('gaming-1')) {
        tutorials += count;
      } else {
        artikels += count;
      }

      if (file === 'daily-news.ts') {
        const titleMatch = text.match(/"title"\s*:\s*"([^"]+)"/);
        const dateMatch = text.match(/"pubDate"\s*:\s*"([^"]+)"/);
        if (titleMatch && dateMatch) {
          latestArticle = {
            title: titleMatch[1],
            date: dateMatch[1],
          };
        }
      }
    } catch (e) {
      console.warn(`Gagal memuat ${file}:`, e.message);
    }
  }

  console.log(`   Data Live di GitHub:`);
  console.log(`   - Total Katalog  : ${total} konten`);
  console.log(`   - Tutorial       : ${tutorials} panduan`);
  console.log(`   - Artikel/Tren/AI: ${artikels} analisis`);
  if (latestArticle) {
    console.log(`   - Update Terakhir: "${latestArticle.title.substring(0, 60)}..."`);
  }

  let pageContent = fs.readFileSync(PAGE_PATH, 'utf-8');
  let hasChanges = false;

  // Regex pola highlight katalog EnInformasi:
  // e.g. "195 Katalog Terstruktur (Tutorial Praktis, Gaming & Deep-Dive Trends)" atau "(65 Hands-on Guide & 130 Deep-Dive Trends)"
  const highlightRegex = /(\d+)\s+(Katalog|Materi) Terstruktur\s*\(([^)]+)\)/;
  const currentHighlightMatch = pageContent.match(highlightRegex);

  if (currentHighlightMatch) {
    const currentTotal = parseInt(currentHighlightMatch[1], 10);
    const term = currentHighlightMatch[2];
    const subtext = currentHighlightMatch[3];

    if (currentTotal !== total) {
      console.log(`\n🔄 Terdeteksi perubahan jumlah konten EnInformasi:`);
      console.log(`   Lama : ${currentTotal} total`);
      console.log(`   Baru : ${total} total (${tutorials} tut, ${artikels} art)`);

      // 1. Ganti highlight di array
      const newHighlightStr = subtext.includes('Hands-on Guide')
        ? `${total} ${term} Terstruktur (${tutorials} Hands-on Guide & ${artikels} Deep-Dive Trends)`
        : `${total} ${term} Terstruktur (${subtext})`;
      pageContent = pageContent.replace(highlightRegex, newHighlightStr);

      // 2. Ganti judul di card
      pageContent = pageContent.replace(
        /title:\s*'EnInformasi Hub — Portal \d+ Tutorial, Gaming & Tren Teknologi(?: Terkini)?'/,
        `title: 'EnInformasi Hub — Portal ${total} Tutorial, Gaming & Tren Teknologi'`
      );

      // 3. Ganti di deskripsi
      pageContent = pageContent.replace(
        /(Portal (?:web|media) teknologi [^']+?(?:memuat|menyajikan)\s+)\d+(\s+(?:artikel|modul) tutorial)/,
        `$1${total}$2`
      );
      pageContent = pageContent.replace(
        /menyajikan \d+ modul tutorial, gaming, dan tren teknologi terkini/,
        `menyajikan ${total} modul tutorial, gaming, dan tren teknologi terkini`
      );
      pageContent = pageContent.replace(
        /menyajikan \d+ katalog terkurasi, terbagi atas \d+ tutorial praktis hands-on dan \d+ analisis mendalam/,
        `menyajikan ${total} katalog terkurasi, terbagi atas ${tutorials} tutorial praktis hands-on dan ${artikels} analisis mendalam`
      );

      // 4. Ganti di modalDetails bullets
      pageContent = pageContent.replace(
        /\d+ Artikel Terkurasi:/,
        `${total} Artikel Terkurasi:`
      );
      pageContent = pageContent.replace(
        /Memuat \d+ artikel komprehensif/,
        `Memuat ${total} artikel komprehensif`
      );

      hasChanges = true;
    } else {
      console.log(`   ✅ Statistik EnInformasi di portofolio sudah up-to-date (${total} katalog).`);
    }
  } else {
    console.warn(`   ⚠️ Pola highlight katalog EnInformasi tidak cocok dengan page.tsx.`);
  }

  if (hasChanges) {
    fs.writeFileSync(PAGE_PATH, pageContent, 'utf-8');
    console.log(`📝 Berhasil memperbarui file src/app/page.tsx dengan statistik katalog terbaru!`);

    if (shouldApply) {
      console.log('⚡ Menjalankan kompilasi verifikasi (npm run build)...');
      execSync('npm.cmd run build', { cwd: PORTFOLIO_ROOT, stdio: 'inherit' });

      console.log('🚀 Melakukan commit dan push ke GitHub...');
      execSync('git add src/app/page.tsx scripts/check-github-sync.mjs', { cwd: PORTFOLIO_ROOT, stdio: 'inherit' });
      execSync(`git commit -m "docs(eninformasi): auto-sync daily catalog stats (${total} articles)"`, {
        cwd: PORTFOLIO_ROOT,
        stdio: 'inherit',
      });
      execSync('git push origin main', { cwd: PORTFOLIO_ROOT, stdio: 'inherit' });
      console.log('✅ Pembaruan EnInformasi telah berhasil di-push ke main!');
    } else {
      console.log('ℹ️ Perubahan telah ditulis ke file lokal. Gunakan flag --apply untuk auto-build & push.');
    }
  }

  return hasChanges;
}

async function checkNewRepos() {
  console.log(`\n🔍 [2/2] Memeriksa repositori GitHub baru untuk @${GITHUB_USERNAME}...`);
  const pageContent = fs.readFileSync(PAGE_PATH, 'utf-8');
  
  const registeredUrls = new Set();
  const urlMatches = pageContent.matchAll(/https:\/\/github\.com\/EdvanVPRoject\/([a-zA-Z0-9._-]+)/gi);
  for (const match of urlMatches) {
    registeredUrls.add(match[1].toLowerCase());
  }

  const apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`;
  const response = await fetch(apiUrl, {
    headers: {
      'User-Agent': 'Portfolio-Sync',
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    console.error(`❌ Gagal mengambil data GitHub API: ${response.status} ${response.statusText}`);
    return;
  }

  const repos = await response.json();
  const unmappedRepos = [];

  for (const repo of repos) {
    const repoNameLower = repo.name.toLowerCase();
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

  if (unmappedRepos.length === 0) {
    console.log('   ✅ Tidak ada repositori baru yang belum terdaftar.');
  } else {
    console.log(`   ✨ Ditemukan ${unmappedRepos.length} repositori baru yang belum terdaftar di portofolio:`);
    for (const r of unmappedRepos) {
      console.log(`      📌 [${r.name}] (${r.language}) - ${r.url}`);
    }
  }
}

async function main() {
  const shouldApply = process.argv.includes('--apply');
  await syncEnInformasiStats(shouldApply);
  await checkNewRepos();
}

main().catch((err) => {
  console.error('Error saat menjalankan sync:', err);
  process.exit(1);
});
