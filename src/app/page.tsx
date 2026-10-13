'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ArrowUpRight, 
  ArrowDown, 
  Menu, 
  X, 
  Star, 
  Check, 
  FileText,
  Layers,
  Sparkles
} from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

type ProjectCategory = 'all' | 'software' | 'iot-cv' | 'publication';

interface ProjectLink {
  label: string;
  url: string;
  primary?: boolean;
}

interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  year: string;
  badge: string;
  category: ProjectCategory[];
  image: string;
  imageType: 'icon' | 'image';
  description: string;
  highlights: string[];
  tech: string[];
  links: ProjectLink[];
  modalDetails: {
    kicker: string;
    title: string;
    summary: string;
    bullets?: string[];
    results: string;
    note?: string;
  };
}

const FEATURED_APPS: ProjectItem[] = [
  {
    id: 'enclip',
    title: 'ENCLip — Native AI Video Clipper & Subtitle Generator',
    tagline: 'Product Release · Desktop AI & Media Pipeline',
    year: '2026',
    badge: 'AI & PyQt6',
    category: ['software'],
    image: '/enclip-icon.png',
    imageType: 'icon',
    description:
      'Aplikasi desktop Windows yang mengotomatiskan pemotongan video berdurasi panjang menjadi klip vertikal siap unggah (Shorts, Reels, TikTok) lengkap dengan subtitle dinamis. Dirancang dengan arsitektur multithreading (QThread) agar antarmuka tetap responsif saat menjalankan pipeline berat: transkripsi offline via Faster-Whisper (CTranslate2), analisis sorotan konteks via LLM Lokal (Qwen-2.5 GGUF) maupun Gemini API, serta rendering FFmpeg.',
    highlights: [
      'Inferensi AI Hibrida (Offline GGUF & Cloud API)',
      'GUI Anti-Freeze dengan Asynchronous Worker Thread (QThread)',
      'Render Cepat Akselerasi GPU & Hardsub Dinamis',
    ],
    tech: ['Python', 'PyQt6', 'Faster-Whisper', 'Qwen 2.5 GGUF', 'Gemini API', 'FFmpeg'],
    links: [
      {
        label: 'Unduh Rilis .exe ↗',
        url: 'https://github.com/EdvanVPRoject/ENCLip/releases/latest',
        primary: true,
      },
      {
        label: 'Kode Sumber GitHub ↗',
        url: 'https://github.com/EdvanVPRoject/ENCLip',
        primary: false,
      },
    ],
    modalDetails: {
      kicker: 'Aplikasi Desktop Native · 2026',
      title: 'ENCLip — Native AI Video Clipper & Subtitle Generator',
      summary:
        'Aplikasi desktop Windows yang dirancang untuk mempermudah kreator konten dan video editor dalam memotong video berdurasi panjang menjadi klip highlight vertikal secara otomatis dengan transkripsi AI dan pembuatan subtitle dinamis tanpa biaya langganan cloud.',
      bullets: [
        'Dukungan Hybrid AI: Mendukung model lokal 100% offline (Faster-Whisper & Qwen 2.5 GGUF) untuk privasi data penuh, serta integrasi Cloud via Google Gemini 3.8 Flash.',
        'Deteksi Momen Cerdas: Algoritma AI mendeteksi hook video, reaksi streamer, punchline humor, dan materi penting secara otomatis.',
        'Format & Auto-Framing Fleksibel: Menghasilkan rasio 9:16 (Shorts/TikTok), 16:9, 1:1, dan 4:3 dengan fitur smart background blur.',
        'Styling Subtitle Dinamis (Hardsub): 7+ preset gaya subtitle (Karaoke, Neon, Highlight, Box) dengan posisi teks yang dapat diseret bebas pada preview video.',
        'Akselerasi GPU & Render Cepat: Memanfaatkan encoder perangkat keras (Nvidia NVENC, Intel QSV, AMD AMF) untuk pemrosesan video ultra-cepat tanpa pop-up terminal CMD.',
        'Distribusi Siap Pakai: Tersedia paket rilis portabel Windows (.exe) tanpa memerlukan instalasi dependensi Python terpisah.',
      ],
      results:
        'Mampu mentranskripsi dan merender klip video vertikal siap unggah dalam hitungan menit secara offline tanpa watermark dan tanpa biaya langganan.',
      note: 'Source code dan installer Windows (.exe) tersedia publik di GitHub Releases.',
    },
  },
  {
    id: 'encross',
    title: 'ENCross — High-Speed Local File & Screen Sharing',
    tagline: 'Cross-Platform App · P2P Network Architecture',
    year: '2026',
    badge: 'P2P WebRTC',
    category: ['software'],
    image: '/encross-logo.png',
    imageType: 'icon',
    description:
      'Aplikasi berbagi berkas berukuran besar dan screen mirroring lintas-platform (Windows & Android) yang beroperasi 100% di jaringan lokal (LAN/Wi-Fi) tanpa kuota internet dan tanpa server penyimpanan perantara. Memanfaatkan WebRTC DataChannel dan MediaStream API untuk transmisi real-time berkecepatan tinggi dengan latensi rendah serta penemuan perangkat otomatis.',
    highlights: [
      'Arsitektur Zero-Server P2P (Privasi & Kecepatan Maksimal)',
      'Satu Basis Kode Modern (React 19, Electron, & Capacitor)',
      'Screen Sharing Ultra-Low Latency via MediaStream',
    ],
    tech: ['React 19', 'WebRTC DataChannel', 'Electron', 'Capacitor', 'Tailwind CSS'],
    links: [
      {
        label: 'Kode Sumber GitHub ↗',
        url: 'https://github.com/EdvanVPRoject/ENCross',
        primary: true,
      },
    ],
    modalDetails: {
      kicker: 'Aplikasi Cross-Platform · 2026',
      title: 'ENCross — High-Speed Local File & Screen Sharing',
      summary:
        'Aplikasi transfer berkas dan screen sharing antar-perangkat lokal (Windows, Android, dan Browser) berkecepatan tinggi tanpa kuota internet dan tanpa server perantara pihak ketiga.',
      bullets: [
        'Direct P2P DataChannel: Berkas dialirkan langsung antar-memori perangkat via WebRTC dengan pembagian chunk 64KB dan mekanisme flow control buffer.',
        'Zero Cloud Storage: Data tidak pernah melewati server publik, menjamin privasi penuh dan throughput maksimal jaringan lokal.',
        'Pairing Cepat QR Code: Perangkat host menampilkan QR Code IP lokal, perangkat kedua memindai dan modal langsung tertutup otomatis begitu tersambung.',
        'Screen Share Real-Time: Berbagi layar monitor secara langsung dengan latensi ultra-rendah melalui WebRTC MediaStream.',
        'Sinkronisasi Teks & Clipboard: Mengirim catatan atau tautan seketika antar-perangkat dengan deteksi URL otomatis.',
        'Cross-Platform: Tersedia sebagai aplikasi desktop Windows (Electron), aplikasi Android native (Capacitor APK), dan Web (PWA).',
      ],
      results:
        'Mencapai kecepatan transfer mendekati batas fisik throughput Wi-Fi lokal tanpa konsumsi kuota internet.',
    },
  },
];

