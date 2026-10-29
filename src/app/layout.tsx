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
  title: "Edvan Nuriana, S.Kom. — Fullstack & Mobile Software Engineer",
  description: "Portofolio Edvan Nuriana Putra Septia, S.Kom. Lulusan S1 Sistem Komputer UNIKOM. Berfokus pada Fullstack Web (Next.js/React 19), Mobile Development (Flutter/Android), dan protokol P2P real-time (WebRTC).",
  keywords: ["Edvan Nuriana", "Fullstack Developer", "Mobile Developer", "Flutter", "Next.js", "React 19", "WebRTC", "TypeScript", "Sistem Komputer", "Cisco CCNA", "UNIKOM"],
  authors: [{ name: "Edvan Nuriana Putra Septia, S.Kom." }],
  openGraph: {
    title: "Edvan Nuriana, S.Kom. — Fullstack & Mobile Software Engineer",
    description: "Portofolio Edvan Nuriana Putra Septia, S.Kom. Lulusan S1 Sistem Komputer UNIKOM (IPK 3.53). Fullstack Web, Flutter Mobile, dan Sistem Terdistribusi.",
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
