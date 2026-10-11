'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ArrowUpRight, 
  ArrowDown, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Star, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Phone, 
  ExternalLink,
  FileText
} from 'lucide-react';

function Github({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface Project {
  id: string;
  kicker: string;
  title: string;
  description: string;
  image: string;
  imageType: 'image' | 'encross';
  tags: string[];
  githubUrl?: string;
  externalUrl?: string;
  externalLabel?: string;
  modalDetails: {
    kicker: string;
    title: string;
    summary: string;
    steps?: { title: string; desc: string }[];
    bullets?: string[];
    results: string;
    note?: string;
  };
}

const projectsData: Project[] = [
  {
    id: 'encross',
    kicker: 'Aplikasi Cross-Platform · 2026',
    title: 'ENCross — P2P File & Screen Sharing',
    description: 'Aplikasi transfer file dan berbagi layar lokal berkecepatan tinggi tanpa kuota internet menggunakan WebRTC.',
    image: '/encross-icon.svg',
    imageType: 'encross',
    tags: ['React 19', 'WebRTC', 'Tailwind v4', 'Electron', 'Capacitor'],
    githubUrl: 'https://github.com/EdvanVPRoject/ENCross',
    modalDetails: {
      kicker: 'Aplikasi Cross-Platform · 2026',
      title: 'ENCross — High-Speed Local File & Screen Sharing',
      summary: 'Aplikasi transfer file dan berbagi layar antar-perangkat lokal (Windows, Android, dan Browser) berkecepatan tinggi tanpa kuota internet dan tanpa server perantara.',
      bullets: [
        'Direct P2P DataChannel: File dialirkan langsung antar memori perangkat via WebRTC dengan chunking 64KB dan mekanisme flow control buffer.',
        'Zero Cloud Storage: Data tidak pernah melewati server publik, menjaga privasi penuh dan throughput maksimal Wi-Fi/LAN lokal.',
        'Pairing Cepat QR Code: Laptop menampilkan QR Code IP lokal, ponsel scan dan modal pairing otomatis tertutup saat tersambung.',
        'Screen Share Real-Time: Berbagi layar monitor secara langsung dengan latensi ultra-rendah melalui WebRTC MediaStream.',
        'Sinkronisasi Teks & Clipboard: Mengirim pesan teks dan tautan instan antar perangkat dengan deteksi URL otomatis.',
        'Multi-Platform: Tersedia sebagai aplikasi desktop Windows (Electron), Android native (Capacitor APK), dan browser (PWA).'
      ],
      results: 'Mencapai kecepatan transfer mendekati batas throughput fisik Wi-Fi lokal tanpa menggunakan kuota data internet sama sekali.'
    }
  },
  {
    id: 'parking',
    kicker: 'Skripsi · 2025—2026',
    title: 'Parkir Pintar dan Pengenalan Pelat',
    description: 'Merancang validasi akses kendaraan dengan RFID, computer vision YOLOv8, OCR CNN, dan pengelolaan data parkir.',
    image: '/parking-process-blurred.png',
    imageType: 'image',
    tags: ['YOLOv8 Nano', 'CNN TensorFlow', 'ESP32 RFID', 'Firebase', 'SQLite'],
    githubUrl: 'https://github.com/EdvanVPRoject/Sistem-parkir-pintar-berbasis-visi-komputer-berbasis-iot-menggunakan-metode-yolo',
    modalDetails: {
      kicker: 'Skripsi · 2025—2026',
      title: 'Parkir Pintar dan Pengenalan Pelat Nomor',
      summary: 'Sistem parkir dengan autentikasi ganda: UID e-KTP digunakan untuk mengenali identitas pengguna, sedangkan pengenalan pelat nomor memastikan kendaraan yang masuk dan keluar sesuai.',
      bullets: [
        'RFID RC522 membaca UID e-KTP melalui ESP32 saat kendaraan tiba.',
        'YOLOv8 Nano melokalisasi area pelat nomor kendaraan dari tangkapan kamera.',
        'Model CNN berbasis TensorFlow mengidentifikasi karakter huruf dan angka pelat.',
        'SQLite menyimpan basis data transaksi lokal dan Firebase Realtime Database digunakan untuk monitoring jarak jauh.'
      ],
      results: 'RFID sukses membaca 55 dari 55 pengujian (100%). YOLOv8 Nano meraih mAP@0.50 sebesar 98,51% dan mAP@0.50:0.95 sebesar 92,99%. CNN mencapai validation accuracy 88,07%, serta pengenalan pelat lengkap berhasil pada 25 dari 30 pengujian.',
      note: 'Fokus penelitian adalah pada validasi akses, deteksi pelat, dan monitoring data realtime.'
    }
  },
  {
    id: 'liver',
    kicker: 'Penelitian · 2025—2026',
    title: 'Prediksi Penyakit Liver',
    description: 'Membandingkan beberapa model machine learning untuk memprediksi risiko penyakit liver dari dataset medis.',
    image: '/journal-liver.jpg',
    imageType: 'image',
    tags: ['Random Forest', 'SVM', 'Logistic Regression', 'Scikit-Learn'],
    externalUrl: 'https://doi.org/10.34010/komputika.v15i1.19799',
    externalLabel: 'Buka Publikasi Komputika ↗',
    modalDetails: {
      kicker: 'Penelitian · 2025—2026',
      title: 'Prediksi Penyakit Liver dengan Model Perbandingan',
      summary: 'Penelitian ini membandingkan algoritma Logistic Regression, Random Forest, dan Support Vector Machine (SVM) untuk mengklasifikasi risiko penyakit liver dari 579 data rekam medis pasien.',
      bullets: [
        'Pembersihan dataset, normalisasi, dan penanganan nilai hilang (missing values).',
        'Eksperimen dengan berbagai rasio pembagian data latih dan data uji (70:30, 80:20, 90:10).',
        'Evaluasi komprehensif menggunakan metrik Akurasi, Precision, Recall, F1-Score, dan MCC.'
      ],
      results: 'Random Forest menghasilkan performa optimal pada pembagian data 80% dengan F1 sebesar 0,696 dan MCC 0,203. Pada pengujian sampel data baru, model mencapai tingkat kesesuaian prediksi 98%.'
    }
  },
  {
    id: 'pos',
    kicker: 'Proyek Akademik · 2024—2025',
    title: 'Point of Sale untuk UMKM',
    description: 'Merancang POS yang menghubungkan timbangan digital dengan pencatatan transaksi untuk UMKM.',
    image: '/journal-pos.jpg',
    imageType: 'image',
    tags: ['ESP32', 'Sensor Load Cell', 'HX711', 'IoT', 'Web Dashboard'],
    externalUrl: 'https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/',
    externalLabel: 'Buka Publikasi Biner ↗',
    modalDetails: {
      kicker: 'Proyek Akademik · 2024—2025',
      title: 'Implementasi Sistem Point of Sale Berbasis ESP32 dan Sensor Load Cell',
      summary: 'Merancang perangkat POS terintegrasi bagi pelaku UMKM produk curah/berdasarkan timbangan, menghubungkan hardware timbangan digital langsung ke sistem kasir dan pencatatan kasir otomatis.',
      bullets: [
        'Merakit modul timbangan digital menggunakan mikrokontroler ESP32 dan modul ADC Load Cell HX711.',
        'Mengalirkan data berat aktual secara instan ke sistem kasir POS tanpa input manual.',
        'Membangun dashboard web untuk pencatatan transaksi, histori kasir, dan inventaris barang.'
      ],
      results: 'Pengukuran timbangan menghasilkan tingkat akurasi di atas 98%, meminimalisir kesalahan perhitungan manual dan mempercepat proses transaksi UMKM.'
    }
  }
];

export default function PortfolioPage() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setFormStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengirim feedback');
      }

      setFormStatus('success');
      setName('');
      setComment('');
      setRating(5);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan jaringan.';
      setFormStatus('error');
      setErrorMessage(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-stone-50/85 dark:bg-stone-950/85 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#top" className="font-heading font-bold text-2xl tracking-tighter text-stone-900 dark:text-stone-50">
            EN<span className="text-orange-600 dark:text-orange-500">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
            <a href="#about" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Tentang saya</a>
            <a href="#projects" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Proyek</a>
            <a href="#skills" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Keahlian</a>
            <a href="#contact" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1">
              Kontak <ArrowUpRight className="w-3.5 h-3.5 text-orange-600" />
            </a>
            <a 
              href="#feedback"
              className="px-3 py-1.5 rounded-full border border-stone-300 dark:border-stone-700 text-xs font-semibold hover:border-orange-500 hover:text-orange-600 transition-all"
            >
              Feedback
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Ganti mode tema"
              className="p-2 rounded-full border border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-900 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 dark:text-stone-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-6 py-5 flex flex-col gap-4 text-sm font-medium">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-600">Tentang saya</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-600">Proyek</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-600">Keahlian</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-600">Kontak</a>
            <a href="#feedback" onClick={() => setMobileMenuOpen(false)} className="text-orange-600 font-semibold">Beri Feedback Telegram ↗</a>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* HERO SECTION */}
        <section className="max-w-5xl mx-auto px-5 pt-16 pb-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-900/60 text-orange-800 dark:text-orange-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                Lulusan Sistem Komputer · Sumedang, Jawa Barat
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.12]">
                Saya membangun solusi dari data, perangkat, dan <em className="italic text-orange-600 dark:text-orange-500 font-serif font-normal">aplikasi.</em>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
                Saya Edvan, lulusan baru Sistem Komputer UNIKOM. Saya mengembangkan proyek akademik dan mandiri di bidang rekayasa perangkat lunak, computer vision, IoT, dan aplikasi web modern.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-stone-900 dark:bg-stone-50 text-white dark:text-stone-900 text-sm font-semibold hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors shadow-sm"
                >
                  Lihat proyek <ArrowDown className="w-4 h-4" />
                </a>
                <a
                  href="/cv-edvan.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-sm font-semibold hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
                >
                  <FileText className="w-4 h-4 text-orange-600" /> Unduh CV <span>↗</span>
                </a>
                <a
                  href="mailto:septiaedvan@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-3 text-stone-600 dark:text-stone-400 text-sm font-semibold hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <Mail className="w-4 h-4" /> Kirim email <span>↗</span>
                </a>
              </div>
            </div>

            {/* Profile Card Visual */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative group">
                {/* Ambient Orbs */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                
                <div className="relative w-64 sm:w-72 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-xl">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-4">
                    <Image
                      src="/profile.jpeg"
                      alt="Foto Edvan Nuriana Putra Septia"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 256px, 288px"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-base text-stone-900 dark:text-stone-100">
                      Edvan Nuriana Putra Septia
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center justify-between">
                      <span>Sumedang, Indonesia</span>
                      <span className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 px-2 py-0.5 rounded">
                        UNIKOM
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 01: TENTANG SAYA */}
        <section id="about" className="border-t border-stone-200 dark:border-stone-800 py-20 bg-stone-100/50 dark:bg-stone-900/30">
          <div className="max-w-5xl mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-4">
                <span className="text-xs font-mono font-semibold tracking-wider text-orange-600 dark:text-orange-500 uppercase">
                  01 / Tentang saya
                </span>
              </div>
              <div className="md:col-span-8 space-y-5 text-stone-700 dark:text-stone-300 leading-relaxed text-base">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                  Tentang saya, pengalaman, dan hal yang sedang saya kembangkan.
                </h2>
                <p>
                  Saya lulusan baru Program Studi Sistem Komputer dari Universitas Komputer Indonesia (UNIKOM). Pengalaman saya berakar dari proyek akademik, riset komputasi cerdas, dan proyek mandiri di bidang software engineering, computer vision, IoT, dan aplikasi web modern.
                </p>
                <p>
                  Dalam pengerjaan proyek, saya terbiasa menggunakan Python, YOLOv8, OCR, ESP32, Firebase, WebRTC, React, dan Next.js. Pendekatan kerja saya menitikberatkan pada pemecahan masalah secara terstruktur, pengujian fungsionalitas berkala, dan dokumentasi yang rapi.
                </p>
                <p>
                  Saya memiliki ketertarikan tinggi pada arsitektur perangkat lunak lintas-platform (desktop, web, dan mobile). Mempelajari dan mengimplementasikan teknologi seperti WebRTC P2P DataChannel dan Electron menjadi bukti semangat saya untuk terus berinovasi.
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.linkedin.com/in/edvannuriana"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    Lihat LinkedIn <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: PROYEK */}
        <section id="projects" className="border-t border-stone-200 dark:border-stone-800 py-20">
          <div className="max-w-5xl mx-auto px-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-mono font-semibold tracking-wider text-orange-600 dark:text-orange-500 uppercase">
                  02 / Proyek
                </span>
                <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-100 mt-2">
                  Karya Pilihan & Penelitian
                </h2>
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400 max-w-xs">
                Koleksi proyek rekayasa perangkat lunak, sistem cerdas, dan publikasi ilmiah.
              </p>
            </div>

            {/* Grid 2 Kolom Simetris */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsData.map((project) => (
                <article
                  key={project.id}
                  className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all flex flex-col"
                >
                  {/* Thumbnail Banner */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-950 flex items-center justify-center border-b border-stone-200 dark:border-stone-800">
                    {project.imageType === 'encross' ? (
                      <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-neutral-900 to-black flex items-center justify-center relative">
                        <div className="w-20 h-20 relative group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-contain drop-shadow-xl"
                          />
                        </div>
                        <span className="absolute bottom-3 right-3 text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/15 backdrop-blur-sm">
                          P2P WebRTC
                        </span>
                      </div>
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <p className="text-[11px] font-mono font-semibold tracking-wider text-orange-600 dark:text-orange-400 uppercase mb-1">
                        {project.kicker}
                      </p>
                      <h3 className="font-heading font-bold text-xl text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-4 text-xs font-bold">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="text-stone-900 dark:text-stone-100 hover:text-orange-600 dark:hover:text-orange-400 inline-flex items-center gap-1.5"
                      >
                        Detail Proyek <ArrowUpRight className="w-3.5 h-3.5 text-orange-600" />
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 inline-flex items-center gap-1.5 ml-auto"
                        >
                          <Github className="w-3.5 h-3.5" /> GitHub <span>↗</span>
                        </a>
                      )}

                      {project.externalUrl && (
                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 inline-flex items-center gap-1.5 ml-auto"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Jurnal <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 03: KEAHLIAN */}
        <section id="skills" className="border-t border-stone-200 dark:border-stone-800 py-20 bg-stone-100/50 dark:bg-stone-900/30">
          <div className="max-w-5xl mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-4">
                <span className="text-xs font-mono font-semibold tracking-wider text-orange-600 dark:text-orange-500 uppercase">
                  03 / Keahlian
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mt-2">
                  Cara saya bekerja & stack teknologi.
                </h2>
              </div>

              <div className="md:col-span-8 divide-y divide-stone-200 dark:divide-stone-800">
                <div className="py-5 first:pt-0">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-orange-600 font-bold">01</span>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100">Pemrograman</h4>
                      <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                        Python, JavaScript, TypeScript, C++, C, React 19, Next.js, dan Tailwind CSS untuk membangun aplikasi desktop, web, dan prototipe terintegrasi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-5">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-orange-600 font-bold">02</span>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100">Data & Machine Learning</h4>
                      <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                        YOLOv8 Object Detection, CNN TensorFlow/Keras, pembersihan dataset medis, evaluasi model klasifikasi (Random Forest, SVM), dan Google Colab.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-5">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-orange-600 font-bold">03</span>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100">IoT & Integrasi Sistem Data</h4>
                      <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                        Mikrokontroler ESP32, RFID RC522, sensor Load Cell HX711, WebRTC P2P DataChannel, Firebase Realtime Database, SQLite, dan REST API.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-5 last:pb-0">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-orange-600 font-bold">04</span>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100">Tools & Administrasi</h4>
                      <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                        VS Code, Git, GitHub, Electron, Android Studio, Postman. Terbiasa menggunakan Microsoft Access, Word, Excel, dan PowerPoint untuk administrasi dan pengolahan data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: PENDIDIKAN & PUBLIKASI */}
        <section className="border-t border-stone-200 dark:border-stone-800 py-20">
          <div className="max-w-5xl mx-auto px-5">
            <span className="text-xs font-mono font-semibold tracking-wider text-orange-600 dark:text-orange-500 uppercase">
              04 / Pendidikan & Publikasi
            </span>
            <h2 className="font-heading text-3xl font-bold text-stone-900 dark:text-stone-100 mt-2 mb-10">
              Latar Belakang Akademik
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                <p className="text-xs font-mono text-stone-500">2022—2026 · Bandung, Jawa Barat</p>
                <h3 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100">S1 Sistem Komputer</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Universitas Komputer Indonesia (UNIKOM) · <strong className="text-stone-900 dark:text-stone-100">IPK 3,53</strong>
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                <p className="text-xs font-mono text-stone-500">Publikasi Ilmiah Nasional</p>
                <h3 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100">2 Artikel Jurnal</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Prediksi Penyakit Liver (Komputika) & Point of Sale UMKM ESP32 (Biner).
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-orange-600">
                  <a href="https://doi.org/10.34010/komputika.v15i1.19799" target="_blank" rel="noreferrer" className="hover:underline">Jurnal Komputika ↗</a>
                  <span>·</span>
                  <a href="https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/" target="_blank" rel="noreferrer" className="hover:underline">Jurnal Biner ↗</a>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                <p className="text-xs font-mono text-stone-500">Sertifikasi Kompetensi</p>
                <h3 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100">Google & Cisco</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Gemini Certified Student — University & Cisco CCNA: Introduction to Networks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05: KONTAK & FEEDBACK TELEGRAM */}
        <section id="contact" className="border-t border-stone-200 dark:border-stone-800 py-20 bg-stone-900 text-stone-100">
          <div className="max-w-5xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Info Kontak Kiri */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-mono font-semibold tracking-wider text-orange-400 uppercase">
                  Kontak
                </span>
                <h2 className="font-heading text-4xl font-extrabold tracking-tight">
                  Hubungi saya.
                </h2>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Untuk diskusi proyek, peluang kerja, kolaborasi riset, atau pertanyaan lainnya, silakan hubungi saya melalui kanal di bawah.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href="https://wa.me/6289630887748"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700/60 hover:border-orange-500 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[11px] text-stone-400">WhatsApp</p>
                      <p className="text-xs font-bold text-white">+62 896-3088-7748</p>
                    </div>
                    <Phone className="w-4 h-4 text-orange-400" />
                  </a>

                  <a
                    href="mailto:septiaedvan@gmail.com"
                    className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700/60 hover:border-orange-500 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[11px] text-stone-400">Email</p>
                      <p className="text-xs font-bold text-white">septiaedvan@gmail.com</p>
                    </div>
                    <Mail className="w-4 h-4 text-orange-400" />
                  </a>

                  <a
                    href="https://github.com/EdvanVPRoject"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700/60 hover:border-orange-500 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[11px] text-stone-400">GitHub</p>
                      <p className="text-xs font-bold text-white">EdvanVPRoject</p>
                    </div>
                    <Github className="w-4 h-4 text-orange-400" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/edvannuriana"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700/60 hover:border-orange-500 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[11px] text-stone-400">LinkedIn</p>
                      <p className="text-xs font-bold text-white">edvannuriana</p>
                    </div>
                    <Linkedin className="w-4 h-4 text-orange-400" />
                  </a>
                </div>
              </div>

              {/* Form Feedback Terintegrasi Telegram Kanan */}
              <div id="feedback" className="lg:col-span-7">
                <div className="bg-stone-800/90 border border-stone-700/70 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl"></div>

                  <div className="mb-6 space-y-1">
                    <span className="text-[11px] font-mono font-semibold tracking-wider text-orange-400 uppercase">
                      Feedback Langsung ke Telegram
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-white">
                      Bagaimana kesan Anda?
                    </h3>
                    <p className="text-xs text-stone-400">
                      Beri rating dan masukan. Pesan akan langsung diteruskan ke bot Telegram pribadi saya.
                    </p>
                  </div>

                  {formStatus === 'success' ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-heading font-bold text-lg text-white">Terima Kasih Banyak!</h4>
                      <p className="text-sm text-stone-300 max-w-sm mx-auto">
                        Feedback Anda telah berhasil dikirimkan secara instan ke Telegram saya.
                      </p>
                      <button
                        onClick={() => setFormStatus('idle')}
                        className="text-xs font-semibold text-orange-400 hover:underline pt-2"
                      >
                        Kirim ulasan lain ↗
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                      {/* Rating Bintang */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-2">
                          Rating Anda ({rating}/5)
                        </label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="p-1 text-stone-500 hover:text-amber-400 transition-colors focus:outline-none"
                            >
                              <Star
                                className={`w-7 h-7 ${
                                  star <= rating
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-stone-600'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Nama */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-stone-300 mb-1.5">
                          Nama <span className="text-stone-500 font-normal">(opsional)</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nama Anda atau institusi"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-900 border border-stone-700 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>

                      {/* Komentar */}
                      <div>
                        <label htmlFor="comment" className="block text-xs font-semibold text-stone-300 mb-1.5">
                          Komentar / Masukan <span className="text-orange-400">*</span>
                        </label>
                        <textarea
                          id="comment"
                          rows={4}
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Tulis ulasan, kritik, saran, atau penawaran kolaborasi..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-900 border border-stone-700 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                        ></textarea>
                      </div>

                      {formStatus === 'error' && (
                        <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-900">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errorMessage || 'Gagal mengirim pesan.'}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                      >
                        {formStatus === 'loading' ? (
                          <span>Mengirim ke Telegram...</span>
                        ) : (
                          <>
                            <span>Kirim Feedback</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 dark:border-stone-800 py-8 bg-stone-50 dark:bg-stone-950 text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Edvan Nuriana Putra Septia · Portofolio Pribadi</p>
          <a href="#top" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">
            Kembali ke atas ↑
          </a>
        </div>
      </footer>

      {/* MODAL DETAIL PROYEK */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="fixed inset-0" 
            onClick={() => setActiveModalProject(null)}
          ></div>

          <div className="relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl z-10 space-y-5">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <p className="text-xs font-mono font-semibold tracking-wider text-orange-600 dark:text-orange-400 uppercase">
                {activeModalProject.modalDetails.kicker}
              </p>
              <h3 className="font-heading font-bold text-2xl text-stone-900 dark:text-stone-100 mt-1">
                {activeModalProject.modalDetails.title}
              </h3>
            </div>

            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {activeModalProject.modalDetails.summary}
            </p>

            {activeModalProject.modalDetails.bullets && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">
                  Rincian Teknis & Alur
                </h4>
                <ul className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-1.5 list-disc list-inside">
                  {activeModalProject.modalDetails.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-1 bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-200 dark:border-stone-800 text-xs sm:text-sm">
              <h4 className="font-bold text-stone-900 dark:text-stone-100">Hasil & Evaluasi:</h4>
              <p className="text-stone-600 dark:text-stone-300">
                {activeModalProject.modalDetails.results}
              </p>
              {activeModalProject.modalDetails.note && (
                <p className="text-[11px] text-stone-500 italic pt-1">
                  Catatan: {activeModalProject.modalDetails.note}
                </p>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> Buka Repositori GitHub ↗
                </a>
              )}

              {activeModalProject.externalUrl && (
                <a
                  href={activeModalProject.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-orange-600 text-white text-xs font-bold hover:bg-orange-500 transition-colors inline-flex items-center gap-1.5"
                >
                  {activeModalProject.externalLabel || 'Lihat Publikasi ↗'}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
