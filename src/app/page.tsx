'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowUpRight } from 'lucide-react';

type ProjectCategory = 'all' | 'software' | 'iot-cv' | 'publication';

interface ProjectLink {
  label: string;
  url: string;
  primary?: boolean;
}

interface FeaturedApp {
  id: string;
  title: string;
  tagline: string;
  year: string;
  badge: string;
  category: ProjectCategory[];
  image: string;
  description: string;
  highlights: string[];
  tech: string[];
  links: ProjectLink[];
  modalDetails?: {
    kicker: string;
    summary: string;
    bullets?: string[];
    results: string;
    note?: string;
  };
}

interface ResearchProject {
  id: string;
  title: string;
  tagline: string;
  year: string;
  category: ProjectCategory[];
  image: string;
  description: string;
  highlights: string[];
  tech: string[];
  link: ProjectLink;
  modalDetails?: {
    kicker: string;
    summary: string;
    bullets?: string[];
    results: string;
    note?: string;
  };
}

const FEATURED_APPS: FeaturedApp[] = [
  {
    id: 'enclip',
    title: 'ENCLip — Native AI Video Clipper & Subtitle Generator',
    tagline: 'Product Release · Desktop AI & Media Pipeline',
    year: '2026',
    badge: 'Desktop & AI',
    category: ['software'],
    image: '/enclip-icon.png',
    description:
      'Aplikasi desktop Windows yang mengotomatiskan pemotongan video berdurasi panjang menjadi klip vertikal siap unggah (Shorts, Reels, TikTok) lengkap dengan subtitle dinamis. Dirancang dengan arsitektur multithreading (QThread) agar antarmuka tetap responsif saat menjalankan pipeline berat: transkripsi offline via Faster-Whisper (CTranslate2), analisis sorotan konteks via LLM Lokal (Qwen-2.5 GGUF) maupun Gemini API, serta rendering FFmpeg.',
    highlights: [
      'Inferensi AI Hibrida (Offline GGUF & Cloud API)',
      'GUI Anti-Freeze dengan Asynchronous Worker Thread',
    ],
    tech: [
      'Python',
      'PyQt6',
      'Faster-Whisper',
      'Qwen 2.5 GGUF',
      'Gemini API',
      'FFmpeg',
    ],
    links: [
      {
        label: 'Unduh Rilis .exe ↗',
        url: 'https://github.com/EdvanVPRoject/ENCLip/releases/latest',
        primary: true,
      },
      {
        label: 'GitHub ↗',
        url: 'https://github.com/EdvanVPRoject/ENCLip',
        primary: false,
      },
    ],
    modalDetails: {
      kicker: 'Aplikasi Desktop Native · 2026',
      summary:
        'Aplikasi desktop Windows yang dirancang untuk mempermudah kreator konten dan editor video dalam memotong video berdurasi panjang menjadi klip highlight vertikal secara otomatis dengan transkripsi AI dan pembuatan subtitle dinamis tanpa biaya langganan cloud.',
      bullets: [
        'Dukungan Hybrid AI: Mendukung model lokal 100% offline (Faster-Whisper & Qwen 2.5 GGUF) untuk privasi data penuh, serta integrasi Cloud via Google Gemini 3.8 Flash.',
        'Deteksi Momen Cerdas: Algoritma AI mendeteksi hook video, reaksi streamer, punchline humor, dan materi penting secara otomatis.',
        'Format & Auto-Framing Fleksibel: Menghasilkan rasio 9:16 (Shorts/TikTok), 16:9, 1:1, dan 4:3 dengan fitur smart background blur.',
        'Styling Subtitle Dinamis (Hardsub): 7+ preset gaya subtitle (Karaoke, Neon, Highlight, Box) dengan posisi teks yang dapat diseret bebas pada preview video.',
        'Akselerasi GPU & Render Cepat: Memanfaatkan encoder perangkat keras (Nvidia NVENC, Intel QSV, AMD AMF) untuk pemrosesan video ultra-cepat tanpa pop-up terminal CMD.',
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
    description:
      'Aplikasi berbagi berkas berukuran besar dan screen mirroring lintas-platform (Windows & Android) yang beroperasi 100% di jaringan lokal (LAN/Wi-Fi) tanpa kuota internet dan tanpa server penyimpanan perantara. Memanfaatkan WebRTC DataChannel dan MediaStream API untuk transmisi real-time berkecepatan tinggi dengan latensi rendah serta penemuan perangkat otomatis.',
    highlights: [
      'Arsitektur Zero-Server P2P (Privasi & Kecepatan Maksimal)',
      'Satu Basis Kode Modern (React 19, Electron, & Capacitor)',
    ],
    tech: ['React 19', 'WebRTC', 'Electron', 'Capacitor', 'Tailwind CSS'],
    links: [
      {
        label: 'GitHub ↗',
        url: 'https://github.com/EdvanVPRoject/ENCross',
        primary: true,
      },
    ],
    modalDetails: {
      kicker: 'Aplikasi Cross-Platform · 2026',
      summary:
        'Aplikasi transfer berkas dan screen sharing antar-perangkat lokal (Windows, Android, dan Browser) berkecepatan tinggi tanpa kuota internet dan tanpa server perantara pihak ketiga.',
      bullets: [
        'Direct P2P DataChannel: Berkas dialirkan langsung antar-memori perangkat via WebRTC dengan pembagian chunk 64KB dan mekanisme flow control buffer.',
        'Zero Cloud Storage: Data tidak pernah melewati server publik, menjamin privasi penuh dan throughput maksimal jaringan lokal.',
        'Pairing Cepat QR Code: Perangkat host menampilkan QR Code IP lokal, perangkat kedua memindai dan langsung tersambung otomatis.',
        'Screen Share Real-Time: Berbagi layar monitor secara langsung dengan latensi ultra-rendah melalui WebRTC MediaStream.',
      ],
      results:
        'Mencapai kecepatan transfer mendekati batas fisik throughput Wi-Fi lokal tanpa konsumsi kuota internet.',
    },
  },
];

const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 'smart-parking',
    title: 'Sistem Parkir Pintar & Pengenalan Pelat Nomor Otomatis',
    tagline: 'Skripsi & Riset Terapan · Computer Vision & IoT',
    year: '2025—2026',
    category: ['iot-cv'],
    image: '/parking-process-blurred.png',
    description:
      'Sistem keamanan gerbang parkir otomatis dengan verifikasi ganda (Two-Factor Physical Authentication) yang menggabungkan pembacaan UID e-KTP dan pengenalan pelat nomor kendaraan secara real-time menggunakan YOLOv8 Nano, OCR CNN (TensorFlow), dan ESP32.',
    highlights: [
      'Autentikasi Ganda (RFID e-KTP + Deteksi Pelat YOLOv8)',
      'Integrasi Edge-IoT & Sinkronisasi SQLite + Firebase',
    ],
    tech: ['YOLOv8 Nano', 'TensorFlow CNN', 'ESP32', 'SQLite', 'Firebase'],
    link: {
      label: 'Repositori GitHub ↗',
      url: 'https://github.com/EdvanVPRoject/Sistem-parkir-pintar-berbasis-visi-komputer-berbasis-iot-menggunakan-metode-yolo',
    },
    modalDetails: {
      kicker: 'Skripsi & Riset Terapan · 2025—2026',
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
    },
  },
  {
    id: 'liver-ml',
    title: 'Klasifikasi Risiko Penyakit Liver (Studi Komparasi ML)',
    tagline: 'Publikasi Jurnal Komputika · Data Science',
    year: '2025—2026',
    category: ['publication'],
    image: '/journal-liver.jpg',
    description:
      'Penelitian ilmiah terpublikasi yang mengevaluasi ketahanan algoritma Random Forest, SVM, dan Logistic Regression dalam memprediksi risiko penyakit liver dari rekam medis klinis, mencakup tahapan preprocessing dan penanganan ketimpangan kelas data.',
    highlights: [
      'Terbit di Jurnal Nasional Komputika (DOI Terindeks)',
      'Optimasi Pipeline Klasifikasi dengan Scikit-Learn',
    ],
    tech: ['Random Forest', 'SVM', 'Logistic Regression', 'Scikit-Learn'],
    link: {
      label: 'Publikasi Jurnal Komputika ↗',
      url: 'https://doi.org/10.34010/komputika.v15i1.19799',
    },
    modalDetails: {
      kicker: 'Publikasi Ilmiah · Jurnal Komputika',
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
    tagline: 'Publikasi Jurnal Biner · Embedded Systems',
    year: '2024—2025',
    category: ['iot-cv', 'publication'],
    image: '/journal-pos.jpg',
    description:
      'Solusi perangkat keras timbangan digital yang terhubung langsung ke aplikasi kasir berbasis web untuk menghilangkan kesalahan input manual transaksi UMKM. Menggunakan ESP32 dan sensor Load Cell HX711 terkalibrasi secara matematis.',
    highlights: [
      'Terbit di Jurnal Ilmiah Biner',
      'Otomatisasi Hardware-ke-Web Real-Time untuk UMKM',
    ],
    tech: ['ESP32', 'Sensor Load Cell HX711', 'Web Application'],
    link: {
      label: 'Publikasi Jurnal Biner ↗',
      url: 'https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/',
    },
    modalDetails: {
      kicker: 'Proyek Akademik · Jurnal Biner',
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
    index: '01',
    title: 'Rekayasa AI, LLM & Media',
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
    index: '02',
    title: 'Computer Vision & Machine Learning',
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
    index: '03',
    title: 'Komunikasi Jaringan P2P & Real-Time',
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
    index: '04',
    title: 'Pengembangan Aplikasi Desktop & Web',
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
    index: '05',
    title: 'Sistem Tertanam (Embedded) & IoT',
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
    index: '06',
    title: 'Alur Kerja Rekayasa & Publikasi',
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
  const [activeModalProject, setActiveModalProject] = useState<
    FeaturedApp | ResearchProject | null
  >(null);

  const [guestName, setGuestName] = useState('');
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
          rating: 5,
          comment: guestMessage.trim(),
        }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setGuestName('');
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
      className="min-h-screen bg-[#0A0A0A] text-zinc-100 antialiased selection:bg-zinc-200 selection:text-zinc-950"
    >
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#0A0A0A]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#top"
            className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-zinc-100"
          >
            <span>Edvan Nuriana.</span>
            <span className="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[11px] font-normal text-zinc-400">
              Portfolio
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
            <a href="#about" className="transition hover:text-zinc-100">
              Tentang
            </a>
            <a href="#projects" className="transition hover:text-zinc-100">
              Proyek
            </a>
            <a href="#skills" className="transition hover:text-zinc-100">
              Keahlian
            </a>
            <a href="#academic" className="transition hover:text-zinc-100">
              Akademik
            </a>
            <a href="#contact" className="transition hover:text-zinc-100">
              Kontak
            </a>
            <a
              href="#feedback"
              className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800"
            >
              Ulasan ↗
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 md:hidden transition"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-800 bg-[#0A0A0A]/95 px-6 py-4 space-y-3 text-sm font-medium backdrop-blur-lg">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-300 hover:text-zinc-100 py-1"
            >
              Tentang
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-300 hover:text-zinc-100 py-1"
            >
              Proyek & Riset
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-300 hover:text-zinc-100 py-1"
            >
              Keahlian
            </a>
            <a
              href="#academic"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-300 hover:text-zinc-100 py-1"
            >
              Akademik & Publikasi
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-300 hover:text-zinc-100 py-1"
            >
              Kontak
            </a>
            <a
              href="#feedback"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-100 font-bold py-1"
            >
              Kirim Ulasan Telegram ↗
            </a>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6">
        {/* HERO SECTION */}
        <section className="py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Sumedang, Indonesia · UNIKOM 2026</span>
                </div>
                <span className="rounded-full border border-zinc-800/80 px-3 py-1 font-mono text-xs text-zinc-400">
                  Software, Applied AI & Embedded Engineer
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:leading-[1.15]">
                Merancang perangkat lunak cerdas, visi komputer, dan sistem terdistribusi yang siap pakai.
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                Saya <strong className="font-medium text-zinc-200">Edvan Nuriana Putra Septia, S.Kom.</strong>, lulusan Sistem Komputer UNIKOM (IPK 3.53). Berfokus mengubah riset algoritma AI dan sistem tertanam (IoT) menjadi aplikasi desktop, web, dan lintas-platform yang cepat, mandiri, serta teruji secara empiris melalui rilis produk dan publikasi jurnal ilmiah nasional.
              </p>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-300"
                >
                  Eksplorasi Proyek
                </a>
                <a
                  href="/cv-edvan.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800"
                >
                  Unduh CV ↗
                </a>
                <a
                  href="mailto:septiaedvan@gmail.com"
                  className="rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:text-zinc-100"
                >
                  Kirim Email ↗
                </a>
              </div>

              {/* Key Highlights Bar */}
              <div className="grid grid-cols-3 gap-6 border-t border-zinc-800/80 pt-8 sm:max-w-lg">
                <div>
                  <p className="font-mono text-2xl font-semibold tabular-nums text-zinc-100">
                    3.53
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    IPK S1 Sistem Komputer
                  </p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-semibold tabular-nums text-zinc-100">
                    05
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Dokumentasi Proyek Lengkap
                  </p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-semibold tabular-nums text-zinc-100">
                    02
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Publikasi Jurnal Nasional
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Card */}
            <div className="lg:col-span-4">
              <div className="mx-auto max-w-xs rounded-xl border border-zinc-800 bg-zinc-900/40 p-3.5">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-zinc-900">
                  <Image
                    src="/profile.jpeg"
                    alt="Edvan Nuriana Putra Septia, S.Kom."
                    fill
                    sizes="(max-width: 768px) 240px, 320px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="mt-3.5 px-1">
                  <p className="text-sm font-medium text-zinc-100">
                    Edvan Nuriana Putra Septia, S.Kom.
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-zinc-500">
                    S1 Sistem Komputer UNIKOM · IPK 3.53
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 01 / TENTANG SAYA */}
        <section
          id="about"
          className="scroll-mt-20 border-t border-zinc-800/80 py-16 md:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                01 / Tentang Saya
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug text-zinc-100 sm:text-3xl">
                Menjembatani arsitektur perangkat lunak modern dengan komputasi AI dan perangkat keras cerdas.
              </h2>
              <div className="mt-6">
                <a
                  href="https://www.linkedin.com/in/edvannuriana"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800"
                >
                  <span>Profil LinkedIn</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            <div className="space-y-5 text-zinc-400 lg:col-span-8">
              <p className="leading-relaxed">
                Sebagai lulusan S1 Sistem Komputer Universitas Komputer Indonesia (UNIKOM) dengan IPK 3.53, saya memiliki fokus kuat pada pengembangan teknologi <strong className="font-medium text-zinc-200">end-to-end</strong>—mulai dari perancangan logika sistem di level perangkat keras hingga antarmuka aplikasi yang digunakan langsung oleh pengguna akhir. Saya terbiasa membangun solusi dari nol hingga tahap distribusi nyata, baik dalam bentuk aplikasi instalasi mandiri (<code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-zinc-300">.exe</code> & lintas-platform) maupun riset yang tervalidasi di jurnal ilmiah nasional.
              </p>
              <p className="leading-relaxed">
                Dalam merancang sistem, saya memprioritaskan <strong className="font-medium text-zinc-200">efisiensi sumber daya, kecepatan respons antarmuka, dan keandalan arsitektur</strong>. Pendekatan ini saya terapkan saat mengintegrasikan inferensi LLM dan Speech-to-Text lokal agar berjalan mulus di aplikasi desktop berbasis multithreading, membangun komunikasi peer-to-peer (P2P) lokal berkecepatan tinggi tanpa ketergantungan server, hingga menggabungkan model Computer Vision (YOLOv8 & CNN) dengan mikrokontroler ESP32 untuk otomasi sistem fisik secara real-time.
              </p>

              {/* 3 Engineering Pillars */}
              <div className="grid gap-4 pt-3 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-4">
                  <p className="font-mono text-xs text-zinc-300">
                    01 · Native & Cross-Platform
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                    Aplikasi desktop dan web responsif dengan manajemen thread asinkron dan komunikasi real-time.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-4">
                  <p className="font-mono text-xs text-zinc-300">
                    02 · Applied AI & Vision
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                    Integrasi model LLM GGUF, Faster-Whisper, YOLOv8, dan CNN untuk otomasi media serta verifikasi visual.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-4">
                  <p className="font-mono text-xs text-zinc-300">
                    03 · Edge IoT & Riset
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                    Instrumentasi ESP32, kalibrasi sensor presisi, serta pengujian ilmiah berstandar publikasi jurnal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 / PROYEK & RISET */}
        <section
          id="projects"
          className="scroll-mt-20 border-t border-zinc-800/80 py-16 md:py-20"
        >
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                02 / Proyek & Riset
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">
                Proyek yang Saya Kerjakan
              </h2>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Semua (5)' },
                { id: 'software', label: 'Aplikasi & AI (2)' },
                { id: 'iot-cv', label: 'IoT & Visi Komputer (2)' },
                { id: 'publication', label: 'Jurnal Ilmiah (2)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as ProjectCategory)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                    activeFilter === tab.id
                      ? 'bg-zinc-100 text-zinc-950'
                      : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Row 1: Featured Software Applications */}
          {filteredApps.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredApps.map((app) => (
                <article
                  key={app.id}
                  className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/60"
                >
                  <div>
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-2">
                          <Image
                            src={app.image}
                            alt={app.title}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded border border-zinc-700/80 bg-zinc-800/80 px-2 py-0.5 font-mono text-[11px] text-zinc-300">
                              {app.badge}
                            </span>
                            <span className="font-mono text-xs text-zinc-500">
                              {app.year}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-zinc-500">
                            {app.tagline}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-zinc-100">
                      {app.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                      {app.description}
                    </p>

                    {/* Architectural Highlights */}
                    <ul className="mt-4 space-y-1.5 border-l border-zinc-700 pl-3">
                      {app.highlights.map((item) => (
                        <li key={item} className="text-xs text-zinc-300">
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Pills */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {app.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Links */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(app)}
                      className="text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:underline inline-flex items-center gap-1 transition"
                    >
                      Rincian <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex flex-wrap items-center gap-2">
                      {app.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`rounded-lg px-3.5 py-2 text-xs font-medium transition ${
                            link.primary
                              ? 'bg-zinc-100 text-zinc-950 hover:bg-zinc-300'
                              : 'border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100'
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
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 transition hover:border-zinc-700 hover:bg-zinc-900/60"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-800/80 bg-zinc-950">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 font-mono text-xs text-zinc-500">
                        <span>{project.tagline.split('·')[0]}</span>
                        <span>{project.year}</span>
                      </div>

                      <h3 className="mt-2 text-base font-semibold text-zinc-100">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                        {project.description}
                      </p>

                      <ul className="mt-3.5 space-y-1 border-l border-zinc-700 pl-2.5">
                        {project.highlights.map((h) => (
                          <li key={h} className="text-[11px] text-zinc-300">
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
                          className="rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3">
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:underline inline-flex items-center gap-1 transition"
                      >
                        Rincian <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={project.link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-xs font-medium text-zinc-200 transition hover:text-white"
                      >
                        {project.link.label}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 03 / KEAHLIAN */}
        <section
          id="skills"
          className="scroll-mt-20 border-t border-zinc-800/80 py-16 md:py-20"
        >
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              03 / Keahlian Teknis
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">
              Kompetensi Rekayasa Sistem
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SKILLS_DATA.map((skill) => (
              <div
                key={skill.title}
                className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition hover:border-zinc-700"
              >
                <div>
                  <span className="font-mono text-xs text-zinc-500">
                    {skill.index}
                  </span>
                  <h3 className="mt-1.5 text-base font-semibold text-zinc-100">
                    {skill.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-zinc-800/80 pt-4">
                  {skill.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04 / AKADEMIK & PUBLIKASI */}
        <section
          id="academic"
          className="scroll-mt-20 border-t border-zinc-800/80 py-16 md:py-20"
        >
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              04 / Akademik & Publikasi
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">
              Kualifikasi Akademik & Sertifikasi
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Pendidikan */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
              <p className="font-mono text-xs text-zinc-500">2022—2026</p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                S1 Sistem Komputer
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                Universitas Komputer Indonesia (UNIKOM)
              </p>
              <p className="mt-4 inline-block rounded border border-zinc-800 bg-zinc-950 px-3 py-1.5 font-mono text-xs text-zinc-200">
                IPK: 3,53 / 4,00
              </p>
            </div>

            {/* Publikasi Nasional */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
              <p className="font-mono text-xs text-zinc-500">
                Publikasi Nasional
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                2 Artikel Jurnal Ilmiah
              </h3>
              <div className="mt-4 space-y-2 text-xs">
                <a
                  href="https://doi.org/10.34010/komputika.v15i1.19799"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300 transition hover:border-zinc-700 hover:text-zinc-100"
                >
                  <span>Jurnal Komputika (Prediksi Liver)</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300 transition hover:border-zinc-700 hover:text-zinc-100"
                >
                  <span>Jurnal Biner (POS ESP32)</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Sertifikasi Resmi */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
              <p className="font-mono text-xs text-zinc-500">
                Sertifikasi Resmi
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                Kredensial Industri
              </h3>
              <ul className="mt-4 space-y-2 text-xs text-zinc-300">
                <li className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">
                  Google Gemini Certified Student — University
                </li>
                <li className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">
                  Cisco CCNA: Introduction to Networks
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 05 / KONTAK & ULASAN */}
        <section
          id="contact"
          className="scroll-mt-20 border-t border-zinc-800/80 py-16 md:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Kontak Langsung */}
            <div className="space-y-6 lg:col-span-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                  05 / Kontak & Ulasan
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">
                  Hubungi Saya
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Saat ini saya terbuka untuk peluang karier penuh waktu
                  (Full-Time), proyek pengembangan sistem, maupun kolaborasi
                  riset di bidang{' '}
                  <strong className="font-medium text-zinc-200">
                    Software Engineering (Python / React / Desktop), AI &
                    Computer Vision Engineering, serta IoT & Embedded Systems
                  </strong>
                  .
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="https://wa.me/6289630887748"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:border-zinc-700 hover:bg-zinc-900/70"
                >
                  <span className="font-mono text-xs text-zinc-500">
                    WhatsApp
                  </span>
                  <span className="mt-1 text-sm font-medium text-zinc-100">
                    +62 896-3088-7748
                  </span>
                </a>

                <a
                  href="mailto:septiaedvan@gmail.com"
                  className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:border-zinc-700 hover:bg-zinc-900/70"
                >
                  <span className="font-mono text-xs text-zinc-500">Email</span>
                  <span className="mt-1 truncate text-sm font-medium text-zinc-100">
                    septiaedvan@gmail.com
                  </span>
                </a>

                <a
                  href="https://github.com/EdvanVPRoject"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:border-zinc-700 hover:bg-zinc-900/70"
                >
                  <span className="font-mono text-xs text-zinc-500">
                    GitHub
                  </span>
                  <span className="mt-1 text-sm font-medium text-zinc-100">
                    EdvanVPRoject ↗
                  </span>
                </a>

                <a
                  href="https://linkedin.com/in/edvannuriana"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:border-zinc-700 hover:bg-zinc-900/70"
                >
                  <span className="font-mono text-xs text-zinc-500">
                    LinkedIn
                  </span>
                  <span className="mt-1 text-sm font-medium text-zinc-100">
                    edvannuriana ↗
                  </span>
                </a>
              </div>
            </div>

            {/* Buku Tamu & Feedback */}
            <div id="feedback" className="scroll-mt-24 lg:col-span-6">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                  Buku Tamu & Feedback
                </p>
                <h3 className="mt-1.5 text-lg font-semibold text-zinc-100">
                  Kesan & Catatan Pengunjung
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Pesan Anda akan langsung diteruskan secara instan ke bot
                  Telegram pribadi saya.
                </p>

                <form
                  onSubmit={handleFeedbackSubmit}
                  className="mt-6 space-y-4"
                >
                  <div>
                    <label
                      htmlFor="guestName"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Nama / Instansi
                    </label>
                    <input
                      id="guestName"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Contoh: Budi — Tech Lead di PT XYZ"
                      className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-zinc-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guestMessage"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Pesan atau Ulasan <span className="text-zinc-500">*</span>
                    </label>
                    <textarea
                      id="guestMessage"
                      rows={3}
                      required
                      value={guestMessage}
                      onChange={(e) => setGuestMessage(e.target.value)}
                      placeholder="Tulis kesan, masukan, atau ajakan diskusi proyek..."
                      className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-zinc-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-zinc-100 px-5 py-2.5 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-300 disabled:opacity-50"
                  >
                    {isSubmitting
                      ? 'Mengirim ke Telegram...'
                      : 'Kirim Pesan Instant ↗'}
                  </button>

                  {submitStatus === 'success' && (
                    <p className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-center text-xs text-zinc-200">
                      Terima kasih! Pesan Anda telah diteruskan ke Telegram saya.
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-center text-xs text-zinc-400">
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
      <footer className="border-t border-zinc-800/80 bg-[#0A0A0A] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-zinc-500 sm:flex-row">
          <p>© 2026 Edvan Nuriana Putra Septia · Portofolio Pribadi</p>
          <a
            href="#top"
            className="font-medium text-zinc-400 transition hover:text-zinc-100"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-zinc-800 bg-[#0E0E10] p-6 sm:p-8 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                  {activeModalProject.modalDetails?.kicker || 'Dokumentasi Teknis'}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-zinc-100 mt-1">
                  {activeModalProject.title}
                </h3>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed text-justify font-light">
                {activeModalProject.modalDetails?.summary || activeModalProject.description}
              </p>

              {activeModalProject.modalDetails?.bullets && (
                <div className="space-y-2 pt-2">
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                    Implementasi & Arsitektur Utama
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {activeModalProject.modalDetails.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-zinc-500 font-mono text-[11px] mt-0.5">•</span>
                        <span className="leading-relaxed text-justify">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeModalProject.modalDetails?.results && (
                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300 leading-relaxed">
                  <span className="font-medium text-zinc-100 block mb-1">
                    Hasil & Capaian Kinerja:
                  </span>
                  {activeModalProject.modalDetails.results}
                </div>
              )}

              {activeModalProject.modalDetails?.note && (
                <p className="text-[11px] text-zinc-500 font-mono italic">
                  * {activeModalProject.modalDetails.note}
                </p>
              )}

              <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
                >
                  Tutup
                </button>

                <div className="flex flex-wrap gap-2">
                  {'links' in activeModalProject ? (
                    activeModalProject.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
                          link.primary
                            ? 'bg-zinc-100 text-zinc-950 hover:bg-zinc-300'
                            : 'border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100'
                        }`}
                      >
                        {link.label}
                      </a>
                    ))
                  ) : (
                    <a
                      href={activeModalProject.link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-950 hover:bg-zinc-300 transition"
                    >
                      {activeModalProject.link.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
