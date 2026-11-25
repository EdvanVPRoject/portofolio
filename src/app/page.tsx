'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowUp,
  ExternalLink,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const NAV_ITEMS = [
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
  category: ProjectCategory[];
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
    id: 'eninformasi',
    title: 'EnInformasi Hub',
    tagline: 'Portal Edukasi & Tren Teknologi · 254 Artikel',
    year: '2026',
    category: ['software'],
    description:
      'Portal web dwibahasa (ID/EN) berisi 254 tutorial praktis, ulasan teknologi, dan gaming di Cloudflare Workers.',
    highlights: [
      '254 Materi Terstruktur (Tutorial Praktis, Gaming & Ulasan Teknologi)',
      'Fitur Ganti Bahasa Instan (ID/EN) & Checklist Praktik Interaktif',
    ],
    tech: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'OpenNext', 'Cloudflare Workers'],
    links: [
      {
        label: 'Website ↗',
        url: 'https://eninformasi-hub.entehchin.workers.dev/',
        primary: true,
      },
      {
        label: 'GitHub ↗',
        url: 'https://github.com/EdvanVPRoject/eninformasi-hub',
      },
    ],
    modalDetails: {
      kicker: 'Platform Web & Portal Teknologi · 2026',
      summary:
        'Platform bacaan teknologi modern yang memisahkan kategori Tutorial Praktis (panduan langkah demi langkah) dan EnInformasi (ulasan mendalam & tren industri). Dirancang agar ringan dibuka, nyaman dibaca di HP maupun PC, dan mendukung dua bahasa secara penuh.',
      bullets: [
        '254 Artikel Terkurasi: Membahas pengembangan software, pemanfaatan AI/LLM, cloud computing, sistem IoT, hingga perkembangan dunia teknologi dan gaming.',
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
    title: 'ENDocLens-PDF',
    tagline: 'Web Suite PDF & OCR Lokal',
    year: '2026',
    category: ['software'],
    description:
      'Web suite 16 alat PDF, pemindai kamera auto-warp, dan OCR Tesseract.js yang berjalan 100% lokal di browser.',
    highlights: [
      '16 Alat PDF Terpadu & Privasi Penuh (Diproses Langsung di Browser)',
      'Pelurus Foto Dokumen Otomatis & Ekstraksi Teks OCR (Tesseract.js)',
    ],
    tech: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'Vite 8', 'pdf-lib', 'Tesseract.js'],
    links: [
      {
        label: 'Website ↗',
        url: 'https://doclens-pdf.vercel.app',
        primary: true,
      },
      {
        label: 'GitHub ↗',
        url: 'https://github.com/EdvanVPRoject/ENDocLens-PDF',
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
    id: 'enclip',
    title: 'ENCLip',
    tagline: 'Desktop AI Video Clipper (Windows)',
    year: '2026',
    category: ['software'],
    description:
      'Aplikasi desktop Windows (PyQt6) untuk memotong video panjang menjadi klip vertikal otomatis dengan transkripsi AI.',
    highlights: [
      'Mode AI Fleksibel (Bisa 100% Offline via GGUF atau Cloud API)',
      'Antarmuka Tetap Responsif saat Render Video (Asynchronous Worker)',
    ],
    tech: ['Python', 'PyQt6', 'Faster-Whisper', 'Qwen 2.5 GGUF', 'Gemini API', 'FFmpeg'],
    links: [
      {
        label: 'Rilis .exe ↗',
        url: 'https://github.com/EdvanVPRoject/ENCLip/releases/latest',
        primary: true,
      },
      {
        label: 'GitHub ↗',
        url: 'https://github.com/EdvanVPRoject/ENCLip',
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
    title: 'ENCross',
    tagline: 'Transfer File & Screen Share P2P',
    year: '2026',
    category: ['software'],
    description:
      'Aplikasi transfer file besar dan screen sharing lintas Windows & Android lewat Wi-Fi lokal menggunakan WebRTC P2P.',
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
    id: 'enlife',
    title: 'ENLife',
    tagline: 'Aplikasi Produktivitas Offline (Flutter)',
    year: '2026',
    category: ['software'],
    description:
      'Aplikasi produktivitas offline-first berbasis Flutter: catatan keuangan, habit tracker, timer Pomodoro, dan ID vault.',
    highlights: [
      'Berjalan 100% Offline dengan Penyimpanan Lokal yang Cepat & Aman',
      '4 Fitur Utama (Catatan Keuangan, Habit/Pomodoro, ID Vault, Kalkulator Praktis)',
    ],
    tech: ['Flutter', 'Dart', 'Provider', 'fl_chart', 'SharedPreferences'],
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
      'Sistem palang parkir otomatis dengan verifikasi ganda RFID e-KTP dan deteksi pelat nomor (YOLOv8 Nano mAP@0.50 98,51% & CNN 88,07%) pada ESP32.',
    highlights: [
      'Verifikasi Ganda (Kartu RFID e-KTP + Kamera Deteksi Pelat YOLOv8)',
      'Integrasi Mikrokontroler ESP32, Database Lokal SQLite & Firebase',
    ],
    tech: ['YOLOv8 Nano', 'TensorFlow CNN', 'ESP32', 'SQLite', 'Firebase'],
    link: {
      label: 'GitHub ↗',
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
    tagline: 'Jurnal Komputika · Vol. 15 No. 1 (2026) Hal. 83–94',
    year: '2026',
    category: ['publication'],
    image: '/journal-liver-paper.png',
    description:
      'Komparasi Random Forest, SVM, dan Logistic Regression pada 579 data klinis pasien; terbit di Jurnal Komputika terakreditasi SINTA.',
    highlights: [
      'Terbit di Komputika: Jurnal Sistem Komputer (Vol. 15, No. 1, 2026)',
      'Evaluasi Performa Klasifikasi Menggunakan Metrik F1-Score & MCC',
    ],
    tech: ['Random Forest', 'SVM', 'Logistic Regression', 'Scikit-Learn'],
    link: {
      label: 'DOI ↗',
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
    tagline: 'Jurnal Biner · Vol. 5 No. 1 (2026) Hal. 1–9',
    year: '2026',
    category: ['iot-cv', 'publication'],
    image: '/journal-pos-paper.png',
    description:
      'Timbangan digital ESP32 & sensor Load Cell HX711 terhubung langsung ke aplikasi kasir web UMKM dengan akurasi >98%; terbit di Jurnal Biner.',
    highlights: [
      'Terbit di Biner: Jurnal Ilmiah Informatika dan Komputer (Vol. 5, No. 1, 2026)',
      'Otomatisasi Pembacaan Berat Timbangan Langsung ke Aplikasi Kasir Web',
    ],
    tech: ['ESP32', 'Load Cell HX711', 'Web Application', 'SQLite'],
    link: {
      label: 'Artikel ↗',
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

type EngineeringPillarId = 'fullstack' | 'qa' | 'data';

interface EngineeringPillar {
  id: EngineeringPillarId;
  title: string;
  projectIds: string[];
}

const ENGINEERING_PILLARS: EngineeringPillar[] = [
  {
    id: 'fullstack',
    title: 'Fullstack & Mobile',
    projectIds: ['eninformasi', 'endoclens-pdf', 'encross', 'enlife', 'smart-pos', 'enclip'],
  },
  {
    id: 'qa',
    title: 'Quality Assurance',
    projectIds: ['endoclens-pdf', 'eninformasi', 'encross', 'smart-parking'],
  },
  {
    id: 'data',
    title: 'Data & IoT',
    projectIds: ['smart-parking', 'smart-pos', 'liver-ml', 'enclip', 'enlife'],
  },
];

type SkillDomain = 'fullstack' | 'qa' | 'data' | 'network-ai';

interface ExpertiseItem {
  id: SkillDomain;
  label: string;
  title: string;
  summaryLine: string;
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
    label: 'Fullstack & App',
    title: 'Fullstack Web & Cross-Platform App',
    summaryLine:
      'TypeScript, JavaScript, React 19, Next.js 15, Node.js, REST API, Python (FastAPI, PyQt6), Flutter, Dart, Tailwind CSS',
    modalDetails: {
      kicker: 'Fullstack Software Engineering · Web, Mobile & Desktop',
      summary:
        'Berpengalaman mengembangkan aplikasi dari tahap perancangan antarmuka (UI/UX), pembuatan arsitektur komponen frontend, integrasi REST API & backend, hingga deployment ke cloud edge (Cloudflare Workers & Vercel) maupun kompilasi aplikasi native.',
      competencies: [
        'Pengembangan aplikasi web modern berbasis komponen menggunakan React 19 (HackerRank Certified) dan Next.js 15 App Router.',
        'Integrasi layanan backend, pembuatan endpoint REST API dengan Node.js & FastAPI, serta komunikasi real-time menggunakan WebSockets.',
        'Pembangunan aplikasi mobile Android/iOS dengan Flutter (Dart) berarsitektur Offline-First (SQLite) dan manajemen state Provider.',
        'Pengembangan aplikasi desktop Windows mandiri menggunakan Python (PyQt6) dengan asynchronous worker agar UI bebas freeze.',
      ],
      tools: [
        'JavaScript (ES6+)',
        'TypeScript',
        'ReactJS / React 19',
        'Next.js 15',
        'Node.js',
        'REST API',
        'HTML5 & CSS3',
        'Tailwind CSS 4',
        'Flutter & Dart',
        'Python (FastAPI & PyQt6)',
        'Git & GitHub',
        'Cloudflare Workers',
      ],
      highlightMetric:
        '5 aplikasi telah dibangun dan dipublikasikan (EnInformasi Hub, ENDocLens-PDF, ENCLip, ENCross, ENLife) mencakup platform web, mobile Android, dan desktop Windows.',
      relatedProjectIds: ['eninformasi', 'endoclens-pdf', 'enclip', 'encross', 'enlife'],
    },
  },
  {
    id: 'qa',
    label: 'Quality Assurance',
    title: 'Quality Engineering (QA) & Software Testing',
    summaryLine:
      'Unit & Integration Testing, API Testing (Postman), UAT, Regression Testing, Chrome DevTools & Lighthouse Audit',
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
        'Unit & Integration Testing',
        'User Acceptance Testing (UAT)',
        'Regression Testing',
        'ESLint & Static Analysis',
        'Chrome DevTools Profiling',
        'Lighthouse Performance Audit',
      ],
      highlightMetric:
        'Skor pengujian Google Lighthouse 99–100/100 pada aplikasi web produksi serta penggunaan memori stabil <50MB pada pemrosesan dokumen PDF.',
      relatedProjectIds: ['eninformasi', 'endoclens-pdf', 'encross', 'smart-parking'],
    },
  },
  {
    id: 'data',
    label: 'Data & Database',
    title: 'Data Automation, SQL & Dashboard Reporting',
    summaryLine:
      'PostgreSQL, MySQL, SQLite, Firebase Realtime DB, Python (Pandas, Scikit-Learn), Microsoft Excel (XLOOKUP, Pivot), Tableau',
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
        'PostgreSQL & MySQL',
        'SQLite & Firebase Realtime DB',
        'Data Automation / ETL',
        'Python (Pandas, Scikit-Learn)',
        'Microsoft Excel (XLOOKUP, Pivot)',
        'Tableau Dashboard',
        'Exploratory Data Analysis (EDA)',
      ],
      highlightMetric:
        'Sertifikasi Cisco Data Analytics Essentials, Spesialisasi 8 Kursus Microsoft Excel (Coursera), dan publikasi jurnal riset klasifikasi data medis di Komputika.',
      relatedProjectIds: ['liver-ml', 'smart-pos', 'enlife'],
    },
  },
  {
    id: 'network-ai',
    label: 'Jaringan, IoT & AI',
    title: 'Network Infrastructure, IoT & Applied AI',
    summaryLine:
      'Cisco CCNA (Routing/Switching, VLSM, DHCP/NAT), WebRTC P2P, ESP32 IoT (Load Cell, RFID), YOLOv8, TensorFlow CNN, Faster-Whisper, Gemini API',
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
        'VLSM, DHCP & NAT',
        'WebRTC P2P DataChannels',
        'ESP32 & Sensor IoT (Load Cell, RFID)',
        'YOLOv8 & TensorFlow CNN',
        'Faster-Whisper & Qwen GGUF',
        'Google Gemini API',
        'FFmpeg GPU Pipeline',
      ],
      highlightMetric:
        'Akurasi pembacaan sensor timbangan digital POS >98% (Jurnal Biner) serta akurasi deteksi pelat nomor YOLOv8 sebesar 98,51% (mAP@0.50) dengan waktu proses <2 detik.',
      relatedProjectIds: ['smart-parking', 'smart-pos', 'encross', 'enclip'],
    },
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [activePillarFilter, setActivePillarFilter] = useState<EngineeringPillarId | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeModalProject, setActiveModalProject] = useState<
    FeaturedApp | ResearchProject | null
  >(null);
  const [isClosingModal, setIsClosingModal] = useState(false);

  const [activeExpertise, setActiveExpertise] = useState<ExpertiseItem | null>(null);
  const [isClosingExpertiseModal, setIsClosingExpertiseModal] = useState(false);

  const [activeCert, setActiveCert] = useState<CertificateCredential | null>(null);
  const [isClosingCertModal, setIsClosingCertModal] = useState(false);

  const [showCvModal, setShowCvModal] = useState(false);
  const [isClosingCvModal, setIsClosingCvModal] = useState(false);

  const [activeSection, setActiveSection] = useState<string>('projects');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Collapsible Telegram Direct Message Drawer (Open Question 3 - Opsi A)
  const [isMessageDrawerOpen, setIsMessageDrawerOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');
  const [guestCategory, setGuestCategory] = useState('Rekrutmen / Full-Time');
  const [guestMessage, setGuestMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCopyEmail = async () => {
    const email = 'septiaedvan@gmail.com';
    let copied = false;

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied && typeof document !== 'undefined') {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        copied = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        copied = false;
      }
    }

    if (copied) {
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

  const handleOpenCvModal = () => {
    setIsClosingCvModal(false);
    setShowCvModal(true);
  };

  const handleCloseCvModal = () => {
    setIsClosingCvModal(true);
    setTimeout(() => {
      setShowCvModal(false);
      setIsClosingCvModal(false);
    }, 240);
  };

  const handleSelectPillar = (pillarId: EngineeringPillarId) => {
    setActivePillarFilter((prev) => (prev === pillarId ? null : pillarId));
    setActiveFilter('all');
  };

  const handleResetPillarFilter = () => {
    setActivePillarFilter(null);
  };

  useEffect(() => {
    if (activeModalProject || activeCert || activeExpertise || showCvModal) {
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
  }, [activeModalProject, activeCert, activeExpertise, showCvModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeModalProject && !isClosingModal) handleCloseModal();
        if (activeExpertise && !isClosingExpertiseModal) handleCloseExpertiseModal();
        if (activeCert && !isClosingCertModal) handleCloseCertModal();
        if (showCvModal && !isClosingCvModal) handleCloseCvModal();
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
    showCvModal,
    isClosingCvModal,
  ]);

  useEffect(() => {
    const sectionIds = ['projects', 'skills', 'academic', 'contact'];
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      if (isNavClickRef.current) return;
      const scrollPosition = window.scrollY + 200;
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
    <div id="top" className="min-h-screen bg-[#FAFAF8] text-[#111113] antialiased">
      {/* MINIMALIST EDITORIAL NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-[#E5E4DE] bg-[#FAFAF8]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-[820px] items-center justify-between px-5 sm:px-6 py-3.5">
          <a
            href="#top"
            className="text-sm font-semibold tracking-tight text-[#111113] hover:opacity-75 transition-opacity"
          >
            Edvan Nuriana
          </a>

          <nav className="hidden sm:flex items-center gap-6 text-[13px]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors ${
                    isActive
                      ? 'text-[#111113] font-medium'
                      : 'text-[#5C5C64] hover:text-[#111113]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={handleOpenCvModal}
              className="font-medium text-[#111113] underline decoration-[#C8C7BF] underline-offset-4 hover:decoration-[#111113] transition cursor-pointer"
            >
              CV
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="sm:hidden p-1.5 -mr-1.5 text-[#5C5C64] hover:text-[#111113] transition cursor-pointer"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#E5E4DE] bg-[#FAFAF8] px-5 py-2 divide-y divide-[#E5E4DE] text-sm">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  handleNavClick(item.id);
                  setMobileMenuOpen(false);
                }}
                className="block py-2.5 text-[#3F3F46] hover:text-[#111113] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenCvModal();
              }}
              className="block w-full py-2.5 text-left font-medium text-[#111113] cursor-pointer"
            >
              CV (Pratinjau PDF)
            </button>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-[820px] px-5 sm:px-6">
        {/* HERO — HUMAN EDITORIAL INTRODUCTION */}
        <section className="pt-7 pb-6 sm:pt-10 sm:pb-8">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg border border-[#E5E4DE] bg-[#F3F2EE]">
              <Image
                src="/profile-wisuda.jpg"
                alt="Edvan Nuriana Putra Septia"
                fill
                sizes="(max-width: 640px) 64px, 80px"
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111113] leading-snug">
                Edvan Nuriana Putra Septia
              </h1>
              <p className="mt-0.5 text-[13.5px] sm:text-sm text-[#3F3F46]">
                Software Engineer · S1 Sistem Komputer UNIKOM (IPK 3.53)
              </p>
              <p className="mt-0.5 text-xs text-[#5C5C64]">
                Sumedang / Bandung · Terbuka untuk Full-Time, Hybrid &amp; Remote
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2.5 text-[14.5px] sm:text-[15px] leading-[1.65] text-[#3F3F46]">
            <p>
              Saya merancang dan menguji aplikasi web, mobile, dan desktop dari awal hingga rilis produksi menggunakan TypeScript, React 19, Next.js 15, Node.js, Python, dan Flutter. Pekerjaan teknis ini ditunjang praktik Quality Assurance (Unit Testing, API Testing dengan Postman, UAT, dan audit Lighthouse), otomasi data SQL &amp; Excel, serta riset terapan IoT dan Computer Vision.
            </p>
            <p className="text-[13.5px] sm:text-[14px] text-[#5C5C64]">
              Telah merilis 5 aplikasi lintas platform dan menerbitkan 2 jurnal SINTA (Komputika &amp; Biner, 2026). Siap Full-Time, Kontrak &amp; Freelance · Indonesia &amp; Inggris (EPT 447).
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13.5px]">
            <button
              type="button"
              onClick={handleOpenCvModal}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#111113] px-3.5 py-1.5 text-[13px] font-medium text-[#FAFAF8] hover:bg-[#27272A] transition cursor-pointer"
            >
              <span>Lihat CV</span>
            </button>

            <a
              href="https://github.com/EdvanVPRoject"
              target="_blank"
              rel="noreferrer"
              className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113] transition"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/edvannuriana"
              target="_blank"
              rel="noreferrer"
              className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113] transition"
            >
              LinkedIn ↗
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113] transition cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#15803D]" />
                  <span className="text-[#15803D] font-medium">Email Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#5C5C64]" />
                  <span>Salin Email</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* PROYEK & RISET */}
        <section id="projects" className="scroll-mt-16 border-t border-[#E5E4DE] py-7 sm:py-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#111113]">
              Proyek &amp; Riset
            </h2>
            <span className="font-mono text-xs tabular-nums text-[#5C5C64]">
              {FEATURED_APPS.length + RESEARCH_PROJECTS.length} karya terverifikasi
            </span>
          </div>

          {/* Underline Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter kategori proyek"
            className="no-scrollbar mt-3 flex flex-nowrap items-center gap-x-2.5 sm:gap-x-5 overflow-x-auto border-b border-[#E5E4DE] text-[11.5px] sm:text-[13px]"
          >
            {[
              {
                id: 'all',
                label: `Semua (${FEATURED_APPS.length + RESEARCH_PROJECTS.length})`,
              },
              {
                id: 'software',
                label: `Aplikasi & AI (${FEATURED_APPS.filter((a) => a.category.includes('software')).length})`,
              },
              {
                id: 'iot-cv',
                label: (
                  <>
                    <span className="sm:hidden">
                      IoT &amp; CV ({RESEARCH_PROJECTS.filter((r) => r.category.includes('iot-cv')).length})
                    </span>
                    <span className="hidden sm:inline">
                      IoT &amp; Visi Komputer ({RESEARCH_PROJECTS.filter((r) => r.category.includes('iot-cv')).length})
                    </span>
                  </>
                ),
              },
              {
                id: 'publication',
                label: `Jurnal Ilmiah (${RESEARCH_PROJECTS.filter((r) => r.category.includes('publication')).length})`,
              },
            ].map((tab) => {
              const isSelected = activeFilter === tab.id && !activePillarFilter;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => {
                    setActiveFilter(tab.id as ProjectCategory);
                    setActivePillarFilter(null);
                  }}
                  className={`-mb-px pb-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'border-b-2 border-[#111113] font-medium text-[#111113]'
                      : 'border-b-2 border-transparent text-[#5C5C64] hover:text-[#111113]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Subtle Inline Role Filter */}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5C5C64]">
            <span>Peran:</span>
            {ENGINEERING_PILLARS.map((pillar) => {
              const isActive = activePillarFilter === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => handleSelectPillar(pillar.id)}
                  className={`transition cursor-pointer ${
                    isActive
                      ? 'font-medium text-[#111113] underline decoration-[#111113] underline-offset-4'
                      : 'hover:text-[#111113] hover:underline hover:decoration-[#D4D3CC] hover:underline-offset-4'
                  }`}
                >
                  {pillar.title}{' '}
                  <span className="font-mono text-[11px] tabular-nums">
                    ({pillar.projectIds.length})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Banner (1 line) */}
          {activePillarFilter && currentPillar && (
            <div className="mt-2.5 flex items-center justify-between gap-3 border-b border-[#E5E4DE] bg-[#F3F2EE] px-3 py-1.5 rounded text-xs text-[#3F3F46]">
              <span>
                Menampilkan <strong>{filteredApps.length + filteredResearch.length}</strong> proyek untuk peran{' '}
                <strong className="text-[#111113]">{currentPillar.title}</strong>
              </span>
              <button
                type="button"
                onClick={handleResetPillarFilter}
                className="font-medium text-[#111113] underline underline-offset-2 hover:opacity-75 cursor-pointer shrink-0"
              >
                Reset ×
              </button>
            </div>
          )}

          {/* Featured Applications Hairline List */}
          {filteredApps.length > 0 && (
            <div className="mt-1 divide-y divide-[#E5E4DE]">
              {filteredApps.map((app) => (
                <article
                  key={`${activeFilter}-${app.id}`}
                  onClick={() => handleOpenModal(app)}
                  className="editorial-row group -mx-2 px-2 py-3 cursor-pointer rounded-sm"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="inline text-[14.5px] font-semibold text-[#111113] group-hover:underline decoration-[#C8C7BF] underline-offset-4">
                        {app.title}
                      </h3>
                      <span className="ml-2 text-[12.5px] text-[#5C5C64]">
                        {app.tagline}
                      </span>
                    </div>
                    <span className="font-mono text-xs tabular-nums text-[#5C5C64] shrink-0">
                      {app.year}
                    </span>
                  </div>

                  <p className="mt-1 text-[13.5px] leading-[1.55] text-[#3F3F46]">
                    {app.description}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
                    <span className="font-mono text-[11px] text-[#5C5C64]">
                      {app.tech.slice(0, 4).join(' · ')}
                    </span>

                    <div className="flex flex-wrap items-center gap-3.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(app);
                        }}
                        className="font-medium text-[#111113] underline decoration-[#D4D3CC] underline-offset-4 hover:decoration-[#111113] cursor-pointer"
                      >
                        Detail
                      </button>
                      {app.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113] transition"
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

          {/* Research & Journal Publications with Compact 112x64 Thumbnails */}
          {filteredResearch.length > 0 && (
            <div className={filteredApps.length > 0 ? 'mt-3 pt-3 border-t border-[#E5E4DE]' : 'mt-1'}>
              {filteredApps.length > 0 && (
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#5C5C64] mb-0.5">
                  Riset Terapan &amp; Publikasi Jurnal
                </p>
              )}
              <div className="divide-y divide-[#E5E4DE]">
                {filteredResearch.map((project) => (
                  <article
                    key={`${activeFilter}-${project.id}`}
                    onClick={() => handleOpenModal(project)}
                    className="editorial-row group -mx-2 px-2 py-3 cursor-pointer rounded-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-5">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="text-[14.5px] font-semibold text-[#111113] leading-snug group-hover:underline decoration-[#C8C7BF] underline-offset-4">
                            {project.title}
                          </h3>
                          <span className="font-mono text-xs tabular-nums text-[#5C5C64] shrink-0">
                            {project.year}
                          </span>
                        </div>

                        <p className="mt-0.5 text-[12px] text-[#5C5C64]">
                          {project.tagline}
                        </p>

                        <p className="mt-1 text-[13.5px] leading-[1.55] text-[#3F3F46]">
                          {project.description}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
                          <span className="font-mono text-[11px] text-[#5C5C64]">
                            {project.tech.slice(0, 4).join(' · ')}
                          </span>

                          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenModal(project);
                              }}
                              className="font-medium text-[#111113] underline decoration-[#D4D3CC] underline-offset-4 hover:decoration-[#111113] cursor-pointer"
                            >
                              Detail
                            </button>
                            {project.pdfUrl && (
                              <a
                                href={project.pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113] transition"
                              >
                                PDF ↗
                              </a>
                            )}
                            <a
                              href={project.link.url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113] transition"
                            >
                              {project.link.label}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Compact 112x64 Evidence Thumbnail (Open Question 2 - Opsi A) */}
                      <div className="relative w-[112px] h-[64px] shrink-0 overflow-hidden rounded ring-1 ring-[#E5E4DE] bg-[#F3F2EE]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="112px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* KEAHLIAN TEKNIS — 4-ROW DEFINITION TABLE */}
        <section id="skills" className="scroll-mt-16 border-t border-[#E5E4DE] py-7 sm:py-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#111113]">
              Keahlian Teknis
            </h2>
            <span className="text-xs text-[#5C5C64]">
              Perangkat kerja &amp; ruang lingkup kompetensi
            </span>
          </div>

          <div className="mt-3 divide-y divide-[#E5E4DE] border-y border-[#E5E4DE]">
            {EXPERTISE_DATA.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenExpertiseModal(item)}
                className="editorial-row group grid grid-cols-1 sm:grid-cols-[170px_1fr_auto] items-baseline gap-1 sm:gap-5 -mx-2 px-2 py-2.5 cursor-pointer rounded-sm"
              >
                <h3 className="text-[13.5px] font-semibold text-[#111113]">
                  {item.label}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#3F3F46]">
                  {item.summaryLine}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenExpertiseModal(item);
                  }}
                  className="justify-self-start sm:justify-self-end font-mono text-xs text-[#5C5C64] group-hover:text-[#111113] transition cursor-pointer shrink-0"
                >
                  Detail ↗
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* PENDIDIKAN, PUBLIKASI & SERTIFIKASI */}
        <section id="academic" className="scroll-mt-16 border-t border-[#E5E4DE] py-7 sm:py-8">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#111113]">
            Pendidikan, Publikasi &amp; Sertifikasi
          </h2>

          {/* Pendidikan Formal */}
          <div className="mt-3 border-y border-[#E5E4DE] py-3 grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-1.5 sm:gap-5">
            <div className="space-y-0.5">
              <p className="font-mono text-xs tabular-nums text-[#5C5C64]">2022—2026</p>
              <p className="font-mono text-xs tabular-nums font-medium text-[#111113]">
                IPK 3.53 / 4.00
              </p>
            </div>

            <div>
              <h3 className="text-[14.5px] font-semibold text-[#111113]">
                S1 Sistem Komputer · Universitas Komputer Indonesia (UNIKOM), Bandung
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[#3F3F46]">
                Fokus studi pada rekayasa perangkat lunak, basis data, jaringan komputer, serta integrasi IoT dan kecerdasan buatan. Pendidikan sebelumnya: SMAN 1 Tanjungsari (IPA, Sumedang, 2019–2022).
              </p>
              <button
                type="button"
                onClick={() => {
                  const proj = RESEARCH_PROJECTS.find((p) => p.id === 'smart-parking');
                  if (proj) handleOpenModal(proj);
                }}
                className="mt-1.5 text-left text-[13px] font-medium text-[#111113] underline decoration-[#D4D3CC] underline-offset-4 hover:decoration-[#111113] cursor-pointer"
              >
                Skripsi: Sistem Parkir Pintar &amp; Deteksi Pelat Otomatis (YOLOv8 + RFID) ↗
              </button>
            </div>
          </div>

          {/* Publikasi Jurnal SINTA */}
          <div className="mt-5">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#5C5C64]">
              Publikasi Jurnal Terakreditasi SINTA (2026)
            </h3>

            <div className="mt-1.5 divide-y divide-[#E5E4DE] border-y border-[#E5E4DE]">
              <div className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-[#111113] leading-snug">
                    Prediksi Penyakit Liver dengan Perbandingan Logistic Regression, SVM, dan Random Forest
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-[#5C5C64]">
                    Jurnal Komputika · Vol. 15 No. 1, Hal. 83–94 · DOI: 10.34010/komputika.v15i1.19799
                  </p>
                </div>
                <div className="flex items-center gap-3.5 text-xs shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const proj = RESEARCH_PROJECTS.find((p) => p.id === 'liver-ml');
                      if (proj) handleOpenModal(proj);
                    }}
                    className="font-medium text-[#111113] underline decoration-[#D4D3CC] underline-offset-4 hover:decoration-[#111113] cursor-pointer"
                  >
                    Ringkasan
                  </button>
                  <a
                    href="/journal-komputika-liver.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113]"
                  >
                    PDF ↗
                  </a>
                  <a
                    href="https://doi.org/10.34010/komputika.v15i1.19799"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113]"
                  >
                    DOI ↗
                  </a>
                </div>
              </div>

              <div className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-[#111113] leading-snug">
                    Implementasi Sistem Point of Sale UMKM Berbasis ESP32 dan Sensor Load Cell
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-[#5C5C64]">
                    Jurnal Biner · Vol. 5 No. 1, Hal. 1–9 · DOI: 10.32699/biner.v5i1.10201
                  </p>
                </div>
                <div className="flex items-center gap-3.5 text-xs shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const proj = RESEARCH_PROJECTS.find((p) => p.id === 'smart-pos');
                      if (proj) handleOpenModal(proj);
                    }}
                    className="font-medium text-[#111113] underline decoration-[#D4D3CC] underline-offset-4 hover:decoration-[#111113] cursor-pointer"
                  >
                    Ringkasan
                  </button>
                  <a
                    href="/journal-biner-pos.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113]"
                  >
                    PDF ↗
                  </a>
                  <a
                    href="https://ojs.unsiq.ac.id/index.php/biner/article/view/10201/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113]"
                  >
                    Artikel ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sertifikasi Resmi — 8-Row Hairline Index */}
          <div className="mt-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#5C5C64]">
                Sertifikasi &amp; Kredensial Resmi ({CERTIFICATIONS_DATA.length})
              </h3>
              <span className="font-mono text-[11px] text-[#5C5C64]">
                Scan asli &amp; PDF terlampir
              </span>
            </div>

            <div className="mt-1.5 divide-y divide-[#E5E4DE] border-y border-[#E5E4DE]">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => handleOpenCertModal(cert)}
                  className="editorial-row group grid grid-cols-1 sm:grid-cols-[1.35fr_0.95fr_78px_166px] items-baseline gap-0.5 sm:gap-3 -mx-2 px-2 py-2.5 cursor-pointer rounded-sm"
                >
                  <span className="text-[13px] font-medium text-[#111113] leading-snug group-hover:underline decoration-[#C8C7BF] underline-offset-4">
                    {cert.title}
                  </span>

                  <span className="text-xs text-[#5C5C64] leading-snug">
                    {cert.issuer}
                  </span>

                  <span className="font-mono text-xs tabular-nums text-[#5C5C64]">
                    {cert.period}
                  </span>

                  <div className="flex items-center gap-3 text-xs pt-1 sm:pt-0 sm:justify-end shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCertModal(cert);
                      }}
                      className="font-medium text-[#111113] underline decoration-[#D4D3CC] underline-offset-4 hover:decoration-[#111113] cursor-pointer"
                    >
                      Pratinjau
                    </button>
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113]"
                    >
                      PDF
                    </a>
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113]"
                        title="Verifikasi Kredensial Resmi"
                      >
                        Verifikasi ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KONTAK & COLLAPSIBLE TELEGRAM MESSAGE DRAWER */}
        <section id="contact" className="scroll-mt-16 border-t border-[#E5E4DE] py-7 sm:py-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#111113]">
              Kontak
            </h2>
            <span className="text-xs text-[#5C5C64]">
              Full-Time, Kontrak, Freelance &amp; Kolaborasi Riset
            </span>
          </div>

          <dl className="mt-3 divide-y divide-[#E5E4DE] border-y border-[#E5E4DE] text-[13.5px]">
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-0.5 sm:gap-4 items-baseline">
              <dt className="text-xs font-mono text-[#5C5C64]">Email</dt>
              <dd className="flex flex-wrap items-center gap-3">
                <a
                  href="mailto:septiaedvan@gmail.com"
                  className="font-medium text-[#111113] underline decoration-[#D4D3CC] underline-offset-4 hover:decoration-[#111113]"
                >
                  septiaedvan@gmail.com
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-xs text-[#5C5C64] hover:text-[#111113] cursor-pointer"
                >
                  {copiedEmail ? 'Tersalin ✓' : 'Salin'}
                </button>
              </dd>
            </div>

            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-0.5 sm:gap-4 items-baseline">
              <dt className="text-xs font-mono text-[#5C5C64]">WhatsApp</dt>
              <dd>
                <a
                  href="https://wa.me/6289630887748?text=Halo%20Edvan%2C%20saya%20melihat%20portofolio%20Anda%20dan%20ingin%20berdiskusi%20lebih%20lanjut."
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#111113] underline decoration-[#D4D3CC] underline-offset-4 hover:decoration-[#111113]"
                >
                  +62 896-3088-7748 ↗
                </a>
              </dd>
            </div>

            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-0.5 sm:gap-4 items-baseline">
              <dt className="text-xs font-mono text-[#5C5C64]">GitHub</dt>
              <dd>
                <a
                  href="https://github.com/EdvanVPRoject"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113]"
                >
                  github.com/EdvanVPRoject ↗
                </a>
              </dd>
            </div>

            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-0.5 sm:gap-4 items-baseline">
              <dt className="text-xs font-mono text-[#5C5C64]">LinkedIn</dt>
              <dd>
                <a
                  href="https://www.linkedin.com/in/edvannuriana"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113]"
                >
                  linkedin.com/in/edvannuriana ↗
                </a>
              </dd>
            </div>

            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-0.5 sm:gap-4 items-baseline">
              <dt className="text-xs font-mono text-[#5C5C64]">Dokumen</dt>
              <dd className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleOpenCvModal}
                  className="font-medium text-[#111113] underline decoration-[#D4D3CC] underline-offset-4 hover:decoration-[#111113] cursor-pointer"
                >
                  Curriculum Vitae (PDF)
                </button>
                <a
                  href="/portofolio-proyek-edvan.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#3F3F46] underline decoration-[#D4D3CC] underline-offset-4 hover:text-[#111113] hover:decoration-[#111113]"
                >
                  Ringkasan Proyek (PDF) ↗
                </a>
              </dd>
            </div>

            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-0.5 sm:gap-4 items-baseline">
              <dt className="text-xs font-mono text-[#5C5C64]">Domisili</dt>
              <dd className="text-[#3F3F46]">
                Sumedang · Siap On-Site (Bandung / Jabodetabek), Hybrid &amp; Remote
              </dd>
            </div>
          </dl>

          {/* Collapsible Telegram Message Drawer (Open Question 3 - Opsi A) */}
          <div id="feedback" className="mt-5 scroll-mt-20">
            <button
              type="button"
              onClick={() => setIsMessageDrawerOpen((prev) => !prev)}
              aria-expanded={isMessageDrawerOpen}
              aria-controls="telegram-message-drawer"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#D4D3CC] bg-[#FFFFFF] px-3.5 py-2 text-[13px] font-medium text-[#111113] hover:border-[#111113] transition cursor-pointer"
            >
              <span>Kirim Pesan Langsung</span>
              {isMessageDrawerOpen ? (
                <ChevronUp className="h-3.5 w-3.5 text-[#5C5C64]" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-[#5C5C64]" />
              )}
            </button>

            {isMessageDrawerOpen && (
              <div
                id="telegram-message-drawer"
                className="mt-4 rounded-lg border border-[#E5E4DE] bg-[#FFFFFF] p-5 sm:p-6 animate-fade-in-up"
              >
                <p className="text-xs text-[#5C5C64]">
                  Pesan diteruskan langsung ke Telegram pribadi saya beserta kontak balasan Anda.
                </p>

                <form onSubmit={handleFeedbackSubmit} className="mt-4 space-y-3.5">
                  <div>
                    <label
                      htmlFor="guestCategory"
                      className="block text-xs font-medium text-[#111113]"
                    >
                      Keperluan
                    </label>
                    <select
                      id="guestCategory"
                      value={guestCategory}
                      onChange={(e) => setGuestCategory(e.target.value)}
                      className="mt-1 w-full rounded-md border border-[#D4D3CC] bg-[#FAFAF8] px-3 py-2 text-[13.5px] text-[#111113] outline-none focus:border-[#111113]"
                    >
                      <option value="Rekrutmen / Full-Time">Rekrutmen / Full-Time</option>
                      <option value="Proyek Freelance">Proyek Freelance</option>
                      <option value="Riset & Teknis">Riset &amp; Teknis</option>
                      <option value="Sapaan / Masukan">Sapaan / Masukan</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="guestName"
                      className="block text-xs font-medium text-[#111113]"
                    >
                      Nama / Instansi
                    </label>
                    <input
                      id="guestName"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Nama lengkap atau perusahaan Anda"
                      className="mt-1 w-full rounded-md border border-[#D4D3CC] bg-[#FAFAF8] px-3 py-2 text-[13.5px] text-[#111113] placeholder-[#8A8A93] outline-none focus:border-[#111113]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guestContact"
                      className="block text-xs font-medium text-[#111113]"
                    >
                      Email / WhatsApp untuk Balasan
                    </label>
                    <input
                      id="guestContact"
                      type="text"
                      value={guestContact}
                      onChange={(e) => setGuestContact(e.target.value)}
                      placeholder="Alamat email atau nomor WhatsApp"
                      className="mt-1 w-full rounded-md border border-[#D4D3CC] bg-[#FAFAF8] px-3 py-2 text-[13.5px] text-[#111113] placeholder-[#8A8A93] outline-none focus:border-[#111113]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guestMessage"
                      className="block text-xs font-medium text-[#111113]"
                    >
                      Pesan <span className="text-[#5C5C64]">*</span>
                    </label>
                    <textarea
                      id="guestMessage"
                      rows={3}
                      required
                      value={guestMessage}
                      onChange={(e) => setGuestMessage(e.target.value)}
                      placeholder="Tuliskan posisi, ruang lingkup proyek, atau jadwal diskusi"
                      className="mt-1 w-full rounded-md border border-[#D4D3CC] bg-[#FAFAF8] px-3 py-2 text-[13.5px] text-[#111113] placeholder-[#8A8A93] outline-none focus:border-[#111113]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-md bg-[#111113] px-4 py-2 text-[13px] font-medium text-[#FAFAF8] transition hover:bg-[#27272A] disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? 'Mengirim...' : 'Kirim ke Telegram ↗'}
                    </button>

                    {submitStatus === 'success' && (
                      <p className="text-xs font-medium text-[#15803D]">
                        Pesan berhasil dikirim. Terima kasih!
                      </p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="text-xs text-[#B91C1C]">
                        Gagal mengirim. Silakan hubungi langsung via WhatsApp atau Email.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#E5E4DE] bg-[#FAFAF8] py-7">
        <div className="mx-auto flex max-w-[820px] flex-col items-center justify-between gap-3 px-5 sm:px-6 text-xs text-[#5C5C64] sm:flex-row">
          <p>© 2026 Edvan Nuriana Putra Septia</p>
          <a href="#top" className="text-[#3F3F46] hover:text-[#111113] transition">
            Kembali ke atas ↑
          </a>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <a
        href="#top"
        aria-label="Kembali ke atas"
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-[#D4D3CC] bg-[#FFFFFF]/95 text-[#111113] shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-[#111113] hover:bg-[#111113] hover:text-[#FAFAF8] ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
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
          <div
            className={`absolute inset-0 bg-[#111113]/55 backdrop-blur-sm ${
              isClosingModal ? 'animate-backdrop-out pointer-events-none' : 'animate-backdrop-in'
            }`}
          />

          <div
            className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#E5E4DE] bg-[#FAFAF8] p-5 sm:p-7 shadow-xl text-left ${
              isClosingModal ? 'animate-modal-out pointer-events-none' : 'animate-modal-in'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-1.5 rounded-md text-[#5C5C64] hover:text-[#111113] hover:bg-[#F3F2EE] transition cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="pr-8">
                <span className="font-mono text-xs uppercase tracking-wider text-[#5C5C64]">
                  {activeModalProject.modalDetails?.kicker || 'Dokumentasi Teknis'}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-[#111113] mt-1">
                  {activeModalProject.title}
                </h3>
              </div>

              <p className="text-[14px] text-[#3F3F46] leading-relaxed">
                {activeModalProject.modalDetails?.summary || activeModalProject.description}
              </p>

              {activeModalProject.modalDetails?.bullets && (
                <div className="space-y-2 pt-1">
                  <p className="font-mono text-xs uppercase tracking-wider text-[#5C5C64] font-semibold">
                    Rincian Teknis
                  </p>
                  <ul className="space-y-2 text-[13px] text-[#3F3F46]">
                    {activeModalProject.modalDetails.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#111113] font-mono text-xs mt-0.5">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeModalProject.modalDetails?.results && (
                <div className="rounded-lg border border-[#E5E4DE] bg-[#F3F2EE] p-4 text-[13px] text-[#111113] leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#5C5C64] font-semibold block mb-1">
                    Hasil Pengujian &amp; Implementasi
                  </span>
                  {activeModalProject.modalDetails.results}
                </div>
              )}

              {activeModalProject.modalDetails?.note && (
                <p className="text-[11.5px] text-[#5C5C64] font-mono">
                  * {activeModalProject.modalDetails.note}
                </p>
              )}

              <div className="pt-4 border-t border-[#E5E4DE] flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-3.5 py-1.5 rounded-md border border-[#D4D3CC] bg-[#FFFFFF] text-xs font-medium text-[#3F3F46] hover:border-[#111113] hover:text-[#111113] transition cursor-pointer"
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
                        className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition ${
                          link.primary
                            ? 'bg-[#111113] text-[#FAFAF8] hover:bg-[#27272A]'
                            : 'border border-[#D4D3CC] bg-[#FFFFFF] text-[#3F3F46] hover:border-[#111113] hover:text-[#111113]'
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
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium border border-[#D4D3CC] bg-[#FFFFFF] text-[#3F3F46] hover:border-[#111113] hover:text-[#111113] transition"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>Unduh PDF Jurnal</span>
                        </a>
                      )}
                      <a
                        href={activeModalProject.link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-md text-xs font-medium bg-[#111113] text-[#FAFAF8] hover:bg-[#27272A] transition"
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
          <div
            className={`absolute inset-0 bg-[#111113]/55 backdrop-blur-sm ${
              isClosingExpertiseModal
                ? 'animate-backdrop-out pointer-events-none'
                : 'animate-backdrop-in'
            }`}
          />

          <div
            className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#E5E4DE] bg-[#FAFAF8] p-5 sm:p-7 shadow-xl text-left ${
              isClosingExpertiseModal
                ? 'animate-modal-out pointer-events-none'
                : 'animate-modal-in'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseExpertiseModal}
              className="absolute top-4 right-4 p-1.5 rounded-md text-[#5C5C64] hover:text-[#111113] hover:bg-[#F3F2EE] transition cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="pr-8">
                <span className="font-mono text-xs uppercase tracking-wider text-[#5C5C64]">
                  {activeExpertise.modalDetails.kicker}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-[#111113] mt-1">
                  {activeExpertise.title}
                </h3>
              </div>

              <p className="text-[14px] text-[#3F3F46] leading-relaxed">
                {activeExpertise.modalDetails.summary}
              </p>

              <div className="space-y-2 pt-1">
                <p className="font-mono text-xs uppercase tracking-wider text-[#5C5C64] font-semibold">
                  Fokus Pekerjaan
                </p>
                <ul className="space-y-2 text-[13px] text-[#3F3F46]">
                  {activeExpertise.modalDetails.competencies.map((comp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#111113] font-mono text-xs mt-0.5">•</span>
                      <span className="leading-relaxed">{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#E5E4DE]">
                <p className="font-mono text-xs uppercase tracking-wider text-[#5C5C64] font-semibold mb-2">
                  Tech Stack &amp; Tools
                </p>
                <p className="font-mono text-xs leading-relaxed text-[#3F3F46]">
                  {activeExpertise.modalDetails.tools.join(' · ')}
                </p>
              </div>

              <div className="rounded-lg border border-[#E5E4DE] bg-[#F3F2EE] p-4 text-[13px] text-[#111113] leading-relaxed">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#5C5C64] font-semibold block mb-1">
                  Hasil &amp; Kredensial Terkait
                </span>
                {activeExpertise.modalDetails.highlightMetric}
              </div>

              <div className="pt-3 border-t border-[#E5E4DE]">
                <p className="font-mono text-xs uppercase tracking-wider text-[#5C5C64] font-semibold mb-2">
                  Proyek &amp; Riset Terkait
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
                        className="inline-flex items-center gap-1 rounded-md border border-[#D4D3CC] bg-[#FFFFFF] px-3 py-1.5 text-xs font-medium text-[#111113] transition hover:border-[#111113] cursor-pointer"
                      >
                        <span>{foundProj.title}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-[#5C5C64]" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E4DE] flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleCloseExpertiseModal}
                  className="px-3.5 py-1.5 rounded-md border border-[#D4D3CC] bg-[#FFFFFF] text-xs font-medium text-[#3F3F46] hover:border-[#111113] hover:text-[#111113] transition cursor-pointer"
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
          <div
            onClick={handleCloseCertModal}
            className={`absolute inset-0 bg-[#111113]/60 backdrop-blur-sm ${
              isClosingCertModal ? 'animate-backdrop-out pointer-events-none' : 'animate-backdrop-in'
            }`}
          />

          <div
            className={`relative z-10 flex w-full max-w-5xl lg:max-w-6xl flex-col md:flex-row overflow-y-auto md:overflow-hidden rounded-xl border border-[#E5E4DE] bg-[#FAFAF8] shadow-2xl max-h-[90vh] md:h-[84vh] md:max-h-[740px] ${
              isClosingCertModal ? 'animate-modal-out pointer-events-none' : 'animate-modal-in'
            }`}
          >
            {/* Panel Kiri: Frame Gambar Sertifikat Asli */}
            <div className="relative flex flex-col justify-between border-b border-[#E5E4DE] bg-[#F3F2EE] p-4 sm:p-5 md:w-7/12 md:border-b-0 md:border-r lg:w-3/5 shrink-0">
              <div className="flex items-center justify-between gap-2 pb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#D4D3CC] bg-[#FFFFFF] text-[#111113]">
                    <Award className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold text-[#111113] truncate">
                    {activeCert.issuer}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="rounded border border-[#D4D3CC] bg-[#FFFFFF] px-2 py-0.5 font-mono text-[11px] tabular-nums text-[#5C5C64]">
                    {activeCert.period}
                  </span>
                  <button
                    type="button"
                    onClick={handleCloseCertModal}
                    className="md:hidden rounded-md border border-[#D4D3CC] bg-[#FFFFFF] p-1.5 text-[#5C5C64] hover:text-[#111113] transition cursor-pointer"
                    aria-label="Tutup Pratinjau Sertifikat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 w-full min-h-[200px] sm:min-h-[260px] md:min-h-0 flex items-center justify-center py-2">
                <div className="relative h-full w-full aspect-[16/11] md:aspect-auto">
                  <Image
                    src={activeCert.imageUrl}
                    alt={activeCert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-contain drop-shadow-md rounded"
                    priority
                  />
                </div>
              </div>

              <div className="hidden md:flex items-center justify-between pt-2.5 border-t border-[#E5E4DE] text-[11px] font-mono text-[#5C5C64]">
                <span className="inline-flex items-center gap-1.5 text-[#3F3F46]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
                  <span>Kredensial Digital Terverifikasi</span>
                </span>
                <a
                  href={activeCert.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#111113] underline underline-offset-4 hover:opacity-75 inline-flex items-center gap-1 transition"
                >
                  <span>Buka Berkas PDF</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Panel Kanan: Rincian Kredensial */}
            <div className="flex flex-col justify-between bg-[#FAFAF8] p-4 sm:p-5 md:p-6 lg:w-2/5 md:w-5/12 md:overflow-y-auto">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-xs text-[#5C5C64]">
                    {activeCert.category}
                  </span>
                  <button
                    type="button"
                    onClick={handleCloseCertModal}
                    className="hidden md:inline-flex rounded-md p-1.5 text-[#5C5C64] transition hover:bg-[#F3F2EE] hover:text-[#111113] cursor-pointer"
                    aria-label="Tutup Pratinjau Sertifikat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <h3 className="mt-2 text-base sm:text-xl font-semibold text-[#111113] leading-snug">
                  {activeCert.title}
                </h3>

                {activeCert.credentialId && (
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded border border-[#E5E4DE] bg-[#F3F2EE] px-2.5 py-1 font-mono text-[11px] text-[#5C5C64] max-w-full">
                    <span className="shrink-0">ID:</span>
                    <span className="text-[#111113] select-all font-medium truncate">
                      {activeCert.credentialId}
                    </span>
                  </div>
                )}

                <p className="mt-3.5 text-[13.5px] leading-relaxed text-[#3F3F46]">
                  {activeCert.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#E5E4DE]">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#5C5C64] mb-1.5 font-medium">
                    Kompetensi Tervalidasi
                  </p>
                  <p className="font-mono text-xs leading-relaxed text-[#3F3F46]">
                    {activeCert.skills.join(' · ')}
                  </p>
                </div>

                {activeCert.modules && (
                  <div className="mt-4 pt-3 border-t border-[#E5E4DE]">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#5C5C64] mb-2 font-medium">
                      Kurikulum Resmi ({activeCert.modules.length} Modul)
                    </p>
                    <div className="max-h-36 overflow-y-auto space-y-1.5 rounded-md border border-[#E5E4DE] bg-[#FFFFFF] p-2.5">
                      {activeCert.modules.map((modul, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] font-mono text-[#3F3F46]">
                          <span className="text-[#5C5C64] shrink-0">›</span>
                          <span className="leading-snug">{modul}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-[#E5E4DE] space-y-2">
                {activeCert.verifyUrl && (
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#111113] py-2 px-4 text-xs font-medium text-[#FAFAF8] transition hover:bg-[#27272A]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Verifikasi Kredensial Resmi ↗</span>
                  </a>
                )}

                <div className="flex items-center gap-2">
                  <a
                    href={activeCert.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-[#D4D3CC] bg-[#FFFFFF] py-2 px-3 text-xs font-medium text-[#111113] transition hover:border-[#111113]"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Unduh PDF Asli</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCloseCertModal}
                    className="rounded-md border border-[#D4D3CC] bg-[#FFFFFF] px-3.5 py-2 text-xs font-medium text-[#3F3F46] transition hover:border-[#111113] hover:text-[#111113] cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CV PREVIEW MODAL */}
      {showCvModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
          onClick={handleCloseCvModal}
        >
          <div
            className={`absolute inset-0 bg-[#111113]/60 backdrop-blur-sm ${
              isClosingCvModal ? 'animate-backdrop-out pointer-events-none' : 'animate-backdrop-in'
            }`}
          />

          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[#E5E4DE] bg-[#FAFAF8] shadow-2xl ${
              isClosingCvModal ? 'animate-modal-out pointer-events-none' : 'animate-modal-in'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E4DE] bg-[#FAFAF8] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="h-4 w-4 text-[#111113] shrink-0" />
                <h3 className="text-xs sm:text-sm font-semibold text-[#111113] truncate">
                  Curriculum Vitae — Edvan Nuriana Putra Septia, S.Kom.
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="/cv-edvan.pdf"
                  download="CV-Edvan-Nuriana-Putra-Septia.pdf"
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#111113] px-3 py-1.5 text-xs font-medium text-[#FAFAF8] transition hover:bg-[#27272A]"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Unduh CV</span>
                </a>
                <a
                  href="/cv-edvan.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 rounded-md border border-[#D4D3CC] bg-[#FFFFFF] px-2.5 py-1.5 text-xs font-medium text-[#3F3F46] transition hover:border-[#111113] hover:text-[#111113]"
                >
                  <span>Tab Baru</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <button
                  type="button"
                  onClick={handleCloseCvModal}
                  className="rounded-md border border-[#D4D3CC] bg-[#FFFFFF] p-1.5 text-[#5C5C64] transition hover:border-[#111113] hover:text-[#111113] cursor-pointer"
                  aria-label="Tutup Pratinjau CV"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 bg-[#F3F2EE]">
              <iframe
                src="/cv-edvan.pdf#view=FitH"
                title="Pratinjau CV Edvan Nuriana Putra Septia"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