const RESEARCH_PROJECTS: ProjectItem[] = [
  {
    id: 'smart-parking',
    title: 'Sistem Parkir Pintar & Pengenalan Pelat Nomor Otomatis',
    tagline: 'Skripsi & Riset Terapan · Computer Vision & IoT',
    year: '2025—2026',
    badge: 'Computer Vision & IoT',
    category: ['iot-cv'],
    image: '/parking-process-blurred.png',
    imageType: 'image',
    description:
      'Sistem keamanan gerbang parkir otomatis dengan verifikasi ganda (Two-Factor Physical Authentication) yang menggabungkan pembacaan UID e-KTP dan pengenalan pelat nomor kendaraan secara real-time menggunakan YOLOv8 Nano, OCR CNN (TensorFlow), dan ESP32.',
    highlights: [
      'Autentikasi Ganda (RFID e-KTP + Deteksi Pelat YOLOv8)',
      'Integrasi Edge-IoT & Sinkronisasi SQLite + Firebase',
      'mAP@0.50 YOLOv8 98.51% & Akurasi OCR Karakter 88.07%',
    ],
    tech: ['YOLOv8 Nano', 'TensorFlow CNN', 'ESP32', 'SQLite', 'Firebase'],
    links: [
      {
        label: 'Repositori GitHub ↗',
        url: 'https://github.com/EdvanVPRoject/Sistem-parkir-pintar-berbasis-visi-komputer-berbasis-iot-menggunakan-metode-yolo',
        primary: true,
      },
    ],
    modalDetails: {
      kicker: 'Skripsi & Riset Terapan · 2025—2026',
      title: 'Parkir Pintar dan Pengenalan Pelat Nomor Berbasis Visi Komputer & IoT',
      summary:
        'Penelitian perancangan sistem parkir cerdas dengan validasi ganda. UID e-KTP memvalidasi identitas pengguna, sedangkan visi komputer memastikan kesesuaian pelat nomor kendaraan yang terdaftar.',
      bullets: [
        'RFID RC522 membaca UID e-KTP melalui mikrokontroler ESP32 di gerbang masuk.',
        'YOLOv8 Nano melokalisasi area pelat nomor kendaraan secara real-time dari tangkapan kamera.',
        'Model CNN berbasis TensorFlow mengidentifikasi karakter huruf dan angka pelat.',
        'Basis data SQLite mengelola transaksi lokal, sementara Firebase Realtime Database memfasilitasi pemantauan jarak jauh.',
      ],
      results:
        'Pembacaan RFID berhasil 100% (55 dari 55 pengujian). Model YOLOv8 Nano mencapai mAP@0.50 sebesar 98,51% dan mAP@0.50:0.95 sebesar 92,99%. Model pengenalan karakter CNN meraih akurasi validasi 88,07%.',
      note: 'Fokus penelitian menitikberatkan pada validasi akses, deteksi karakter pelat, dan monitoring data transaksi.',
    },
  },
  {
    id: 'liver-ml',
    title: 'Klasifikasi Risiko Penyakit Liver (Studi Komparasi ML)',
    tagline: 'Publikasi Jurnal Komputika · Data Science & MedTech',
    year: '2025—2026',
    badge: 'Publikasi Ilmiah Nasional',
    category: ['publication'],
    image: '/journal-liver.jpg',
    imageType: 'image',
    description:
      'Penelitian ilmiah terpublikasi yang mengevaluasi ketahanan algoritma Random Forest, SVM, dan Logistic Regression dalam memprediksi risiko penyakit liver dari rekam medis klinis, mencakup tahapan preprocessing dan penanganan ketimpangan kelas data.',
    highlights: [
      'Terbit di Jurnal Nasional Komputika (DOI Terindeks)',
      'Optimasi Pipeline Klasifikasi dengan Scikit-Learn',
      'Random Forest Unggul: F1-Score 0.696 & Kesesuaian Sampel 98%',
    ],
    tech: ['Random Forest', 'SVM', 'Logistic Regression', 'Scikit-Learn'],
    links: [
      {
        label: 'Publikasi Jurnal Komputika ↗',
        url: 'https://doi.org/10.34010/komputika.v15i1.19799',
        primary: true,
      },
    ],
    modalDetails: {
      kicker: 'Publikasi Ilmiah · Jurnal Komputika',
      title: 'Prediksi Penyakit Liver Menggunakan Model Perbandingan',
      summary:
        'Studi komparasi performa algoritma klasifikasi pada 579 data rekam medis pasien guna memprediksi kecenderungan penyakit liver sedini mungkin.',
      bullets: [
        'Pembersihan data medis, penanganan missing values, dan standarisasi variabel klinis.',
        'Pengujian berbagai skenario pembagian data latih dan data uji (70:30, 80:20, 90:10).',
        'Evaluasi model menggunakan metrik Accuracy, F1-Score, dan Matthews Correlation Coefficient (MCC).',
      ],
      results:
        'Random Forest mencatatkan performa terbaik pada rasio data 80% dengan F1-Score 0,696 dan MCC 0,203, serta mencapai kesesuaian prediksi 98% pada pengujian sampel data baru.',
    },
  },
  {
    id: 'smart-pos',
    title: 'Sistem Point of Sale (POS) Pintar Berbasis ESP32 & Load Cell',
    tagline: 'Publikasi Jurnal Biner · Embedded Systems & Web App',
    year: '2024—2025',
    badge: 'Publikasi Ilmiah Nasional',
    category: ['iot-cv', 'publication'],
    image: '/journal-pos.jpg',
    imageType: 'image',
    description:
      'Solusi perangkat keras timbangan digital yang terhubung langsung ke aplikasi kasir berbasis web untuk menghilangkan kesalahan input manual transaksi UMKM. Menggunakan ESP32 dan sensor Load Cell HX711 terkalibrasi secara matematis.',
    highlights: [
      'Terbit di Jurnal Ilmiah Biner',
      'Otomatisasi Hardware-ke-Web Real-Time untuk UMKM',
      'Akurasi Pengukuran Sensor Timbangan > 98%',
    ],
    tech: ['ESP32', 'Sensor Load Cell HX711', 'Web Application'],
    links: [
      {
        label: 'Publikasi Jurnal Biner ↗',
        url: 'https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/',
        primary: true,
      },
    ],
    modalDetails: {
      kicker: 'Proyek Akademik · Jurnal Biner',
      title: 'Implementasi Sistem Point of Sale pada UMKM Berbasis ESP32 dan Sensor Load Cell',
      summary:
        'Perancangan prototipe perangkat kasir pintar yang menghubungkan sensor timbangan digital langsung ke sistem pencatatan transaksi kasir.',
      bullets: [
        'Integrasi mikrokontroler ESP32 dengan modul ADC sensor Load Cell HX711.',
        'Pengiriman nilai bobot timbangan secara langsung ke sistem POS untuk eliminasi kesalahan input manual.',
        'Penyusunan antarmuka web kasir untuk transaksi dan manajemen inventaris produk curah.',
      ],
      results:
        'Prototipe timbangan menghasilkan akurasi pengukuran di atas 98%, mempercepat alur transaksi kasir, dan meniadakan selisih hitung manual.',
    },
  },
];

