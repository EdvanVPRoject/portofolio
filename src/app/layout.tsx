import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edvan-portofolio.vercel.app"),
  title: "Edvan Nuriana Putra Septia, S.Kom. — Fullstack Developer, Data Automation & QA Engineer",
  description:
    "Portofolio Resmi Edvan Nuriana Putra Septia, S.Kom. Lulusan S1 Sistem Komputer UNIKOM (IPK 3.53). Spesialisasi Fullstack Web & Mobile (React 19, Next.js 15, Node.js, Flutter), Quality Assurance (QA, Unit & API Testing), serta Data Automation (Python, SQL, Tableau, Excel).",
  keywords: [
    "Edvan Nuriana Putra Septia",
    "Edvan Nuriana",
    "Fullstack Developer",
    "Quality Assurance Engineer",
    "QA Tester",
    "Data Analyst",
    "Data Automation",
    "Software Engineer",
    "Mobile Developer",
    "Flutter",
    "Next.js",
    "React 19",
    "Node.js",
    "Python",
    "SQL",
    "Tableau",
    "Sistem Komputer UNIKOM",
    "Cisco CCNA",
  ],
  authors: [{ name: "Edvan Nuriana Putra Septia, S.Kom." }],
  openGraph: {
    title: "Edvan Nuriana Putra Septia, S.Kom. — Fullstack Developer, Data Automation & QA Engineer",
    description:
      "Lulusan S1 Sistem Komputer UNIKOM (IPK 3.53). Siap bergabung Full-Time (On-Site / Hybrid / Remote) & kolaborasi proyek Web, Mobile, QA, dan Otomasi Data.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-[var(--bg-page)] text-[var(--text-main)] min-h-screen selection:bg-[#111113] selection:text-[#FAFAF8]">
        {children}
      </body>
    </html>
  );
}
