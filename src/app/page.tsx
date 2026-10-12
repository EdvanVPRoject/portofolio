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
  Check, 
  Mail, 
  Phone, 
  FileText
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

interface Project {
  id: string;
  category: string;
  year: string;
  title: string;
  description: string;
  image: string;
  imageType: 'image' | 'encross' | 'enclip';
  badgeLabel?: string;
  tech: string;
  githubUrl?: string;
  externalUrl?: string;
  externalLabel?: string;
  modalDetails: {
    kicker: string;
    title: string;
    summary: string;
    bullets?: string[];
    results: string;
    note?: string;
  };
}

const projectsData: Project[] = [
  {
    id: 'enclip',
    category: 'Aplikasi Desktop & AI',
    year: '2026',
    title: 'ENCLip — Native AI Video Clipper & Subtitle Generator',
    description: 'Aplikasi desktop Windows untuk pemotongan video berdurasi panjang menjadi klip vertikal viral (Shorts, TikTok, Reels) otomatis dengan transkripsi AI dan pembuatan subtitle dinamis.',
    image: '/enclip-icon.png',
    imageType: 'enclip',
    badgeLabel: 'AI & PyQt6',
    tech: 'Python · PyQt6 · Faster-Whisper · Qwen 2.5 GGUF · Gemini API · FFmpeg',
    githubUrl: 'https://github.com/EdvanVPRoject/ENCLip',
    externalUrl: 'https://github.com/EdvanVPRoject/ENCLip/releases/latest',
    externalLabel: 'Rilis .exe ↗',
    modalDetails: {
      kicker: 'Aplikasi Desktop Native · 2026',
      title: 'ENCLip — Native AI Video Clipper & Subtitle Generator',
      summary: 'Aplikasi desktop Windows yang dirancang untuk mempermudah kreator konten dan video editor dalam memotong video berdurasi panjang menjadi klip highlight vertikal secara otomatis dengan transkripsi AI dan pembuatan subtitle dinamis tanpa biaya langganan cloud.',
      bullets: [
        'Dukungan Hybrid AI: Mendukung model lokal 100% offline (Faster-Whisper & Qwen 2.5 GGUF) untuk privasi data penuh, serta integrasi Cloud via Google Gemini 3.8 Flash.',
        'Deteksi Momen Cerdas: Algoritma AI mendeteksi hook video, reaksi streamer, punchline humor, dan materi penting secara otomatis.',
        'Format & Auto-Framing Fleksibel: Menghasilkan rasio 9:16 (Shorts/TikTok), 16:9, 1:1, dan 4:3 dengan fitur smart background blur.',
        'Styling Subtitle Dinamis (Hardsub): 7+ preset gaya subtitle (Karaoke, Neon, Highlight, Box) dengan posisi teks yang dapat diseret bebas pada preview video.',
        'Akselerasi GPU & Render Cepat: Memanfaatkan encoder perangkat keras (Nvidia NVENC, Intel QSV, AMD AMF) untuk pemrosesan video ultra-cepat tanpa pop-up terminal CMD.',
        'Distribusi Siap Pakai: Tersedia paket rilis portabel Windows (.exe) tanpa memerlukan instalasi dependensi Python terpisah.'
      ],
      results: 'Mampu mentranskripsi dan merender klip video vertikal siap unggah dalam hitungan menit secara offline tanpa watermark dan tanpa biaya langganan.',
      note: 'Source code dan installer Windows (.exe) tersedia publik di GitHub Releases.'
    }
  },
  {
    id: 'encross',
    category: 'Aplikasi Desktop & Mobile',
    year: '2026',
    title: 'ENCross — High-Speed Local File & Screen Sharing',
    description: 'Aplikasi transfer berkas dan berbagi layar lokal P2P berkecepatan tinggi lintas-platform (Windows & Android) tanpa kuota internet dan tanpa server perantara, memanfaatkan protokol WebRTC DataChannel.',
    image: '/encross-logo.png',
    imageType: 'encross',
    badgeLabel: 'P2P WebRTC',
    tech: 'React 19 · WebRTC · Electron · Capacitor · Tailwind CSS',
    githubUrl: 'https://github.com/EdvanVPRoject/ENCross',
    modalDetails: {
      kicker: 'Aplikasi Cross-Platform · 2026',
      title: 'ENCross — High-Speed Local File & Screen Sharing',
      summary: 'Aplikasi transfer berkas dan screen sharing antar-perangkat lokal (Windows, Android, dan Browser) berkecepatan tinggi tanpa kuota internet dan tanpa server perantara pihak ketiga.',
      bullets: [
        'Direct P2P DataChannel: Berkas dialirkan langsung antar-memori perangkat via WebRTC dengan pembagian chunk 64KB dan mekanisme flow control buffer.',
        'Zero Cloud Storage: Data tidak pernah melewati server publik, menjamin privasi penuh dan throughput maksimal jaringan lokal.',
        'Pairing Cepat QR Code: Perangkat host menampilkan QR Code IP lokal, perangkat kedua memindai dan modal langsung tertutup otomatis begitu tersambung.',
        'Screen Share Real-Time: Berbagi layar monitor secara langsung dengan latensi ultra-rendah melalui WebRTC MediaStream.',
        'Sinkronisasi Teks & Clipboard: Mengirim catatan atau tautan seketika antar-perangkat dengan deteksi URL otomatis.',
        'Cross-Platform: Tersedia sebagai aplikasi desktop Windows (Electron), aplikasi Android native (Capacitor APK), dan Web (PWA).'
      ],
      results: 'Mencapai kecepatan transfer mendekati batas fisik throughput Wi-Fi lokal tanpa konsumsi kuota internet.'
    }
  },
  {
    id: 'parking',
    category: 'Skripsi & Penelitian',
    year: '2025—2026',
    title: 'Parkir Pintar dan Pengenalan Pelat Nomor',
    description: 'Sistem validasi akses gerbang parkir dengan autentikasi ganda: identifikasi pengguna via RFID e-KTP dan verifikasi kendaraan menggunakan deteksi YOLOv8 serta OCR CNN berbasis ESP32.',
    image: '/parking-process-blurred.png',
    imageType: 'image',
    tech: 'YOLOv8 Nano · TensorFlow CNN · ESP32 · SQLite · Firebase',
    githubUrl: 'https://github.com/EdvanVPRoject/Sistem-parkir-pintar-berbasis-visi-komputer-berbasis-iot-menggunakan-metode-yolo',
    modalDetails: {
      kicker: 'Skripsi · 2025—2026',
      title: 'Parkir Pintar dan Pengenalan Pelat Nomor Berbasis Visi Komputer & IoT',
      summary: 'Penelitian perancangan sistem parkir cerdas dengan validasi ganda. UID e-KTP memvalidasi identitas pengguna, sedangkan visi komputer memastikan kesesuaian pelat nomor kendaraan yang terdaftar.',
      bullets: [
        'RFID RC522 membaca UID e-KTP melalui mikrokontroler ESP32 di gerbang masuk.',
        'YOLOv8 Nano melokalisasi area pelat nomor kendaraan secara real-time dari tangkapan kamera.',
        'Model CNN berbasis TensorFlow mengidentifikasi karakter huruf dan angka pelat.',
        'Basis data SQLite mengelola transaksi lokal, sementara Firebase Realtime Database memfasilitasi pemantauan jarak jauh.'
      ],
      results: 'Pembacaan RFID berhasil 100% (55 dari 55 pengujian). Model YOLOv8 Nano mencapai mAP@0.50 sebesar 98,51% dan mAP@0.50:0.95 sebesar 92,99%. Model pengenalan karakter CNN meraih akurasi validasi 88,07%.',
      note: 'Fokus penelitian menitikberatkan pada validasi akses, deteksi karakter pelat, dan monitoring data transaksi.'
    }
  },
  {
    id: 'liver',
    category: 'Publikasi Ilmiah',
    year: '2025—2026',
    title: 'Prediksi Penyakit Liver dengan Model Perbandingan',
    description: 'Komparasi performa algoritma Machine Learning (Random Forest, SVM, Logistic Regression) untuk klasifikasi risiko penyakit liver dari rekam medis pasien yang dipublikasikan pada Jurnal Komputika.',
    image: '/journal-liver.jpg',
    imageType: 'image',
    tech: 'Random Forest · SVM · Logistic Regression · Scikit-Learn',
    externalUrl: 'https://doi.org/10.34010/komputika.v15i1.19799',
    externalLabel: 'Publikasi Jurnal Komputika ↗',
    modalDetails: {
      kicker: 'Publikasi Ilmiah · Jurnal Komputika',
      title: 'Prediksi Penyakit Liver Menggunakan Model Perbandingan',
      summary: 'Studi komparasi performa algoritma klasifikasi pada 579 data rekam medis pasien guna memprediksi kecenderungan penyakit liver sedini mungkin.',
      bullets: [
        'Pembersihan data medis, penanganan missing values, dan standarisasi variabel klinis.',
        'Pengujian berbagai skenario pembagian data latih dan data uji (70:30, 80:20, 90:10).',
        'Evaluasi model menggunakan metrik Accuracy, F1-Score, dan Matthews Correlation Coefficient (MCC).'
      ],
      results: 'Random Forest mencatatkan performa terbaik pada rasio data 80% dengan F1-Score 0,696 dan MCC 0,203, serta mencapai kesesuaian prediksi 98% pada pengujian sampel data baru.'
    }
  },
  {
    id: 'pos',
    category: 'Proyek Akademik',
    year: '2024—2025',
    title: 'Sistem Point of Sale Berbasis ESP32 dan Sensor Load Cell',
    description: 'Perancangan hardware timbangan digital terintegrasi aplikasi kasir untuk otomatisasi pencatatan bobot dan transaksi UMKM yang dipublikasikan pada Jurnal Biner.',
    image: '/journal-pos.jpg',
    imageType: 'image',
    tech: 'ESP32 · Sensor Load Cell HX711 · Web Application',
    externalUrl: 'https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/',
    externalLabel: 'Publikasi Jurnal Biner ↗',
    modalDetails: {
      kicker: 'Proyek Akademik · Jurnal Biner',
      title: 'Implementasi Sistem Point of Sale pada UMKM Berbasis ESP32 dan Sensor Load Cell',
      summary: 'Perancangan prototipe perangkat kasir pintar yang menghubungkan sensor timbangan digital langsung ke sistem pencatatan transaksi kasir.',
      bullets: [
        'Integrasi mikrokontroler ESP32 dengan modul ADC sensor Load Cell HX711.',
        'Pengiriman nilai bobot timbangan secara langsung ke sistem POS untuk eliminasi kesalahan input manual.',
        'Penyusunan antarmuka web kasir untuk transaksi dan manajemen inventaris produk curah.'
      ],
      results: 'Prototipe timbangan menghasilkan akurasi pengukuran di atas 98%, mempercepat alur transaksi kasir, dan meniadakan selisih hitung manual.'
    }
  }
];

