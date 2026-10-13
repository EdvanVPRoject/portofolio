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
  title: "Edvan Nuriana — Sistem Komputer",
  description: "Portofolio Edvan Nuriana Putra Septia, lulusan Sistem Komputer dengan pengalaman proyek di bidang pemrograman, computer vision, IoT, dan aplikasi web.",
  keywords: ["Edvan Nuriana", "Sistem Komputer", "Portofolio", "Computer Vision", "IoT", "Next.js", "WebRTC", "YOLOv8"],
  authors: [{ name: "Edvan Nuriana Putra Septia" }],
  openGraph: {
    title: "Edvan Nuriana — Sistem Komputer",
    description: "Portofolio Edvan Nuriana Putra Septia, lulusan Sistem Komputer UNIKOM.",
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
      <body className="font-sans antialiased bg-[#090D16] text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
