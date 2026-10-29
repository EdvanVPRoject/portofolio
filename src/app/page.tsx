'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowUp,
  GraduationCap,
  BookOpen,
  Award,
  ExternalLink,
  FileText,
  CheckCircle2,
  ZoomIn,
  Eye,
  Copy,
  Check,
} from 'lucide-react';

function getTechTagStyle(tech?: string): string {
  void tech;
  return 'border-zinc-800 bg-zinc-950/80 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100';
}

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

interface CertificateCredential {
  id: string;
  title: string;
  issuer: string;
  period: string;
  category: string;
  credentialId?: string;
  verifyUrl?: string;
  pdfUrl: string;
  imageUrl: string;
  description: string;
  skills: string[];
  modules?: string[];
}

const CERTIFICATIONS_DATA: CertificateCredential[] = [
  {
    id: 'cert-gemini',
    title: 'Google Gemini Certified Student — University',
    issuer: 'Google for Education',
    period: '2026—2029',
    category: 'Generative AI & LLM',
    pdfUrl: '/cert-gemini.pdf',
    imageUrl: '/cert-gemini.png',
    description:
      'Sertifikasi resmi Google for Education yang memvalidasi kompetensi pemanfaatan Google Gemini AI, prompt engineering tingkat lanjut, integrasi alur kerja AI dalam analisis data, dan etika kecerdasan buatan.',
    skills: ['Prompt Engineering', 'Gemini AI', 'Data Analysis Workflow', 'AI Ethics'],
  },
  {
    id: 'cert-action-ai',
    title: 'Action AI Startup University: AI Essentials',
    issuer: 'underdogs. & UNIKOM',
    period: '2026',
    category: 'AI Prototyping & MVP',
    credentialId: 'UDI-202610-twv1n6 (OpenBadge 3.0)',
    verifyUrl: 'https://udimpact.kolleges.net/en/achievements',
    pdfUrl: '/cert-action-ai.pdf',
    imageUrl: '/cert-action-ai.png',
    description:
      'Program intensif akselerasi startup AI oleh underdogs. & UNIKOM (Act-preneur Certified, W3C VC 2.0). Memvalidasi problem definition, prompt writing komprehensif, dan validasi prototipe menggunakan Gemini dan Lovable.',
    skills: ['AI Prototyping', 'Lovable & Gemini', 'Problem Definition', 'MVP Planning'],
  },
  {
    id: 'cert-coursera-excel',
    title: 'Microsoft Excel: Learn with Projects',
    issuer: 'Coursera Project Network',
    period: '2026',
    category: 'Data Analytics & Modeling',
    credentialId: 'V32873K6COVJ (8 Kursus Spesialisasi)',
    verifyUrl: 'https://coursera.org/verify/specialization/V32873K6COVJ',
    pdfUrl: '/cert-coursera-excel.pdf',
    imageUrl: '/cert-coursera-excel.png',
    description:
      'Spesialisasi 8 kursus hands-on Microsoft Excel dari Coursera mencakup pengolahan data tabular, rumus lanjutan (INDEX-MATCH, XLOOKUP), analisis data bisnis, Pivot Table, dan visualisasi dashboard interaktif.',
    skills: ['Advanced Formulas', 'Pivot Tables & Charts', 'Business Modeling', 'Data Visualization'],
  },
  {
    id: 'cert-ccna',
    title: 'Cisco CCNA: Introduction to Networks (ITN)',
    issuer: 'Cisco Networking Academy · UNIKOM',
    period: '2025—2028',
    category: 'Computer Networking',
    pdfUrl: '/cert-ccna.pdf',
    imageUrl: '/cert-ccna.png',
    description:
      'Kredensial resmi Cisco Networking Academy yang mencakup 17 modul kompetensi mendalam: perancangan arsitektur LAN, navigasi & konfigurasi Cisco IOS pada router & switch, pemodelan OSI & TCP/IP, segmentasi jaringan & subnetting VLSM IPv4/IPv6, serta metodologi troubleshooting dan mitigasi keamanan perangkat.',
    skills: [
      'TCP/IP & OSI Reference Models',
      'IPv4 & IPv6 Subnetting (VLSM)',
      'Cisco IOS Router & Switch Config',
      'Ethernet Switching & MAC Tables',
      'Transport Layer (TCP/UDP Flow Control)',
      'Network Security & Troubleshooting',
    ],
    modules: [
      'Modul 01: Networking Today & Network Representations',
      'Modul 02: Basic Switch and End Device Configuration (Cisco IOS)',
      'Modul 03: Protocols and Models (OSI & TCP/IP Protocol Suites)',
      'Modul 04: Physical Layer (Copper, UTP, Fiber-Optic, Wireless)',
      'Modul 05: Number Systems (Binary & Hexadecimal Conversion)',
      'Modul 06: Data Link Layer & Framing Topologies',
      'Modul 07: Ethernet Switching & MAC Address Tables',
      'Modul 08: Network Layer & Host Routing Operations',
      'Modul 09: Address Resolution (ARP & IPv6 Neighbor Discovery)',
      'Modul 10: Basic Router Configuration & Interface Addressing',
      'Modul 11: IPv4 Addressing, Network Segmentation & VLSM Subnetting',
      'Modul 12: IPv6 Addressing, GUA/LLA Configuration & Multicast',
      'Modul 13: ICMP Testing (Ping & Traceroute Diagnostics)',
      'Modul 14: Transport Layer (TCP Reliability, UDP Sockets & Port Numbers)',
      'Modul 15: Application Layer (Web/HTTP, DNS, DHCP, File Sharing)',
      'Modul 16: Network Security Fundamentals & Attack Mitigations',
      'Modul 17: Build a Small Network, Host Commands & Troubleshooting Scenarios',
    ],
  },
  {
    id: 'cert-cisco-networking-basics',
    title: 'Cisco: Networking Basics',
    issuer: 'Cisco Networking Academy',
    period: '2026',
    category: 'Computer Networking',
    credentialId: '49cdedf9-0768-42cd-8b3a-82ac8e44a95a',
    pdfUrl: '/cert-cisco-networking-basics.pdf',
    imageUrl: '/cert-cisco-networking-basics.png',
    description:
      'Sertifikasi resmi Cisco Networking Academy yang memvalidasi penguasaan fundamental komunikasi data, komponen & topologi jaringan, konfigurasi wireless home router, pemodelan Ethernet, skema pengalamatan IPv4/IPv6, DHCP, NAT, serta simulasi lab hands-on Cisco Packet Tracer.',
    skills: [
      'Network Architecture & Topologies',
      'IPv4 & IPv6 Addressing Formats',
      'Wireless & Mobile Networks',
      'DHCP & NAT Configuration',
      'Cisco Packet Tracer Simulations',
      'Network Testing & Diagnostics',
    ],
    modules: [
      'Modul 01: Communication in a Connected World (Network Types, Data Transmission & Bandwidth)',
      'Modul 02: Network Components, Types, and Connections (Clients, Servers & ISP Options)',
      'Modul 03: Wireless and Mobile Networks (Wireless Topologies & Mobile Connectivity)',
      'Modul 04: Build a Home Network (Wireless Standards & Home Router Setup)',
      'Modul 05: Communication Principles (Protocols, Standards Organizations & Models)',
      'Modul 06: Network Media (Copper, Fiber-Optic & Wireless Media Types)',
      'Modul 07: The Access Layer (Encapsulation, Ethernet Frames & Access Functions)',
      'Modul 08: The Internet Protocol (IPv4 Addressing Structure & Characteristics)',
      'Modul 09: IPv4 and Network Segmentation (Unicast, Broadcast, Multicast & Subnetting)',
      'Modul 10: IPv6 Addressing Formats and Rules (IPv4 Issues & IPv6 Addressing)',
      'Modul 11: Dynamic Addressing with DHCP (Static vs Dynamic & DHCPv4 Router Config)',
      'Modul 12: Gateways to Other Networks (Network Boundaries & NAT Translation)',
      'Modul 13: The ARP Process (MAC & IP Resolution & Broadcast Containment)',
      'Modul 14: Routing Between Networks (Need for Routing, Routing Tables & LAN Creation)',
      'Modul 15: TCP and UDP (Transport Protocols, Port Numbers & Reliability)',
      'Modul 16: Application Layer Services (Client-Server, DNS, Web, FTP, SSH & Email)',
      'Modul 17: Network Testing Utilities (ipconfig, ping & Troubleshooting Commands)',
    ],
  },
];

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
    title: 'EnInformasi Hub — Portal 195 Tutorial, Gaming & Tren Teknologi Terkini',
    tagline: 'Platform Edukasi & Publikasi Web · Bilingual ID/EN',
    year: '2026',
    badge: 'Next.js & Cloudflare',
    category: ['software'],
    image: '/eninformasi-icon.svg',
    description:
      'Portal media teknologi bilingual (ID/EN) yang menyajikan 195 modul tutorial, gaming, dan tren teknologi terkini dengan Skor Lighthouse 100/100 di Cloudflare Workers/Pages.',
    highlights: [
      '195 Katalog Terstruktur (Tutorial Praktis, Gaming & Deep-Dive Trends)',
      'Dual Language Switcher 100% Real-Time (ID / EN) & Interactive Checklist',
    ],
    tech: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS',
      'OpenNext',
      'Cloudflare Pages / Workers',
      'Lucide React',
    ],
    links: [
      {
        label: 'Kunjungi Website ↗',
        url: 'https://eninformasi-hub.entehchin.workers.dev/',
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
        'Katalog Konten Terkurasi: Memuat 195 artikel komprehensif mencakup rekayasa perangkat lunak, arsitektur LLM otonom, komputasi awan, sistem tertanam, dan analisis industri teknologi terkini.',
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
      'Suite produktivitas dokumen 100% client-side di browser dengan 16 modul alat PDF, pemindai dokumen perspective warp, ekstraksi OCR, dan AI Copilot.',
    highlights: [
      '16 Modul Produktivitas Dokumen & 100% Client-Side Privacy',
      'Auto-Perspective Warp & Ekstraksi OCR Tesseract.js',
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
    title: 'Prediksi Penyakit Liver dengan Model Perbandingan Logistic Regression, SVM, dan Random Forest',
    tagline: 'Publikasi Jurnal Komputika · Vol. 15 No. 1 (2026) Hal. 83–94',
    year: '2026',
    category: ['publication'],
    image: '/journal-liver.jpg',
    description:
      'Studi komparasi machine learning (Random Forest, SVM, Logistic Regression) untuk deteksi risiko penyakit liver pada 579 rekam medis terpublikasi di Jurnal Nasional Komputika (DOI: 10.34010/komputika.v15i1.19799).',
    highlights: [
      'Terbit di Komputika: Jurnal Sistem Komputer (Vol. 15, No. 1, 2026)',
      'Optimasi Pipeline Klasifikasi & Komparasi Metrik F1-Score dan MCC',
    ],
    tech: ['Random Forest', 'SVM', 'Logistic Regression', 'Scikit-Learn'],
    link: {
      label: 'Publikasi Jurnal Komputika ↗',
      url: 'https://doi.org/10.34010/komputika.v15i1.19799',
    },
    modalDetails: {
      kicker: 'Publikasi Ilmiah Terakreditasi · Jurnal Komputika (2026)',
      summary:
        'Penelitian bersama Fajar Wicaksono, Yudis Jalu, Sandy Maulana, dan Edvan Nuriana Putra Septia. Membandingkan performa algoritma klasifikasi pada 579 data rekam medis pasien guna memprediksi kecenderungan penyakit liver sedini mungkin.',
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
    title: 'Implementasi Sistem Point of Sale pada UMKM Berbasis ESP32 dan Sensor Load Cell',
    tagline: 'Publikasi Jurnal Biner · Vol. 5 No. 1 (2026) Hal. 1–9',
    year: '2026',
    category: ['iot-cv', 'publication'],
    image: '/journal-pos.jpg',
    description:
      'Timbangan digital terhubung langsung ke aplikasi kasir web otomatis berbasis ESP32 dan Load Cell HX711 untuk UMKM terbit di Jurnal Ilmiah Biner (DOI: 10.32699/biner.v5i1.10201).',
    highlights: [
      'Terbit di Biner: Jurnal Ilmiah Informatika dan Komputer (Vol. 5, No. 1, 2026)',
      'Otomatisasi Hardware Timbangan ke Web Real-Time untuk UMKM',
    ],
    tech: ['ESP32', 'Sensor Load Cell HX711', 'Web Application', 'SQLite'],
    link: {
      label: 'Publikasi Jurnal Biner ↗',
      url: 'https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/',
    },
    modalDetails: {
      kicker: 'Publikasi Ilmiah Terakreditasi · Jurnal Biner (2026)',
      summary:
        'Penelitian oleh Edvan Nuriana Putra Septia bersama Abdan Rafi, Akyas Maulana, Syahrul Gunawan, dan Hidayat. Perancangan perangkat kasir pintar yang menghubungkan sensor timbangan digital langsung ke sistem pencatatan transaksi kasir.',
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
    title: 'Rekayasa Web Fullstack & Edge Architecture',
    description:
      'Membangun antarmuka web reaktif berkinerja tinggi dengan Next.js App Router, React 19, dan TypeScript. Dioptimasi untuk edge deployment di Cloudflare Pages/Workers dengan skor Web Vitals sempurna.',
    badges: [
      'Next.js 15',
      'React 19',
      'TypeScript & JS',
      'Tailwind CSS 4',
      'FastAPI & Node.js',
      'Cloudflare Workers',
      'Electron & Vite',
      'OpenNext',
    ],
  },
  {
    index: '02',
    title: 'Mobile App Development (Flutter & Android)',
    description:
      'Mengembangkan aplikasi mobile lintas-platform native-performance dengan Flutter & Dart. Berarsitektur offline-first, manajemen state terstruktur (Riverpod/Provider), dan visualisasi data fl_chart.',
    badges: [
      'Flutter',
      'Dart SDK',
      'Android Native (Kotlin/Java)',
      'Riverpod & Provider',
      'Offline-First (SQLite)',
      'fl_chart Visualization',
      'Material 3',
      'Capacitor',
    ],
  },
  {
    index: '03',
    title: 'Jaringan Komputer, P2P & Backend Architecture',
    description:
      'Merancang arsitektur transfer data P2P langsung via WebRTC DataChannels tanpa cloud relay. Didukung sertifikasi Cisco CCNA & Networking Basics untuk routing, switching, TCP/IP, dan basis data relasional.',
    badges: [
      'Cisco CCNA & NetBasics',
      'WebRTC P2P DataChannels',
      'TCP/IP, IPv4/IPv6 & NAT',
      'SQLite, MySQL, PostgreSQL',
      'Firebase Realtime DB',
      'Docker & Postman',
      'Socket.IO & P2P Stream',
      'Linux Server / SSH',
    ],
  },
  {
    index: '04',
    title: 'Sistem Desktop, Media Pipeline & Otomasi AI',
    description:
      'Membangun aplikasi desktop native dengan PyQt6 multithreading asynchronous, integrasi inferensi AI lokal (Whisper STT & Qwen GGUF) tanpa kuota internet, serta otomasi FFmpeg akselerasi GPU.',
    badges: [
      'Python, C++, C',
      'PyQt6 Multithreading',
      'Faster-Whisper STT',
      'FFmpeg GPU Pipeline',
      'Qwen 2.5 GGUF Local LLM',
      'Google Gemini API',
      'Tesseract.js OCR',
    ],
  },
  {
    index: '05',
    title: 'Computer Vision, IoT & Sistem Tertanam',
    description:
      'Melatih dan men-deploy model deteksi objek visual (YOLOv8 Nano mAP 98.5%) dan CNN karakter, diintegrasikan dengan mikrokontroler ESP32, sensor load cell, dan RFID e-KTP secara real-time.',
    badges: [
      'YOLOv8 Nano (mAP 98.5%)',
      'TensorFlow CNN (88.07%)',
      'ESP32 (C/C++)',
      'RFID RC522 (e-KTP)',
      'Sensor Load Cell & HX711',
      'OpenCV Image Processing',
    ],
  },
  {
    index: '06',
    title: 'Publikasi Riset Ilmiah & Validasi Empiris',
    description:
      'Melakukan studi komparasi algoritma prediktif machine learning dan instrumentasi perangkat keras yang berhasil terbit pada jurnal ilmiah nasional terakreditasi (Komputika & Biner).',
    badges: [
      'Jurnal Nasional Komputika',
      'Jurnal Ilmiah Biner',
      'Komparasi ML (RF, SVM, LR)',
      'Evaluasi Metrik F1 & MCC',
      'Bahasa: ID (Native)',
      'Bahasa: EN (Intermediate)',
      'Microsoft Excel Advanced',
      'Git & GitHub Versioning',
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
  const [activeCert, setActiveCert] = useState<CertificateCredential | null>(null);
  const [isClosingCertModal, setIsClosingCertModal] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('septiaedvan@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  const isNavClickRef = useRef(false);
  const navClickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    isNavClickRef.current = true;
    if (navClickTimeoutRef.current) clearTimeout(navClickTimeoutRef.current);
    navClickTimeoutRef.current = setTimeout(() => {
      isNavClickRef.current = false;
    }, 800);
  };

  const handleOpenModal = (project: FeaturedApp | ResearchProject) => {
    setIsClosingModal(false);
    setActiveModalProject(project);
  };

  const handleCloseModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setActiveModalProject(null);
      setIsClosingModal(false);
    }, 240);
  };

  const handleOpenCertModal = (cert: CertificateCredential) => {
    setIsClosingCertModal(false);
    setActiveCert(cert);
  };

  const handleCloseCertModal = () => {
    setIsClosingCertModal(true);
    setTimeout(() => {
      setActiveCert(null);
      setIsClosingCertModal(false);
    }, 240);
  };

  useEffect(() => {
    if (activeModalProject || activeCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalProject, activeCert]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeModalProject && !isClosingModal) {
          handleCloseModal();
        }
        if (activeCert && !isClosingCertModal) {
          handleCloseCertModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProject, isClosingModal, activeCert, isClosingCertModal]);

  useEffect(() => {
    const sectionIds = ['about', 'projects', 'skills', 'academic', 'contact', 'feedback'];
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      if (isNavClickRef.current) return;
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (navClickTimeoutRef.current) clearTimeout(navClickTimeoutRef.current);
    };
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
        <div className="mx-auto flex max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
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
                  onClick={() => handleNavClick(item.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                    isActive
                      ? 'border border-emerald-500/40 bg-emerald-500/15 text-white font-semibold shadow-sm shadow-emerald-950/40'
                      : 'border border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/60 hover:text-zinc-200'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#feedback"
              onClick={() => handleNavClick('feedback')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
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
                    handleNavClick(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'border border-emerald-500/40 bg-emerald-500/15 text-white font-semibold'
                      : 'border border-transparent text-zinc-300 hover:text-emerald-300'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#feedback"
              onClick={() => {
                handleNavClick('feedback');
                setMobileMenuOpen(false);
              }}
              className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-150 ${
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

      <main className="mx-auto max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <section className="py-10 sm:py-16 md:py-20 lg:py-24">
          <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-7 xl:col-span-8 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Role Indicator Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-medium text-zinc-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Fullstack Developer · AI &amp; Software Engineer</span>
                </div>

                {/* Main Headline */}
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-100 leading-[1.16]">
                    Suka ngulik web modern, aplikasi mobile, sampai arsitektur sistem jaringan.
                  </h1>
                </div>

                {/* Focused, Friendly & Casual Bio */}
                <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-400">
                  Halo! Saya lulusan S1 Sistem Komputer UNIKOM yang suka merancang aplikasi web modern (Next.js &amp; React), ngebangun aplikasi mobile pakai Flutter, sampai eksperimen transfer data P2P real-time via WebRTC. Selalu antusias bikin sistem yang gesit, rapi, dan nyaman dipakai di dunia nyata.
                </p>

                {/* CTA Group */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                  <a
                    href="#projects"
                    className="w-full sm:w-auto text-center rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-[0_4px_20px_rgba(52,211,153,0.25)] active:scale-95"
                  >
                    Eksplorasi Proyek ↓
                  </a>
                  <a
                    href="/cv-edvan.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none text-center rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:text-white active:scale-95"
                  >
                    Unduh CV ↗
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/90 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:text-white active:scale-95 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-300 font-medium">Email Berhasil Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Salin Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Key Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 border-t border-zinc-800/80 pt-6 sm:max-w-xl xl:max-w-2xl">
                <div className="group flex flex-col justify-between rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-2.5 sm:p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/50">
                  <p className="font-mono text-lg sm:text-2xl lg:text-3xl font-semibold tabular-nums text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    3.53
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs text-zinc-500 leading-tight">
                    IPK S1 Komputer
                  </p>
                </div>
                <div className="group flex flex-col justify-between rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-2.5 sm:p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/50">
                  <p className="font-mono text-lg sm:text-2xl lg:text-3xl font-semibold tabular-nums text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    100%
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs text-zinc-500 leading-tight">
                    Lighthouse Vitals
                  </p>
                </div>
                <div className="group flex flex-col justify-between rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-2.5 sm:p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/50">
                  <p className="font-mono text-lg sm:text-2xl lg:text-3xl font-semibold tabular-nums text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    02
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs text-zinc-500 leading-tight">
                    Publikasi Jurnal
                  </p>
                </div>
                <div className="group flex flex-col justify-between rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-2.5 sm:p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/50">
                  <p className="font-mono text-lg sm:text-2xl lg:text-3xl font-semibold tabular-nums text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    05+
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs text-zinc-500 leading-tight">
                    Proyek Mandiri
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Portrait & Identity */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center lg:items-end justify-between h-full">
              <div className="group relative w-full max-w-[280px] sm:max-w-[320px] xl:max-w-[340px] flex-1 min-h-[350px] sm:min-h-[380px] xl:min-h-[400px] overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900 shadow-2xl transition-all duration-300 hover:border-zinc-700">
                <Image
                  src="/profile.jpeg"
                  alt="Edvan Nuriana Putra Septia, S.Kom."
                  fill
                  sizes="(max-width: 768px) 280px, (max-width: 1280px) 320px, 340px"
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                  priority
                />
                {/* Subtle vignette for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Clean Status Pill */}
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-zinc-950/80 px-2.5 py-1 text-[11px] font-medium text-zinc-300 backdrop-blur-md shadow-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Open to Work</span>
                </div>
              </div>

              {/* Name & Title Below Photo */}
              <div className="pt-3 sm:pt-4 w-full max-w-[280px] sm:max-w-[320px] xl:max-w-[340px] text-center">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-100">
                  Edvan Nuriana Putra Septia, S.Kom.
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Fullstack Developer · AI &amp; Software Engineer
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 01 / TENTANG SAYA */}
        <section
          id="about"
          className="scroll-mt-20 border-t border-zinc-800/80 py-12 sm:py-16 md:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-2.5 font-mono text-sm uppercase tracking-wider text-emerald-400 font-semibold">
                <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeSection === 'about' ? 'bg-emerald-400 ring-4 ring-emerald-500/25 scale-110' : 'bg-zinc-600'}`} />
                <span>01 / Tentang Saya</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold leading-snug text-zinc-100 sm:text-3xl">
                Menggabungkan arsitektur web modern, rekayasa mobile lintas-platform, dan keandalan sistem jaringan.
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
                Sebagai sarjana Sistem Komputer (S1 UNIKOM, IPK 3.53), saya memadukan pemahaman mendalam tentang arsitektur perangkat keras dan jaringan komputer dengan rekayasa perangkat lunak modern. Di sisi web, saya terbiasa membangun antarmuka reaktif berkinerja tinggi menggunakan Next.js App Router, React 19, TypeScript, dan Tailwind CSS, serta mengoptimalkan distribusi edge melalui Cloudflare Workers dengan skor Lighthouse 100/100.
              </p>
              <p className="leading-relaxed text-justify hyphens-auto">
                Di sisi mobile, saya mengembangkan aplikasi lintas-platform berbasis Flutter dan Dart dengan pendekatan offline-first, manajemen state terstruktur (Riverpod/Provider), dan persistensi lokal terenkripsi (SQLite). Selain itu, saya merancang protokol transfer berkas real-time berbasis WebRTC DataChannels tanpa ketergantungan server cloud perantara, serta mengintegrasikan otomasi media dan model inferensi cerdas langsung pada perangkat pengguna.
              </p>

              {/* 3 Engineering Pillars */}
              <div className="grid gap-4.5 pt-4 sm:grid-cols-3 lg:gap-5">
                <div className="group relative overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/50">
                  <p className="font-mono text-xs mb-1.5 flex items-center gap-1.5">
                    <span className="text-emerald-400/90 font-semibold">01</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-200 font-medium">Web Architecture</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400 text-justify hyphens-auto">
                    Antarmuka reaktif berbasis Next.js App Router &amp; React 19, TypeScript type-safety, API modular, integrasi WebSockets, dan optimasi Core Web Vitals.
                  </p>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/50">
                  <p className="font-mono text-xs mb-1.5 flex items-center gap-1.5">
                    <span className="text-emerald-400/90 font-semibold">02</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-200 font-medium">Mobile Development</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400 text-justify hyphens-auto">
                    Aplikasi mobile Android &amp; multiplatform Flutter, arsitektur offline-first (SQLite), manajemen state Riverpod, dan visualisasi data fl_chart reaktif.
                  </p>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/50">
                  <p className="font-mono text-xs mb-1.5 flex items-center gap-1.5">
                    <span className="text-emerald-400/90 font-semibold">03</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-200 font-medium">Systems &amp; Network</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400 text-justify hyphens-auto">
                    Protokol P2P WebRTC tanpa cloud relay, Cisco CCNA networking (routing &amp; TCP/IP), otomasi FFmpeg GPU, serta inferensi model AI lokal (Whisper &amp; YOLOv8).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 / PROYEK & RISET */}
        <section
          id="projects"
          className="scroll-mt-20 border-t border-zinc-800/80 py-12 sm:py-16 md:py-20"
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
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
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
                  className={`rounded-lg px-3 py-1.5 text-[11px] sm:text-xs font-medium transition ${
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
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/60 cursor-pointer"
                >
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
                      <span className="inline-flex items-center gap-0.5 text-zinc-300 font-mono text-[11px] group-hover:text-emerald-400 group-hover:underline transition-colors">
                        ...rincian ↗
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
                          className={`rounded border px-2 py-0.5 font-mono text-[10px] sm:text-[11px] transition-colors ${getTechTagStyle(t)}`}
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
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/60 cursor-pointer"
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

                    <div className="p-4 sm:p-5">
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
                        <span className="inline-flex items-center gap-0.5 text-zinc-300 font-mono text-[11px] group-hover:text-emerald-400 group-hover:underline transition-colors">
                          ...rincian ↗
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

                  <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`rounded border px-2 py-0.5 font-mono text-[11px] transition-colors ${getTechTagStyle(t)}`}
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
          className="scroll-mt-20 border-t border-zinc-800/80 py-12 sm:py-16 md:py-20"
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
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/50"
              >
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
          className="scroll-mt-20 border-t border-zinc-800/80 py-12 sm:py-16 md:py-20"
        >
          <div className="mb-10">
            <div className="inline-flex items-center gap-2.5 font-mono text-sm uppercase tracking-wider text-emerald-400 font-semibold">
              <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeSection === 'academic' ? 'bg-emerald-400 ring-4 ring-emerald-500/25 scale-110' : 'bg-zinc-600'}`} />
              <span>04 / Akademik & Publikasi</span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">
              Kualifikasi Akademik & Kredensial Industri
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Fondasi akademik sarjana sistem komputer, riset ilmiah terpublikasi secara nasional, serta sertifikasi keahlian industri terverifikasi.
            </p>
          </div>

          {/* Tier 1: Pendidikan & Publikasi Ilmiah */}
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 mb-12">
            {/* Pendidikan Formal */}
            <div
              onClick={() => {
                const proj = RESEARCH_PROJECTS.find((p) => p.id === 'smart-parking');
                if (proj) handleOpenModal(proj);
              }}
              className="lg:col-span-5 flex flex-col justify-between group/edu relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-7 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60 cursor-pointer hover:-translate-y-1 active:scale-[0.99]"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                    <GraduationCap className="h-4 w-4 text-emerald-400" />
                    <span>Pendidikan Formal</span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500">2022—2026</span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-zinc-100 group-hover/edu:text-white transition-colors">
                  S1 Sistem Komputer
                </h3>
                <p className="mt-1 text-sm font-medium text-zinc-300">
                  Universitas Komputer Indonesia (UNIKOM) · Bandung, Jawa Barat
                </p>

                <div className="mt-3.5 inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/80 px-3.5 py-1.5 text-xs text-zinc-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>IPK: <strong className="text-white font-semibold">3.53</strong> / 4.00 · Lulus 2026</span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-zinc-400 text-justify hyphens-auto">
                  Fokus pada integrasi arsitektur sistem komputasi terdistribusi, rekayasa perangkat lunak modern, pengolahan sinyal &amp; citra digital, serta riset terapan kecerdasan buatan dan IoT.
                </p>

                <div className="mt-2 text-[11px] font-mono text-zinc-500">
                  <span>Pendidikan Menengah: SMAN 1 Tanjungsari (IPA · Sumedang, 2019—2022)</span>
                </div>

                {/* Sub-Card: Skripsi / Riset Terapan */}
                <div className="mt-4 rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-4 transition-colors hover:border-zinc-700">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-300 font-medium">
                      Skripsi &amp; Riset Terapan
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">2025—2026</span>
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-200 leading-snug group-hover/edu:text-white transition-colors">
                    Sistem Parkir Pintar &amp; Deteksi Pelat Otomatis
                  </h4>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                    Sistem gerbang otomatis dual validasi RFID e-KTP dan computer vision (YOLOv8 + CNN) real-time berbasis edge IoT ESP32 &amp; Firebase.
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {['YOLOv8 Nano', 'ESP32', 'TensorFlow CNN', 'Firebase'].map((t) => (
                      <span key={t} className="rounded border border-zinc-800/80 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-zinc-900 pt-2.5 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-zinc-400 group-hover/edu:text-zinc-200 transition">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Detail Riset ↗</span>
                    </span>
                    <a
                      href="https://github.com/EdvanVPRoject/Sistem-parkir-pintar-berbasis-visi-komputer-berbasis-iot-menggunakan-metode-yolo"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-300 hover:border-zinc-700 hover:text-zinc-100 transition"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-zinc-800/80 pt-3.5">
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 mb-2">
                  Bidang Keahlian Studi:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-300">
                    Computer Vision &amp; Deep Learning
                  </span>
                  <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-300">
                    Embedded Systems &amp; IoT
                  </span>
                  <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-300">
                    Jaringan Komputer &amp; P2P
                  </span>
                </div>
              </div>
            </div>

            {/* Publikasi Nasional */}
            <div className="lg:col-span-7 flex flex-col justify-between group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-7 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    <span>Publikasi Nasional</span>
                  </div>
                  <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400">
                    2 Paper Terakreditasi SINTA
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-zinc-100">
                  Artikel Jurnal Ilmiah
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Dua publikasi penelitian peer-reviewed terakreditasi nasional di bidang Machine Learning dan IoT.
                </p>

                {/* Publications List */}
                <div className="mt-4 space-y-3">
                  {/* Paper 1: Komputika */}
                  <div
                    onClick={() => {
                      const proj = RESEARCH_PROJECTS.find((p) => p.id === 'liver-ml');
                      if (proj) handleOpenModal(proj);
                    }}
                    className="group/card cursor-pointer rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/60 active:scale-[0.99]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
                        Jurnal Komputika · UNIKOM · Vol 15(1) 2026
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500">Hal. 83–94</span>
                    </div>
                    <h4 className="text-sm font-semibold text-zinc-200 leading-snug group-hover/card:text-white transition-colors">
                      Prediksi Penyakit Liver dengan Model Perbandingan Logistic Regression, SVM, dan Random Forest
                    </h4>
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                      Studi komparasi machine learning pada 579 data rekam medis pasien dengan evaluasi metrik F1-Score dan MCC (DOI: 10.34010/komputika.v15i1.19799).
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-900 pt-2.5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 group-hover/card:text-zinc-200 transition">
                        <Eye className="h-3.5 w-3.5" />
                        <span>Detail Riset ↗</span>
                      </span>
                      <a
                        href="https://doi.org/10.34010/komputika.v15i1.19799"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-zinc-100 transition"
                      >
                        <span>Buka DOI Jurnal</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Paper 2: Jurnal Biner */}
                  <div
                    onClick={() => {
                      const proj = RESEARCH_PROJECTS.find((p) => p.id === 'smart-pos');
                      if (proj) handleOpenModal(proj);
                    }}
                    className="group/card cursor-pointer rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/60 active:scale-[0.99]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
                        Jurnal Biner · UNSIQ · Vol 5(1) 2026
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500">Hal. 1–9</span>
                    </div>
                    <h4 className="text-sm font-semibold text-zinc-200 leading-snug group-hover/card:text-white transition-colors">
                      Implementasi Sistem Point of Sale pada UMKM Berbasis ESP32 dan Sensor Load Cell
                    </h4>
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                      Perancangan perangkat kasir pintar terhubung aplikasi web untuk otomatisasi timbangan digital UMKM berakurasi &gt;98% (DOI: 10.32699/biner.v5i1.10201).
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-900 pt-2.5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 group-hover/card:text-zinc-200 transition">
                        <Eye className="h-3.5 w-3.5" />
                        <span>Detail Riset ↗</span>
                      </span>
                      <a
                        href="https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-300 hover:border-zinc-700 hover:text-zinc-100 transition"
                      >
                        <span>Buka Artikel Jurnal</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 2: Kredensial & Sertifikasi Industri */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Award className="h-4 w-4" />
                  <span>Sertifikasi Resmi</span>
                </div>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
                  Kredensial Industri Terverifikasi
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Klik kartu untuk membuka pratinjau dokumen resolusi tinggi, detail keahlian, dan tautan verifikasi resmi.
                </p>
              </div>
              <span className="self-start sm:self-auto font-mono text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full">
                {CERTIFICATIONS_DATA.length} Sertifikat Terdaftar
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => handleOpenCertModal(cert)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/50 cursor-pointer active:scale-[0.99]"
                >
                  {/* Certificate Image Preview Header */}
                  <div>
                    <div
                      className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-950 border-b border-zinc-800/80"
                    >
                      <Image
                        src={cert.imageUrl}
                        alt={cert.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                      {/* Category Pill on top left */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="rounded border border-zinc-700/80 bg-zinc-900/90 px-2 py-0.5 font-mono text-[10px] text-zinc-300 backdrop-blur-sm">
                          {cert.category}
                        </span>
                      </div>

                      {/* Hover overlay hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-zinc-950/90 px-3 py-1.5 text-xs font-medium text-emerald-300 shadow-lg backdrop-blur-sm">
                          <ZoomIn className="h-3.5 w-3.5" />
                          <span>Pratinjau</span>
                        </span>
                      </div>
                    </div>

                    {/* Certificate Content */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-1 text-[11px] text-zinc-400">
                        <span className="font-medium text-zinc-300 truncate">{cert.issuer}</span>
                        <span className="font-mono text-[10px] text-zinc-500 shrink-0">{cert.period}</span>
                      </div>

                      <h4
                        className="mt-2 text-sm font-semibold text-zinc-100 line-clamp-2 hover:text-emerald-400 transition-colors"
                      >
                        {cert.title}
                      </h4>

                      {cert.credentialId && (
                        <p className="mt-1 text-[10px] font-mono text-zinc-500 truncate">
                          ID: {cert.credentialId}
                        </p>
                      )}

                      <p className="mt-2 text-[11px] leading-relaxed text-zinc-400 line-clamp-2">
                        {cert.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="p-4 pt-0 sm:p-5 sm:pt-0">
                    <div className="flex items-center gap-2 border-t border-zinc-800/80 pt-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCertModal(cert);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950 py-2 text-xs font-medium text-zinc-300 transition hover:border-emerald-500/40 hover:text-emerald-300 cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Pratinjau</span>
                      </button>
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-2 text-xs font-medium text-zinc-300 transition hover:border-emerald-500/40 hover:text-emerald-300"
                        title="Buka Berkas PDF"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        <span>PDF</span>
                      </a>
                      {cert.verifyUrl && (
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-2 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20"
                          title="Verifikasi Kredensial Resmi"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 / KONTAK & ULASAN */}
        <section
          id="contact"
          className="scroll-mt-20 border-t border-zinc-800/80 py-12 sm:py-16 md:py-20"
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

                <div className="sm:col-span-2 flex items-center gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-4 py-3 text-xs text-zinc-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-zinc-500">Domisili:</span>
                  <span className="text-zinc-200 font-medium">Sumedang, Jawa Barat, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Buku Tamu & Feedback */}
            <div id="feedback" className="scroll-mt-24 lg:col-span-6">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 sm:p-6 md:p-8">
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
        <div className="mx-auto flex max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-xs text-zinc-500 sm:flex-row">
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
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/90 text-zinc-300 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 hover:-translate-y-0.5 ${
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={handleCloseModal}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/80 backdrop-blur-md ${
              isClosingModal ? 'animate-backdrop-out pointer-events-none' : 'animate-backdrop-in'
            }`}
          />

          <div
            className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-zinc-800 bg-[#0E0E11] p-4 sm:p-6 md:p-8 shadow-2xl text-left ${
              isClosingModal
                ? 'animate-modal-out pointer-events-none'
                : 'animate-modal-in'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
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

      {/* CERTIFICATE LIGHTBOX MODAL */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          {/* Backdrop */}
          <div
            onClick={handleCloseCertModal}
            className={`absolute inset-0 bg-black/85 backdrop-blur-md ${
              isClosingCertModal ? 'animate-backdrop-out pointer-events-none' : 'animate-backdrop-in'
            }`}
          />

          {/* Modal Container: Pas selayar di layar PC (md:flex-row, md:h-[84vh], md:max-h-[740px], max-w-5xl lg:max-w-6xl) tanpa dropdown/scroll */}
          <div
            className={`relative z-10 flex w-full max-w-5xl lg:max-w-6xl flex-col md:flex-row overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl max-h-[92vh] md:h-[84vh] md:max-h-[740px] ${
              isClosingCertModal ? 'animate-modal-out pointer-events-none' : 'animate-modal-in'
            }`}
          >
            {/* Panel Kiri: Frame Gambar Sertifikat (Tampil maksimal dan fit penuh tanpa terpotong) */}
            <div className="relative flex flex-col justify-between border-b border-zinc-800/80 bg-zinc-950 p-4 sm:p-5 md:w-7/12 md:border-b-0 md:border-r lg:w-3/5">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-2 pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    <Award className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <span className="font-mono text-xs font-medium text-emerald-400 block truncate">
                      {activeCert.issuer}
                    </span>
                  </div>
                </div>
                <span className="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400 shrink-0">
                  {activeCert.period}
                </span>
              </div>

              {/* Main Certificate Image Canvas */}
              <div className="relative flex-1 w-full min-h-[240px] md:min-h-0 flex items-center justify-center py-2">
                <div className="relative h-full w-full aspect-[16/11] md:aspect-auto">
                  <Image
                    src={activeCert.imageUrl}
                    alt={activeCert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)] rounded-lg"
                    priority
                  />
                </div>
              </div>

              {/* Bottom Caption Bar */}
              <div className="hidden md:flex items-center justify-between pt-2.5 border-t border-zinc-900 text-[11px] font-mono text-zinc-500">
                <span className="inline-flex items-center gap-1.5 text-zinc-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Kredensial Digital Terverifikasi</span>
                </span>
                <a
                  href={activeCert.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 hover:underline inline-flex items-center gap-1 transition"
                >
                  Buka Berkas PDF <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Panel Kanan: Rincian Kredensial & Tombol Aksi */}
            <div className="flex flex-col justify-between bg-zinc-900/40 p-5 md:p-6 lg:w-2/5 md:w-5/12 overflow-y-auto md:overflow-y-auto">
              <div>
                {/* Header Kanan: Kategori & Tombol Tutup */}
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-medium text-emerald-300">
                    {activeCert.category}
                  </span>
                  <button
                    onClick={handleCloseCertModal}
                    className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
                    aria-label="Tutup Pratinjau Sertifikat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Judul Sertifikasi */}
                <h3 className="mt-3 text-lg font-bold text-zinc-100 sm:text-xl leading-snug">
                  {activeCert.title}
                </h3>

                {/* Credential ID */}
                {activeCert.credentialId && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-[11px] text-zinc-400">
                    <span className="text-zinc-500">ID Kredensial:</span>
                    <span className="text-zinc-200 select-all font-semibold">{activeCert.credentialId}</span>
                  </div>
                )}

                {/* Deskripsi */}
                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-zinc-300 text-justify hyphens-auto font-light">
                  {activeCert.description}
                </p>

                {/* Keahlian & Kompetensi Terverifikasi */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                    Keahlian yang Divalidasi:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-zinc-800 bg-zinc-950/90 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Kurikulum Modul Resmi */}
                {activeCert.modules && (
                  <div className="mt-4 pt-3 border-t border-zinc-800/80">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                      Kurikulum Resmi ({activeCert.modules.length} Modul Terverifikasi):
                    </p>
                    <div className="max-h-36 overflow-y-auto space-y-1.5 rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-2.5">
                      {activeCert.modules.map((modul, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] font-mono text-zinc-300">
                          <span className="text-emerald-400/80 shrink-0 font-bold">›</span>
                          <span className="leading-snug">{modul}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-5 pt-4 border-t border-zinc-800/80 space-y-2">
                {activeCert.verifyUrl && (
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 px-4 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Verifikasi Kredensial Resmi ↗</span>
                  </a>
                )}

                <div className="flex items-center gap-2">
                  <a
                    href={activeCert.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 py-2 px-3 text-xs font-medium text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Unduh Berkas Asli (PDF)</span>
                  </a>

                  <button
                    onClick={handleCloseCertModal}
                    className="rounded-lg border border-zinc-800/80 px-3.5 py-2 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
                  >
                    Tutup (Esc)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
