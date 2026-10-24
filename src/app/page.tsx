'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowUpRight, ArrowUp } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'about', label: 'Tentang' },
  { id: 'projects', label: 'Proyek' },
  { id: 'skills', label: 'Keahlian' },
  { id: 'academic', label: 'Akademik' },
  { id: 'contact', label: 'Kontak' },
];

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
      'Aplikasi desktop Windows untuk otomasi pemotongan video panjang menjadi klip vertikal siap posting (Shorts/Reels/TikTok) dengan transkripsi AI dan subtitle dinamis.',
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
      'Aplikasi transfer berkas besar dan screen sharing lintas-perangkat (Windows & Android) berkecepatan tinggi via WebRTC P2P lokal tanpa kuota internet dan server perantara.',
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
  {
    id: 'eninformasi',
    title: 'EnInformasi Hub — Portal Wawasan AI, Komputasi & Tutorial Praktis',
    tagline: 'Platform Edukasi & Publikasi Web · Bilingual ID/EN',
    year: '2026',
    badge: 'Next.js & Cloudflare',
    category: ['software'],
    image: '/eninformasi-icon.svg',
    description:
      'Portal media teknologi bilingual (ID/EN) yang menyajikan lebih dari 150 katalog rekayasa software dan AI dengan Skor Lighthouse 100/100 di Cloudflare Pages.',
    highlights: [
      '177 Katalog Terstruktur (65 Hands-on Guide & 112 Deep-Dive Trends)',
      'Dual Language Switcher 100% Real-Time (ID / EN) & Interactive Checklist',
    ],
    tech: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS',
      'OpenNext',
      'Cloudflare Pages',
      'Lucide React',
    ],
    links: [
      {
        label: 'Kunjungi Website ↗',
        url: 'https://github.com/EdvanVPRoject/eninformasi-hub',
        primary: true,
      },
      {
        label: 'GitHub ↗',
        url: 'https://github.com/EdvanVPRoject/eninformasi-hub',
        primary: false,
      },
    ],
    modalDetails: {
      kicker: 'Platform Web & Portal Teknologi · 2026',
      summary:
        'Platform web modern yang memisahkan secara tegas antara Tutorial Praktis (Hands-on Guide) dan EnInformasi (Deep-Dive Insight & Trends), dirancang dengan fokus pada kecepatan akses, tipografi editorial yang nyaman dibaca, dan modularitas konten bilingual penuh.',
      bullets: [
        'Katalog Konten Terkurasi: Memuat 177 artikel komprehensif mencakup rekayasa perangkat lunak, arsitektur LLM otonom, komputasi awan, sistem tertanam, dan analisis industri teknologi terkini.',
        'Sistem Bilingual Real-Time: Switcher bahasa terisolasi yang mengalihkan 100% judul, ringkasan, teks artikel, dan daftar isi secara instan tanpa re-render halaman penuh.',
        'Interactive Practice Checklist: Fitur pencatatan progres praktik pengguna langsung di browser berbasis sessionStorage per artikel dengan tombol reset instan.',
        'Smart Viewport Scrollspy: Navigasi daftar isi aktif yang melacak posisi pembacaan secara real-time pada desktop dan mobile.',
        'Arsitektur Edge Delivery: Dibangun dengan Next.js App Router dan dioptimasi via OpenNext untuk deployment edge berlatensi rendah pada Cloudflare Pages.',
      ],
      results:
        'Menyediakan platform dokumentasi dan tutorial komputasi berperforma tinggi dengan skor Core Web Vitals optimal dan pengalaman pengguna interaktif.',
      note: 'Source code dan dokumentasi arsitektur dapat diakses publik pada repositori GitHub.',
    },
  },
  {
    id: 'endoclens-pdf',
    title: 'ENDocLens-PDF — Perangkat Dokumen, Scanner OCR & AI Copilot',
    tagline: 'Client-Side Web Suite · 16 Modul PDF & Tooling Dokumen',
    year: '2026',
    badge: 'Web Suite & OCR',
    category: ['software'],
    image: '/endoclens-icon.svg',
    description:
      'Suite produktivitas dokumen 100% client-side di browser dengan 16 modul alat PDF, pemindai perspective warp setara MS Lens, ekstraksi OCR, dan AI Copilot.',
    highlights: [
      '16 Modul Produktivitas Dokumen & 100% Client-Side Privacy',
      'Auto-Perspective Warp (Setara M365 Lens) & OCR Tesseract.js',
    ],
    tech: [
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Vite 8',
      'pdf-lib',
      'Tesseract.js',
      'jsPDF',
    ],
    links: [
      {
        label: 'Kunjungi Website ↗',
        url: 'https://doclens-pdf.vercel.app',
        primary: true,
      },
      {
        label: 'GitHub ↗',
        url: 'https://github.com/EdvanVPRoject/ENDocLens-PDF',
        primary: false,
      },
    ],
    modalDetails: {
      kicker: 'Web Productivity Suite · 2026',
      summary:
        'Aplikasi web produktivitas dokumen modern yang mengintegrasikan 16 modul pemrosesan PDF dan berkas secara komprehensif. Seluruh komputasi pemindaian, manipulasi dokumen, ekstraksi OCR, dan enkripsi dieksekusi murni di sisi klien (client-side di browser) sehingga menjamin privasi dokumen sensitif tanpa ketergantungan server perantara.',
      bullets: [
        'Scanner Dokumen Tingkat Lanjut: Algoritma deteksi sudut otomatis (corner detection) dan perspective warp yang meluruskan foto miring, dilengkapi filter Magic Color untuk menghilangkan bayangan dan memutihkan latar belakang kertas.',
        '16 Modul Terpadu: Menggabungkan merge/split PDF, kompresi, enkripsi sandi, watermarking, konversi PDF ke gambar/Word, ekstraksi halaman, hingga penandatanganan digital.',
        'OCR & AI Copilot di Browser: Ekstraksi teks dari gambar pindaian menggunakan Tesseract.js secara offline di browser serta integrasi bantuan ringkasan dokumen cerdas.',
        'Compiler Multi-Halaman Fleksibel: Mendukung ukuran standar Indonesia (F4/Folio) dan internasional (A4, Letter) dengan kontrol margin, DPI cetak presisi, dan drag-and-drop reordering.',
        'Zero Server Upload: Seluruh proses perenderan menggunakan pdf-lib, pdfjs-dist, dan canvas native menjamin kecepatan instan tanpa latensi jaringan dan bebas risiko kebocoran data.',
      ],
      results:
        'Mampu memproses pemindaian multi-halaman dan kompilasi dokumen PDF beresolusi tinggi dalam hitungan detik langsung di browser tanpa batas ukuran server.',
      note: 'Website live dapat dicoba di doclens-pdf.vercel.app dan kode sumber tersedia terbuka di GitHub.',
    },
  },
  {
    id: 'enlife',
    title: 'ENLife — All-in-One Daily Life & Productivity Hub',
    tagline: 'Mobile & Desktop App · Flutter Offline-First',
    year: '2026',
    badge: 'Flutter & Dart',
    category: ['software'],
    image: '/enlife-icon.svg',
    description:
      'Aplikasi asisten produktivitas harian berbasis Flutter offline-first dengan modul pencatatan keuangan fl_chart, habit tracker, Pomodoro, dan brankas dokumen terenkripsi.',
    highlights: [
      'Arsitektur 100% Offline-First & Privasi Total (Zero-Cloud Storage)',
      '4 Modul Esensial (Keuangan, Habit/Pomodoro, ID Vault, Quick Tools)',
    ],
    tech: ['Flutter', 'Dart', 'Provider', 'fl_chart', 'SharedPreferences', 'Material 3'],
    links: [
      {
        label: 'GitHub ↗',
        url: 'https://github.com/EdvanVPRoject/ENLife',
        primary: true,
      },
    ],
    modalDetails: {
      kicker: 'Aplikasi Mobile & Desktop · 2026',
      summary:
        'Aplikasi asisten produktivitas dan manajemen kehidupan sehari-hari yang dikembangkan secara native dengan Flutter. Beroperasi sepenuhnya secara offline (local persistence) untuk menjamin kecepatan respons instan dan privasi data mutlak tanpa dependensi server pihak ketiga.',
      bullets: [
        'Smart Expense & Budgeting: Pencatatan kilat pemasukan dan pengeluaran dalam format Rupiah (Rp) dilengkapi grafik pai dinamis (fl_chart) berdasarkan kategori pengeluaran.',
        'Habit Tracker & Pomodoro Timer: Sistem pelacak kebiasaan harian dengan streak counter berturut-turut, manajemen to-do list berprioritas, serta timer siklus fokus Pomodoro 25/5 menit.',
        'Brankas Identitas & Dokumen (ID Vault): Penyimpanan nomor identitas penting (KTP, SIM, Rekening, BPJS) secara terenkripsi lokal dengan fitur salin 1-klik dan peringatan visual saat masa berlaku mendekati 30 hari.',
        'Utilitas Cepat Sehari-hari: Kalkulator Split Bill presisi per orang beserta pajak/service fee, dan kalkulator diskon belanja instan.',
        'Desain Tactile Obsidian: UI modern bernuansa gelap ergonomis (#0B0D11, #12151C) dengan aksen warna mikro semantik untuk kenyamanan penggunaan jangka panjang.',
      ],
      results:
        'Menghadirkan ekosistem produktivitas personal terintegrasi yang ultra-ringan, responsif, dan bebas kuota internet dengan waktu muat 0 detik.',
      note: 'Kode sumber lengkap dan panduan kompilasi multiplatform (Android/Windows/Web) tersedia di GitHub.',
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
      'Sistem gerbang parkir otomatis dengan validasi ganda berbasis RFID e-KTP dan computer vision (YOLOv8 & CNN) real-time terintegrasi ESP32 ke Firebase.',
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
      'Studi komparasi machine learning (Random Forest, SVM, Logistic Regression) untuk deteksi risiko penyakit liver terpublikasi di Jurnal Nasional Komputika.',
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
      'Timbangan digital terhubung langsung ke aplikasi kasir web otomatis berbasis ESP32 dan Load Cell HX711 untuk UMKM terbit di Jurnal Ilmiah Biner.',
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
    title: 'Rekayasa Software, Desktop & Web',
    description:
      'Membangun aplikasi desktop native yang gesit dengan PyQt6 multithreading, hingga web app modern berbasis Next.js, React, dan TypeScript yang responsif di berbagai perangkat.',
    badges: [
      'Python',
      'Next.js 14/15',
      'React 19',
      'PyQt6 (QThread)',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
    ],
  },
  {
    index: '02',
    title: 'Otomasi AI, LLM & Media Processing',
    description:
      'Menerapkan pipeline AI lokal offline (Whisper STT & Qwen GGUF) serta Cloud API (Gemini) untuk pemotongan video otomatis, transkripsi cepat, dan pengolahan media via FFmpeg.',
    badges: [
      'Faster-Whisper',
      'Qwen 2.5 GGUF',
      'Gemini API',
      'FFmpeg CLI',
      'CTranslate2',
      'Tesseract.js OCR',
    ],
  },
  {
    index: '03',
    title: 'Computer Vision & Machine Learning',
    description:
      'Melatih dan men-deploy model deteksi objek (YOLOv8), klasifikasi citra CNN TensorFlow, hingga riset komparasi algoritma prediktif (Random Forest, SVM, Logistic Regression).',
    badges: [
      'YOLOv8 Nano',
      'TensorFlow / CNN',
      'OpenCV',
      'Scikit-Learn',
      'Random Forest',
      'SVM',
      'Pandas & NumPy',
    ],
  },
  {
    index: '04',
    title: 'Basis Data, Cloud & Linux Server',
    description:
      'Mengelola database relasional (PostgreSQL, MySQL, SQLite) dan cloud NoSQL (Firebase), administrasi VPS Linux via SSH, container Docker, serta deployment edge di Cloudflare.',
    badges: [
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'Firebase RTDB',
      'Linux Server / VPS',
      'Docker',
      'Cloudflare Pages',
    ],
  },
  {
    index: '05',
    title: 'Jaringan Komputer & P2P Real-Time',
    description:
      'Mengimplementasikan transfer data peer-to-peer tanpa server via WebRTC DataChannel, konfigurasi jaringan TCP/IP & VPN berstandar Cisco CCNA, serta pemantauan koneksi.',
    badges: [
      'WebRTC P2P',
      'Cisco CCNA',
      'TCP/IP & Subnetting',
      'SSH & VPN',
      'Socket.IO',
      'Network Monitoring',
    ],
  },
  {
    index: '06',
    title: 'Edge IoT, Embedded & Publikasi Ilmiah',
    description:
      'Menghubungkan mikrokontroler ESP32, sensor beban (Load Cell), dan RFID e-KTP ke aplikasi web real-time yang teruji secara empiris lewat artikel di jurnal nasional.',
    badges: [
      'ESP32 (C/C++)',
      'RFID RC522 (e-KTP)',
      'Load Cell & HX711',
      'Jurnal Komputika',
      'Jurnal Biner',
      'Git & GitHub',
    ],
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<
    FeaturedApp | ResearchProject | null
  >(null);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleOpenModal = (project: FeaturedApp | ResearchProject) => {
    setIsClosingModal(false);
    setActiveModalProject(project);
  };

  const handleCloseModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setActiveModalProject(null);
      setIsClosingModal(false);
    }, 200);
  };

  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalProject && !isClosingModal) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProject, isClosingModal]);

  useEffect(() => {
    const sectionIds = ['about', 'projects', 'skills', 'academic', 'contact', 'feedback'];
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const scrollPosition = window.scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          message: guestMessage.trim(),
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
      className="relative min-h-screen bg-[#0A0A0C] text-zinc-100 antialiased selection:bg-emerald-500/25 selection:text-emerald-200"
    >
      {/* Ambient Emerald Aura (Soft & Modern) */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[650px] w-[1100px] xl:w-[1450px] -translate-x-1/2 rounded-full opacity-20 blur-[140px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.25) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 80%)',
        }}
      />

      {/* Subtle Architectural Dot-Matrix Grid (Bukan Glowing Blobs AI) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-25"
        style={{
          backgroundImage: 'radial-gradient(#52525b 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-[#0A0A0C]/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] items-center justify-between px-6 sm:px-8 lg:px-12 py-4">
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-base font-semibold tracking-tight text-zinc-100 hover:opacity-90 transition"
          >
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-zinc-700/80 bg-zinc-900 shadow-sm transition group-hover:border-emerald-400">
              <Image
                src="/github-avatar.png"
                alt="Logo Edvan"
                width={28}
                height={28}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span>
              Edvan Nuriana<span className="text-emerald-500">.</span>
            </span>
            <span className="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[11px] font-normal text-zinc-400">
              Portfolio
            </span>
          </a>

          <nav className="hidden items-center gap-1.5 text-xs font-medium md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveSection(item.id)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all ${
                    isActive
                      ? 'border border-emerald-500/40 bg-emerald-500/15 text-white font-semibold shadow-sm shadow-emerald-950/40'
                      : 'border border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/60 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  {item.label}
                </a>
              );
            })}
            <a
              href="#feedback"
              onClick={() => setActiveSection('feedback')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeSection === 'feedback'
                  ? 'border border-emerald-400 bg-emerald-500/25 text-white font-semibold shadow-sm shadow-emerald-950/40'
                  : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-500/15'
              }`}
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
          <div className="md:hidden border-b border-zinc-800/80 bg-[#0A0A0C]/80 px-6 py-4 space-y-2 text-sm font-medium backdrop-blur-xl">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 transition ${
                    isActive
                      ? 'border border-emerald-500/40 bg-emerald-500/15 text-white font-semibold'
                      : 'border border-transparent text-zinc-300 hover:text-emerald-300'
                  }`}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  {item.label}
                </a>
              );
            })}
            <a
              href="#feedback"
              onClick={() => {
                setActiveSection('feedback');
                setMobileMenuOpen(false);
              }}
              className={`block rounded-lg px-3 py-2 text-sm font-semibold transition ${
                activeSection === 'feedback'
                  ? 'border border-emerald-400 bg-emerald-500/25 text-white'
                  : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              }`}
            >
              Kirim Pesan & Ulasan ↗
            </a>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] px-6 sm:px-8 lg:px-12">
        {/* HERO SECTION */}
        <section className="py-16 md:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-7 xl:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-800/80 bg-zinc-900/70 px-3.5 py-1 text-xs text-zinc-300 backdrop-blur-sm transition hover:border-zinc-700">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span>Sumedang, Indonesia · UNIKOM 2026</span>
                </div>
                <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
                  Fullstack Developer · Software Engineer · Applied AI & IoT Specialist
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-zinc-50 lg:leading-[1.15] xl:leading-[1.12]">
                Membangun perangkat lunak yang cepat, otomasi cerdas, dan sistem yang langsung siap pakai.
              </h1>

              <p className="max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg lg:text-xl text-justify hyphens-auto">
                Halo! Saya{' '}
                <strong className="font-medium text-zinc-100">
                  Edvan Nuriana Putra Septia, S.Kom.
                </strong>
                , lulusan S1 Sistem Komputer UNIKOM dengan IPK 3.53. Saya aktif mengembangkan solusi perangkat lunak, mulai dari otomasi Python, aplikasi desktop native, web modern, hingga integrasi model AI lokal dan mikrokontroler IoT. Berbekal sertifikasi Cisco CCNA dan publikasi jurnal terakreditasi, saya selalu mengutamakan sistem yang cepat, efisien, dan siap digunakan di dunia nyata.
              </p>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-[0_4px_20px_rgba(52,211,153,0.25)]"
                >
                  Eksplorasi Proyek
                </a>
                <a
                  href="/cv-edvan.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:text-emerald-300"
                >
                  Unduh CV ↗
                </a>
                <a
                  href="mailto:septiaedvan@gmail.com"
                  className="rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:text-emerald-400"
                >
                  Kirim Email ↗
                </a>
              </div>

              {/* Key Highlights Bar */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3.5 border-t border-zinc-800/80 pt-8 sm:max-w-xl xl:max-w-2xl">
                <div className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-2.5 sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-zinc-900/50">
                  <p className="font-mono text-xl sm:text-2xl lg:text-3xl font-semibold tabular-nums text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    3.53
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs text-zinc-500">
                    IPK S1 Sistem Komputer
                  </p>
                </div>
                <div className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-2.5 sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-zinc-900/50">
                  <p className="font-mono text-xl sm:text-2xl lg:text-3xl font-semibold tabular-nums text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    08
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs text-zinc-500">
                    Dokumentasi Proyek
                  </p>
                </div>
                <div className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-2.5 sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-zinc-900/50">
                  <p className="font-mono text-xl sm:text-2xl lg:text-3xl font-semibold tabular-nums text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    02
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs text-zinc-500">
                    Publikasi Jurnal
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Card */}
            <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
              <div className="group relative w-full max-w-xs sm:max-w-sm xl:max-w-[360px] rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.15)]">
                <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 blur-lg transition duration-300 group-hover:opacity-100" />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-900">
                  <Image
                    src="/profile.jpeg"
                    alt="Edvan Nuriana Putra Septia, S.Kom."
                    fill
                    sizes="(max-width: 768px) 280px, (max-width: 1280px) 360px, 420px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-zinc-950/80 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open to Work
                  </div>
                </div>
                <div className="mt-3.5 px-1">
                  <p className="text-base font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                    Edvan Nuriana Putra Septia, S.Kom.
                  </p>
                  <p className="mt-1 font-mono text-xs text-zinc-400">
                    S1 Sistem Komputer UNIKOM
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
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-2.5 font-mono text-sm uppercase tracking-wider text-emerald-400 font-semibold">
                <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeSection === 'about' ? 'bg-emerald-400 ring-4 ring-emerald-500/25 scale-110' : 'bg-zinc-600'}`} />
                <span>01 / Tentang Saya</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold leading-snug text-zinc-100 sm:text-3xl">
                Menghubungkan kode perangkat lunak modern, kecerdasan AI terapan, dan sistem komputasi nyata.
              </h2>
              <div className="mt-6">
                <a
                  href="https://www.linkedin.com/in/edvannuriana"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300"
                >
                  <span>Profil LinkedIn</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            <div className="space-y-5 text-zinc-400 lg:col-span-8">
              <p className="leading-relaxed text-justify hyphens-auto">
                Bagi saya, rekayasa perangkat lunak bukan cuma soal mengetik baris kode, melainkan bagaimana menghadirkan solusi yang praktis dan langsung terasa manfaatnya. Lulus dari S1 Sistem Komputer Universitas Komputer Indonesia (UNIKOM) dengan IPK 3.53, saya terbiasa menangani siklus pembuatan sistem secara utuh—mulai dari manajemen basis data (PostgreSQL, MySQL, SQLite), administrasi Linux server dan cloud, otomasi Python, hingga perancangan antarmuka pengguna yang bersih dan interaktif di platform desktop maupun web.
              </p>
              <p className="leading-relaxed text-justify hyphens-auto">
                Di era kecerdasan buatan saat ini, saya fokus membangun sistem yang mandiri, aman, dan hemat sumber daya komputasi. Saya suka mengintegrasikan inferensi model lokal seperti Whisper STT dan LLM GGUF agar aplikasi desktop bisa berjalan lancar tanpa koneksi internet, merancang arsitektur transfer P2P langsung via WebRTC tanpa server perantara, hingga menggabungkan model Computer Vision (YOLOv8 &amp; CNN) dengan mikrokontroler ESP32 untuk otomasi perangkat fisik secara real-time.
              </p>

              {/* 3 Engineering Pillars */}
              <div className="grid gap-4.5 pt-4 sm:grid-cols-3 lg:gap-5">
                <div className="group relative overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-zinc-900/50">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="font-mono text-xs text-emerald-400">
                    01 · Software & Fullstack Engineering
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400 text-justify hyphens-auto">
                    Aplikasi desktop native (PyQt6 multithreading) dan web modern (Next.js & React) yang responsif, terstruktur, serta memiliki kecepatan respons kilat.
                  </p>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-zinc-900/50">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="font-mono text-xs text-emerald-400">
                    02 · Applied AI & Computer Vision
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400 text-justify hyphens-auto">
                    Integrasi model bahasa lokal (Qwen GGUF), speech-to-text (Faster-Whisper), OCR, serta deteksi objek visual (YOLOv8 & CNN) untuk otomasi alur kerja.
                  </p>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-zinc-900/50">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="font-mono text-xs text-emerald-400">
                    03 · Edge IoT & Riset Teruji
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400 text-justify hyphens-auto">
                    Instrumentasi mikrokontroler ESP32, kalibrasi sensor presisi, dan koneksi cloud real-time yang tervalidasi lewat publikasi di jurnal ilmiah nasional.
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
              <div className="inline-flex items-center gap-2.5 font-mono text-sm uppercase tracking-wider text-emerald-400 font-semibold">
                <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeSection === 'projects' ? 'bg-emerald-400 ring-4 ring-emerald-500/25 scale-110' : 'bg-zinc-600'}`} />
                <span>02 / Proyek & Riset</span>
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">
                Proyek yang Saya Kerjakan
              </h2>
              <p className="mt-1 text-xs text-zinc-400">
                Tap kartu mana saja untuk melihat dokumentasi dan arsitektur teknis lengkap.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Semua (7)' },
                { id: 'software', label: 'Aplikasi & AI (4)' },
                { id: 'iot-cv', label: 'IoT & Visi Komputer (2)' },
                { id: 'publication', label: 'Jurnal Ilmiah (2)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as ProjectCategory)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                    activeFilter === tab.id
                      ? 'border border-emerald-500/40 bg-emerald-500/15 text-white font-semibold'
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-7">
              {filteredApps.map((app) => (
                <article
                  key={app.id}
                  onClick={() => handleOpenModal(app)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-zinc-900/60 hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.14)] cursor-pointer"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div>
                    <div className="mb-4 sm:mb-5 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-2">
                          <Image
                            src={app.image}
                            alt={app.title}
                            width={36}
                            height={36}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-emerald-300">
                              {app.badge}
                            </span>
                            <span className="font-mono text-[11px] sm:text-xs text-zinc-500">
                              {app.year}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-zinc-500">
                            {app.tagline}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-zinc-100 transition group-hover:text-emerald-300">
                      {app.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-zinc-400 text-justify hyphens-auto">
                      {app.description}{' '}
                      <span className="inline-flex items-center gap-0.5 text-white font-medium group-hover:underline">
                        ...lihat selengkapnya ↗
                      </span>
                    </p>

                    {/* Architectural Highlights */}
                    <ul className="mt-3.5 space-y-1.5 border-l-2 border-emerald-500/50 pl-3">
                      {app.highlights.map((item) => (
                        <li key={item} className="text-[11px] sm:text-xs text-zinc-300">
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {app.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Links */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/80 pt-3">
                    <span className="text-[11px] font-mono text-zinc-500 group-hover:text-emerald-400/90 transition inline-flex items-center gap-1">
                      Tap untuk detail ↗
                    </span>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {app.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                            link.primary
                              ? 'bg-zinc-100 text-zinc-950 hover:bg-emerald-400'
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
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {filteredResearch.map((project) => (
                <article
                  key={project.id}
                  onClick={() => handleOpenModal(project)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-zinc-900/60 hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.14)] cursor-pointer"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                      <div className="flex items-center justify-between gap-2 font-mono text-xs">
                        <span className="text-emerald-400/90">
                          {project.tagline.split('·')[0]}
                        </span>
                        <span className="text-zinc-500">{project.year}</span>
                      </div>

                      <h3 className="mt-2 text-base font-semibold text-zinc-100 transition group-hover:text-emerald-300">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-zinc-400 text-justify hyphens-auto">
                        {project.description}{' '}
                        <span className="inline-flex items-center gap-0.5 text-white font-medium group-hover:underline">
                          ...lihat selengkapnya ↗
                        </span>
                      </p>

                      <ul className="mt-3.5 space-y-1 border-l-2 border-emerald-500/50 pl-2.5">
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
                      <span className="text-[11px] font-mono text-zinc-500 group-hover:text-emerald-400/90 transition inline-flex items-center gap-1">
                        Tap untuk detail ↗
                      </span>

                      <a
                        href={project.link.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
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
            <div className="inline-flex items-center gap-2.5 font-mono text-sm uppercase tracking-wider text-emerald-400 font-semibold">
              <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeSection === 'skills' ? 'bg-emerald-400 ring-4 ring-emerald-500/25 scale-110' : 'bg-zinc-600'}`} />
              <span>03 / Keahlian Teknis</span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">
              Kompetensi Rekayasa Sistem
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {SKILLS_DATA.map((skill) => (
              <div
                key={skill.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-zinc-900/50 hover:shadow-[0_8px_25px_-10px_rgba(16,185,129,0.1)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div>
                  <span className="font-mono text-xs font-medium text-emerald-500">
                    {skill.index}
                  </span>
                  <h3 className="mt-1.5 text-base font-semibold text-zinc-100">
                    {skill.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400 text-justify hyphens-auto">
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
            <div className="inline-flex items-center gap-2.5 font-mono text-sm uppercase tracking-wider text-emerald-400 font-semibold">
              <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeSection === 'academic' ? 'bg-emerald-400 ring-4 ring-emerald-500/25 scale-110' : 'bg-zinc-600'}`} />
              <span>04 / Akademik & Publikasi</span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">
              Kualifikasi Akademik & Sertifikasi
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {/* Pendidikan */}
            <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-zinc-900/50">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <p className="font-mono text-xs text-emerald-400">2022—2026</p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                S1 Sistem Komputer
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                Universitas Komputer Indonesia (UNIKOM)
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400 text-justify hyphens-auto">
                Fokus pada integrasi sistem komputasi, rekayasa software, arsitektur basis data, serta riset terapan kecerdasan buatan dan IoT.
              </p>
              <p className="mt-4 inline-block rounded border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs text-white">
                IPK: 3,53 / 4,00 · Lulus 2026
              </p>
            </div>

            {/* Publikasi Nasional */}
            <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-zinc-900/50">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <p className="font-mono text-xs text-emerald-400">
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
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300 transition hover:border-emerald-500/40 hover:text-emerald-300"
                >
                  <span>Jurnal Komputika (Prediksi Liver)</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300 transition hover:border-emerald-500/40 hover:text-emerald-300"
                >
                  <span>Jurnal Biner (POS ESP32)</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Sertifikasi Resmi */}
            <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-zinc-900/50">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <p className="font-mono text-xs text-emerald-400">
                Sertifikasi Resmi
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                Kredensial Industri
              </h3>
              <ul className="mt-4 space-y-2 text-xs text-zinc-300">
                <li className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <span>Google Gemini Certified Student — University</span>
                    <span className="font-mono text-[10px] text-emerald-400">2026—2029</span>
                  </div>
                </li>
                <li className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <span>Cisco CCNA: Introduction to Networks</span>
                    <span className="font-mono text-[10px] text-emerald-400">2025—2028</span>
                  </div>
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
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            {/* Kontak Langsung */}
            <div className="space-y-6 lg:col-span-6">
              <div>
                <div className="inline-flex items-center gap-2.5 font-mono text-sm uppercase tracking-wider text-emerald-400 font-semibold">
                  <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeSection === 'contact' ? 'bg-emerald-400 ring-4 ring-emerald-500/25 scale-110' : 'bg-zinc-600'}`} />
                  <span>05 / Kontak & Ulasan</span>
                </div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">
                  Hubungi Saya
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 text-justify hyphens-auto">
                  Tertarik berkolaborasi atau ingin berdiskusi santai seputar pengembangan software, otomasi AI, basis data, maupun sistem IoT? Saat ini saya terbuka untuk peluang karier penuh waktu (Full-Time), proyek pengembangan lepas (freelance), maupun riset bersama. Jangan ragu menghubungi saya via WhatsApp, email, atau tinggalkan pesan di form di samping!
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="https://wa.me/6289630887748"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:border-emerald-500/40 hover:bg-zinc-900/70"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-emerald-400 group-hover:border-emerald-500/40 group-hover:scale-105 transition">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs text-emerald-400 block">
                      WhatsApp
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-medium text-zinc-100 group-hover:text-white">
                      +62 896-3088-7748
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:septiaedvan@gmail.com"
                  className="group flex items-center gap-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:border-emerald-500/40 hover:bg-zinc-900/70"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-emerald-400 group-hover:border-emerald-500/40 group-hover:scale-105 transition">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs text-emerald-400 block">
                      Email
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-medium text-zinc-100 group-hover:text-white">
                      septiaedvan@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://github.com/EdvanVPRoject"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:border-emerald-500/40 hover:bg-zinc-900/70"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 group-hover:border-emerald-500/40 group-hover:text-white group-hover:scale-105 transition">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-emerald-400 transition block">
                      GitHub
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-medium text-zinc-100 group-hover:text-white">
                      EdvanVPRoject ↗
                    </span>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/edvannuriana"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:border-emerald-500/40 hover:bg-zinc-900/70"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 group-hover:border-emerald-500/40 group-hover:text-[#0A66C2] group-hover:scale-105 transition">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-emerald-400 transition block">
                      LinkedIn
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-medium text-zinc-100 group-hover:text-white">
                      edvannuriana ↗
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Buku Tamu & Feedback */}
            <div id="feedback" className="scroll-mt-24 lg:col-span-6">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-wider text-emerald-500">
                  Buku Tamu & Feedback
                </p>
                <h3 className="mt-1.5 text-lg font-semibold text-zinc-100">
                  Kesan & Catatan Pengunjung
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Pesan Anda akan langsung terkirim secara instan kepada saya.
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
                      className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-emerald-500/60"
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
                      className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-emerald-500/60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-zinc-100 px-5 py-2.5 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:opacity-50"
                  >
                    {isSubmitting
                      ? 'Mengirim pesan...'
                      : 'Kirim Pesan Instant ↗'}
                  </button>

                  {submitStatus === 'success' && (
                    <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-center text-xs text-emerald-300">
                      Terima kasih! Pesan Anda telah berhasil terkirim.
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
      <footer className="border-t border-zinc-800/80 bg-[#0A0A0C] py-8">
        <div className="mx-auto flex max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] flex-col items-center justify-between gap-4 px-6 sm:px-8 lg:px-12 text-xs text-zinc-500 sm:flex-row">
          <p>© 2026 Edvan Nuriana Putra Septia · Portofolio Pribadi</p>
          <a
            href="#top"
            className="font-medium text-zinc-400 transition hover:text-emerald-400"
          >
            Kembali ke atas ↑
          </a>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <a
        href="#top"
        aria-label="Kembali ke atas"
        className={`fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/90 text-zinc-300 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 hover:-translate-y-0.5 ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="h-4 w-4" />
      </a>

      {/* MODAL RINCIAN PROYEK */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-200 ease-out ${
            isClosingModal ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-backdrop-in'
          }`}
          onClick={handleCloseModal}
        >
          <div
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-zinc-800 bg-[#0E0E11] p-6 sm:p-8 shadow-2xl text-left transition-all duration-200 ease-out ${
              isClosingModal
                ? 'opacity-0 scale-95 translate-y-3'
                : 'opacity-100 scale-100 translate-y-0 animate-modal-in'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-500">
                  {activeModalProject.modalDetails?.kicker || 'Dokumentasi Teknis'}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-zinc-100 mt-1">
                  {activeModalProject.title}
                </h3>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed text-justify hyphens-auto font-light">
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
                        <span className="text-emerald-400 font-mono text-[11px] mt-0.5">•</span>
                        <span className="leading-relaxed text-justify hyphens-auto">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeModalProject.modalDetails?.results && (
                <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-4 text-xs text-emerald-200 leading-relaxed text-justify hyphens-auto">
                  <span className="font-medium text-emerald-300 block mb-1">
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
                  onClick={handleCloseModal}
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
                            ? 'bg-zinc-100 text-zinc-950 hover:bg-emerald-400'
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
                      className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-950 hover:bg-emerald-400 transition"
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
