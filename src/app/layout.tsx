import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
      className={`${spaceGrotesk.variable} ${dmSans.variable} scroll-smooth dark`}
    >
      <body className="font-sans antialiased bg-[#0A0A0C] text-zinc-100 min-h-screen selection:bg-emerald-500/25 selection:text-emerald-200">
        {children}
      </body>
    </html>
  );
}
