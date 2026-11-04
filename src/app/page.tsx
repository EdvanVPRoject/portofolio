'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowUp,
  ArrowRight,
  ExternalLink,
  FileText,
  CheckCircle2,
  ZoomIn,
  Eye,
  Copy,
  Check,
  UserRound,
  FolderGit2,
  Terminal,
  GraduationCap,
  Award,
  BookOpen,
  Mail,
  Send,
  SlidersHorizontal,
  Code2,
  ShieldCheck,
  BarChart3,
  Cpu,
  Database,
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
  pdfUrl?: string;
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
  scope: 'industry' | 'academic';
  credentialId?: string;
  verifyUrl?: string;
  pdfUrl: string;
  imageUrl: string;
  summary: string;
  description: string;
  skills: string[];
  modules?: string[];
}

const CERTIFICATIONS_DATA: CertificateCredential[] = [
  {
    id: 'cert-hackerrank-react',
    title: 'Frontend Developer (React)',
    issuer: 'HackerRank',
    period: '2026',
    category: 'Frontend Engineering',
    scope: 'industry',
    credentialId: '14E9FE830A72',
    verifyUrl: 'https://www.hackerrank.com/certificates/14e9fe830a72',
    pdfUrl: '/cert-hackerrank-react.pdf',
    imageUrl: '/cert-hackerrank-react.png',
    summary:
      'Validasi arsitektur komponen ReactJS, state & props management, routing, serta logika antarmuka interaktif.',
    description:
      'Sertifikasi uji kompetensi (Role Certification) dari HackerRank yang memvalidasi kemampuan praktis membangun aplikasi web menggunakan ReactJS—mencakup arsitektur komponen modular, pengelolaan state & props, siklus hidup komponen, hingga interaksi DOM yang responsif.',
    skills: [
      'ReactJS Component Architecture',
      'State & Props Management',
      'Frontend Routing & DOM',
      'Interactive UI Testing',
    ],
  },
  {
    id: 'cert-cisco-data-analytics',
    title: 'Cisco: Data Analytics Essentials',
    issuer: 'Cisco Networking Academy',
    period: '2026',
    category: 'Data Analytics & SQL',
    scope: 'industry',
    credentialId: 'a8434aa9-95b4-42e1-ac53-c578d599d1ad',
    pdfUrl: '/cert-cisco-data-analytics.pdf',
    imageUrl: '/cert-cisco-data-analytics.png',
    summary:
      'Kompetensi ETL, pembersihan data Excel, kueri database relasional SQL, serta pembuatan dashboard Tableau.',
    description:
      'Sertifikasi resmi Cisco Networking Academy yang berfokus pada alur kerja analisis dan otomasi data menyeluruh—mulai dari pengumpulan, pembersihan, dan transformasi data (ETL) menggunakan Excel serta kueri SQL relasional, hingga penyusunan dashboard pelaporan visual di Tableau.',
    skills: [
      'Data Preparation & ETL',
      'Relational SQL Queries',
      'Tableau Dashboard Reporting',
      'Exploratory Data Analysis',
      'Excel Data Transformation',
      'Data Storytelling',
    ],
  },
  {
    id: 'cert-coursera-excel',
    title: 'Microsoft Excel: Learn with Projects',
    issuer: 'Coursera Project Network',
    period: '2026',
    category: 'Data Automation & Reporting',
    scope: 'industry',
    credentialId: 'V32873K6COVJ (8 Kursus Spesialisasi)',
    verifyUrl: 'https://coursera.org/verify/specialization/V32873K6COVJ',
    pdfUrl: '/cert-coursera-excel.pdf',
    imageUrl: '/cert-coursera-excel.png',
    summary:
      'Otomatisasi laporan operasional, rumus lanjutan (XLOOKUP, INDEX-MATCH), PivotTable, dan dashboard KPI.',
    description:
      'Spesialisasi 8 kursus berbasis proyek (12 guided projects) di Coursera yang mempraktikkan otomatisasi pengolahan data operasional, rumus lanjutan (SUMIF, VLOOKUP, XLOOKUP, INDEX-MATCH), penyusunan PivotTable, hingga pembuatan dashboard pelacakan KPI.',
    skills: [
      'Advanced Formulas (XLOOKUP/INDEX-MATCH)',
      'PivotTables & Auto Reporting',
      'Operational Dashboarding',
      'AI-Assisted Data Workflows',
    ],
  },
  {
    id: 'cert-ccna',
    title: 'Cisco CCNA: Introduction to Networks (ITN)',
    issuer: 'Cisco Networking Academy · UNIKOM',
    period: '2025—2028',
    category: 'Network Infrastructure',
    scope: 'industry',
    pdfUrl: '/cert-ccna.pdf',
    imageUrl: '/cert-ccna.png',
    summary:
      'Perancangan topologi LAN, konfigurasi router & switch Cisco IOS, subnetting VLSM IPv4/IPv6, dan troubleshooting.',
    description:
      'Sertifikasi Cisco Networking Academy yang mencakup 17 modul fundamental jaringan: perancangan topologi LAN, konfigurasi perangkat router dan switch berbasis Cisco IOS, pemodelan OSI & TCP/IP, subnetting VLSM IPv4/IPv6, hingga teknik dasar keamanan dan troubleshooting jaringan.',
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
    category: 'Network Infrastructure',
    scope: 'industry',
    credentialId: '49cdedf9-0768-42cd-8b3a-82ac8e44a95a',
    pdfUrl: '/cert-cisco-networking-basics.pdf',
    imageUrl: '/cert-cisco-networking-basics.png',
    summary:
      'Konfigurasi jaringan nirkabel, manajemen IPv4/IPv6, layanan DHCP & NAT, serta diagnostik jaringan di Packet Tracer.',
    description:
      'Sertifikasi dari Cisco Networking Academy yang menguatkan pemahaman konsep komunikasi data, komponen & topologi jaringan, konfigurasi wireless router, skema pengalamatan IPv4/IPv6, layanan DHCP & NAT, serta simulasi lab Cisco Packet Tracer.',
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
  {
    id: 'cert-gemini',
    title: 'Google Gemini Certified Student — University',
    issuer: 'Google for Education',
    period: '2026—2029',
    category: 'Generative AI & Automation',
    scope: 'industry',
    pdfUrl: '/cert-gemini.pdf',
    imageUrl: '/cert-gemini.png',
    summary:
      'Pemanfaatan Google Gemini AI, rekayasa prompt terstruktur, dan otomatisasi alur kerja analisis data.',
    description:
      'Sertifikasi resmi dari Google for Education yang memvalidasi pemanfaatan praktis Google Gemini AI, penyusunan prompt yang efektif, otomatisasi alur kerja analisis data, serta penerapan prinsip kecerdasan buatan yang bertanggung jawab.',
    skills: ['Prompt Engineering', 'Gemini AI Workflow', 'Data Automation', 'AI Ethics'],
  },
  {
    id: 'cert-action-ai',
    title: 'Action AI Startup University: AI Essentials',
    issuer: 'underdogs. & UNIKOM',
    period: '2026',
    category: 'AI Prototyping & MVP',
    scope: 'industry',
    credentialId: 'UDI-202610-twv1n6 (OpenBadge 3.0)',
    verifyUrl: 'https://udimpact.kolleges.net/en/achievements',
    pdfUrl: '/cert-action-ai.pdf',
    imageUrl: '/cert-action-ai.png',
    summary:
      'Perancangan prototipe produk digital berbasis AI (MVP), validasi kebutuhan pengguna, dan pengujian fitur.',
    description:
      'Program intensif pengembangan produk berbasis AI dari underdogs. & UNIKOM (Act-preneur Certified, W3C VC 2.0) yang berfokus pada perumusan masalah pengguna, penyusunan prompt, hingga pembuatan prototipe MVP menggunakan Gemini dan Lovable.',
    skills: ['AI Prototyping', 'Lovable & Gemini', 'User Requirement Analysis', 'MVP Testing'],
  },
  {
    id: 'cert-unikom-mendeley',
    title: 'Literasi Informasi: Manajemen Referensi Ilmiah (Mendeley)',
    issuer: 'Perpustakaan & Prodi Sistem Komputer UNIKOM',
    period: '2026',
    category: 'Academic Research',
    scope: 'academic',
    credentialId: '003/SR/TR/PERPUS-UNIKOM/I/2026',
    pdfUrl: '/cert-unikom-mendeley.pdf',
    imageUrl: '/cert-unikom-mendeley.png',
    summary:
      'Manajemen basis data literatur ilmiah dan otomatisasi sitasi terstandar untuk publikasi jurnal nasional.',
    description:
      'Pelatihan penelusuran literatur ilmiah, pengelolaan basis data referensi riset, serta otomatisasi sitasi dan daftar pustaka terstandar menggunakan aplikasi Mendeley untuk menunjang penulisan karya ilmiah dan publikasi jurnal.',
    skills: [
      'Mendeley Reference Manager',
      'Scientific Literature Search',
      'Academic Citation Standards',
      'Research Documentation',
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
      'Aplikasi desktop Windows untuk memotong video berdurasi panjang menjadi klip vertikal siap unggah (Shorts/Reels/TikTok) lengkap dengan transkripsi AI dan subtitle dinamis.',
    highlights: [
      'Mode AI Fleksibel (Bisa 100% Offline via GGUF atau Cloud API)',
      'Antarmuka Tetap Responsif saat Render Video (Asynchronous Worker)',
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
        'Aplikasi desktop Windows yang dirancang untuk mempermudah kreator konten dan editor video dalam memotong video panjang menjadi klip highlight vertikal secara otomatis, lengkap dengan transkripsi AI dan pembuatan subtitle dinamis tanpa biaya langganan bulanan.',
      bullets: [
        'Dukungan Hybrid AI: Bisa berjalan 100% offline menggunakan model lokal (Faster-Whisper & Qwen 2.5 GGUF) untuk privasi penuh, maupun terhubung ke Cloud via Google Gemini API.',
        'Deteksi Momen Penting: Membantu menemukan bagian pembuka yang menarik (hook), momen reaksi, atau poin pembicaraan utama secara otomatis.',
        'Format & Auto-Framing Fleksibel: Mendukung rasio 9:16 (Shorts/TikTok), 16:9, 1:1, dan 4:3 lengkap dengan efek smart background blur.',
        'Kustomisasi Subtitle Dinamis (Hardsub): Tersedia lebih dari 7 gaya subtitle (Karaoke, Neon, Highlight, Box) dengan posisi teks yang bisa digeser langsung di layar pratinjau.',
        'Akselerasi GPU: Memanfaatkan encoder hardware (Nvidia NVENC, Intel QSV, AMD AMF) agar proses render berjalan cepat di latar belakang.',
      ],
      results:
        'Memangkas waktu pengeditan klip vertikal dari berjam-jam menjadi hitungan menit secara offline, bebas watermark, dan tanpa biaya berlangganan.',
      note: 'Source code dan installer Windows (.exe) tersedia di halaman GitHub Releases.',
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
      'Aplikasi berbagi file ukuran besar dan screen sharing lintas perangkat (Windows & Android) lewat jaringan Wi-Fi lokal menggunakan WebRTC P2P tanpa memakan kuota internet.',
    highlights: [
      'Transfer Langsung Antar-Perangkat Tanpa Server Perantara',
      'Satu Basis Kode untuk Desktop & Mobile (React 19, Electron & Capacitor)',
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
        'Solusi praktis untuk mengirim file berukuran besar dan membagikan layar antar-perangkat (Windows, Android, dan Browser) di jaringan lokal yang sama dengan cepat tanpa perlu kuota internet atau unggah ke cloud.',
      bullets: [
        'Direct P2P DataChannel: File dikirim langsung dari perangkat ke perangkat melalui WebRTC dengan pembagian chunk 64KB dan pengaturan alur memori yang stabil.',
        'Privasi Terjaga Tanpa Cloud: File tidak pernah mampir ke server pihak ketiga sehingga jauh lebih aman dan kecepatannya mengikuti kapasitas Wi-Fi lokal.',
        'Koneksi Instan via QR Code: Cukup pindai QR Code yang tampil di layar perangkat utama untuk langsung terhubung tanpa repot mengetik alamat IP.',
        'Screen Share Real-Time: Menampilkan layar perangkat secara langsung dengan jeda (latency) yang sangat rendah menggunakan WebRTC MediaStream.',
      ],
      results:
        'Memudahkan pengiriman file lintas ekosistem (PC ke HP maupun sebaliknya) dengan kecepatan penuh jaringan Wi-Fi lokal.',
    },
  },
  {
    id: 'eninformasi',
    title: 'EnInformasi Hub — Portal 213 Tutorial, Gaming & Tren Teknologi',
    tagline: 'Platform Edukasi & Publikasi Web · Bilingual ID/EN',
    year: '2026',
    badge: 'Next.js & Cloudflare',
    category: ['software'],
    image: '/eninformasi-icon.svg',
    description:
      'Portal web teknologi dua bahasa (Indonesia & Inggris) yang memuat 213 artikel tutorial praktis, pembahasan gaming, dan ulasan tren teknologi di atas infrastruktur Cloudflare Workers.',
    highlights: [
      '213 Materi Terstruktur (Tutorial Praktis, Gaming & Ulasan Teknologi)',
      'Fitur Ganti Bahasa Instan (ID/EN) & Checklist Praktik Interaktif',
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
        'Platform bacaan teknologi modern yang memisahkan kategori Tutorial Praktis (panduan langkah demi langkah) dan EnInformasi (ulasan mendalam & tren industri). Dirancang agar ringan dibuka, nyaman dibaca di HP maupun PC, dan mendukung dua bahasa secara penuh.',
      bullets: [
        '213 Artikel Terkurasi: Membahas pengembangan software, pemanfaatan AI/LLM, cloud computing, sistem IoT, hingga perkembangan dunia teknologi dan gaming.',
        'Bilingual Real-Time: Tombol pengubah bahasa yang langsung menerjemahkan judul, ringkasan, isi artikel, dan daftar isi tanpa perlu memuat ulang halaman.',
        'Checklist Praktik Interaktif: Pembaca bisa mencentang langkah-langkah tutorial yang sudah dipraktikkan langsung di browser.',
        'Navigasi Daftar Isi Otomatis: Penanda posisi bacaan aktif yang mengikuti guliran layar di desktop maupun perangkat mobile.',
        'Performa Edge Computing: Dibangun dengan Next.js App Router dan di-deploy ke jaringan Cloudflare melalui OpenNext untuk waktu muat yang instan.',
      ],
      results:
        'Menghadirkan pengalaman membaca dokumentasi dan tutorial yang bersih, responsif, dan meraih skor performa Lighthouse 100/100.',
      note: 'Website dapat diakses langsung dan seluruh kode sumbernya terbuka di GitHub.',
    },
  },
  {
    id: 'endoclens-pdf',
    title: 'ENDocLens-PDF — Scanner Dokumen, OCR & 16 Alat PDF di Browser',
    tagline: 'Client-Side Web Suite · 16 Modul PDF & Tooling Dokumen',
    year: '2026',
    badge: 'Web Suite & OCR',
    category: ['software'],
    image: '/endoclens-icon.svg',
    description:
      'Aplikasi web pengolahan dokumen dengan 16 fitur PDF, pemindai kamera otomatis (perspective warp), dan pembaca teks OCR yang berjalan 100% langsung di browser tanpa unggah ke server.',
    highlights: [
      '16 Alat PDF Terpadu & Privasi Penuh (Diproses Langsung di Browser)',
      'Pelurus Foto Dokumen Otomatis & Ekstraksi Teks OCR (Tesseract.js)',
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
        'Kumpulan 16 alat pengolahan PDF dan pemindai dokumen berbasis web. Semua proses—mulai dari meluruskan foto kertas, menggabungkan PDF, membaca teks lewat OCR, hingga memberi kata sandi—dijalankan langsung di perangkat pengguna (client-side), sehingga dokumen pribadi tetap aman.',
      bullets: [
        'Smart Document Scanner: Mendeteksi sudut kertas dan meluruskan hasil foto yang miring secara otomatis, dilengkapi filter pembersih bayangan agar siap cetak.',
        '16 Fitur dalam Satu Web: Gabung (merge), pisah (split), kompres ukuran PDF, kunci dengan password, tambah watermark, konversi gambar ke PDF, hingga tanda tangan digital.',
        'OCR & Bantuan AI: Mengekstrak teks dari gambar pindaian menggunakan Tesseract.js langsung di browser untuk memudahkan penyalinan isi dokumen.',
        'Dukungan Ukuran Kertas Lokal: Mendukung format kertas F4/Folio yang umum dipakai di Indonesia selain ukuran A4 dan Letter.',
        'Tanpa Upload Server: Menggunakan pdf-lib dan pemrosesan canvas lokal sehingga prosesnya cepat dan bebas risiko kebocoran dokumen.',
      ],
      results:
        'Memungkinkan pengguna memindai dan merapikan dokumen PDF langsung dari browser HP atau laptop kapan saja tanpa perlu menginstal aplikasi tambahan.',
      note: 'Dapat dicoba langsung di doclens-pdf.vercel.app dan kode sumbernya tersedia di GitHub.',
    },
  },
  {
    id: 'enlife',
    title: 'ENLife — Aplikasi Produktivitas & Manajemen Aktivitas Harian',
    tagline: 'Mobile & Desktop App · Flutter Offline-First',
    year: '2026',
    badge: 'Flutter & Dart',
    category: ['software'],
    image: '/enlife-icon.svg',
    description:
      'Aplikasi pendamping produktivitas harian berbasis Flutter yang menggabungkan pencatatan keuangan (fl_chart), pelacak kebiasaan (habit tracker), timer Pomodoro, dan penyimpan data penting.',
    highlights: [
      'Berjalan 100% Offline dengan Penyimpanan Lokal yang Cepat & Aman',
      '4 Fitur Utama (Catatan Keuangan, Habit/Pomodoro, ID Vault, Kalkulator Praktis)',
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
        'Aplikasi manajemen aktivitas sehari-hari yang dibangun menggunakan Flutter. Dirancang dengan pendekatan offline-first agar bisa diandalkan kapan saja tanpa bergantung pada sinyal internet, sekaligus menjaga seluruh data pribadi tetap tersimpan di perangkat sendiri.',
      bullets: [
        'Catatan Keuangan & Grafik: Mencatat pemasukan dan pengeluaran harian dalam format Rupiah lengkap dengan visualisasi grafik kategori menggunakan fl_chart.',
        'Habit Tracker & Pomodoro: Membantu membangun rutinitas positif lewat perhitungan streak harian, daftar tugas (to-do list), dan timer fokus Pomodoro 25/5 menit.',
        'Penyimpan Nomor Penting (ID Vault): Menyimpan nomor identitas atau dokumen penting secara lokal dengan tombol salin cepat dan pengingat masa berlaku.',
        'Kalkulator Harian Praktis: Dilengkapi fitur hitung patungan (split bill) beserta pajak/layanan dan penghitung diskon belanja.',
        'Tampilan Dark Mode Nyaman: Mengusung antarmuka gelap yang bersih dan ramah di mata untuk pemakaian harian.',
      ],
      results:
        'Menyatukan empat kebutuhan produktivitas harian ke dalam satu aplikasi yang ringan, instan ketika dibuka, dan sepenuhnya bebas iklan.',
      note: 'Kode sumber lengkap beserta panduan build (Android/Windows/Web) tersedia di GitHub.',
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
      'Rancang bangun sistem palang parkir otomatis dengan verifikasi ganda menggunakan tap RFID e-KTP dan deteksi pelat nomor kendaraan (YOLOv8 & CNN) yang terhubung ke mikrokontroler ESP32.',
    highlights: [
      'Verifikasi Ganda (Kartu RFID e-KTP + Kamera Deteksi Pelat YOLOv8)',
      'Integrasi Mikrokontroler ESP32, Database Lokal SQLite & Firebase',
    ],
    tech: ['YOLOv8 Nano', 'TensorFlow CNN', 'ESP32', 'SQLite', 'Firebase'],
    link: {
      label: 'Repositori GitHub ↗',
      url: 'https://github.com/EdvanVPRoject/Sistem-parkir-pintar-berbasis-visi-komputer-berbasis-iot-menggunakan-metode-yolo',
    },
    modalDetails: {
      kicker: 'Skripsi & Riset Terapan · 2025—2026',
      summary:
        'Penelitian tugas akhir yang merancang sistem keamanan parkir dengan pencocokan berlapis. Kartu e-KTP digunakan untuk mengenali identitas pengendara, sementara kamera computer vision secara otomatis membaca dan memastikan pelat nomor kendaraan sesuai saat keluar.',
      bullets: [
        'Modul RFID RC522 pada mikrokontroler ESP32 membaca UID e-KTP pengendara di gerbang parkir.',
        'Model YOLOv8 Nano mendeteksi posisi pelat nomor kendaraan secara real-time melalui tangkapan kamera.',
        'Model CNN berbasis TensorFlow mengenali susunan huruf dan angka pada citra pelat nomor.',
        'Data transaksi disimpan secara lokal di SQLite dan disinkronkan ke Firebase untuk pemantauan.',
      ],
      results:
        'Pengujian pembacaan RFID berjalan 100% sukses (55 dari 55 uji coba). Deteksi lokasi pelat dengan YOLOv8 Nano mencapai mAP@0.50 sebesar 98,51%, dan pengenalan karakter CNN meraih akurasi validasi 88,07%.',
    },
  },
  {
    id: 'liver-ml',
    title: 'Prediksi Penyakit Liver dengan Perbandingan Logistic Regression, SVM, dan Random Forest',
    tagline: 'Publikasi Jurnal Komputika · Vol. 15 No. 1 (2026) Hal. 83–94',
    year: '2026',
    category: ['publication'],
    image: '/journal-liver-cover.png',
    description:
      'Penelitian komparasi algoritma machine learning (Random Forest, SVM, dan Logistic Regression) pada 579 data rekam medis pasien yang terbit di Jurnal Ilmiah Komputika UNIKOM.',
    highlights: [
      'Terbit di Komputika: Jurnal Sistem Komputer (Vol. 15, No. 1, 2026)',
      'Evaluasi Performa Klasifikasi Menggunakan Metrik F1-Score & MCC',
    ],
    tech: ['Random Forest', 'SVM', 'Logistic Regression', 'Scikit-Learn'],
    link: {
      label: 'DOI Jurnal ↗',
      url: 'https://doi.org/10.34010/komputika.v15i1.19799',
    },
    pdfUrl: '/journal-komputika-liver.pdf',
    modalDetails: {
      kicker: 'Publikasi Ilmiah Terakreditasi · Jurnal Komputika (2026)',
      summary:
        'Penelitian kolaboratif bersama Fajar Wicaksono, Yudis Jalu, Sandy Maulana, dan Edvan Nuriana Putra Septia. Studi ini membandingkan tiga algoritma klasifikasi machine learning pada 579 data klinis pasien untuk membantu deteksi dini risiko penyakit liver.',
      bullets: [
        'Tahap pra-pemrosesan data meliputi pembersihan nilai kosong (missing values) dan normalisasi atribut medis.',
        'Pengujian model pada beberapa skenario rasio data latih dan data uji (70:30, 80:20, serta 90:10).',
        'Pengukuran performa secara menyeluruh menggunakan Accuracy, F1-Score, dan Matthews Correlation Coefficient (MCC).',
      ],
      results:
        'Algoritma Random Forest memberikan hasil paling stabil pada rasio data 80:20 dengan nilai F1-Score 0,696 dan MCC 0,203, serta ketepatan prediksi 98% pada pengujian sampel uji.',
    },
  },
  {
    id: 'smart-pos',
    title: 'Implementasi Sistem Point of Sale UMKM Berbasis ESP32 dan Sensor Load Cell',
    tagline: 'Publikasi Jurnal Biner · Vol. 5 No. 1 (2026) Hal. 1–9',
    year: '2026',
    category: ['iot-cv', 'publication'],
    image: '/journal-pos-cover.png',
    description:
      'Integrasi timbangan digital berbasis mikrokontroler ESP32 dan sensor Load Cell HX711 yang langsung terhubung ke aplikasi kasir web untuk membantu transaksi UMKM, terbit di Jurnal Biner.',
    highlights: [
      'Terbit di Biner: Jurnal Ilmiah Informatika dan Komputer (Vol. 5, No. 1, 2026)',
      'Otomatisasi Pembacaan Berat Timbangan Langsung ke Aplikasi Kasir Web',
    ],
    tech: ['ESP32', 'Sensor Load Cell HX711', 'Web Application', 'SQLite'],
    link: {
      label: 'Artikel Jurnal ↗',
      url: 'https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/',
    },
    pdfUrl: '/journal-biner-pos.pdf',
    modalDetails: {
      kicker: 'Publikasi Ilmiah Terakreditasi · Jurnal Biner (2026)',
      summary:
        'Penelitian oleh Edvan Nuriana Putra Septia bersama Abdan Rafi, Akyas Maulana, Syahrul Gunawan, dan Hidayat. Merancang sistem kasir pintar yang menghubungkan timbangan digital langsung ke aplikasi web POS agar kasir tidak perlu mengetik berat barang secara manual.',
      bullets: [
        'Perancangan rangkaian mikrokontroler ESP32 dengan sensor berat Load Cell dan modul penguat sinyal HX711.',
        'Pengiriman data berat barang secara real-time ke aplikasi web kasir untuk langsung menghitung total harga otomatis.',
        'Pembuatan antarmuka kasir berbasis web untuk mengelola daftar produk, riwayat transaksi, dan stok barang.',
      ],
      results:
        'Alat timbangan mencapai tingkat akurasi pengukuran di atas 98%, mempercepat proses pelayanan di meja kasir, dan meminimalkan kesalahan input harga.',
    },
  },
];

export type EngineeringPillarId = 'fullstack' | 'qa' | 'data';

export interface EngineeringPillar {
  id: EngineeringPillarId;
  title: string;
  description: string;
  projectIds: string[];
  ctaLabel: string;
}

const ENGINEERING_PILLARS: EngineeringPillar[] = [
  {
    id: 'fullstack',
    title: 'Fullstack & Mobile',
    description:
      'Membangun aplikasi web & lintas-platform menggunakan ReactJS, Next.js 15, TypeScript, Node.js, REST API, dan Flutter yang responsif di semua perangkat.',
    projectIds: ['eninformasi', 'endoclens-pdf', 'encross', 'enlife', 'smart-pos', 'enclip'],
    ctaLabel: 'Lihat 6 Proyek Terkait',
  },
  {
    id: 'qa',
    title: 'Quality Assurance (QA)',
    description:
      'Memastikan aplikasi stabil dan bebas bug lewat Unit Testing, API Testing dengan Postman, User Acceptance Testing (UAT), dan optimasi Lighthouse 100%.',
    projectIds: ['endoclens-pdf', 'eninformasi', 'encross', 'smart-parking'],
    ctaLabel: 'Lihat 4 Proyek Terkait',
  },
  {
    id: 'data',
    title: 'Data Automation & IoT',
    description:
      'Mengolah alur data operasional menjadi dashboard real-time dan sistem Auto Report menggunakan Python, SQL, Tableau, Excel lanjutan, serta sensor IoT.',
    projectIds: ['smart-parking', 'smart-pos', 'liver-ml', 'enclip', 'enlife'],
    ctaLabel: 'Lihat 5 Proyek Terkait',
  },
];

type SkillDomain = 'all' | 'fullstack' | 'qa' | 'data' | 'network-ai';

interface ExpertiseItem {
  id: Exclude<SkillDomain, 'all'>;
  title: string;
  subtitle: string;
  iconName: 'code' | 'shield' | 'chart' | 'cpu';
  description: string;
  previewTags: string[];
  modalDetails: {
    kicker: string;
    summary: string;
    competencies: string[];
    tools: string[];
    highlightMetric: string;
    relatedProjectIds: string[];
  };
}

const EXPERTISE_DATA: ExpertiseItem[] = [
  {
    id: 'fullstack',
    title: 'Fullstack Web & Cross-Platform App',
    subtitle: 'Web, Mobile & Desktop Architecture',
    iconName: 'code',
    description:
      'Merancang dan membangun aplikasi web modern (ReactJS, Next.js 15, TypeScript, Node.js, REST API) serta aplikasi mobile dan desktop lintas-platform (Flutter & PyQt6) dengan arsitektur komponen yang modular dan responsif.',
    previewTags: ['ReactJS / React 19', 'Next.js 15', 'TypeScript & JS', 'NodeJS & REST API', 'Flutter'],
    modalDetails: {
      kicker: 'Fullstack Software Engineering · Web, Mobile & Desktop',
      summary:
        'Berpengalaman mengembangkan aplikasi dari tahap perancangan antarmuka (UI/UX), pembuatan arsitektur komponen frontend, integrasi REST API & backend, hingga deployment ke cloud edge (Cloudflare Workers & Vercel) maupun kompilasi aplikasi native.',
      competencies: [
        'Pengembangan aplikasi web modern berbasis komponen menggunakan React 19 (HackerRank Certified) dan Next.js 15 App Router.',
        'Integrasi layanan backend, pembuatan endpoint REST API dengan Node.js & FastAPI, serta komunikasi real-time menggunakan WebSockets.',
        'Pembangunan aplikasi mobile Android/iOS dengan Flutter (Dart) berarsitektur Offline-First (SQLite) dan manajemen state Riverpod/Provider.',
        'Pengembangan aplikasi desktop Windows mandiri menggunakan Python (PyQt6) dengan asynchronous worker agar UI bebas freeze.',
      ],
      tools: [
        'JavaScript (ES6+)',
        'TypeScript',
        'ReactJS / React 19',
        'Next.js 15',
        'NodeJS',
        'REST API',
        'HTML5 & CSS3',
        'Tailwind CSS 4',
        'Flutter & Dart',
        'Python (PyQt6)',
        'Git & GitHub',
        'Cloudflare Workers',
      ],
      highlightMetric:
        'Melahirkan 4 aplikasi mandiri siap pakai (EnInformasi Hub, ENCross, ENLife, ENCLip) dengan waktu muat cepat dan antarmuka responsif di berbagai ukuran layar.',
      relatedProjectIds: ['eninformasi', 'encross', 'enlife', 'enclip'],
    },
  },
  {
    id: 'qa',
    title: 'Quality Engineering (QA) & Software Testing',
    subtitle: 'Reliability, API Testing & Performance',
    iconName: 'shield',
    description:
      'Menjaga kualitas, keandalan, dan keamanan aplikasi melalui pengujian terstruktur—mencakup Unit Testing, API Testing dengan Postman, User Acceptance Testing (UAT), debugging sistematis, dan optimasi performa.',
    previewTags: ['Quality Assurance (QA)', 'API Testing (Postman)', 'Unit Testing', 'UAT', 'Lighthouse 100%'],
    modalDetails: {
      kicker: 'Quality Assurance (QA) & Software Testing',
      summary:
        'Menerapkan pengujian perangkat lunak secara menyeluruh di setiap siklus pengembangan untuk memastikan seluruh fitur berjalan sesuai spesifikasi bisnis, bebas regresi, aman dari kebocoran memori, dan memiliki performa tinggi.',
      competencies: [
        'Pengujian endpoint REST API menggunakan Postman (validasi status code, payload JSON, autentikasi, error handling, dan waktu respons).',
        'Pelaksanaan Functional Testing, Unit Testing, Integration Testing, serta penyusunan skenario uji dan User Acceptance Testing (UAT).',
        'Audit performa aplikasi web menggunakan Google Lighthouse & Chrome DevTools hingga mencapai skor Core Web Vitals 99–100/100.',
        'Pengujian stabilitas memori dan proses latar belakang pada aplikasi desktop & web (menjaga jejak RAM <50MB pada pemrosesan dokumen besar).',
      ],
      tools: [
        'Quality Assurance (QA)',
        'Software Testing',
        'API Testing (Postman)',
        'Unit Testing',
        'User Acceptance Testing (UAT)',
        'ESLint & Static Analysis',
        'Chrome DevTools Profiling',
        'Lighthouse Performance Audit',
        'Bug Tracking & Debugging',
        'Cross-Browser & Responsive Testing',
      ],
      highlightMetric:
        'Skor performa Google Lighthouse 99–100/100 pada portal web produksi dan efisiensi penggunaan memori <50MB pada pemrosesan PDF berbasis Web Worker.',
      relatedProjectIds: ['eninformasi', 'endoclens', 'encross'],
    },
  },
  {
    id: 'data',
    title: 'Data Automation, SQL & Dashboard Reporting',
    subtitle: 'Operational ETL, Database & Business BI',
    iconName: 'chart',
    description:
      'Memetakan alur data operasional menjadi dashboard pemantauan real-time dan sistem laporan otomatis (Auto Report / ETL) menggunakan Python, SQL (MySQL, PostgreSQL, SQLite), Firebase, Tableau, dan Excel tingkat lanjut.',
    previewTags: ['Data Automation / ETL', 'SQL / MySQL', 'Tableau Dashboard', 'Excel Advanced', 'Firebase DB'],
    modalDetails: {
      kicker: 'IT Systems, Data Automation & Business Intelligence',
      summary:
        'Mengotomatisasi proses pengumpulan, pembersihan, dan pengolahan data operasional (ETL) dari berbagai sumber menjadi laporan terstruktur dan dashboard visual interaktif untuk mempercepat pengambilan keputusan.',
      competencies: [
        'Perancangan skema database relasional dan penulisan kueri SQL (MySQL, PostgreSQL, SQLite) untuk agregasi, join kompleks, dan pelaporan data.',
        'Otomatisasi pengolahan data dan pembuatan sistem Auto Report menggunakan skrip Python serta formula Microsoft Excel tingkat lanjut (XLOOKUP, INDEX-MATCH, PivotTable).',
        'Visualisasi metrik operasional dan tren kinerja ke dalam dashboard interaktif menggunakan Tableau, Chart.js, dan fl_chart.',
        'Sinkronisasi data operasional lapangan secara real-time menggunakan Firebase Realtime Database dan penyimpanan lokal terstruktur.',
      ],
      tools: [
        'Data Analysis',
        'Data Automation / ETL',
        'Dashboard Reporting',
        'Tableau',
        'SQL / MySQL / PostgreSQL',
        'Database Management',
        'SQLite & Firebase Realtime DB',
        'Microsoft Excel (XLOOKUP, PivotTable)',
        'Python (Pandas, Scikit-Learn)',
        'Exploratory Data Analysis (EDA)',
      ],
      highlightMetric:
        'Tersertifikasi resmi Cisco Data Analytics Essentials & Spesialisasi 8 Kursus Microsoft Excel Coursera, serta publikasi riset analitik data medis di Jurnal Komputika.',
      relatedProjectIds: ['liver-ml', 'smart-pos', 'enlife'],
    },
  },
  {
    id: 'network-ai',
    title: 'Network Infrastructure, IoT & Applied AI',
    subtitle: 'Cisco CCNA, Field-to-Dashboard IoT & AI',
    iconName: 'cpu',
    description:
      'Mengintegrasikan sensor dan mikrokontroler lapangan (ESP32, Load Cell, RFID) ke sistem pemantauan real-time, merancang jaringan berstandar Cisco CCNA & protokol P2P WebRTC, serta menerapkan model AI & Computer Vision.',
    previewTags: ['Cisco CCNA', 'ESP32 & IoT POS', 'WebRTC P2P', 'YOLOv8 Vision', 'Local LLM & Gemini'],
    modalDetails: {
      kicker: 'Network Infrastructure, IoT Systems & Applied AI',
      summary:
        'Menggabungkan keahlian infrastruktur jaringan komputer (Cisco CCNA), integrasi perangkat keras IoT di lapangan, serta penerapan model kecerdasan buatan (Computer Vision & LLM) ke dalam sistem operasional yang terhubung penuh.',
      competencies: [
        'Konfigurasi infrastruktur jaringan LAN/WLAN, routing & switching Cisco IOS, subnetting VLSM IPv4/IPv6, DHCP, NAT, dan diagnostik jaringan.',
        'Integrasi perangkat IoT berbasis ESP32 (sensor berat Load Cell HX711, RFID e-KTP, kamera) langsung ke aplikasi kasir (POS) dan dashboard monitoring real-time.',
        'Implementasi protokol komunikasi langsung antar-perangkat (Peer-to-Peer) menggunakan WebRTC DataChannels tanpa server penyimpanan perantara.',
        'Pelatihan dan deployment model deteksi objek YOLOv8 Nano & TensorFlow CNN serta integrasi model AI lokal (Whisper, Qwen GGUF) dan Google Gemini API.',
      ],
      tools: [
        'Cisco CCNA (Routing & Switching)',
        'TCP/IP, IPv4/IPv6 & Subnetting VLSM',
        'DHCP, NAT & Cisco Packet Tracer',
        'WebRTC P2P & Socket.IO',
        'ESP32 & Sensor IoT (Load Cell, RFID)',
        'YOLOv8 & TensorFlow CNN',
        'Faster-Whisper & Qwen GGUF',
        'Google Gemini API',
        'FFmpeg GPU Pipeline',
      ],
      highlightMetric:
        'Akurasi pembacaan timbangan digital POS >98% (terbit di Jurnal Biner) dan akurasi deteksi pelat nomor YOLOv8 mencapai mAP@50 98.51% dengan waktu respons <2 detik.',
      relatedProjectIds: ['smart-parking', 'smart-pos', 'encross', 'enclip'],
    },
  },
];

interface SkillKeywordItem {
  name: string;
  domain: Exclude<SkillDomain, 'all'>;
  highlight?: boolean;
}

const SKILL_KEYWORDS: SkillKeywordItem[] = [
  // Fullstack & Web (Padepokan 79 Core)
  { name: 'JavaScript (ES6+)', domain: 'fullstack', highlight: true },
  { name: 'TypeScript', domain: 'fullstack', highlight: true },
  { name: 'ReactJS / React 19', domain: 'fullstack', highlight: true },
  { name: 'Next.js 15 App Router', domain: 'fullstack', highlight: true },
  { name: 'NodeJS', domain: 'fullstack', highlight: true },
  { name: 'REST API', domain: 'fullstack', highlight: true },
  { name: 'HTML5 & CSS3', domain: 'fullstack' },
  { name: 'Tailwind CSS', domain: 'fullstack' },
  { name: 'Flutter & Dart', domain: 'fullstack', highlight: true },
  { name: 'Python (PyQt6 & FastAPI)', domain: 'fullstack' },
  { name: 'Git & GitHub Workflow', domain: 'fullstack' },

  // QA & Software Testing (Padepokan 79 QA Focus)
  { name: 'Quality Assurance (QA)', domain: 'qa', highlight: true },
  { name: 'Software Testing', domain: 'qa', highlight: true },
  { name: 'Unit Testing', domain: 'qa', highlight: true },
  { name: 'API Testing (Postman)', domain: 'qa', highlight: true },
  { name: 'User Acceptance Testing (UAT)', domain: 'qa', highlight: true },
  { name: 'Functional & Regression Testing', domain: 'qa' },
  { name: 'Lighthouse & Core Web Vitals Audit', domain: 'qa' },
  { name: 'Debugging & Memory Profiling', domain: 'qa' },

  // Data Automation & Database (Garudafood Core)
  { name: 'Data Analysis', domain: 'data', highlight: true },
  { name: 'Data Automation / ETL', domain: 'data', highlight: true },
  { name: 'Tableau', domain: 'data', highlight: true },
  { name: 'Dashboard Reporting', domain: 'data', highlight: true },
  { name: 'Database Management', domain: 'data', highlight: true },
  { name: 'SQL / MySQL / PostgreSQL', domain: 'data', highlight: true },
  { name: 'SQLite & Firebase Realtime DB', domain: 'data', highlight: true },
  { name: 'Microsoft Excel (XLOOKUP & PivotTable)', domain: 'data', highlight: true },
  { name: 'Python (Pandas & Scikit-Learn)', domain: 'data' },

  // Network, IoT & AI (System & Field Integration)
  { name: 'Cisco CCNA (Routing & Switching)', domain: 'network-ai', highlight: true },
  { name: 'TCP/IP, VLSM Subnetting & DHCP/NAT', domain: 'network-ai' },
  { name: 'WebRTC P2P DataChannels', domain: 'network-ai', highlight: true },
  { name: 'ESP32 & Sensor IoT (POS / RFID)', domain: 'network-ai', highlight: true },
  { name: 'YOLOv8 & Computer Vision', domain: 'network-ai', highlight: true },
  { name: 'Local LLM (Qwen GGUF) & Gemini API', domain: 'network-ai' },
];

type SectionIconType = 'about' | 'projects' | 'skills' | 'academic' | 'contact';

function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex w-full items-center justify-center py-2 sm:py-3 overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* Subtle Architectural Hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700/80 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-48 sm:w-72 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
      {/* Center Diamond Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rotate-45 rounded-[1px] border border-emerald-400/60 bg-zinc-950" />
    </div>
  );
}

function SectionKicker({
  label,
  icon = 'about',
  step,
  className = '',
}: {
  label: string;
  icon?: SectionIconType;
  step?: string;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none group ${className}`}>
      {/* Clean Standard Open-Source Icon Badge */}
      <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/90 text-emerald-400 shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:border-zinc-700">
        {icon === 'about' && <UserRound className="h-4 w-4" />}
        {icon === 'projects' && <FolderGit2 className="h-4 w-4" />}
        {icon === 'skills' && <Terminal className="h-4 w-4" />}
        {icon === 'academic' && <GraduationCap className="h-4 w-4" />}
        {icon === 'contact' && <Mail className="h-4 w-4" />}
      </div>

      {/* Crisp Editorial Title Case Label */}
      <div className="flex items-center gap-2">
        {step && (
          <span className="font-mono text-[11px] font-semibold text-zinc-500">
            {step}
          </span>
        )}
        <span className="font-heading text-xs sm:text-sm font-semibold tracking-tight text-zinc-200">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [activeSkillTab, setActiveSkillTab] = useState<SkillDomain>('all');
  const [activeCertFilter, setActiveCertFilter] = useState<'all' | 'industry'>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<
    FeaturedApp | ResearchProject | null
  >(null);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [activeExpertise, setActiveExpertise] = useState<ExpertiseItem | null>(null);
  const [isClosingExpertiseModal, setIsClosingExpertiseModal] = useState(false);
  const [activeCert, setActiveCert] = useState<CertificateCredential | null>(null);
  const [isClosingCertModal, setIsClosingCertModal] = useState(false);
  const [activePillarFilter, setActivePillarFilter] = useState<EngineeringPillarId | null>(null);
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

  const handleOpenExpertiseModal = (item: ExpertiseItem) => {
    setIsClosingExpertiseModal(false);
    setActiveExpertise(item);
  };

  const handleCloseExpertiseModal = () => {
    setIsClosingExpertiseModal(true);
    setTimeout(() => {
      setActiveExpertise(null);
      setIsClosingExpertiseModal(false);
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

  const handleSelectPillar = (pillarId: EngineeringPillarId) => {
    setActivePillarFilter((prev) => (prev === pillarId ? null : pillarId));
    setActiveFilter('all');
    if (typeof document !== 'undefined') {
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        projectsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleResetPillarFilter = () => {
    setActivePillarFilter(null);
  };

  useEffect(() => {
    if (activeModalProject || activeCert || activeExpertise) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [activeModalProject, activeCert, activeExpertise]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeModalProject && !isClosingModal) {
          handleCloseModal();
        }
        if (activeExpertise && !isClosingExpertiseModal) {
          handleCloseExpertiseModal();
        }
        if (activeCert && !isClosingCertModal) {
          handleCloseCertModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeModalProject,
    isClosingModal,
    activeExpertise,
    isClosingExpertiseModal,
    activeCert,
    isClosingCertModal,
  ]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [statProgress, setStatProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    const start = performance.now();
    const duration = 1150;
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setStatProgress(eased);
      if (elapsed < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const sectionIds = ['about', 'projects', 'skills', 'academic', 'contact', 'feedback'];
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)));
      }
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

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeFilter, activeSkillTab, activeCertFilter, activePillarFilter]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -2.4;
      const rotateY = ((x - centerX) / centerX) * 2.4;
      el.setAttribute('data-tilting', 'true');
      el.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.removeAttribute('data-tilting');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');
  const [guestCategory, setGuestCategory] = useState('Rekrutmen / Full-Time');
  const [guestMessage, setGuestMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const currentPillar = ENGINEERING_PILLARS.find((p) => p.id === activePillarFilter);

  const filteredApps = FEATURED_APPS.filter((app) => {
    if (activePillarFilter && currentPillar) {
      return currentPillar.projectIds.includes(app.id);
    }
    return activeFilter === 'all' || app.category.includes(activeFilter);
  });

  const filteredResearch = RESEARCH_PROJECTS.filter((item) => {
    if (activePillarFilter && currentPillar) {
      return currentPillar.projectIds.includes(item.id);
    }
    return activeFilter === 'all' || item.category.includes(activeFilter);
  });

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
          contact: guestContact.trim() || 'Tidak dicantumkan',
          category: guestCategory,
          rating: 5,
          comment: guestMessage.trim(),
          message: guestMessage.trim(),
        }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setGuestName('');
        setGuestContact('');
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
      {/* Subtle Architectural Top Vignette */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px]"
        style={{
          background:
            'radial-gradient(80% 55% at 50% 0%, rgba(255, 255, 255, 0.035) 0%, rgba(16, 185, 129, 0.05) 45%, transparent 100%)',
        }}
      />

      {/* Subtle Architectural Dot-Matrix Grid */}
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
      <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-[#0A0A0C]/75 backdrop-blur-xl">
        {/* Smooth Top Scroll Progress Indicator */}
        <div
          className="pointer-events-none absolute top-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="mx-auto flex max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-base font-semibold tracking-tight text-zinc-100 hover:opacity-90 transition"
          >
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-zinc-700/80 bg-zinc-900 shadow-sm transition duration-300 group-hover:border-emerald-400 group-hover:scale-105">
              <Image
                src="/github-avatar.png"
                alt="Logo Edvan"
                width={28}
                height={28}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="font-heading">
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
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'border border-zinc-700 bg-zinc-900 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]'
                      : 'border border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/60 hover:text-zinc-200'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => handleNavClick('contact')}
              className={`group inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                activeSection === 'contact' || activeSection === 'feedback'
                  ? 'border-emerald-400 bg-emerald-500 text-zinc-950 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                  : 'border-emerald-500/35 bg-emerald-500/10 text-emerald-300 hover:border-emerald-500/55 hover:bg-emerald-500/20 hover:text-white'
              }`}
            >
              <span>Kontak &amp; Pesan</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
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
          <div className="md:hidden border-b border-zinc-800/80 bg-[#0A0A0C]/90 px-6 py-4 space-y-2 text-sm font-medium backdrop-blur-xl animate-fade-in-up">
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
                      ? 'border border-zinc-700 bg-zinc-900 text-white font-semibold'
                      : 'border border-transparent text-zinc-300 hover:text-emerald-300'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => {
                handleNavClick('contact');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-xs font-semibold transition ${
                activeSection === 'contact' || activeSection === 'feedback'
                  ? 'border-emerald-400 bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'border-emerald-500/35 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 hover:text-white'
              }`}
            >
              <span>Kontak &amp; Pesan</span>
              <span>↗</span>
            </a>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <section className="py-8 sm:py-14 md:py-20 lg:py-24">
          <div className="grid items-stretch gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-7 xl:col-span-8 flex flex-col justify-between">
              <div className="space-y-4 sm:space-y-5">
                {/* Role Indicator Badge with Live Radar Pulse */}
                <div className="animate-fade-in-up inline-flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1.5 text-[11px] sm:text-xs font-medium text-zinc-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span>Fullstack Developer · Data Automation &amp; QA Engineer</span>
                </div>

                {/* Main Headline with Full Gradient Shimmer */}
                <div className="animate-fade-in-up delay-75">
                  <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.18] sm:leading-[1.15] text-gradient-shimmer">
                    Membangun aplikasi fullstack, otomasi data real-time, hingga sistem yang teruji.
                  </h1>
                </div>

                {/* Professional yet Relaxed Bio */}
                <p className="animate-fade-in-up delay-150 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-400">
                  Halo! Saya lulusan <strong className="text-zinc-200 font-medium">S1 Sistem Komputer (Rumpun Ilmu Komputer &amp; Informatika)</strong> UNIKOM yang fokus merancang aplikasi web &amp; mobile modern (ReactJS, Next.js, Node.js, Flutter), melakukan pengujian kualitas perangkat lunak (QA, Unit &amp; API Testing), serta mengolah alur data operasional menjadi dashboard real-time dan laporan otomatis dengan Python, SQL, Tableau, dan Excel.
                </p>

                {/* CTA Group (Symmetrical 2-column grid on mobile, inline flex on sm+) */}
                <div className="animate-fade-in-up delay-225 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                  <a
                    href="#projects"
                    className="spring-pill group col-span-2 sm:col-span-1 sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-950 hover:bg-emerald-400"
                  >
                    <span>Eksplorasi Proyek</span>
                    <span className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
                  </a>
                  <a
                    href="/cv-edvan.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="spring-pill group inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium text-zinc-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-zinc-700 hover:text-white whitespace-nowrap"
                  >
                    <span>Unduh CV</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="spring-pill inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-zinc-700 hover:text-white cursor-pointer whitespace-nowrap"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
                        <span className="text-emerald-300 font-medium">Email Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                        <span>Salin Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Key Highlights Bar with Animated Number Counters */}
              <div className="animate-fade-in-up delay-300 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 border-t border-zinc-800/80 pt-5 sm:pt-6 sm:max-w-xl xl:max-w-2xl">
                <div
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="spotlight-card group flex flex-col justify-between rounded-xl border border-zinc-800/80 p-3 sm:p-3.5 hover:border-zinc-700"
                >
                  <p className="relative z-10 font-heading text-xl sm:text-2xl lg:text-3xl font-bold tabular-nums text-zinc-100 transition-transform duration-300 group-hover:scale-105 group-hover:text-emerald-400 origin-left">
                    {(3.53 * statProgress).toFixed(2)}
                  </p>
                  <p className="relative z-10 mt-1 text-[11px] sm:text-xs text-zinc-400 leading-tight">
                    IPK S1 Komputer
                  </p>
                </div>
                <div
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="spotlight-card group flex flex-col justify-between rounded-xl border border-zinc-800/80 p-3 sm:p-3.5 hover:border-zinc-700"
                >
                  <p className="relative z-10 font-heading text-xl sm:text-2xl lg:text-3xl font-bold tabular-nums text-zinc-100 transition-transform duration-300 group-hover:scale-105 group-hover:text-emerald-400 origin-left">
                    {Math.round(100 * statProgress)}%
                  </p>
                  <p className="relative z-10 mt-1 text-[11px] sm:text-xs text-zinc-400 leading-tight">
                    Lighthouse Vitals
                  </p>
                </div>
                <div
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="spotlight-card group flex flex-col justify-between rounded-xl border border-zinc-800/80 p-3 sm:p-3.5 hover:border-zinc-700"
                >
                  <p className="relative z-10 font-heading text-xl sm:text-2xl lg:text-3xl font-bold tabular-nums text-zinc-100 transition-transform duration-300 group-hover:scale-105 group-hover:text-emerald-400 origin-left">
                    0{Math.max(1, Math.round(2 * statProgress))}
                  </p>
                  <p className="relative z-10 mt-1 text-[11px] sm:text-xs text-zinc-400 leading-tight">
                    Publikasi Jurnal
                  </p>
                </div>
                <div
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="spotlight-card group flex flex-col justify-between rounded-xl border border-zinc-800/80 p-3 sm:p-3.5 hover:border-zinc-700"
                >
                  <p className="relative z-10 font-heading text-xl sm:text-2xl lg:text-3xl font-bold tabular-nums text-zinc-100 transition-transform duration-300 group-hover:scale-105 group-hover:text-emerald-400 origin-left">
                    0{Math.max(1, Math.round(5 * statProgress))}+
                  </p>
                  <p className="relative z-10 mt-1 text-[11px] sm:text-xs text-zinc-400 leading-tight">
                    Proyek Mandiri
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Portrait & Identity */}
            <div className="animate-fade-in-up delay-150 lg:col-span-5 xl:col-span-4 flex flex-col items-center lg:items-end justify-between h-full">
              <div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="spotlight-card group relative w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[340px] aspect-[4/5] lg:aspect-auto lg:flex-1 lg:min-h-[390px] overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:border-zinc-700"
              >
                <Image
                  src="/profile.jpeg"
                  alt="Edvan Nuriana Putra Septia, S.Kom."
                  fill
                  sizes="(max-width: 768px) 250px, (max-width: 1280px) 300px, 340px"
                  className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.035]"
                  priority
                />
                {/* Subtle vignette for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Clean Status Pill with Live Radar Pulse */}
                <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-zinc-700/70 bg-zinc-950/85 px-2.5 py-1 text-[11px] font-medium text-zinc-200 backdrop-blur-md shadow-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span>Open to Work</span>
                </div>
              </div>

              {/* Name Below Photo */}
              <div className="pt-3 sm:pt-3.5 w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[340px] text-center">
                <h2 className="font-heading text-base sm:text-xl font-bold tracking-tight text-zinc-100">
                  Edvan Nuriana Putra Septia, S.Kom.
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* TENTANG SAYA */}
        <SectionDivider />
        <section
          id="about"
          className="scroll-mt-20 py-10 sm:py-16 md:py-20"
        >
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div data-reveal className="lg:col-span-4">
              <SectionKicker icon="about" label="Tentang Saya" />
              <h2 className="font-heading mt-3.5 text-xl sm:text-3xl font-bold leading-snug tracking-tight text-zinc-100">
                Berangkat dari fondasi sistem komputer, fokus membangun perangkat lunak yang andal dan nyaman digunakan.
              </h2>

              {/* Ringkasan Kesiapan & Kolaborasi (HRD & Partner Quick-Scan) */}
              <div className="mt-5 rounded-xl border border-zinc-800/90 bg-zinc-950/70 p-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    Kesiapan Kerja &amp; Kolaborasi
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Immediate
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-zinc-400">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-zinc-500 shrink-0">Skema:</span>
                    <span className="text-right font-medium text-zinc-200">Full-Time, Kontrak &amp; Proyek Freelance</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-zinc-500 shrink-0">Mobilitas:</span>
                    <span className="text-right font-medium text-zinc-200">On-Site (Bandung / Jabodetabek), Hybrid &amp; Remote</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-zinc-500 shrink-0">Bahasa:</span>
                    <span className="text-right font-medium text-zinc-200">Indonesia (Utama) &amp; Inggris (Skor TOEFL 147)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/in/edvannuriana"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:text-white"
                >
                  <span>Profil LinkedIn</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
                <a
                  href="/portofolio-proyek-edvan.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800/90 bg-zinc-950 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:text-emerald-300"
                >
                  <FileText className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Ringkasan Proyek (PDF)</span>
                </a>
              </div>
            </div>

            <div data-reveal data-delay="1" className="space-y-4 sm:space-y-5 text-sm sm:text-base text-zinc-400 lg:col-span-8">
              <p className="leading-relaxed text-justify">
                Latar belakang saya di <strong className="text-zinc-200 font-medium">S1 Sistem Komputer (Rumpun Ilmu Komputer &amp; Informatika)</strong> UNIKOM (IPK 3.53) memberi perspektif yang utuh—mulai dari memahami arsitektur perangkat keras dan jaringan komputer, hingga merancang aplikasi modern dan menguji kualitas perangkat lunak (Quality Assurance). Di ranah web dan mobile, saya terbiasa membangun aplikasi menggunakan ReactJS, Next.js 15, TypeScript, Node.js, REST API, serta Flutter yang diuji secara menyeluruh dengan Postman dan Unit Testing.
              </p>
              <p className="leading-relaxed text-justify">
                Selain pengembangan aplikasi, saya memiliki ketertarikan kuat pada otomasi sistem dan analitik data operasional. Saya terbiasa memetakan data dari lapangan maupun database relasional (SQL / MySQL / PostgreSQL / Firebase) menjadi dashboard pemantauan real-time dan sistem laporan otomatis (Auto Report / ETL) menggunakan Python, Tableau, serta Microsoft Excel tingkat lanjut.
              </p>

              {/* 3 Engineering Pillars (Interactive - Tap to View Connected Projects) */}
              <div className="grid gap-3.5 sm:gap-4.5 pt-3 sm:pt-4 sm:grid-cols-3 lg:gap-5">
                {ENGINEERING_PILLARS.map((pillar) => {
                  const isActive = activePillarFilter === pillar.id;
                  return (
                    <div
                      key={pillar.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSelectPillar(pillar.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectPillar(pillar.id);
                        }
                      }}
                      onMouseMove={handleCardMouseMove}
                      onMouseLeave={handleCardMouseLeave}
                      className={`spotlight-card group relative flex flex-col justify-between overflow-hidden rounded-xl border p-4 sm:p-5 cursor-pointer transition-all duration-300 ${
                        isActive
                          ? 'border-emerald-500/80 bg-emerald-950/25 shadow-[0_0_24px_rgba(16,185,129,0.18)]'
                          : 'border-zinc-800/90 hover:border-zinc-700 bg-zinc-950/40'
                      }`}
                    >
                      <div className="relative z-10">
                        <div className="mb-2.5 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400 shadow-sm transition-transform duration-300 group-hover:scale-105">
                              {pillar.id === 'fullstack' && <Code2 className="h-4 w-4" />}
                              {pillar.id === 'qa' && <ShieldCheck className="h-4 w-4" />}
                              {pillar.id === 'data' && <Database className="h-4 w-4" />}
                            </span>
                            <h3 className="font-heading text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors">
                              {pillar.title}
                            </h3>
                          </div>
                          {isActive && (
                            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-500/30">
                              Aktif
                            </span>
                          )}
                        </div>
                        <p className="text-xs leading-relaxed text-zinc-400 text-justify">
                          {pillar.description}
                        </p>
                      </div>

                      {/* Tactile Action Link to Projects */}
                      <div className="relative z-10 mt-3.5 flex items-center justify-between border-t border-zinc-800/70 pt-2.5 text-xs font-medium text-zinc-300 group-hover:text-emerald-300 transition-colors">
                        <span>{pillar.ctaLabel}</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 text-emerald-400">
                          ↓
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* PROYEK & RISET */}
        <SectionDivider />
        <section
          id="projects"
          className="scroll-mt-20 py-10 sm:py-16 md:py-20"
        >
          <div data-reveal className="mb-7 sm:mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <SectionKicker icon="projects" label="Proyek & Riset" />
              <h2 className="font-heading mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                Proyek Pilihan &amp; Riset Terapan
              </h2>
              <p className="mt-1 text-xs text-zinc-400">
                Ketuk kartu mana saja untuk melihat latar belakang pembuatan, fitur utama, dan detail teknisnya.
              </p>
            </div>

            {/* Category Filter Buttons (Symmetrical 2x2 grid on mobile, inline on sm+) */}
            <div className="grid grid-cols-2 sm:inline-flex sm:flex-wrap w-full sm:w-auto gap-1.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-1.5">
              {[
                { id: 'all', label: 'Semua (7)' },
                { id: 'software', label: 'Aplikasi & AI (4)' },
                { id: 'iot-cv', label: 'IoT & Visi Komputer (2)' },
                { id: 'publication', label: 'Jurnal Ilmiah (2)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveFilter(tab.id as ProjectCategory);
                    setActivePillarFilter(null);
                  }}
                  className={`rounded-lg px-2.5 sm:px-3 py-2 sm:py-1.5 text-[11px] sm:text-xs font-medium transition-all duration-200 cursor-pointer text-center ${
                    activeFilter === tab.id && !activePillarFilter
                      ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Pillar Filter Indicator Banner */}
          {activePillarFilter && currentPillar && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/40 bg-emerald-950/25 p-3.5 sm:p-4 text-xs sm:text-sm text-emerald-300 animate-fade-in-up">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>
                  Menampilkan <strong>{filteredApps.length + filteredResearch.length}</strong> proyek yang terhubung dengan pilar <strong className="text-zinc-100">{currentPillar.title}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={handleResetPillarFilter}
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/50 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-400 hover:text-zinc-950 transition-all cursor-pointer shadow-sm"
              >
                <span>Reset (Tampilkan Semua Proyek)</span>
                <span>✕</span>
              </button>
            </div>
          )}

          {/* Bento Row 1: Featured Software Applications */}
          {filteredApps.length > 0 && (
            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7">
              {filteredApps.map((app, idx) => (
                <article
                  key={`${activeFilter}-${app.id}`}
                  onClick={() => handleOpenModal(app)}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{ animationDelay: `${idx * 65}ms` }}
                  className="spotlight-card animate-card-enter group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800/90 p-4 sm:p-5 hover:border-zinc-700 cursor-pointer"
                >
                  <div className="relative z-10">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="spring-icon relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] group-hover:border-emerald-500/40">
                          <Image
                            src={app.image}
                            alt={app.title}
                            width={36}
                            height={36}
                            className="object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-emerald-300">
                              {app.badge}
                            </span>
                            {activePillarFilter && currentPillar && (
                              <span className="rounded border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-emerald-300">
                                Terhubung
                              </span>
                            )}
                            <span className="font-mono text-[11px] sm:text-xs text-zinc-500">
                              {app.year}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-zinc-500 truncate">
                            {app.tagline}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-heading text-base sm:text-lg font-bold text-zinc-100 transition group-hover:text-emerald-300 leading-snug">
                      {app.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-zinc-400 text-justify">
                      {app.description}{' '}
                      <span className="inline-flex items-center gap-0.5 text-zinc-300 font-mono text-[11px] group-hover:text-emerald-400 group-hover:underline transition-colors">
                        ...selengkapnya ↗
                      </span>
                    </p>

                    {/* Architectural Highlights */}
                    <ul className="mt-3.5 space-y-1.5 border-l-2 border-emerald-500/50 pl-3">
                      {app.highlights.map((item) => (
                        <li key={item} className="text-[11px] sm:text-xs text-zinc-300 leading-snug">
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
                  <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/80 pt-3">
                    <span className="text-[11px] font-mono text-zinc-500 group-hover:text-emerald-400/90 transition inline-flex items-center gap-1">
                      <span>Detail proyek</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                    </span>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {app.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`rounded-lg px-2.5 py-1 text-[11px] sm:text-xs font-medium transition-all duration-200 ${
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
            <div className="mt-6 sm:mt-7 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {filteredResearch.map((project, idx) => (
                <article
                  key={`${activeFilter}-${project.id}`}
                  onClick={() => handleOpenModal(project)}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{ animationDelay: `${(filteredApps.length + idx) * 65}ms` }}
                  className="spotlight-card animate-card-enter group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800/90 hover:border-zinc-700 cursor-pointer"
                >
                  <div className="relative z-10">
                    <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-800/80 bg-zinc-950">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-2 font-mono text-[11px] sm:text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-emerald-400/90 truncate">
                            {project.tagline.split('·')[0]}
                          </span>
                          {activePillarFilter && currentPillar && (
                            <span className="rounded border border-emerald-500/40 bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] text-emerald-300 shrink-0">
                              Terhubung
                            </span>
                          )}
                        </div>
                        <span className="text-zinc-500 shrink-0">{project.year}</span>
                      </div>

                      <h3 className="font-heading mt-2 text-base font-bold text-zinc-100 transition group-hover:text-emerald-300 leading-snug">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-zinc-400 text-justify">
                        {project.description}{' '}
                        <span className="inline-flex items-center gap-0.5 text-zinc-300 font-mono text-[11px] group-hover:text-emerald-400 group-hover:underline transition-colors">
                          ...selengkapnya ↗
                        </span>
                      </p>

                      <ul className="mt-3.5 space-y-1 border-l-2 border-emerald-500/50 pl-2.5">
                        {project.highlights.map((h) => (
                          <li key={h} className="text-[11px] text-zinc-300 leading-snug">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="relative z-10 px-4 pb-4 sm:px-5 sm:pb-5">
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`rounded border px-2 py-0.5 font-mono text-[10px] sm:text-[11px] transition-colors ${getTechTagStyle(t)}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/80 pt-3">
                      <span className="text-[11px] font-mono text-zinc-500 group-hover:text-emerald-400/90 transition inline-flex items-center gap-1">
                        <span>Detail riset</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                      </span>

                      <div className="flex items-center gap-2">
                        {project.pdfUrl && (
                          <a
                            href={project.pdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
                          >
                            <FileText className="h-3 w-3 text-emerald-400" />
                            <span>PDF Jurnal</span>
                          </a>
                        )}
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
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* KEAHLIAN TEKNIS & SPESIALISASI */}
        <SectionDivider />
        <section
          id="skills"
          className="scroll-mt-20 py-10 sm:py-16 md:py-20"
        >
          {/* Centered Expertise Header (Inspired by Reference Layout) */}
          <div data-reveal className="mx-auto max-w-2xl text-center mb-9 sm:mb-12">
            <SectionKicker icon="skills" label="Spesialisasi & Keahlian" />
            <h2 className="font-heading mt-3 text-2xl sm:text-4xl font-bold tracking-tight text-zinc-100">
              Bidang Spesialisasi &amp; Keahlian
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-zinc-400">
              Kombinasi keahlian teknis dan pengalaman praktis dalam membangun aplikasi fullstack, menjaga kualitas perangkat lunak (QA), mengotomatisasi alur data menjadi dashboard real-time, serta infrastruktur jaringan &amp; IoT.
            </p>
          </div>

          {/* 4-Column Specialization Cards */}
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERTISE_DATA.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  data-reveal
                  data-delay={String((idx % 4) + 1)}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => handleOpenExpertiseModal(item)}
                  className="spotlight-card group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800/90 p-5 sm:p-6 hover:border-zinc-700 cursor-pointer active:scale-[0.99]"
                >
                  <div className="relative z-10">
                    {/* Standard Open-Source Icon Badge */}
                    <div className="spring-icon mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-emerald-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10">
                      {item.iconName === 'code' && <Code2 className="h-5 w-5" />}
                      {item.iconName === 'shield' && <ShieldCheck className="h-5 w-5" />}
                      {item.iconName === 'chart' && <BarChart3 className="h-5 w-5" />}
                      {item.iconName === 'cpu' && <Cpu className="h-5 w-5" />}
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-heading text-base sm:text-lg font-bold text-zinc-100 leading-snug transition-colors group-hover:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] text-zinc-500">
                      {item.subtitle}
                    </p>

                    {/* Concise Practical Narrative */}
                    <p className="mt-3 text-xs leading-relaxed text-zinc-400 text-justify">
                      {item.description}
                    </p>

                    {/* Core Preview Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.previewTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-zinc-800/90 bg-zinc-950/90 px-2 py-0.5 font-mono text-[10px] text-zinc-300 transition-colors group-hover:border-zinc-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive "Read more ->" Footer */}
                  <div className="relative z-10 mt-5 border-t border-zinc-800/80 pt-3.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 transition-colors group-hover:text-emerald-400">
                      <span>Lihat detail &amp; keahlian</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Technical Keyword & Stack Explorer */}
          <div
            data-reveal
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="spotlight-card mt-7 sm:mt-8 rounded-2xl border border-zinc-800/90 p-4 sm:p-6"
          >
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-heading text-xs sm:text-sm font-semibold text-zinc-200">
                    Eksplorasi Kata Kunci Teknis &amp; Tools
                  </span>
                </div>

                {/* Filter Tabs */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-1.5">
                  {[
                    { id: 'all', label: `Semua (${SKILL_KEYWORDS.length})` },
                    { id: 'fullstack', label: 'Fullstack & Web' },
                    { id: 'qa', label: 'QA & Testing' },
                    { id: 'data', label: 'Data & Otomasi' },
                    { id: 'network-ai', label: 'Jaringan, IoT & AI' },
                  ].map((tab, idx) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveSkillTab(tab.id as SkillDomain)}
                      className={`${
                        idx === 0 ? 'col-span-2 sm:col-span-1' : ''
                      } rounded-lg px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium transition-all duration-200 cursor-pointer ${
                        activeSkillTab === tab.id
                          ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                          : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Skill Pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {SKILL_KEYWORDS.filter(
                  (kw) => activeSkillTab === 'all' || kw.domain === activeSkillTab
                ).map((kw, idx) => {
                  const targetExpertise = EXPERTISE_DATA.find((e) => e.id === kw.domain);
                  return (
                    <button
                      key={`${activeSkillTab}-${kw.name}`}
                      type="button"
                      style={{ animationDelay: `${(idx % 12) * 25}ms` }}
                      onClick={() => {
                        if (targetExpertise) handleOpenExpertiseModal(targetExpertise);
                      }}
                      className={`spring-pill animate-card-enter group/pill inline-flex items-center gap-1.5 rounded-lg border px-2.5 sm:px-3 py-1.5 font-mono text-[11px] sm:text-xs cursor-pointer ${
                        kw.highlight
                          ? 'border-zinc-700/90 bg-zinc-900/90 text-zinc-100 hover:border-emerald-500/50 hover:text-emerald-300'
                          : 'border-zinc-800/80 bg-zinc-950/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      {kw.highlight && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 transition-transform duration-200 group-hover/pill:scale-150" />
                      )}
                      <span>{kw.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* AKADEMIK & PUBLIKASI */}
        <SectionDivider />
        <section
          id="academic"
          className="scroll-mt-20 py-10 sm:py-16 md:py-20"
        >
          <div data-reveal className="mb-8 sm:mb-10">
            <SectionKicker icon="academic" label="Akademik & Kredensial" />
            <h2 className="font-heading mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Pendidikan, Publikasi &amp; Sertifikasi
            </h2>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-zinc-400">
              Perjalanan studi di bidang Sistem Komputer (Rumpun Ilmu Komputer &amp; Informatika), publikasi riset terakreditasi nasional, serta sertifikasi kompetensi yang telah terverifikasi.
            </p>
          </div>

          {/* Tier 1: Pendidikan & Publikasi Ilmiah */}
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 mb-10 sm:mb-12">
            {/* Pendidikan Formal */}
            <div
              data-reveal
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => {
                const proj = RESEARCH_PROJECTS.find((p) => p.id === 'smart-parking');
                if (proj) handleOpenModal(proj);
              }}
              className="spotlight-card lg:col-span-5 flex flex-col justify-between group/edu relative overflow-hidden rounded-2xl border border-zinc-800/90 p-5 sm:p-7 hover:border-zinc-700 cursor-pointer active:scale-[0.99]"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400">
                      <GraduationCap className="h-4 w-4" />
                    </span>
                    <span className="font-heading text-xs sm:text-sm font-semibold text-zinc-200">
                      Pendidikan Formal
                    </span>
                  </div>
                  <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-0.5 font-mono text-[11px] text-zinc-400">
                    2022—2026
                  </span>
                </div>

                <h3 className="font-heading mt-3.5 text-lg sm:text-xl font-bold text-zinc-100 group-hover/edu:text-white transition-colors">
                  S1 Sistem Komputer
                </h3>
                <p className="mt-0.5 text-xs font-medium text-emerald-400">
                  Rumpun Ilmu Komputer &amp; Informatika
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-zinc-300">
                  Universitas Komputer Indonesia (UNIKOM) · Bandung, Jawa Barat
                </p>

                <div className="mt-3.5 inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/80 px-3 sm:px-3.5 py-1.5 text-xs text-zinc-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>IPK: <strong className="text-white font-semibold">3.53</strong> / 4.00 · Lulus 2026</span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-zinc-400 text-justify">
                  Mempelajari rekayasa perangkat lunak modern, manajemen basis data &amp; sistem informasi, arsitektur jaringan komputer, serta integrasi perangkat keras IoT dan kecerdasan buatan.
                </p>

                <div className="mt-2 text-[11px] font-mono text-zinc-500">
                  <span>Pendidikan Menengah: SMAN 1 Tanjungsari (IPA · Sumedang, 2019—2022)</span>
                </div>

                {/* Sub-Card: Skripsi / Riset Terapan */}
                <div className="mt-4 rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-3.5 sm:p-4 transition-colors hover:border-zinc-700">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-300 font-medium">
                      Skripsi &amp; Riset Terapan
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">2025—2026</span>
                  </div>
                  <h4 className="font-heading text-sm font-semibold text-zinc-200 leading-snug group-hover/edu:text-white transition-colors">
                    Sistem Parkir Pintar &amp; Deteksi Pelat Otomatis
                  </h4>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                    Sistem palang otomatis dengan verifikasi ganda RFID e-KTP dan deteksi pelat nomor kendaraan (YOLOv8 + CNN) berbasis ESP32 &amp; Firebase.
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

              <div className="relative z-10 mt-4 border-t border-zinc-800/80 pt-3.5">
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 mb-2">
                  Bidang Fokus Studi:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-300">
                    Software &amp; Data Engineering
                  </span>
                  <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-300">
                    Computer Vision &amp; IoT
                  </span>
                  <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-300">
                    Jaringan Komputer &amp; P2P
                  </span>
                </div>
              </div>
            </div>

            {/* Publikasi Nasional */}
            <div
              data-reveal
              data-delay="1"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="spotlight-card lg:col-span-7 flex flex-col justify-between group relative overflow-hidden rounded-2xl border border-zinc-800/90 p-5 sm:p-7 hover:border-zinc-700"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400">
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <span className="font-heading text-xs sm:text-sm font-semibold text-zinc-200">
                      Publikasi Nasional
                    </span>
                  </div>
                  <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400">
                    2 Paper Terakreditasi SINTA
                  </span>
                </div>

                <h3 className="font-heading mt-3.5 text-xl font-bold text-zinc-100">
                  Artikel Jurnal Ilmiah
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Dua publikasi penelitian yang telah terbit di jurnal terakreditasi nasional seputar Machine Learning dan sistem IoT.
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
                    <h4 className="font-heading text-sm font-semibold text-zinc-200 leading-snug group-hover/card:text-white transition-colors">
                      Prediksi Penyakit Liver dengan Model Perbandingan Logistic Regression, SVM, dan Random Forest
                    </h4>
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                      Studi komparasi model klasifikasi pada 579 data rekam medis pasien dengan evaluasi F1-Score dan MCC (DOI: 10.34010/komputika.v15i1.19799).
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-900 pt-2.5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 group-hover/card:text-zinc-200 transition">
                        <Eye className="h-3.5 w-3.5" />
                        <span>Detail Riset ↗</span>
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <a
                          href="/journal-komputika-liver.pdf"
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                        >
                          <FileText className="h-3 w-3 text-emerald-400" />
                          <span>PDF</span>
                        </a>
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
                    <h4 className="font-heading text-sm font-semibold text-zinc-200 leading-snug group-hover/card:text-white transition-colors">
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
                      <div className="flex flex-wrap items-center gap-1.5">
                        <a
                          href="/journal-biner-pos.pdf"
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                        >
                          <FileText className="h-3 w-3 text-emerald-400" />
                          <span>PDF</span>
                        </a>
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
          </div>

          {/* Tier 2: Kredensial & Sertifikasi Industri */}
          <div className="space-y-6">
            <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-800/80 pb-4">
              <div>
                <div className="inline-flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400">
                    <Award className="h-4 w-4" />
                  </span>
                  <span className="font-heading text-xs sm:text-sm font-semibold text-zinc-200">
                    Sertifikasi Resmi
                  </span>
                </div>
                <h3 className="font-heading mt-2.5 text-2xl font-bold tracking-tight text-zinc-100">
                  Kredensial Industri &amp; Uji Kompetensi
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Ringkasan poin kompetensi inti di setiap sertifikat. Ketuk kartu untuk pratinjau dokumen asli dan tautan verifikasi.
                </p>
              </div>

              {/* Filter Sertifikat: Fokus Industri (7) vs Semua (8) */}
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-1 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveCertFilter('all')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                    activeCertFilter === 'all'
                      ? 'bg-zinc-100 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Semua ({CERTIFICATIONS_DATA.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCertFilter('industry')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                    activeCertFilter === 'industry'
                      ? 'bg-zinc-100 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Fokus Industri (7)
                </button>
              </div>
            </div>

            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {CERTIFICATIONS_DATA.filter(
                (cert) => activeCertFilter === 'all' || cert.scope === 'industry'
              ).map((cert, idx) => (
                <div
                  key={`${activeCertFilter}-${cert.id}`}
                  style={{ animationDelay: `${idx * 55}ms` }}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => handleOpenCertModal(cert)}
                  className="spotlight-card animate-card-enter group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800/90 hover:border-zinc-700 cursor-pointer active:scale-[0.99]"
                >
                  {/* Certificate Image Preview Header (Framed Gallery Mat so document isn't crudely cropped) */}
                  <div className="relative z-10">
                    <div
                      className="relative aspect-[16/11] w-full overflow-hidden bg-gradient-to-b from-zinc-900/80 to-zinc-950 border-b border-zinc-800/80 p-2.5 sm:p-3"
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-lg border border-zinc-800/90 bg-zinc-950 shadow-inner">
                        <Image
                          src={cert.imageUrl}
                          alt={cert.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-75" />

                      {/* Category Pill on top left */}
                      <div className="absolute top-3.5 left-3.5">
                        <span className="rounded-md border border-zinc-700/80 bg-zinc-950/90 px-2 py-0.5 text-[10px] font-medium text-zinc-200 backdrop-blur-md shadow-sm">
                          {cert.category}
                        </span>
                      </div>

                      {/* Hover overlay hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-950/95 px-3 py-1.5 text-xs font-medium text-zinc-100 shadow-xl backdrop-blur-md">
                          <ZoomIn className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Pratinjau Dokumen</span>
                        </span>
                      </div>
                    </div>

                    {/* Certificate Content (Concise 1-line Core Competency) */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-2 text-[11px] text-zinc-400">
                        <span className="font-medium text-zinc-300 truncate">{cert.issuer}</span>
                        <span className="font-mono text-[10px] text-zinc-500 shrink-0">{cert.period}</span>
                      </div>

                      <h4
                        className="font-heading mt-2 text-sm font-semibold text-zinc-100 line-clamp-2 group-hover:text-emerald-300 transition-colors"
                      >
                        {cert.title}
                      </h4>

                      {cert.credentialId && (
                        <p className="mt-1 text-[10px] font-mono text-zinc-500 truncate">
                          ID: {cert.credentialId}
                        </p>
                      )}

                      <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">
                        {cert.summary}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="relative z-10 p-4 pt-0 sm:p-5 sm:pt-0">
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

        {/* KONTAK & ULASAN */}
        <SectionDivider />
        <section
          id="contact"
          className="scroll-mt-20 py-12 sm:py-16 md:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            {/* Kontak Langsung */}
            <div data-reveal className="space-y-6 lg:col-span-6">
              <div>
                <SectionKicker icon="contact" label="Kontak & Kolaborasi" />
                <h2 className="font-heading mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                  Mari Terhubung &amp; Berdiskusi
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Tertarik berkolaborasi atau sekadar ngobrol seputar pengembangan web, aplikasi mobile, integrasi AI, maupun sistem IoT? Saat ini saya terbuka untuk peluang karier <strong className="text-zinc-200 font-medium">Full-Time</strong>, proyek <strong className="text-zinc-200 font-medium">Freelance</strong>, maupun kolaborasi riset. Silakan hubungi saya langsung lewat WhatsApp, email, atau tinggalkan pesan di formulir sebelah.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="https://wa.me/6289630887748?text=Halo%20Edvan%2C%20saya%20melihat%20portofolio%20Anda%20dan%20ingin%20berdiskusi%20lebih%20lanjut."
                  target="_blank"
                  rel="noreferrer"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="spotlight-card group flex items-center gap-3.5 rounded-xl border border-zinc-800/90 p-4 hover:border-zinc-700"
                >
                  <div className="spring-icon relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-[#25D366] shadow-sm group-hover:border-[#25D366]/40">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31" />
                    </svg>
                  </div>
                  <div className="relative z-10 min-w-0 flex-1">
                    <span className="text-xs font-medium text-zinc-400 block">
                      WhatsApp (Respon Cepat)
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-semibold text-zinc-100 group-hover:text-white">
                      +62 896-3088-7748
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:septiaedvan@gmail.com"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="spotlight-card group flex items-center gap-3.5 rounded-xl border border-zinc-800/90 p-4 hover:border-zinc-700"
                >
                  <div className="spring-icon relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-emerald-400 shadow-sm group-hover:border-emerald-500/40">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="relative z-10 min-w-0 flex-1">
                    <span className="text-xs font-medium text-zinc-400 block">
                      Email
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-semibold text-zinc-100 group-hover:text-white">
                      septiaedvan@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://github.com/EdvanVPRoject"
                  target="_blank"
                  rel="noreferrer"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="spotlight-card group flex items-center gap-3.5 rounded-xl border border-zinc-800/90 p-4 hover:border-zinc-700"
                >
                  <div className="spring-icon relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300 shadow-sm group-hover:border-zinc-700 group-hover:text-white">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div className="relative z-10 min-w-0 flex-1">
                    <span className="text-xs font-medium text-zinc-400 block">
                      GitHub
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-semibold text-zinc-100 group-hover:text-white">
                      EdvanVPRoject ↗
                    </span>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/edvannuriana"
                  target="_blank"
                  rel="noreferrer"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="spotlight-card group flex items-center gap-3.5 rounded-xl border border-zinc-800/90 p-4 hover:border-zinc-700"
                >
                  <div className="spring-icon relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-[#0A66C2] shadow-sm group-hover:border-[#0A66C2]/40">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </div>
                  <div className="relative z-10 min-w-0 flex-1">
                    <span className="text-xs font-medium text-zinc-400 block">
                      LinkedIn
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-semibold text-zinc-100 group-hover:text-white">
                      edvannuriana ↗
                    </span>
                  </div>
                </a>

                <div className="sm:col-span-2 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4 space-y-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                      <span className="text-zinc-400">Domisili &amp; Mobilitas:</span>
                    </div>
                    <span className="text-zinc-200 font-medium">
                      Sumedang · Siap On-Site (Bandung / Jabodetabek), Hybrid &amp; Remote
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/80 pt-2.5">
                    <span className="text-zinc-500">Dokumen Rekrutmen &amp; Proyek:</span>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href="/cv-edvan.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-200 hover:border-emerald-500/40 hover:text-emerald-300 transition"
                      >
                        <FileText className="h-3 w-3 text-emerald-400" />
                        <span>Unduh CV (PDF)</span>
                      </a>
                      <a
                        href="/portofolio-proyek-edvan.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-200 hover:border-emerald-500/40 hover:text-emerald-300 transition"
                      >
                        <FileText className="h-3 w-3 text-emerald-400" />
                        <span>Ringkasan Proyek (PDF)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buku Tamu & Feedback */}
            <div id="feedback" data-reveal data-delay="1" className="scroll-mt-24 lg:col-span-6">
              <div
                onMouseMove={handleCardMouseMove}
                className="spotlight-card rounded-xl border border-zinc-800/90 p-5 sm:p-6 md:p-8"
              >
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400">
                      <Send className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-heading text-xs sm:text-sm font-semibold text-zinc-200">
                      Pesan Langsung &amp; Kolaborasi
                    </span>
                  </div>
                  <h3 className="font-heading mt-2.5 text-lg font-bold text-zinc-100">
                    Kirim Pesan, Tawaran Rekrutmen, atau Diskusi Proyek
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">
                    Pesan Anda akan diteruskan secara real-time ke Telegram saya beserta kontak balasan yang Anda cantumkan.
                  </p>

                  <form
                    onSubmit={handleFeedbackSubmit}
                    className="mt-5 space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Keperluan Diskusi
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                        {[
                          'Rekrutmen / Full-Time',
                          'Proyek / Kerjasama',
                          'Diskusi Riset / Teknis',
                          'Sapaan / Masukan',
                        ].map((cat) => {
                          const active = guestCategory === cat;
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setGuestCategory(cat)}
                              className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition cursor-pointer ${
                                active
                                  ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                                  : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                              }`}
                            >
                              {cat}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid gap-3.5 sm:grid-cols-2">
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
                          placeholder="Contoh: Budi — HRD / Tech Lead PT XYZ"
                          className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-emerald-500/60"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="guestContact"
                          className="block text-xs font-medium text-zinc-300"
                        >
                          Email / WhatsApp (Untuk Balasan)
                        </label>
                        <input
                          id="guestContact"
                          type="text"
                          value={guestContact}
                          onChange={(e) => setGuestContact(e.target.value)}
                          placeholder="Contoh: budi@perusahaan.com / 0812xxx"
                          className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-emerald-500/60"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="guestMessage"
                        className="block text-xs font-medium text-zinc-300"
                      >
                        Pesan atau Detail Kebutuhan <span className="text-zinc-500">*</span>
                      </label>
                      <textarea
                        id="guestMessage"
                        rows={3}
                        required
                        value={guestMessage}
                        onChange={(e) => setGuestMessage(e.target.value)}
                        placeholder="Tulis informasi posisi, ruang lingkup proyek, atau jadwal diskusi..."
                        className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-emerald-500/60"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-zinc-100 px-5 py-2.5 text-xs font-semibold text-zinc-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting
                        ? 'Mengirim pesan...'
                        : 'Kirim Pesan ↗'}
                    </button>

                    {submitStatus === 'success' && (
                      <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-center text-xs text-emerald-300">
                        Terima kasih! Pesan Anda sudah berhasil terkirim.
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
              <div className="pr-8">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-500">
                  {activeModalProject.modalDetails?.kicker || 'Dokumentasi Teknis'}
                </span>
                <h3 className="font-heading text-lg sm:text-2xl font-semibold text-zinc-100 mt-1">
                  {activeModalProject.title}
                </h3>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {activeModalProject.modalDetails?.summary || activeModalProject.description}
              </p>

              {activeModalProject.modalDetails?.bullets && (
                <div className="space-y-2 pt-2">
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                    Poin Teknis &amp; Arsitektur Utama
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {activeModalProject.modalDetails.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-mono text-[11px] mt-0.5">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeModalProject.modalDetails?.results && (
                <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-4 text-xs text-emerald-200 leading-relaxed">
                  <span className="font-medium text-emerald-300 block mb-1">
                    Hasil &amp; Capaian Kinerja:
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
                    <>
                      {activeModalProject.pdfUrl && (
                        <a
                          href={activeModalProject.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border border-zinc-800 bg-zinc-900 text-zinc-200 hover:border-zinc-700 hover:text-white transition"
                        >
                          <FileText className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Unduh PDF Jurnal</span>
                        </a>
                      )}
                      <a
                        href={activeModalProject.link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-950 hover:bg-emerald-400 transition"
                      >
                        {activeModalProject.link.label}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RINCIAN SPESIALISASI & KEAHLIAN */}
      {activeExpertise && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={handleCloseExpertiseModal}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/80 backdrop-blur-md ${
              isClosingExpertiseModal
                ? 'animate-backdrop-out pointer-events-none'
                : 'animate-backdrop-in'
            }`}
          />

          <div
            className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-[#0E0E11] p-4 sm:p-6 md:p-8 shadow-2xl text-left ${
              isClosingExpertiseModal
                ? 'animate-modal-out pointer-events-none'
                : 'animate-modal-in'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseExpertiseModal}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="pr-8">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                  {activeExpertise.modalDetails.kicker}
                </span>
                <h3 className="font-heading text-lg sm:text-2xl font-bold text-zinc-100 mt-1">
                  {activeExpertise.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                {activeExpertise.modalDetails.summary}
              </p>

              {/* Cakupan Kompetensi */}
              <div className="space-y-2 pt-1">
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                  Cakupan Kompetensi &amp; Implementasi:
                </p>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {activeExpertise.modalDetails.competencies.map((comp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-400 font-mono text-[11px] mt-0.5">•</span>
                      <span className="leading-relaxed">{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools & Kata Kunci Teknis */}
              <div className="pt-2 border-t border-zinc-800/80">
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2.5">
                  Teknologi, Metode &amp; Tools Terkait:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeExpertise.modalDetails.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-[11px] text-zinc-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bukti & Metrik Capaian */}
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3.5 sm:p-4 text-xs text-emerald-200 leading-relaxed">
                <span className="font-semibold text-emerald-300 block mb-1">
                  Bukti &amp; Capaian Terukur:
                </span>
                {activeExpertise.modalDetails.highlightMetric}
              </div>

              {/* Proyek Terkait (Interaktif: Klik langsung buka modal proyek) */}
              <div className="pt-2 border-t border-zinc-800/80">
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 mb-2">
                  Implementasi di Proyek &amp; Riset (Ketuk untuk melihat proyek):
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeExpertise.modalDetails.relatedProjectIds.map((projId) => {
                    const foundProj =
                      FEATURED_APPS.find((p) => p.id === projId) ||
                      RESEARCH_PROJECTS.find((p) => p.id === projId);
                    if (!foundProj) return null;
                    return (
                      <button
                        key={projId}
                        type="button"
                        onClick={() => {
                          setActiveExpertise(null);
                          setIsClosingExpertiseModal(false);
                          handleOpenModal(foundProj);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300 cursor-pointer"
                      >
                        <span>{foundProj.title.split('—')[0].trim()}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-end">
                <button
                  onClick={handleCloseExpertiseModal}
                  className="px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
                >
                  Tutup
                </button>
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

          {/* Modal Container: Scroll menyatu di HP (overflow-y-auto), dan berdampingan rapi di layar PC (md:flex-row, md:overflow-hidden) */}
          <div
            className={`relative z-10 flex w-full max-w-5xl lg:max-w-6xl flex-col md:flex-row overflow-y-auto md:overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl max-h-[90vh] md:h-[84vh] md:max-h-[740px] ${
              isClosingCertModal ? 'animate-modal-out pointer-events-none' : 'animate-modal-in'
            }`}
          >
            {/* Panel Kiri: Frame Gambar Sertifikat */}
            <div className="relative flex flex-col justify-between border-b border-zinc-800/80 bg-zinc-950 p-4 sm:p-5 md:w-7/12 md:border-b-0 md:border-r lg:w-3/5 shrink-0">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-2 pb-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400">
                    <Award className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <span className="font-heading text-xs font-semibold text-zinc-200 block truncate">
                      {activeCert.issuer}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                    {activeCert.period}
                  </span>
                  <button
                    onClick={handleCloseCertModal}
                    className="md:hidden rounded-lg border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition"
                    aria-label="Tutup Pratinjau Sertifikat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Main Certificate Image Canvas */}
              <div className="relative flex-1 w-full min-h-[200px] sm:min-h-[260px] md:min-h-0 flex items-center justify-center py-2">
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
            <div className="flex flex-col justify-between bg-zinc-900/40 p-4 sm:p-5 md:p-6 lg:w-2/5 md:w-5/12 md:overflow-y-auto">
              <div>
                {/* Header Kanan: Kategori & Tombol Tutup */}
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-medium text-emerald-300">
                    {activeCert.category}
                  </span>
                  <button
                    onClick={handleCloseCertModal}
                    className="hidden md:inline-flex rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
                    aria-label="Tutup Pratinjau Sertifikat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Judul Sertifikasi */}
                <h3 className="font-heading mt-3 text-base font-bold text-zinc-100 sm:text-xl leading-snug">
                  {activeCert.title}
                </h3>

                {/* Credential ID */}
                {activeCert.credentialId && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-[11px] text-zinc-400 max-w-full">
                    <span className="text-zinc-500 shrink-0">ID Kredensial:</span>
                    <span className="text-zinc-200 select-all font-semibold truncate">{activeCert.credentialId}</span>
                  </div>
                )}

                {/* Deskripsi */}
                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-zinc-300 font-light">
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
                    <span>Unduh PDF Asli</span>
                  </a>

                  <button
                    onClick={handleCloseCertModal}
                    className="rounded-lg border border-zinc-800/80 px-3.5 py-2 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
                  >
                    Tutup
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