const SKILLS_DATA = [
  {
    title: 'Rekayasa AI, LLM & Media',
    accent: 'cyan',
    description:
      'Membangun pipeline AI generatif, transkripsi presisi tinggi, dan pemrosesan audio-video otomatis yang berjalan secara offline di perangkat lokal maupun via cloud API.',
    badges: [
      'Faster-Whisper',
      'Qwen-2.5 GGUF',
      'Gemini API',
      'FFmpeg CLI',
      'MoviePy',
      'CTranslate2',
    ],
  },
  {
    title: 'Computer Vision & Machine Learning',
    accent: 'emerald',
    description:
      'Merancang model deteksi objek real-time, pengenalan karakter optik (OCR), dan analisis prediktif terstruktur dari tahap kurasi dataset hingga deployment.',
    badges: [
      'YOLOv8',
      'CNN (TensorFlow/Keras)',
      'OpenCV',
      'Scikit-Learn',
      'Random Forest',
      'SVM',
      'Pandas & NumPy',
    ],
  },
  {
    title: 'Komunikasi Jaringan P2P & Real-Time',
    accent: 'cyan',
    description:
      'Mengembangkan arsitektur pertukaran berkas dan streaming layar berkecepatan tinggi secara langsung antar-perangkat (zero-server P2P) dengan latensi minimal.',
    badges: [
      'WebRTC DataChannel',
      'MediaStream API',
      'mDNS Discovery',
      'UDP Broadcast',
      'STUN/TURN',
      'P2P Security',
    ],
  },
  {
    title: 'Pengembangan Aplikasi Desktop & Web',
    accent: 'cyan',
    description:
      'Menciptakan aplikasi desktop native berkinerja tinggi dengan manajemen multithreading yang stabil serta antarmuka web dan lintas-platform yang responsif.',
    badges: [
      'PyQt6 (QThread)',
      'Python 3.11',
      'Electron.js',
      'React 19',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Sistem Tertanam (Embedded) & IoT',
    accent: 'emerald',
    description:
      'Mengintegrasikan mikrokontroler, kalibrasi sensor presisi secara matematis, dan protokol komunikasi perangkat keras dengan basis data cloud real-time.',
    badges: [
      'ESP32 (C/C++)',
      'RFID RC522 (e-KTP)',
      'Load Cell & HX711',
      'Firebase RTDB',
      'I2C / UART',
      'Sensor Calibration',
    ],
  },
  {
    title: 'Alur Kerja Rekayasa & Publikasi',
    accent: 'emerald',
    description:
      'Mengelola siklus rilis perangkat lunak melalui kontrol versi modern, distribusi installer siap pakai, serta penyusunan dokumentasi berstandar jurnal ilmiah.',
    badges: [
      'Git & GitHub',
      'VS Code',
      'Postman',
      'Vercel CI/CD',
      'SQLite',
      'Publikasi Ilmiah',
    ],
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Guestbook / Telegram Form State
  const [guestName, setGuestName] = useState('');
  const [guestRating, setGuestRating] = useState(5);
  const [guestMessage, setGuestMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const filteredApps = FEATURED_APPS.filter(
    (app) => activeFilter === 'all' || app.category.includes(activeFilter)
  );
  const filteredResearch = RESEARCH_PROJECTS.filter(
    (item) => activeFilter === 'all' || item.category.includes(activeFilter)
  );

  async function handleFeedbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!guestMessage.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: guestName.trim() || 'Anonim',
          rating: guestRating,
          comment: guestMessage.trim(),
        }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setGuestName('');
        setGuestRating(5);
        setGuestMessage('');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      id="top"
      className="min-h-screen bg-[#090D16] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200"
    >
      {/* Ambient Background Lighting */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 left-1/4 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 h-[24rem] w-[24rem] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#090D16]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-12 py-4">
          <a
            href="#top"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:opacity-90 transition"
          >
            <span>
              Edvan Nuriana<span className="text-cyan-400">.</span>
            </span>
            <span className="rounded-md border border-slate-800 bg-slate-900/90 px-2 py-0.5 text-xs font-mono font-medium text-slate-400">
              S.Kom
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-400 md:flex">
            <a href="#about" className="transition hover:text-cyan-400">
              Tentang
            </a>
            <a href="#projects" className="transition hover:text-cyan-400">
              Proyek & Riset
            </a>
            <a href="#skills" className="transition hover:text-cyan-400">
              Keahlian
            </a>
            <a href="#academic" className="transition hover:text-cyan-400">
              Akademik
            </a>
            <a href="#contact" className="transition hover:text-cyan-400">
              Kontak
            </a>
            <a
              href="#feedback"
              className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
            >
              Ulasan ↗
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 md:hidden transition"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-[#090D16]/95 px-6 py-4 space-y-3 text-sm font-medium backdrop-blur-lg">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-cyan-400 py-1"
            >
              Tentang
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-cyan-400 py-1"
            >
              Proyek & Riset
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-cyan-400 py-1"
            >
              Keahlian
            </a>
            <a
              href="#academic"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-cyan-400 py-1"
            >
              Akademik & Publikasi
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-cyan-400 py-1"
            >
              Kontak
            </a>
            <a
              href="#feedback"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-cyan-400 font-bold py-1"
            >
              Kirim Ulasan Telegram ↗
            </a>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        {/* HERO SECTION */}
        <section className="py-14 sm:py-20 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span>Terbuka untuk Peluang Kerja · Sumedang / Bandung, Indonesia</span>
                </div>
                <span className="rounded-full border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 font-mono text-xs text-cyan-400">
                  Software, Applied AI & Embedded Systems Engineer
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2] lg:leading-[1.15]">
                Merancang{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                  perangkat lunak cerdas, visi komputer,
                </span>{' '}
                dan sistem terdistribusi yang siap pakai.
              </h1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-400 text-justify font-light">
                Saya <strong className="font-semibold text-slate-200">Edvan Nuriana Putra Septia, S.Kom.</strong>, lulusan Sistem Komputer UNIKOM (IPK 3.53). Berfokus mengubah riset algoritma AI dan sistem tertanam (IoT) menjadi aplikasi <em className="not-italic text-slate-200 font-medium">desktop</em>, <em className="not-italic text-slate-200 font-medium">web</em>, dan lintas-platform yang cepat, mandiri, serta teruji secara empiris melalui rilis produk dan publikasi jurnal ilmiah nasional.
              </p>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="rounded-xl bg-cyan-500 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 inline-flex items-center gap-2"
                >
                  Eksplorasi Proyek <ArrowDown className="w-4 h-4" />
                </a>
                <a
                  href="/cv-edvan.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:bg-slate-800 inline-flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-cyan-400" /> Unduh CV <span>↗</span>
                </a>
                <a
                  href="mailto:septiaedvan@gmail.com"
                  className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-xs sm:text-sm font-medium text-slate-400 transition hover:border-slate-700 hover:text-slate-200"
                >
                  Kirim Email <span>↗</span>
                </a>
              </div>

              {/* Key Highlights Bar (Quick Stats) */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-8 sm:max-w-lg">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">3.53</p>
                  <p className="mt-0.5 text-xs text-slate-400 font-mono">IPK S1 Sistem Komputer</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-cyan-400">5+</p>
                  <p className="mt-0.5 text-xs text-slate-400 font-mono">Sistem & Aplikasi Teruji</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-400">2</p>
                  <p className="mt-0.5 text-xs text-slate-400 font-mono">Publikasi Jurnal Nasional</p>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/60 p-4 shadow-2xl backdrop-blur-sm">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-800">
                  <Image
                    src="/profile.jpeg"
                    alt="Edvan Nuriana Putra Septia, S.Kom."
                    fill
                    sizes="(max-width: 768px) 240px, 320px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="font-semibold text-white text-sm sm:text-base">
                    Edvan Nuriana Putra Septia, S.Kom.
                  </p>
                  <p className="mt-1 text-xs text-slate-400 font-mono">
                    S1 Sistem Komputer UNIKOM · IPK 3.53
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 01 / TENTANG SAYA */}
        <section id="about" className="scroll-mt-20 border-t border-slate-800/70 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span>01 / Tentang Saya</span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold leading-snug text-white">
                Menjembatani arsitektur perangkat lunak modern dengan komputasi AI dan perangkat keras cerdas.
              </h2>
              <div className="mt-6">
                <a
                  href="https://www.linkedin.com/in/edvannuriana"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-300"
                >
                  <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                  <span>Profil LinkedIn</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            <div className="space-y-5 text-slate-300 lg:col-span-8 text-base font-light leading-relaxed">
              <p className="text-justify">
                Sebagai lulusan S1 Sistem Komputer Universitas Komputer Indonesia (UNIKOM) dengan IPK 3.53, saya memiliki fokus kuat pada pengembangan teknologi <strong className="font-semibold text-white">end-to-end</strong>—mulai dari perancangan logika sistem di level perangkat keras hingga antarmuka aplikasi yang digunakan langsung oleh pengguna akhir. Saya terbiasa membangun solusi dari nol hingga tahap distribusi nyata, baik dalam bentuk aplikasi instalasi mandiri (<code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-cyan-300 font-mono">.exe</code> & lintas-platform) maupun riset yang tervalidasi di jurnal ilmiah nasional.
              </p>
              <p className="text-justify text-slate-400">
                Dalam merancang sistem, saya memprioritaskan <strong className="font-medium text-slate-200">efisiensi sumber daya, kecepatan respons antarmuka, dan keandalan arsitektur</strong>. Pendekatan ini saya terapkan saat mengintegrasikan inferensi LLM dan Speech-to-Text lokal agar berjalan mulus di aplikasi desktop berbasis multithreading, membangun komunikasi peer-to-peer (P2P) lokal berkecepatan tinggi tanpa ketergantungan server, hingga menggabungkan model Computer Vision (YOLOv8 & CNN) dengan mikrokontroler ESP32 untuk otomasi sistem fisik secara real-time.
              </p>

              {/* 3 Engineering Pillars */}
              <div className="grid gap-4 pt-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-800/90 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <p className="font-mono text-xs font-semibold text-cyan-400">
                      01 · Native & Cross-Platform
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400 text-justify">
                    Aplikasi desktop dan web responsif dengan manajemen thread asinkron (QThread) dan komunikasi real-time P2P.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/90 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <p className="font-mono text-xs font-semibold text-cyan-400">
                      02 · Applied AI & Vision
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400 text-justify">
                    Integrasi model LLM GGUF, Faster-Whisper, YOLOv8, dan CNN untuk otomasi media serta verifikasi visual.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/90 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <p className="font-mono text-xs font-semibold text-emerald-400">
                      03 · Edge IoT & Riset
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400 text-justify">
                    Instrumentasi mikrokontroler ESP32, kalibrasi sensor presisi, serta pengujian ilmiah berstandar publikasi jurnal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 / PROYEK & RISET */}
        <section id="projects" className="scroll-mt-20 border-t border-slate-800/70 py-16 md:py-20">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span>02 / Proyek & Riset</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Karya Rekayasa & Publikasi
              </h2>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Semua (5)' },
                { id: 'software', label: 'Aplikasi & AI (2)' },
                { id: 'iot-cv', label: 'IoT & Computer Vision (2)' },
                { id: 'publication', label: 'Jurnal Ilmiah (2)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as ProjectCategory)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    activeFilter === tab.id
                      ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                      : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Row 1: Featured Software Applications (ENCLip & ENCross) */}
          {filteredApps.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredApps.map((app) => (
                <article
                  key={app.id}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900/80"
                >
                  <div>
                    {/* Header with App Icon */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950 p-2 shadow-inner">
                          <Image
                            src={app.image}
                            alt={app.title}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">
                              {app.badge}
                            </span>
                            <span className="font-mono text-xs text-slate-500">{app.year}</span>
                          </div>
                          <p className="mt-1 text-xs text-slate-400">{app.tagline}</p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white transition group-hover:text-cyan-300">
                      {app.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400 text-justify">
                      {app.description}
                    </p>

                    {/* Architectural Highlights */}
                    <ul className="mt-4 space-y-1.5 border-l-2 border-cyan-500/40 pl-3">
                      {app.highlights.map((item) => (
                        <li key={item} className="text-xs font-medium text-slate-300">
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Pills */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {app.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-xs font-medium text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Links + Modal Trigger */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(app)}
                      className="text-xs font-semibold text-slate-200 hover:text-cyan-400 hover:underline inline-flex items-center gap-1 transition"
                    >
                      Rincian Proyek <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>

                    <div className="flex flex-wrap items-center gap-2">
                      {app.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                            link.primary
                              ? 'bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/30'
                              : 'border border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Bento Row 2: Research, Computer Vision & Journal Publications */}
          {filteredResearch.length > 0 && (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {filteredResearch.map((project) => (
                <article
                  key={project.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/40 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-slate-900/70"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-medium text-emerald-400">
                          {project.tagline.split('·')[0]}
                        </span>
                        <span className="font-mono text-slate-500">{project.year}</span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-white transition group-hover:text-emerald-300">
                        {project.title}
                      </h3>
                      <p className="mt-2.5 text-xs leading-relaxed text-slate-400 text-justify">
                        {project.description}
                      </p>
                      <ul className="mt-3.5 space-y-1 border-l-2 border-emerald-500/40 pl-2.5">
                        {project.highlights.map((h) => (
                          <li key={h} className="text-[11px] font-medium text-slate-300">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-5 pb-5">
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-slate-800/90 bg-slate-950 px-2 py-0.5 text-[11px] text-slate-400 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-semibold text-slate-300 hover:text-emerald-400 inline-flex items-center gap-1 transition"
                      >
                        Rincian <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                      </button>

                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 03 / KEAHLIAN */}
        <section id="skills" className="scroll-mt-20 border-t border-slate-800/70 py-16 md:py-20">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>03 / Keahlian Teknis</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Kompetensi Rekayasa Sistem
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SKILLS_DATA.map((skill) => {
              const isCyan = skill.accent === 'cyan';
              return (
                <div
                  key={skill.title}
                  className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/40 p-6 transition hover:border-slate-700"
                >
                  <div>
                    <div className="mb-3 flex items-center gap-2.5">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          isCyan ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50' : 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                        }`}
                      />
                      <h3 className="text-base font-bold text-white">{skill.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400 text-justify">
                      {skill.description}
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-slate-800/70 pt-4">
                    {skill.badges.map((badge) => (
                      <span
                        key={badge}
                        className={`rounded-md border px-2.5 py-1 text-xs font-mono font-medium ${
                          isCyan
                            ? 'border-cyan-500/20 bg-cyan-500/5 text-cyan-200'
                            : 'border-emerald-500/20 bg-emerald-500/5 text-emerald-200'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 04 / AKADEMIK & PUBLIKASI */}
        <section id="academic" className="scroll-mt-20 border-t border-slate-800/70 py-16 md:py-20">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>04 / Akademik & Publikasi</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Kualifikasi Akademik & Sertifikasi
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Pendidikan */}
            <div className="rounded-2xl border border-slate-800/90 bg-slate-900/40 p-6">
              <p className="font-mono text-xs text-cyan-400">2022—2026</p>
              <h3 className="mt-2 text-xl font-bold text-white">S1 Sistem Komputer</h3>
              <p className="mt-1 text-sm text-slate-300">
                Universitas Komputer Indonesia (UNIKOM)
              </p>
              <p className="mt-4 inline-block rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-emerald-400 font-mono">
                Indeks Prestasi Kumulatif: 3,53 / 4,00
              </p>
            </div>

            {/* Publikasi Nasional */}
            <div className="rounded-2xl border border-slate-800/90 bg-slate-900/40 p-6">
              <p className="font-mono text-xs text-emerald-400">Publikasi Nasional</p>
              <h3 className="mt-2 text-xl font-bold text-white">2 Artikel Jurnal Ilmiah</h3>
              <div className="mt-4 space-y-2.5 text-xs font-medium">
                <a
                  href="https://doi.org/10.34010/komputika.v15i1.19799"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-300"
                >
                  <span>Jurnal Komputika (Prediksi Liver)</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-300"
                >
                  <span>Jurnal Biner (POS ESP32)</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Sertifikasi Resmi */}
            <div className="rounded-2xl border border-slate-800/90 bg-slate-900/40 p-6">
              <p className="font-mono text-xs text-cyan-400">Sertifikasi Resmi</p>
              <h3 className="mt-2 text-xl font-bold text-white">Kredensial Industri</h3>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
                <li className="rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Google Gemini Certified Student — University</span>
                </li>
                <li className="rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Cisco CCNA: Introduction to Networks</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 05 / KONTAK & ULASAN */}
        <section id="contact" className="scroll-mt-20 border-t border-slate-800/70 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Kontak Langsung */}
            <div className="space-y-6 lg:col-span-6">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span>05 / Kontak & Ulasan</span>
                </div>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Hubungi Saya
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 text-justify">
                  Saat ini saya terbuka untuk peluang karier penuh waktu (Full-Time), proyek pengembangan sistem, maupun kolaborasi riset di bidang <strong className="font-medium text-slate-200">Software Engineering (Python / React / Desktop), AI & Computer Vision Engineering, serta IoT & Embedded Systems</strong>.
                </p>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <a
                  href="https://wa.me/6289630887748"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition hover:border-emerald-500/40 hover:bg-slate-900"
                >
                  <span className="text-xs font-medium text-emerald-400">WhatsApp</span>
                  <span className="mt-1 text-sm font-semibold text-white">+62 896-3088-7748</span>
                </a>

                <a
                  href="mailto:septiaedvan@gmail.com"
                  className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition hover:border-cyan-500/40 hover:bg-slate-900"
                >
                  <span className="text-xs font-medium text-cyan-400">Email</span>
                  <span className="mt-1 truncate text-sm font-semibold text-white">septiaedvan@gmail.com</span>
                </a>

                <a
                  href="https://github.com/EdvanVPRoject"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition hover:border-cyan-500/40 hover:bg-slate-900"
                >
                  <span className="text-xs font-medium text-slate-400">GitHub</span>
                  <span className="mt-1 text-sm font-semibold text-white">EdvanVPRoject ↗</span>
                </a>

                <a
                  href="https://linkedin.com/in/edvannuriana"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition hover:border-cyan-500/40 hover:bg-slate-900"
                >
                  <span className="text-xs font-medium text-slate-400">LinkedIn</span>
                  <span className="mt-1 text-sm font-semibold text-white">edvannuriana ↗</span>
                </a>
              </div>
            </div>

            {/* Buku Tamu & Feedback (Telegram Bot) */}
            <div id="feedback" className="scroll-mt-24 lg:col-span-6">
              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                  Buku Tamu & Feedback
                </p>
                <h3 className="mt-1.5 text-xl font-bold text-white">
                  Kesan & Catatan Pengunjung
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Pesan Anda akan langsung diteruskan secara instan ke bot Telegram pribadi saya.
                </p>

                <form onSubmit={handleFeedbackSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="guestName" className="block text-xs font-medium text-slate-300">
                      Nama / Instansi
                    </label>
                    <input
                      id="guestName"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Contoh: Budi — Tech Lead di PT XYZ"
                      className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Rating Kepuasan
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setGuestRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition"
                          aria-label={`Beri bintang ${star}`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= guestRating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-mono text-slate-400 ml-2">
                        {guestRating} / 5 Bintang
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="guestMessage" className="block text-xs font-medium text-slate-300">
                      Pesan atau Ulasan <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="guestMessage"
                      rows={3}
                      required
                      value={guestMessage}
                      onChange={(e) => setGuestMessage(e.target.value)}
                      placeholder="Tulis kesan, masukan, atau ajakan diskusi proyek..."
                      className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-cyan-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Mengirim ke Telegram...' : 'Kirim Pesan Instant ↗'}
                  </button>

                  {submitStatus === 'success' && (
                    <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-center text-xs text-emerald-300">
                      Terima kasih! Pesan dan rating Anda telah diteruskan ke Telegram saya.
                    </p>
                  )}

                  {submitStatus === 'error' && (
                    <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-center text-xs text-amber-300">
                      Gagal mengirim lewat form. Silakan hubungi langsung melalui WhatsApp atau Email di samping.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#070A12] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 text-xs text-slate-400 sm:flex-row">
          <p>© 2026 Edvan Nuriana Putra Septia · Portofolio Pribadi</p>
          <a
            href="#top"
            className="font-medium text-slate-300 transition hover:text-cyan-400"
          >
            Kembali ke atas ↑
          </a>
        </div>
      </footer>

      {/* MODAL RINCIAN PROYEK */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-[#0c101d] p-6 sm:p-8 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                  {activeModalProject.modalDetails.kicker}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeModalProject.modalDetails.title}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed text-justify font-light">
                {activeModalProject.modalDetails.summary}
              </p>

              {activeModalProject.modalDetails.bullets && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Implementasi & Arsitektur Utama
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {activeModalProject.modalDetails.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed text-justify">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-xs text-cyan-200 leading-relaxed">
                <span className="font-semibold text-cyan-300 block mb-1">
                  Hasil & Capaian Kinerja:
                </span>
                {activeModalProject.modalDetails.results}
              </div>

              {activeModalProject.modalDetails.note && (
                <p className="text-[11px] text-slate-500 font-mono italic">
                  * {activeModalProject.modalDetails.note}
                </p>
              )}

              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Tutup
                </button>

                <div className="flex flex-wrap gap-2">
                  {activeModalProject.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                        link.primary
                          ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-sm'
                          : 'border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