export default function PortfolioPage() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<'top' | 'about' | 'projects' | 'skills' | 'academic' | 'contact'>('top');

  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Sinkronisasi tema
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkTheme = saved === 'dark' || (!saved && prefersDark);
    setIsDark(isDarkTheme);
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Scrollspy to track current active section
  useEffect(() => {
    const sectionIds: ('top' | 'about' | 'projects' | 'skills' | 'academic' | 'contact')[] = [
      'top', 'about', 'projects', 'skills', 'academic', 'contact'
    ];
    
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-25% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const nextDark = !isCurrentlyDark;
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
        throw new Error(data.error || 'Gagal mengirim ulasan');
      }

      setFormStatus('success');
      setName('');
      setComment('');
      setRating(5);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kendala jaringan.';
      setFormStatus('error');
      setErrorMessage(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#faf9f6] text-neutral-900 dark:bg-[#0c0c0e] dark:text-neutral-100 transition-colors duration-200">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#faf9f6]/90 dark:bg-[#0c0c0e]/90 backdrop-blur-md border-b border-neutral-200/70 dark:border-neutral-800/70">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="font-heading font-bold text-lg tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Edvan Nuriana<span className="text-blue-600 dark:text-blue-400">.</span>
            </span>
            <span className="text-[11px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60 hidden sm:inline-block">
              Portfolio
            </span>
          </a>

          {/* Desktop Navigation with Active Section Indicator Dot */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <a 
              href="#about" 
              className={`inline-flex items-center gap-1.5 transition-colors ${activeSection === 'about' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-neutral-900 dark:hover:text-neutral-100'}`}
            >
              {activeSection === 'about' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
              )}
              Tentang
            </a>

            <a 
              href="#projects" 
              className={`inline-flex items-center gap-1.5 transition-colors ${activeSection === 'projects' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-neutral-900 dark:hover:text-neutral-100'}`}
            >
              {activeSection === 'projects' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
              )}
              Proyek
            </a>

            <a 
              href="#skills" 
              className={`inline-flex items-center gap-1.5 transition-colors ${activeSection === 'skills' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-neutral-900 dark:hover:text-neutral-100'}`}
            >
              {activeSection === 'skills' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
              )}
              Keahlian
            </a>

            <a 
              href="#contact" 
              className={`inline-flex items-center gap-1.5 transition-colors ${activeSection === 'contact' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'hover:text-neutral-900 dark:hover:text-neutral-100'}`}
            >
              {activeSection === 'contact' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
              )}
              Kontak
            </a>

            <a 
              href="#feedback"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-all"
            >
              Ulasan ↗
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Ganti mode tema"
              className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 dark:text-neutral-300"
              aria-label="Toggle navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-[#faf9f6] dark:bg-[#0c0c0e] px-6 py-6 flex flex-col gap-4 text-xs font-mono uppercase tracking-wider">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-2 py-1 ${activeSection === 'about' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}>
              {activeSection === 'about' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>} Tentang
            </a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-2 py-1 ${activeSection === 'projects' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}>
              {activeSection === 'projects' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>} Proyek
            </a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-2 py-1 ${activeSection === 'skills' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}>
              {activeSection === 'skills' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>} Keahlian
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-2 py-1 ${activeSection === 'contact' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}>
              {activeSection === 'contact' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>} Kontak
            </a>
            <a href="#feedback" onClick={() => setMobileMenuOpen(false)} className="text-blue-600 dark:text-blue-400 font-bold py-1">Kirim Ulasan Telegram ↗</a>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="top" className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="md:col-span-7 lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <p className="text-xs font-mono tracking-widest uppercase text-blue-700 dark:text-blue-400 font-medium">
                  Sumedang, Indonesia · UNIKOM 2026
                </p>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.2]">
                Membangun solusi rekayasa komputasi, visi komputer, dan sistem aplikasi terdistribusi.
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-light max-w-2xl text-justify">
                Saya Edvan Nuriana Putra Septia, S.Kom., lulusan Sistem Komputer dari Universitas Komputer Indonesia. Berfokus pada perancangan arsitektur perangkat lunak terapan—mulai dari aplikasi desktop AI video clipper otomatis (ENCLip), transfer berkas lokal P2P berkecepatan tinggi via WebRTC (ENCross), sistem otentikasi visi komputer berbasis YOLOv8 dan IoT (Skripsi Parkir Pintar), komparasi algoritma machine learning pada data medis (Jurnal Komputika), hingga instrumentasi cerdas berbasis ESP32 (Jurnal Biner).
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider font-medium">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  Eksplorasi Proyek <ArrowDown className="w-3.5 h-3.5" />
                </a>

                <a
                  href="/cv-edvan.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Unduh CV <span>↗</span>
                </a>

                <a
                  href="mailto:septiaedvan@gmail.com"
                  className="px-3 py-3 text-neutral-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                >
                  Kirim Email <span>↗</span>
                </a>
              </div>
            </div>

            {/* Profile Photo - Rata Tengah (Center Aligned) */}
            <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
              <div className="w-52 sm:w-60 space-y-3 flex flex-col items-center">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm">
                  <Image
                    src="/profile.jpeg"
                    alt="Edvan Nuriana Putra Septia, S.Kom."
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 208px, 240px"
                  />
                </div>
                <div className="text-center text-xs w-full">
                  <p className="font-sans font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                    Edvan Nuriana Putra Septia, S.Kom.
                  </p>
                  <p className="font-mono text-neutral-500 dark:text-neutral-400 mt-1 text-[11px]">
                    S1 Sistem Komputer UNIKOM · IPK 3.53
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 01: TENTANG */}
        <section id="about" className="border-t border-neutral-200 dark:border-neutral-800/80 py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Label dengan Indikator Bulat Scrollspy */}
              <div className="md:col-span-4 lg:col-span-3">
                <div className="flex items-center gap-2 sticky top-24">
                  <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSection === 'about' ? 'bg-blue-600 dark:bg-blue-400 scale-125 shadow-sm shadow-blue-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}></span>
                  <span className={`text-sm sm:text-base font-mono uppercase tracking-wider transition-colors ${activeSection === 'about' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    01 / Tentang Saya
                  </span>
                </div>
              </div>

              <div className="md:col-span-8 lg:col-span-9 space-y-5 text-neutral-700 dark:text-neutral-300 text-base leading-relaxed font-light">
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white leading-snug">
                  Dedikasi pada integrasi rekayasa perangkat lunak, komputasi cerdas, dan sistem tertanam.
                </h2>
                <p className="text-justify">
                  Sebagai Sarjana Komputer lulusan Universitas Komputer Indonesia (UNIKOM) dengan IPK 3.53, saya berfokus pada rekayasa sistem yang menghubungkan komputasi perangkat keras cerdas dan arsitektur perangkat lunak modern. Portofolio saya mencakup solusi teknologi yang telah teruji secara fungsional maupun empiris melalui publikasi ilmiah di jurnal nasional.
                </p>
                <p className="text-justify">
                  Keahlian teknis saya terwujud nyata dalam perancangan aplikasi desktop AI <strong>ENCLip</strong> (video clipper & subtitle generator otomatis), aplikasi <strong>ENCross</strong> (berbagi berkas & layar P2P lokal dengan WebRTC tanpa server), riset skripsi <strong>Sistem Parkir Pintar</strong> (otentikasi ganda RFID e-KTP dan deteksi pelat nomor YOLOv8 serta OCR CNN), publikasi <strong>Machine Learning klasifikasi penyakit liver</strong> di Jurnal Komputika, serta prototipe <strong>Sistem Kasir POS UMKM</strong> berbasis mikrokontroler ESP32 dan sensor Load Cell di Jurnal Biner.
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.linkedin.com/in/edvannuriana"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Profil LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: PROYEK */}
        <section id="projects" className="border-t border-neutral-200 dark:border-neutral-800/80 py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSection === 'projects' ? 'bg-blue-600 dark:bg-blue-400 scale-125 shadow-sm shadow-blue-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}></span>
                  <span className={`text-sm sm:text-base font-mono uppercase tracking-wider transition-colors ${activeSection === 'projects' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    02 / Proyek & Riset
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white mt-2">
                  Proyek yang Saya Kerjakan
                </h2>
              </div>
              <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                5 Dokumentasi Lengkap
              </p>
            </div>

            {/* Grid 2 Kolom Seimbang di Layar Lebar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsData.map((project) => (
                <article
                  key={project.id}
                  className="group border border-neutral-200/80 dark:border-neutral-800/80 rounded-xl bg-white dark:bg-[#121215] overflow-hidden hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    {/* Media Preview Frame */}
                    <div className="relative aspect-[16/10] bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden flex items-center justify-center">
                      {project.imageType === 'encross' || project.imageType === 'enclip' ? (
                        <div className="w-full h-full bg-[#0a0a0c] flex items-center justify-center p-8 relative">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-2xl overflow-hidden shadow-lg border border-neutral-800/80 bg-neutral-900/60 flex items-center justify-center p-1">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-contain rounded-xl"
                            />
                          </div>
                          <span className="absolute bottom-3 right-3 text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-400 border border-blue-800/60">
                            {project.badgeLabel || (project.imageType === 'encross' ? 'P2P WebRTC' : 'AI & PyQt6')}
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-102 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      )}
                    </div>

                    {/* Metadata & Deskripsi */}
                    <div className="p-6 sm:p-7 space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{project.category}</span>
                        <span className="text-neutral-400 dark:text-neutral-500">{project.year}</span>
                      </div>

                      <h3 className="font-heading font-semibold text-xl text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-light text-justify">
                        {project.description}
                      </p>

                      <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 pt-2">
                        {project.tech}
                      </p>
                    </div>
                  </div>

                  {/* Tautan Aksi Bawah */}
                  <div className="p-6 sm:p-7 pt-0 border-t border-neutral-100 dark:border-neutral-800/70 flex items-center gap-5 text-xs font-mono uppercase tracking-wider mt-4">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="text-neutral-900 dark:text-neutral-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400 hover:underline inline-flex items-center gap-1 transition-colors"
                    >
                      Rincian Proyek <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1.5 ml-auto transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> GitHub ↗
                      </a>
                    )}

                    {project.externalUrl && (
                      <a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 ml-auto transition-colors"
                      >
                        {project.externalLabel || 'Publikasi ↗'}
                      </a>
                    )}
                  </div>

                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 03: KEAHLIAN */}
        <section id="skills" className="border-t border-neutral-200 dark:border-neutral-800/80 py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              <div className="md:col-span-4 lg:col-span-3">
                <div className="flex items-center gap-2 sticky top-24">
                  <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSection === 'skills' ? 'bg-blue-600 dark:bg-blue-400 scale-125 shadow-sm shadow-blue-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}></span>
                  <span className={`text-sm sm:text-base font-mono uppercase tracking-wider transition-colors ${activeSection === 'skills' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    03 / Keahlian
                  </span>
                </div>
              </div>

              <div className="md:col-span-8 lg:col-span-9 divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
                <div className="pb-6">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0"></span>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-heading font-semibold text-base sm:text-lg text-neutral-900 dark:text-white">
                        Rekayasa Perangkat Lunak
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed text-justify">
                        Python, TypeScript, JavaScript, C++, C, PyQt6, React 19, Next.js, Tailwind CSS, Electron, dan FFmpeg untuk pengembangan lintas-platform.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-6">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0"></span>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-heading font-semibold text-base sm:text-lg text-neutral-900 dark:text-white">
                        Computer Vision & Data Medis
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed text-justify">
                        YOLOv8 Object Detection, arsitektur CNN TensorFlow/Keras, pemodelan klasifikasi tabular (Random Forest, SVM, Logistic Regression).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-6">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0"></span>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-heading font-semibold text-base sm:text-lg text-neutral-900 dark:text-white">
                        Sistem Tertanam & IoT
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed text-justify">
                        ESP32, modul RFID RC522, sensor Load Cell & modul HX711, WebRTC RTCDataChannel P2P, Firebase Realtime Database, SQLite.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0"></span>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-heading font-semibold text-base sm:text-lg text-neutral-900 dark:text-white">
                        Peralatan Pendukung
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed text-justify">
                        Git, GitHub, VS Code, Postman, Android Studio, serta kemahiran administrasi data menggunakan paket Microsoft Office.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: PENDIDIKAN & PUBLIKASI */}
        <section id="academic" className="border-t border-neutral-200 dark:border-neutral-800/80 py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              <div className="md:col-span-4 lg:col-span-3">
                <div className="flex items-center gap-2 sticky top-24">
                  <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSection === 'academic' ? 'bg-blue-600 dark:bg-blue-400 scale-125 shadow-sm shadow-blue-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}></span>
                  <span className={`text-sm sm:text-base font-mono uppercase tracking-wider transition-colors ${activeSection === 'academic' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    04 / Akademik & Publikasi
                  </span>
                </div>
              </div>

              <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                <div className="space-y-1.5 border-l-2 border-blue-500/40 pl-4">
                  <p className="text-xs font-mono text-neutral-400">2022—2026</p>
                  <h3 className="font-heading font-semibold text-base text-neutral-900 dark:text-white">S1 Sistem Komputer</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 font-light">Universitas Komputer Indonesia (UNIKOM)</p>
                  <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-medium">Indeks Prestasi Kumulatif: 3,53</p>
                </div>

                <div className="space-y-1.5 border-l-2 border-blue-500/40 pl-4">
                  <p className="text-xs font-mono text-neutral-400">Publikasi Nasional</p>
                  <h3 className="font-heading font-semibold text-base text-neutral-900 dark:text-white">2 Artikel Jurnal Ilmiah</h3>
                  <div className="text-xs font-mono space-y-1 pt-1 text-blue-600 dark:text-blue-400">
                    <p><a href="https://doi.org/10.34010/komputika.v15i1.19799" target="_blank" rel="noreferrer" className="underline hover:text-neutral-900 dark:hover:text-neutral-100">Jurnal Komputika (Prediksi Liver) ↗</a></p>
                    <p><a href="https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/" target="_blank" rel="noreferrer" className="underline hover:text-neutral-900 dark:hover:text-neutral-100">Jurnal Biner (POS ESP32) ↗</a></p>
                  </div>
                </div>

                <div className="space-y-1.5 border-l-2 border-blue-500/40 pl-4 sm:col-span-2">
                  <p className="text-xs font-mono text-neutral-400">Sertifikasi Resmi</p>
                  <p className="text-neutral-800 dark:text-neutral-200 font-medium">Google Gemini Certified Student — University · Cisco CCNA: Introduction to Networks</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05: KONTAK & FEEDBACK */}
        <section id="contact" className="border-t border-neutral-200 dark:border-neutral-800/80 py-20 bg-neutral-100/60 dark:bg-[#0f0f12]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              
              {/* Kontak Personal Kiri */}
              <div className="md:col-span-5 space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSection === 'contact' ? 'bg-blue-600 dark:bg-blue-400 scale-125 shadow-sm shadow-blue-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}></span>
                    <span className={`text-sm sm:text-base font-mono uppercase tracking-wider transition-colors ${activeSection === 'contact' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-neutral-400 dark:text-neutral-500'}`}>
                      05 / Kontak & Ulasan
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl font-semibold text-neutral-900 dark:text-white mt-2">
                    Hubungi Saya
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 font-light leading-relaxed text-justify">
                    Terbuka untuk diskusi proyek rekayasa perangkat lunak, tawaran peluang kerja, atau kolaborasi penelitian.
                  </p>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <a
                    href="https://wa.me/6289630887748"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span className="text-neutral-500">WhatsApp</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">+62 896-3088-7748</span>
                  </a>

                  <a
                    href="mailto:septiaedvan@gmail.com"
                    className="flex items-center justify-between p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span className="text-neutral-500">Email</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">septiaedvan@gmail.com</span>
                  </a>

                  <a
                    href="https://github.com/EdvanVPRoject"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span className="text-neutral-500">GitHub</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">EdvanVPRoject</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/edvannuriana"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span className="text-neutral-500">LinkedIn</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">edvannuriana</span>
                  </a>
                </div>
              </div>

              {/* Form Feedback Terintegrasi Telegram Kanan */}
              <div id="feedback" className="md:col-span-7">
                <div className="p-6 sm:p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                  
                  <div className="mb-5">
                    <p className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
                      Buku Tamu & Feedback
                    </p>
                    <h3 className="font-heading font-semibold text-lg text-neutral-900 dark:text-white mt-1">
                      Kesan & Catatan Pengunjung
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 text-justify">
                      Pesan Anda akan langsung diteruskan secara instan ke bot Telegram pribadi saya.
                    </p>
                  </div>

                  {formStatus === 'success' ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full border border-blue-500 flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
                        <Check className="w-5 h-5" />
                      </div>
                      <p className="font-heading font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                        Terima kasih atas ulasan Anda.
                      </p>
                      <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                        Pemberitahuan telah terkirim ke Telegram.
                      </p>
                      <button
                        onClick={() => setFormStatus('idle')}
                        className="text-xs font-mono underline text-blue-600 dark:text-blue-400 hover:underline pt-2"
                      >
                        Kirim catatan baru ↗
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                      
                      {/* Rating Minimalis */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
                          <span>Penilaian</span>
                          <span>{rating} dari 5 Bintang</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="p-1 text-neutral-300 dark:text-neutral-700 hover:text-amber-400 dark:hover:text-amber-400 transition-colors focus:outline-none"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= rating
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'currentColor'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Nama */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-mono text-neutral-500 mb-1">
                          Nama atau Organisasi (opsional)
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Anonim"
                          className="w-full px-3.5 py-2.5 rounded-md bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                        />
                      </div>

                      {/* Komentar */}
                      <div>
                        <label htmlFor="comment" className="block text-xs font-mono text-neutral-500 mb-1">
                          Pesan / Masukan <span className="text-blue-600 dark:text-blue-400">*</span>
                        </label>
                        <textarea
                          id="comment"
                          rows={3}
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Tulis ulasan, umpan balik, atau ajakan diskusi..."
                          className="w-full px-3.5 py-2.5 rounded-md bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors resize-none"
                        ></textarea>
                      </div>

                      {formStatus === 'error' && (
                        <p className="text-xs font-mono text-rose-500">
                          {errorMessage || 'Gagal mengirim ulasan.'}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors disabled:opacity-50 shadow-sm"
                      >
                        {formStatus === 'loading' ? 'Mengirim...' : 'Kirim Ulasan ↗'}
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
      <footer className="border-t border-neutral-200 dark:border-neutral-800/80 py-8 text-xs font-mono text-neutral-400 dark:text-neutral-600">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Edvan Nuriana Putra Septia · Portofolio Pribadi</p>
          <a href="#top" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Kembali ke atas ↑
          </a>
        </div>
      </footer>

      {/* MODAL DETAIL PROYEK - CLEAN DIALOG */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="fixed inset-0" 
            onClick={() => setActiveModalProject(null)}
          ></div>

          <div className="relative bg-white dark:bg-[#121215] border border-neutral-200 dark:border-neutral-800 rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 sm:p-7 shadow-xl z-10 space-y-5">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <p className="text-[11px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
                {activeModalProject.modalDetails.kicker}
              </p>
              <h3 className="font-heading font-semibold text-xl text-neutral-900 dark:text-white mt-1">
                {activeModalProject.modalDetails.title}
              </h3>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light text-justify">
              {activeModalProject.modalDetails.summary}
            </p>

            {activeModalProject.modalDetails.bullets && (
              <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Tahapan Sistem
                </h4>
                <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1.5 list-disc list-inside font-light">
                  {activeModalProject.modalDetails.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-3.5 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-xs space-y-1">
              <p className="font-medium text-neutral-900 dark:text-white font-mono">Hasil Pengujian:</p>
              <p className="text-neutral-600 dark:text-neutral-300 font-light text-justify">
                {activeModalProject.modalDetails.results}
              </p>
              {activeModalProject.modalDetails.note && (
                <p className="text-[11px] text-neutral-400 italic pt-1 text-justify">
                  Catatan: {activeModalProject.modalDetails.note}
                </p>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 text-xs font-mono uppercase tracking-wider">
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors inline-flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> Buka GitHub ↗
                </a>
              )}

              {activeModalProject.externalUrl && (
                <a
                  href={activeModalProject.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                >
                  {activeModalProject.externalLabel || 'Buka Jurnal ↗'}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
